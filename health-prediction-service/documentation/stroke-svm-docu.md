# **Stroke Prediction Using SVM: A Technical Report**

### **1. Introduction**

The primary goal of this project was to develop a robust machine learning model capable of predicting the likelihood of a **stroke** based on key clinical and demographic indicators. Early prediction of heart disease risk is critical for preventative healthcare, enabling timely intervention and improved patient outcomes.

The dataset used in this study was compiled from [Stroke Prediction Dataset by fedesoriano](https://www.kaggle.com/datasets/fedesoriano/stroke-prediction-dataset/data).

---

### **2. Data Description and Preprocessing**

A comprehensive data preprocessing workflow was applied to ensure data quality and model reliability.

#### **2.1. Missing Value Analysis**

Initial exploration revealed several features with varying proportions of missing values:

| Feature        | Missing (%)  |
|----------------|--------------|
| bmi            | 3.93%        |
| sex            | 0.02%        |
| smoking_status | 30.22%       |

Due to an excessive number of missing values, the feature **`smoking_status`** was **dropped** from the dataset.
A single record containing a missing value in **`sex`** was removed to avoid ambiguity modeling.
The remaining missing values in **`bmi`** were imputed using **KNNImputer (n_neighbors=5)** to preserve data relationships and structure.

Additionally, the original column name **`gender`** was renamed to **`sex`** during preprocessing to maintain consistent naming across other models and improve standardization.

#### **2.2. Target Variable Definition**

The dataset’s column `stroke` represents disease presence (1) or absence (0).

### **3. Model Training and Evaluation**

Multiple machine learning models were evaluated using cross-validation to determine the most effective approach for stroke prediction. The following results summarize their average cross-validation performance.

Because the dataset is highly imbalanced (stroke cases are rare), **SMOTE oversampling** was applied during training to improve minority-class representation and prevent models from biasing toward the majority class.

In addition, **recall** was chosen as the primary evaluation metric, since correctly identifying stroke cases is more critical than minimizing false positives.
This makes recall a more appropriate measure than accuracy for assessing real-world model performance under class imbalance.

| Model | CV recall (Mean ± Std) |
|--------|---------------------------|
| **SVM** | **0.7841 ± 0.0398** |
| Logistic Regression | 0.7790 ± 0.0285 |
| K-Nearest Neighbors | 0.2912 ± 0.0317 |
| AdaBoost | 0.1756 ± 0.0565 |
| Gradient Boosting | 0.0806 ± 0.0375 |
| Random Forest | 0.0753 ± 0.0221 |
| Extra Trees | 0.0753 ± 0.0221 |

Among all tested models, **Support Vector Machine (SVM)** and **Logistic Regression** demonstrated the strongest performance, significantly outperforming other algorithms.
Between them, **SVM** achieved the highest cross-validated recall score, making it the preferred model for detecting stroke cases.

**Logistic Regression** also showed competitive performance and was retained as a strong secondary baseline model.

---

### **4. Feature Selection**


**Model Features:**

1. `sex`  
2. `age`  
3. `hypertension`  
4. `heart_disease`  
5. `work_type`  
6. `avg_glucose_level`  
7. `bmi`  

---

### **5. Model Performance**

After training the SVM model, a custom decision threshold adjustment was applied to better balance recall and precision. The following results were obtained:

| Metric | Value |
|---------|--------|
| Accuracy | **0.8356** |
| ROC AUC | **0.7998** |

**Classification Report:**

| Class | Precision | Recall | F1-score | Support |
|--------|------------|---------|-----------|----------|
| No Disease | 0.99 | 0.84 | 0.91 | 972 |
| Disease | 0.20 | 0.76 | 0.31 | 50 |
| **Accuracy** | | | **0.84**  | 1022 |
| **Macro Avg** | **0.59** | **0.80** | **0.61** | 1022 |
| **Weighted Avg** | **0.95** | **0.84** | **0.88** | 1022 |

**Confusion Matrix:**

![Figure 1: Confusion Matrix](./plots/conf_matrix_stroke.png)

**Figure 1. Confusion Matrix:** This matrix visualizes the performance of the final model on the test set.

![Figure 2: Precision-Recall Curve](./plots/precision_recall_stroke.png)

**Figure 2. Precision-Recall Curve:**

---

### **6. Technical Summary of the Saved Model**

The trained model was serialized and saved as a `pickle` file for future deployment.

**File:** `stroke-svm_model.pkl`

**Expected Input:**  
The model expects eight numerical input values corresponding to the following features:

1. `age`:  [integer] age in years 
2. `sex`:  [integer] (1 = male; 0 = female) 
3. `hypertension`:  [integer] (0, 1)
4. `heart_disease`:  [integer] (0, 1)
5. `work_type`:  [integer] (0 = 'Private'; 1 = 'Self-employed'; 2 = 'Govt_job'; 3 = 'children'; 4 = 'Never_worked')
6. `avg_glucose_level`:  [integer] Average glucose level in blood
7. `bmi`:  [float]

**Output:**  
- `0`: No stroke predicted.
- `1`: Stroke predicted.
- The `predict_proba()` method can be used to obtain probability estimates for each class.

---

### **8. Conclusion**

This project successfully developed an effective machine learning framework for stroke risk prediction. 

Through careful preprocessing, missing-data handling, class-imbalance correction with SMOTE, and comparative evaluation across multiple algorithms, SVM emerged as the best-performing model. Because stroke cases are rare, recall was prioritized to maximize the detection of high-risk patients. Additional threshold tuning further improved sensitivity while maintaining acceptable precision.

The final SVM-based pipeline demonstrated strong performance, achieving high recall and robust discrimination, making it suitable for use as a clinical decision-support component.

Overall, the resulting framework provides a foundation for early stroke-risk screening and can be further integrated into early detection support systems.