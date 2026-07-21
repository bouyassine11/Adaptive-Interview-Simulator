import type { Question } from "../../types";

const sweQuestions: Omit<Question, "id">[] = [
  {
    stem: "Explain the CAP theorem and its trade-offs in distributed systems.",
    difficultyA: 1.3,
    difficultyB: 0.8,
    difficultyC: 0.1,
    conceptTags: ["distributed-systems", "cap-theorem", "system-design"],
    topicCategory: "software-engineering",
    rubric: {
      keyPoints: [
        { text: "Defines Consistency, Availability, Partition Tolerance", weight: 0.3 },
        { text: "Explains CP vs AP trade-off during partitions", weight: 0.3 },
        { text: "Real-world example (e.g., Cassandra vs HBase)", weight: 0.2 },
        { text: "You can only pick two of three during a network partition", weight: 0.2 },
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
        { text: "GraphQL lets clients request exact fields, reducing over-fetching", weight: 0.25 },
        { text: "REST uses HTTP verbs for CRUD, GraphQL uses queries/mutations", weight: 0.25 },
        { text: "When to use each: REST for simple CRUD, GraphQL for complex UIs with nested data", weight: 0.25 },
      ],
      commonMisconceptions: [
        "GraphQL replaces REST entirely",
        "GraphQL is always better",
      ],
    },
  },
  {
    stem: "Explain how garbage collection works. Compare tracing vs reference counting.",
    difficultyA: 1.5,
    difficultyB: 1.2,
    difficultyC: 0.1,
    conceptTags: ["memory-management", "gc", "runtime"],
    topicCategory: "software-engineering",
    rubric: {
      keyPoints: [
        { text: "Tracing GC: mark-and-sweep, generational collection", weight: 0.3 },
        { text: "Reference counting with cycle detection", weight: 0.3 },
        { text: "Trade-offs: pause times vs throughput vs memory overhead", weight: 0.2 },
        { text: "Specific examples: Java G1/ZGC, Go GC, CPython reference counting", weight: 0.2 },
      ],
      commonMisconceptions: [
        "All GC is the same",
        "Reference counting catches all cycles",
      ],
    },
  },
  {
    stem: "What is the difference between concurrency and parallelism? Give examples.",
    difficultyA: 0.8,
    difficultyB: -0.5,
    difficultyC: 0.05,
    conceptTags: ["concurrency", "parallelism", "runtime"],
    topicCategory: "software-engineering",
    rubric: {
      keyPoints: [
        { text: "Concurrency: dealing with multiple things at once (interleaving)", weight: 0.3 },
        { text: "Parallelism: doing multiple things at once (simultaneous execution)", weight: 0.3 },
        { text: "Concurrency can exist without parallelism (single-core)", weight: 0.2 },
        { text: "Examples: goroutines for concurrency, multi-core for parallelism", weight: 0.2 },
      ],
      commonMisconceptions: [
        "Concurrency and parallelism are the same thing",
        "More threads always means more parallelism",
      ],
    },
  },
  {
    stem: "Explain OOP SOLID principles with a real-world code example.",
    difficultyA: 1.2,
    difficultyB: 0.3,
    difficultyC: 0.08,
    conceptTags: ["oop", "solid", "design-principles"],
    topicCategory: "software-engineering",
    rubric: {
      keyPoints: [
        { text: "Single Responsibility: one class, one job", weight: 0.2 },
        { text: "Open/Closed: open for extension, closed for modification", weight: 0.2 },
        { text: "Liskov Substitution: subtypes must be substitutable", weight: 0.2 },
        { text: "Interface Segregation: many small interfaces over one fat one", weight: 0.2 },
        { text: "Dependency Inversion: depend on abstractions, not concretions", weight: 0.2 },
      ],
      commonMisconceptions: [
        "SOLID means writing more classes",
        "You always need all five",
      ],
    },
  },
  {
    stem: "How does a hash table work? What makes a good hash function?",
    difficultyA: 0.9,
    difficultyB: -0.2,
    difficultyC: 0.05,
    conceptTags: ["data-structures", "hash-tables", "performance"],
    topicCategory: "software-engineering",
    rubric: {
      keyPoints: [
        { text: "Hash function maps keys to array indices", weight: 0.25 },
        { text: "Collision handling: chaining or open addressing", weight: 0.25 },
        { text: "Good hash: uniform distribution, fast to compute, deterministic", weight: 0.25 },
        { text: "Amortized O(1) lookup, worst case O(n) with poor hash", weight: 0.25 },
      ],
      commonMisconceptions: [
        "Hash tables are always O(1)",
        "Resize happens when table is full",
      ],
    },
  },
  {
    stem: "What is the difference between unit, integration, and end-to-end tests? When do you use each?",
    difficultyA: 1.0,
    difficultyB: 0.0,
    difficultyC: 0.05,
    conceptTags: ["testing", "qa", "best-practices"],
    topicCategory: "software-engineering",
    rubric: {
      keyPoints: [
        { text: "Unit: test individual functions/classes in isolation", weight: 0.25 },
        { text: "Integration: test interaction between multiple components", weight: 0.25 },
        { text: "E2E: test full user flows through the system", weight: 0.25 },
        { text: "Testing pyramid: many unit, fewer integration, fewest E2E", weight: 0.25 },
      ],
      commonMisconceptions: [
        "E2E tests replace all other testing",
        "More coverage always means better quality",
      ],
    },
  },
  {
    stem: "Explain database indexing. When should you add an index and when shouldn't you?",
    difficultyA: 1.1,
    difficultyB: 0.1,
    difficultyC: 0.05,
    conceptTags: ["databases", "indexing", "performance"],
    topicCategory: "software-engineering",
    rubric: {
      keyPoints: [
        { text: "Index speeds up reads (WHERE, JOIN, ORDER BY) at cost of write overhead", weight: 0.25 },
        { text: "B-tree for range queries, hash index for exact matches", weight: 0.25 },
        { text: "Don't index: low-cardinality columns, small tables, write-heavy workloads", weight: 0.25 },
        { text: "Composite indexes: column order matters for query patterns", weight: 0.25 },
      ],
      commonMisconceptions: [
        "Always index every foreign key",
        "More indexes is always better",
      ],
    },
  },
  {
    stem: "What are SQL injection attacks and how do you prevent them?",
    difficultyA: 0.9,
    difficultyB: -0.3,
    difficultyC: 0.03,
    conceptTags: ["security", "sql-injection", "owasp"],
    topicCategory: "software-engineering",
    rubric: {
      keyPoints: [
        { text: "SQL injection inserts malicious SQL via user input", weight: 0.3 },
        { text: "Use parameterized queries / prepared statements", weight: 0.3 },
        { text: "Use ORM query builders as an alternative", weight: 0.2 },
        { text: "Input validation and least-privilege DB permissions as defense in depth", weight: 0.2 },
      ],
      commonMisconceptions: [
        "Input sanitization (escaping) is sufficient",
        "ORMs are immune to SQL injection",
      ],
    },
  },
  {
    stem: "Describe how you would design a CI/CD pipeline for a microservices application.",
    difficultyA: 1.4,
    difficultyB: 1.0,
    difficultyC: 0.12,
    conceptTags: ["cicd", "devops", "microservices", "deployment"],
    topicCategory: "software-engineering",
    rubric: {
      keyPoints: [
        { text: "Build stage: compile, lint, run unit/integration tests", weight: 0.2 },
        { text: "Container image build + push to registry", weight: 0.2 },
        { text: "Deploy to staging, run smoke tests", weight: 0.2 },
        { text: "Canary or blue-green deployment to production", weight: 0.2 },
        { text: "Rollback strategy and monitoring/observability hooks", weight: 0.2 },
      ],
      commonMisconceptions: [
        "CI/CD means deploying on every commit to production",
        "Manual QA gates are incompatible with CI/CD",
      ],
    },
  },
];

export default sweQuestions;
