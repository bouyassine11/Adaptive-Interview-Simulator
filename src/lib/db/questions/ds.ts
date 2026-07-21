import type { Question } from "../../types";

const dsQuestions: Omit<Question, "id">[] = [
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
        { text: "Tradeoff: reducing one tends to increase the other", weight: 0.25 },
        { text: "How to diagnose (learning curves) and mitigate both", weight: 0.25 },
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
        { text: "Resampling: SMOTE, undersampling, class weights in loss function", weight: 0.3 },
        { text: "Algorithm choices: tree-based models handle imbalance better", weight: 0.2 },
        { text: "Threshold tuning on probability outputs", weight: 0.2 },
      ],
      commonMisconceptions: [
        "Accuracy is always the right metric",
        "SMOTE always helps without side effects",
      ],
    },
  },
  {
    stem: "Explain the difference between L1 and L2 regularization. When do you use each?",
    difficultyA: 1.1,
    difficultyB: 0.4,
    difficultyC: 0.08,
    conceptTags: ["regularization", "lasso", "ridge", "ml-fundamentals"],
    topicCategory: "data-science",
    rubric: {
      keyPoints: [
        { text: "L1 (Lasso): adds absolute value penalty, produces sparse models (feature selection)", weight: 0.3 },
        { text: "L2 (Ridge): adds squared penalty, shrinks coefficients toward zero", weight: 0.3 },
        { text: "L1: good when many features are irrelevant", weight: 0.2 },
        { text: "L2: good when all features are somewhat relevant", weight: 0.2 },
      ],
      commonMisconceptions: [
        "L1 always performs better than L2",
        "Regularization makes models more complex",
      ],
    },
  },
  {
    stem: "How does gradient descent work? Compare batch, mini-batch, and stochastic variants.",
    difficultyA: 1.0,
    difficultyB: 0.0,
    difficultyC: 0.08,
    conceptTags: ["optimization", "gradient-descent", "ml-fundamentals"],
    topicCategory: "data-science",
    rubric: {
      keyPoints: [
        { text: "Gradient descent minimizes loss by updating weights in the negative gradient direction", weight: 0.3 },
        { text: "Batch GD: uses entire dataset per update (stable but slow)", weight: 0.2 },
        { text: "SGD: uses one sample per update (noisy but fast, can escape local minima)", weight: 0.2 },
        { text: "Mini-batch: compromise between the two (most common in practice)", weight: 0.3 },
      ],
      commonMisconceptions: [
        "SGD always converges faster than batch GD",
        "Learning rate is the only hyperparameter that matters",
      ],
    },
  },
  {
    stem: "Explain A/B testing. How do you determine sample size and significance?",
    difficultyA: 1.2,
    difficultyB: 0.3,
    difficultyC: 0.08,
    conceptTags: ["ab-testing", "statistics", "experimentation"],
    topicCategory: "data-science",
    rubric: {
      keyPoints: [
        { text: "A/B test: randomly assign users to control vs treatment", weight: 0.25 },
        { text: "Null hypothesis testing, p-value, statistical significance (alpha = 0.05)", weight: 0.25 },
        { text: "Sample size depends on: effect size, power (0.8+), significance level", weight: 0.25 },
        { text: "Common pitfalls: peeking, multiple comparisons, novelty effect", weight: 0.25 },
      ],
      commonMisconceptions: [
        "P-value < 0.05 proves the effect is real",
        "Bigger sample size always means better test",
      ],
    },
  },
  {
    stem: "What is feature engineering? Give 5 examples of techniques and when you'd use each.",
    difficultyA: 1.1,
    difficultyB: 0.2,
    difficultyC: 0.05,
    conceptTags: ["feature-engineering", "preprocessing", "ml-fundamentals"],
    topicCategory: "data-science",
    rubric: {
      keyPoints: [
        { text: "One-hot encoding for categorical variables", weight: 0.2 },
        { text: "Scaling/normalization for distance-based models", weight: 0.2 },
        { text: "Log transform for skewed features", weight: 0.2 },
        { text: "Interaction features to capture non-linear relationships", weight: 0.2 },
        { text: "Domain-specific features (e.g., day-of-week from timestamp)", weight: 0.2 },
      ],
      commonMisconceptions: [
        "Feature engineering is only needed for traditional ML, not deep learning",
        "Always normalize features regardless of the model",
      ],
    },
  },
  {
    stem: "Explain precision vs recall vs F1. When do you optimize for each?",
    difficultyA: 0.9,
    difficultyB: -0.3,
    difficultyC: 0.05,
    conceptTags: ["evaluation-metrics", "precision", "recall", "f1"],
    topicCategory: "data-science",
    rubric: {
      keyPoints: [
        { text: "Precision: TP / (TP + FP) — of predicted positives, how many are correct", weight: 0.25 },
        { text: "Recall: TP / (TP + FN) — of actual positives, how many did we catch", weight: 0.25 },
        { text: "F1: harmonic mean of precision and recall", weight: 0.25 },
        { text: "High precision: spam filter (avoid false positives). High recall: cancer detection (avoid false negatives)", weight: 0.25 },
      ],
      commonMisconceptions: [
        "F1 is always better than accuracy",
        "Precision and recall always conflict",
      ],
    },
  },
  {
    stem: "What is cross-validation? Why not just use a single train/test split?",
    difficultyA: 0.8,
    difficultyB: -0.5,
    difficultyC: 0.03,
    conceptTags: ["cross-validation", "model-evaluation", "ml-fundamentals"],
    topicCategory: "data-science",
    rubric: {
      keyPoints: [
        { text: "K-fold cross-validation: split data into K folds, train on K-1, validate on 1, rotate", weight: 0.3 },
        { text: "Reduces variance in performance estimate vs single split", weight: 0.3 },
        { text: "Stratified folds maintain class distribution", weight: 0.2 },
        { text: "Leave-one-out and time-series split as special cases", weight: 0.2 },
      ],
      commonMisconceptions: [
        "More folds are always better",
        "Cross-validation can replace a held-out test set",
      ],
    },
  },
  {
    stem: "How does a random forest work? Why is it often a strong baseline?",
    difficultyA: 1.0,
    difficultyB: 0.1,
    difficultyC: 0.05,
    conceptTags: ["random-forest", "ensemble", "tree-models"],
    topicCategory: "data-science",
    rubric: {
      keyPoints: [
        { text: "Ensemble of decision trees trained on random subsets of data and features", weight: 0.3 },
        { text: "Bagging reduces variance, feature randomness reduces correlation between trees", weight: 0.3 },
        { text: "Strong baseline: handles non-linearity, robust to outliers, minimal preprocessing", weight: 0.2 },
        { text: "Out-of-bag score as free validation estimate", weight: 0.2 },
      ],
      commonMisconceptions: [
        "Random forest is always the best model",
        "More trees always improves accuracy",
      ],
    },
  },
  {
    stem: "Explain PCA (Principal Component Analysis). What assumptions does it make?",
    difficultyA: 1.3,
    difficultyB: 0.6,
    difficultyC: 0.1,
    conceptTags: ["pca", "dimensionality-reduction", "statistics"],
    topicCategory: "data-science",
    rubric: {
      keyPoints: [
        { text: "PCA finds orthogonal directions of maximum variance in data", weight: 0.25 },
        { text: "Assumes linear relationships between variables", weight: 0.25 },
        { text: "Features must be standardized (mean-centered, unit variance)", weight: 0.25 },
        { text: "Explained variance ratio helps choose number of components", weight: 0.25 },
      ],
      commonMisconceptions: [
        "PCA works on categorical data",
        "PCA reduces the number of features without losing information",
      ],
    },
  },
];

export default dsQuestions;
