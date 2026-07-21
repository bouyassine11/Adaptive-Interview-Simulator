import type { Question } from "../../types";

const deQuestions: Omit<Question, "id">[] = [
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
        "Lambda architecture requires both simultaneously",
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
        { text: "Lake examples: S3, ADLS, Delta Lake (lakehouse)", weight: 0.2 },
      ],
      commonMisconceptions: [
        "Data lakes are just cheap storage without governance",
        "Data lakes replaced data warehouses",
      ],
    },
  },
  {
    stem: "What is a DAG in Apache Airflow? How do you design an effective pipeline DAG?",
    difficultyA: 1.0,
    difficultyB: 0.1,
    difficultyC: 0.05,
    conceptTags: ["airflow", "orchestration", "dags"],
    topicCategory: "data-engineering",
    rubric: {
      keyPoints: [
        { text: "DAG defines task dependencies and execution order", weight: 0.25 },
        { text: "Idempotency: tasks should be safely re-runnable", weight: 0.25 },
        { text: "Task design: one action per task, use XComs for data passing", weight: 0.25 },
        { text: "Retries, timeouts, and alerting for reliability", weight: 0.25 },
      ],
      commonMisconceptions: [
        "Airflow is an ETL tool (it orchestrates, doesn't transform)",
        "Longer DAGs are always better",
      ],
    },
  },
  {
    stem: "Explain Apache Spark's execution model. What are RDDs, DataFrames, and Catalyst?",
    difficultyA: 1.4,
    difficultyB: 0.9,
    difficultyC: 0.1,
    conceptTags: ["spark", "distributed-computing", "catalyst"],
    topicCategory: "data-engineering",
    rubric: {
      keyPoints: [
        { text: "RDDs: low-level immutable distributed collections", weight: 0.2 },
        { text: "DataFrames: schema-aware, optimized via Catalyst optimizer", weight: 0.25 },
        { text: "Catalyst: logical planning → optimization → physical planning → codegen", weight: 0.25 },
        { text: "Lazy evaluation: transformations build a plan, actions trigger execution", weight: 0.3 },
      ],
      commonMisconceptions: [
        "Spark uses MapReduce under the hood",
        "RDDs are preferred over DataFrames for performance",
      ],
    },
  },
  {
    stem: "How does Kafka ensure message ordering and exactly-once delivery?",
    difficultyA: 1.3,
    difficultyB: 0.7,
    difficultyC: 0.1,
    conceptTags: ["kafka", "streaming", "message-queues"],
    topicCategory: "data-engineering",
    rubric: {
      keyPoints: [
        { text: "Ordering guaranteed per partition (use key-based partitioning)", weight: 0.3 },
        { text: "Idempotent producer: deduplicates retries via producer ID", weight: 0.25 },
        { text: "Transactional API: atomic writes across partitions", weight: 0.25 },
        { text: "Consumer group offset management for at-least-once semantics", weight: 0.2 },
      ],
      commonMisconceptions: [
        "Kafka guarantees global ordering across all partitions",
        "Exactly-once is the default configuration",
      ],
    },
  },
  {
    stem: "What is the star schema vs snowflake schema? Which do you choose and why?",
    difficultyA: 1.0,
    difficultyB: 0.2,
    difficultyC: 0.05,
    conceptTags: ["data-modeling", "star-schema", "dimensional-modeling"],
    topicCategory: "data-engineering",
    rubric: {
      keyPoints: [
        { text: "Star schema: fact table joins directly to denormalized dimensions", weight: 0.25 },
        { text: "Snowflake schema: dimensions are normalized into sub-tables", weight: 0.25 },
        { text: "Star: simpler queries, faster reads, more storage", weight: 0.25 },
        { text: "Snowflake: less storage, more joins, better for high-cardinality dims", weight: 0.25 },
      ],
      commonMisconceptions: [
        "Snowflake schema is always more normalized and better",
        "Star schema is outdated",
      ],
    },
  },
  {
    stem: "How do you handle slowly changing dimensions (SCD) in a data warehouse?",
    difficultyA: 1.2,
    difficultyB: 0.5,
    difficultyC: 0.08,
    conceptTags: ["scd", "data-warehouse", "etl"],
    topicCategory: "data-engineering",
    rubric: {
      keyPoints: [
        { text: "Type 1: overwrite (no history kept)", weight: 0.2 },
        { text: "Type 2: add new row with versioning (full history)", weight: 0.3 },
        { text: "Type 3: add column for previous value (limited history)", weight: 0.2 },
        { text: "When to use each based on business requirements", weight: 0.3 },
      ],
      commonMisconceptions: [
        "SCD Type 2 always creates a new row for every change",
        "Type 1 is never useful",
      ],
    },
  },
  {
    stem: "What is data quality and how do you build a data quality framework?",
    difficultyA: 1.1,
    difficultyB: 0.3,
    difficultyC: 0.05,
    conceptTags: ["data-quality", "validation", "monitoring"],
    topicCategory: "data-engineering",
    rubric: {
      keyPoints: [
        { text: "Dimensions: completeness, accuracy, consistency, timeliness, uniqueness", weight: 0.25 },
        { text: "Validation: schema checks, range checks, referential integrity", weight: 0.25 },
        { text: "Monitoring: automated alerts, data contracts, anomaly detection", weight: 0.25 },
        { text: "Tools: Great Expectations, dbt tests, Soda, Monte Carlo", weight: 0.25 },
      ],
      commonMisconceptions: [
        "Data quality is just checking for nulls",
        "You need 100% data quality before doing anything",
      ],
    },
  },
  {
    stem: "Explain ETL vs ELT. When would you use each approach?",
    difficultyA: 0.9,
    difficultyB: -0.2,
    difficultyC: 0.05,
    conceptTags: ["etl", "elt", "data-pipelines"],
    topicCategory: "data-engineering",
    rubric: {
      keyPoints: [
        { text: "ETL: Transform before loading into the target (traditional)", weight: 0.3 },
        { text: "ELT: Load raw data first, transform in-warehouse (modern)", weight: 0.3 },
        { text: "ELT leverages cloud warehouse compute for transforms", weight: 0.2 },
        { text: "Use ETL for compliance/sensitive data, ELT for speed/flexibility", weight: 0.2 },
      ],
      commonMisconceptions: [
        "ETL is obsolete and replaced by ELT",
        "ELT means no transformation is needed",
      ],
    },
  },
  {
    stem: "How would you design a real-time data pipeline for an e-commerce clickstream?",
    difficultyA: 1.5,
    difficultyB: 1.1,
    difficultyC: 0.12,
    conceptTags: ["real-time", "streaming", "system-design", "kafka"],
    topicCategory: "data-engineering",
    rubric: {
      keyPoints: [
        { text: "Ingestion: Kafka/Kinesis for high-throughput event ingestion", weight: 0.2 },
        { text: "Processing: Flink or Spark Streaming for windowed aggregation", weight: 0.2 },
        { text: "Storage: tiered — hot (Redis/ClickHouse), cold (S3/Parquet)", weight: 0.2 },
        { text: "Latency requirements: sub-second for personalization, minutes for analytics", weight: 0.2 },
        { text: "Schema evolution and late-arriving data handling", weight: 0.2 },
      ],
      commonMisconceptions: [
        "Batch processing is fast enough for all real-time use cases",
        "You need exactly-once for all streaming scenarios",
      ],
    },
  },
];

export default deQuestions;
