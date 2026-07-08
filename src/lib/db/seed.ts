import { db } from "./index";
import { questions } from "./schema";

const seedQuestions = [
  // ── Software Engineering ──
  {
    stem: "Explain the CAP theorem and its trade-offs in distributed systems.",
    difficultyA: 1.3,
    difficultyB: 0.8,
    difficultyC: 0.1,
    conceptTags: [
      "distributed-systems",
      "cap-theorem",
      "system-design",
    ],
    topicCategory: "software-engineering",
    rubric: {
      keyPoints: [
        { text: "Defines Consistency, Availability, Partition Tolerance", weight: 0.3 },
        { text: "Explains CP vs AP trade-off during partitions", weight: 0.3 },
        { text: "Real-world example (e.g., Cassandra vs HBase)", weight: 0.2 },
        { text: "You can only pick two of three", weight: 0.2 },
      ],
      commonMisconceptions: [
        "CAP is about choosing two at all times, not just during partitions",
      ],
    },
  },
  {
    stem: "What is the difference between REST and GraphQL? When would you use each?",
    difficultyA: 1.0,
    difficultyB: 0.2,
    difficultyC: 0.05,
    conceptTags: ["api-design", "rest", "graphql"],
    topicCategory: "software-engineering",
    rubric: {
      keyPoints: [
        { text: "REST has fixed endpoints, GraphQL has a single endpoint", weight: 0.25 },
        { text: "GraphQL lets clients request exact fields", weight: 0.25 },
        { text: "REST uses HTTP verbs, GraphQL uses queries/mutations", weight: 0.25 },
        { text: "When to use each (REST for simple CRUD, GraphQL for complex UIs)", weight: 0.25 },
      ],
      commonMisconceptions: [
        "GraphQL replaces REST entirely",
        "GraphQL is always better",
      ],
    },
  },
  {
    stem: "Explain how garbage collection works in a language like Java or Go. Compare tracing vs reference counting.",
    difficultyA: 1.5,
    difficultyB: 1.2,
    difficultyC: 0.1,
    conceptTags: ["memory-management", "gc", "runtime"],
    topicCategory: "software-engineering",
    rubric: {
      keyPoints: [
        { text: "Tracing GC (mark-and-sweep, generational)", weight: 0.3 },
        { text: "Reference counting with cycle detection", weight: 0.3 },
        { text: "Trade-offs: pause times vs throughput", weight: 0.2 },
        { text: "Specific examples (Java G1, Go GC)", weight: 0.2 },
      ],
      commonMisconceptions: [
        "All GC is the same",
        "Reference counting catches all cycles",
      ],
    },
  },

  // ── Data Engineering ──
  {
    stem: "Explain the difference between batch processing and stream processing. Give examples of tools used for each.",
    difficultyA: 1.0,
    difficultyB: 0.0,
    difficultyC: 0.05,
    conceptTags: ["etl", "batch-processing", "stream-processing"],
    topicCategory: "data-engineering",
    rubric: {
      keyPoints: [
        { text: "Batch processes finite data at intervals (hourly/daily)", weight: 0.3 },
        { text: "Stream processes data in real time as it arrives", weight: 0.3 },
        { text: "Batch tools: Spark, Hive, Airflow", weight: 0.2 },
        { text: "Stream tools: Kafka, Flink, Spark Streaming", weight: 0.2 },
      ],
      commonMisconceptions: [
        "Stream processing is always better than batch",
        "Lambda architecture requires both",
      ],
    },
  },
  {
    stem: "What is a data warehouse and how does it differ from a data lake?",
    difficultyA: 1.1,
    difficultyB: 0.3,
    difficultyC: 0.05,
    conceptTags: ["data-warehouse", "data-lake", "data-modeling"],
    topicCategory: "data-engineering",
    rubric: {
      keyPoints: [
        { text: "Data warehouse: structured, schema-on-write, optimized for analytics", weight: 0.3 },
        { text: "Data lake: raw, schema-on-read, stores all formats", weight: 0.3 },
        { text: "Warehouse examples: Snowflake, BigQuery, Redshift", weight: 0.2 },
        { text: "Lake examples: S3, ADLS, Delta Lake", weight: 0.2 },
      ],
      commonMisconceptions: [
        "Data lakes are just cheap storage",
        "You don't need governance in data lakes",
      ],
    },
  },

  // ── Data Science ──
  {
    stem: "Explain the bias-variance tradeoff in machine learning. How does it relate to underfitting and overfitting?",
    difficultyA: 1.2,
    difficultyB: 0.5,
    difficultyC: 0.1,
    conceptTags: ["bias-variance", "overfitting", "underfitting", "ml-fundamentals"],
    topicCategory: "data-science",
    rubric: {
      keyPoints: [
        { text: "Bias: error from overly simple assumptions (underfitting)", weight: 0.25 },
        { text: "Variance: error from sensitivity to training data (overfitting)", weight: 0.25 },
        { text: "Tradeoff: increasing one decreases the other", weight: 0.25 },
        { text: "How to diagnose and mitigate both", weight: 0.25 },
      ],
      commonMisconceptions: [
        "You can eliminate both bias and variance",
        "More features always reduces bias",
      ],
    },
  },
  {
    stem: "You are given a dataset with 95% class imbalance. How would you evaluate and improve model performance?",
    difficultyA: 1.4,
    difficultyB: 1.0,
    difficultyC: 0.1,
    conceptTags: ["class-imbalance", "evaluation-metrics", "ml-fundamentals"],
    topicCategory: "data-science",
    rubric: {
      keyPoints: [
        { text: "Accuracy is misleading — use precision, recall, F1, AUC-ROC", weight: 0.3 },
        { text: "Resampling: SMOTE, undersampling, class weights", weight: 0.3 },
        { text: "Algorithm choices: tree-based models handle imbalance better", weight: 0.2 },
        { text: "Threshold tuning for probability-based models", weight: 0.2 },
      ],
      commonMisconceptions: [
        "Accuracy is always the right metric",
        "SMOTE always helps",
      ],
    },
  },

  // ── AI Engineering ──
  {
    stem: "Explain the Transformer architecture. What are the key components and how do they work together?",
    difficultyA: 1.6,
    difficultyB: 1.5,
    difficultyC: 0.15,
    conceptTags: ["transformers", "attention", "llm-architecture"],
    topicCategory: "ai-engineering",
    rubric: {
      keyPoints: [
        { text: "Self-attention mechanism: Q, K, V matrices", weight: 0.3 },
        { text: "Multi-head attention processes different representation subspaces", weight: 0.2 },
        { text: "Feed-forward networks, layer norm, residual connections", weight: 0.2 },
        { text: "Positional encodings provide sequence order", weight: 0.15 },
        { text: "Encoder-decoder vs decoder-only architectures", weight: 0.15 },
      ],
      commonMisconceptions: [
        "Transformers don't need positional encoding",
        "Attention is all you need means no FF layers",
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
        { text: "RAG retrieves relevant documents before generation", weight: 0.25 },
        { text: "Indexing: chunking strategy, embedding model choice", weight: 0.25 },
        { text: "Retrieval: vector DB (Pinecone, Weaviate, pgvector)", weight: 0.25 },
        { text: "Generation: prompt construction with retrieved context", weight: 0.25 },
      ],
      commonMisconceptions: [
        "RAG replaces fine-tuning",
        "More context always helps",
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
        { text: "Fine-tuning: best for specific output format/behavior", weight: 0.25 },
        { text: "Can combine: RAG + fine-tuning for best results", weight: 0.25 },
      ],
      commonMisconceptions: [
        "Fine-tuning teaches the model new facts",
        "RAG makes fine-tuning obsolete",
      ],
    },
  },
];

export async function seed() {
  console.log("Seeding questions...");
  for (const q of seedQuestions) {
    await db.insert(questions).values(q);
  }
  console.log(`Seeded ${seedQuestions.length} questions`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
    .then(() => process.exit(0))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
