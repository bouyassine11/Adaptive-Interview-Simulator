import type { Question } from "../../types";

const aiQuestions: Omit<Question, "id">[] = [
  {
    stem: "Explain the Transformer architecture. What are the key components and how do they work together?",
    difficultyA: 1.6,
    difficultyB: 1.5,
    difficultyC: 0.15,
    conceptTags: ["transformers", "attention", "llm-architecture"],
    topicCategory: "ai-engineering",
    rubric: {
      keyPoints: [
        { text: "Self-attention: Q, K, V matrices with scaled dot-product", weight: 0.25 },
        { text: "Multi-head attention processes different representation subspaces", weight: 0.2 },
        { text: "Feed-forward networks, layer norm, residual connections", weight: 0.2 },
        { text: "Positional encodings provide sequence order information", weight: 0.15 },
        { text: "Encoder-decoder vs decoder-only vs encoder-only variants", weight: 0.2 },
      ],
      commonMisconceptions: [
        "Transformers don't need positional encoding",
        "Attention replaces feed-forward layers entirely",
      ],
    },
  },
  {
    stem: "What is Retrieval-Augmented Generation (RAG)? Walk through the architecture and key design decisions.",
    difficultyA: 1.3,
    difficultyB: 0.7,
    difficultyC: 0.1,
    conceptTags: ["rag", "vector-db", "llm-applications"],
    topicCategory: "ai-engineering",
    rubric: {
      keyPoints: [
        { text: "RAG retrieves relevant documents before generation", weight: 0.2 },
        { text: "Indexing: chunking strategy, embedding model selection", weight: 0.2 },
        { text: "Retrieval: vector DB (Pinecone, Weaviate, pgvector) with similarity search", weight: 0.25 },
        { text: "Generation: prompt construction with retrieved context", weight: 0.2 },
        { text: "Re-ranking and query expansion for better retrieval", weight: 0.15 },
      ],
      commonMisconceptions: [
        "RAG replaces fine-tuning entirely",
        "More retrieved context always improves results",
      ],
    },
  },
  {
    stem: "Compare prompt engineering vs fine-tuning vs RAG. When would you use each?",
    difficultyA: 1.2,
    difficultyB: 0.6,
    difficultyC: 0.1,
    conceptTags: ["prompt-engineering", "fine-tuning", "rag", "llm-applications"],
    topicCategory: "ai-engineering",
    rubric: {
      keyPoints: [
        { text: "Prompt engineering: no training, best for simple/evolving tasks", weight: 0.25 },
        { text: "RAG: best for knowledge-heavy, frequently updated data", weight: 0.25 },
        { text: "Fine-tuning: best for specific output format/behavior/style", weight: 0.25 },
        { text: "Can combine approaches (e.g., RAG + fine-tuning for best results)", weight: 0.25 },
      ],
      commonMisconceptions: [
        "Fine-tuning teaches the model new facts",
        "RAG makes fine-tuning obsolete",
      ],
    },
  },
  {
    stem: "What is a vector database? How does similarity search work?",
    difficultyA: 1.1,
    difficultyB: 0.3,
    difficultyC: 0.08,
    conceptTags: ["vector-db", "embeddings", "similarity-search"],
    topicCategory: "ai-engineering",
    rubric: {
      keyPoints: [
        { text: "Vector DB stores high-dimensional embeddings and enables fast nearest-neighbor search", weight: 0.25 },
        { text: "Similarity metrics: cosine, dot product, Euclidean distance", weight: 0.25 },
        { text: "Approximate NN algorithms: HNSW, IVF, PQ for speed-accuracy tradeoff", weight: 0.25 },
        { text: "Examples: Pinecone, Weaviate, Qdrant, pgvector, Milvus", weight: 0.25 },
      ],
      commonMisconceptions: [
        "Vector DBs are just databases with vector support",
        "Cosine similarity is always the best metric",
      ],
    },
  },
  {
    stem: "How does fine-tuning an LLM work? What are LoRA and QLoRA?",
    difficultyA: 1.4,
    difficultyB: 0.9,
    difficultyC: 0.12,
    conceptTags: ["fine-tuning", "lora", "qlora", "llm-training"],
    topicCategory: "ai-engineering",
    rubric: {
      keyPoints: [
        { text: "Fine-tuning continues training on domain/task-specific data", weight: 0.2 },
        { text: "Full fine-tuning updates all parameters (expensive)", weight: 0.2 },
        { text: "LoRA: low-rank adapters — trains small rank-decomposed matrices instead", weight: 0.3 },
        { text: "QLoRA: LoRA + 4-bit quantization — enables fine-tuning on consumer GPUs", weight: 0.3 },
      ],
      commonMisconceptions: [
        "Fine-tuning is always better than prompt engineering",
        "LoRA reduces inference time (it doesn't — only reduces trainable params)",
      ],
    },
  },
  {
    stem: "What are AI agents? How do they differ from simple LLM chains?",
    difficultyA: 1.2,
    difficultyB: 0.4,
    difficultyC: 0.08,
    conceptTags: ["agents", "tool-use", "llm-applications"],
    topicCategory: "ai-engineering",
    rubric: {
      keyPoints: [
        { text: "Agents use LLMs to decide actions, not just generate text", weight: 0.25 },
        { text: "Tool-use: agents can call APIs, run code, search the web", weight: 0.25 },
        { text: "Planning: ReAct loop (Reason → Act → Observe) or chain-of-thought", weight: 0.25 },
        { text: "Memory: short-term (conversation) and long-term (vector store)", weight: 0.25 },
      ],
      commonMisconceptions: [
        "Agents are just chatbots with plugins",
        "Agents always work reliably without guardrails",
      ],
    },
  },
  {
    stem: "Explain LLM evaluation. How do you measure if a model is performing well?",
    difficultyA: 1.3,
    difficultyB: 0.5,
    difficultyC: 0.1,
    conceptTags: ["evaluation", "llm-metrics", "benchmarking"],
    topicCategory: "ai-engineering",
    rubric: {
      keyPoints: [
        { text: "Automatic metrics: perplexity, BLEU, ROUGE for text quality", weight: 0.2 },
        { text: "Task-specific: accuracy, F1 for classification, exact match for QA", weight: 0.25 },
        { text: "LLM-as-judge: using a stronger model to rate outputs", weight: 0.25 },
        { text: "Human evaluation: preference ranking, A/B testing, Likert scales", weight: 0.3 },
      ],
      commonMisconceptions: [
        "BLEU score measures overall LLM quality",
        "Automatic metrics capture everything humans care about",
      ],
    },
  },
  {
    stem: "What is prompt injection? How do you defend against it?",
    difficultyA: 1.1,
    difficultyB: 0.2,
    difficultyC: 0.08,
    conceptTags: ["prompt-injection", "security", "ai-safety"],
    topicCategory: "ai-engineering",
    rubric: {
      keyPoints: [
        { text: "Prompt injection: user input overrides system instructions", weight: 0.3 },
        { text: "Direct injection: inline malicious instructions in user prompt", weight: 0.25 },
        { text: "Indirect injection: malicious content in retrieved documents (RAG)", weight: 0.25 },
        { text: "Defenses: input validation, instruction hierarchy, output filtering", weight: 0.2 },
      ],
      commonMisconceptions: [
        "System prompts are secret and prevent injection",
        "LLM can reliably detect injection attempts",
      ],
    },
  },
  {
    stem: "Explain attention mechanisms in detail. What is the difference between self-attention and cross-attention?",
    difficultyA: 1.5,
    difficultyB: 1.3,
    difficultyC: 0.15,
    conceptTags: ["attention", "transformers", "deep-learning"],
    topicCategory: "ai-engineering",
    rubric: {
      keyPoints: [
        { text: "Self-attention: Q, K, V all come from the same sequence", weight: 0.3 },
        { text: "Cross-attention: Q from decoder, K/V from encoder (in encoder-decoder)", weight: 0.3 },
        { text: "Scaled dot-product: softmax(QK^T / sqrt(d_k)) × V", weight: 0.2 },
        { text: "Multi-head: parallel attention with different learned projections", weight: 0.2 },
      ],
      commonMisconceptions: [
        "Attention is just a lookup table",
        "Cross-attention and self-attention are the same thing",
      ],
    },
  },
  {
    stem: "How do you handle hallucinations in LLM applications? What techniques exist?",
    difficultyA: 1.3,
    difficultyB: 0.6,
    difficultyC: 0.1,
    conceptTags: ["hallucination", "llm-safety", "reliability"],
    topicCategory: "ai-engineering",
    rubric: {
      keyPoints: [
        { text: "RAG: ground responses in retrieved factual context", weight: 0.25 },
        { text: "Constrained decoding: logit bias, grammar-constrained generation", weight: 0.2 },
        { text: "Self-consistency: sample multiple answers, vote on consensus", weight: 0.2 },
        { text: "Verification: chain-of-thought, fact-checking step, tool-use", weight: 0.2 },
        { text: "Fine-tuning on high-quality, factually grounded data", weight: 0.15 },
      ],
      commonMisconceptions: [
        "Temperature 0 eliminates hallucinations",
        "Bigger models never hallucinate",
      ],
    },
  },
];

export default aiQuestions;
