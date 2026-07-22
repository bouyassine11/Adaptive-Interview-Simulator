const PRIMARY_MODEL =
  "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3";
const FALLBACK_MODEL =
  "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000;

export class HFClient {
  private token: string;

  constructor(token?: string) {
    this.token = token ?? process.env.HF_API_TOKEN ?? "";
  }

  async infer(
    prompt: string,
    options?: { useFallback?: boolean; signal?: AbortSignal },
  ): Promise<string> {
    const model = options?.useFallback ? FALLBACK_MODEL : PRIMARY_MODEL;
    return this.requestWithRetry(model, prompt, 1, options?.signal);
  }

  private async requestWithRetry(
    model: string,
    prompt: string,
    attempt = 1,
    signal?: AbortSignal,
  ): Promise<string> {
    const start = performance.now();

    try {
      const res = await fetch(model, {
        signal,
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 384,
            temperature: 0.1,
            return_full_text: false,
          },
        }),
      });

      const latency = performance.now() - start;

      if (res.ok) {
        const data = await res.json();
        return extractGeneratedText(data);
      }

      if (res.status === 503 && attempt <= MAX_RETRIES) {
        const delay = INITIAL_RETRY_DELAY * Math.pow(2, attempt - 1);
        await sleep(delay);
        return this.requestWithRetry(model, prompt, attempt + 1, signal);
      }

      if (res.status === 429 && attempt <= MAX_RETRIES) {
        const retryAfter = res.headers.get("retry-after");
        const delay = retryAfter ? parseInt(retryAfter) * 1000 : 5000;
        await sleep(delay);
        return this.requestWithRetry(model, prompt, attempt + 1, signal);
      }

      throw new ApiError(res.status, `HF API error: ${res.status}`, latency);
    } catch (err) {
      if (err instanceof ApiError) throw err;
      if (attempt <= MAX_RETRIES) {
        const delay = INITIAL_RETRY_DELAY * Math.pow(2, attempt - 1);
        await sleep(delay);
        return this.requestWithRetry(model, prompt, attempt + 1, signal);
      }
      throw err;
    }
  }
}

function extractGeneratedText(data: unknown): string {
  if (Array.isArray(data) && data.length > 0) {
    const first = data[0] as Record<string, unknown>;
    return (first.generated_text as string) ?? "";
  }
  if (data && typeof data === "object") {
    return ((data as Record<string, unknown>).generated_text as string) ?? "";
  }
  return String(data ?? "");
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export class ApiError extends Error {
  status: number;
  latency: number;

  constructor(status: number, message: string, latency: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.latency = latency;
  }
}
