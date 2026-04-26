# Student Performance Prediction System 🎓

A full-stack MERN application integrated with a Python-based Machine Learning microservice to predict student academic performance (Grades and Scores) based on various academic and lifestyle features.

---

## 📁 Project Structure

```text
SEPM_PROJECT/
├── backend/                # Node.js + Express API Gateway
│   ├── config/             # Database connection settings
│   ├── controllers/        # Business logic for predictions & auth
│   ├── middleware/         # JWT Authentication & Route protection
│   ├── models/             # Mongoose schemas (User, Prediction)
│   ├── routes/             # API Endpoint definitions
│   └── server.js           # Server entry point
├── frontend/               # React + Vite + Tailwind CSS UI
│   ├── public/             # Static assets & ML Result images
│   ├── src/
│   │   ├── components/     # Reusable UI components (Form, ResultCard)
│   │   ├── pages/          # Page layouts (Dashboard, Login)
│   │   └── services/       # API integration logic (Axios)
├── ml_service/             # Python Flask ML Microservice
│   ├── app.py              # Flask server & Model inference logic
│   └── requirements.txt    # Python dependencies
├── ml_results/             # Trained Models (.pkl) and Visualization outputs (PNGs, CSVs)
```

---

## 🚀 Features

- **Performance Prediction**: Predicts letter grades (A, B, C, D, F) and numeric scores using Random Forest models.
- **ML Insights Dashboard**: Visualizes Feature Importance, Confusion Matrices, and Residual Plots.
- **Microservice Architecture**: Decouples the MERN stack from the Python ML environment for scalability.
- **Robustness**: Backend is designed to handle database outages gracefully, ensuring predictions are always available.
- **Modern UI**: Dark-themed dashboard with glassmorphism and real-time feedback.

---

## 📈 Machine Learning Performance & Metrics

Our predictive models are trained on a robust synthetic dataset of 10,000 student records simulating realistic bounds and correlations.

### 📊 Model Metrics

| Model | Task | Accuracy / R² Score | Mean Absolute Error (MAE) |
|---|---|---|---|
| **XGBoost Classifier** | Grade Prediction | **88.1%** | N/A |
| **Random Forest Classifier** | Grade Prediction | 86.3% | N/A |
| **XGBoost Regressor** | Score Prediction | **0.95 (R²)** | **1.71** |
| **Random Forest Regressor** | Score Prediction | 0.92 (R²) | 2.06 |

### 🧠 Visual Insights

#### Feature Correlations & Importance
Understanding how different features (like attendance and study hours) correlate with academic performance:

![Correlation Heatmap](ml_results/correlation_heatmap.png)
![Feature Importance](ml_results/feature_importance.png)

#### Prediction Accuracy
Visualizing the accuracy and residuals of our models:

![Actual vs Predicted](ml_results/actual_vs_predicted.png)
![Confusion Matrix](ml_results/confusion_matrix.png)

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose.
- **ML Service**: Python, Flask, Pandas, Scikit-Learn, Joblib.
- **Models**: Random Forest (Classification & Regression).

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js & npm
- Python 3.10+
- MongoDB (Local or Atlas)

### 1. ML Service Setup
```bash
cd ml_service
pip install -r requirements.txt
python app.py
```
*Service will run on `http://127.0.0.1:5001`*

### 2. Backend Setup
Update `backend/.env` with your `MONGO_URI`.
```bash
cd backend
npm install
npm run dev
```
*Server will run on `http://localhost:5000`*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Dashboard will be accessible at `http://localhost:5173` (or check console for port).*

---

## 📊 System Diagrams (Visual Charts)

### 1. DFD Level-0 (Context Diagram)
Describes the external entities and the high-level data flow.

```mermaid
graph LR
    User((User/Student)) -- "Student Data & Credentials" --> System[Student Performance Prediction System]
    System -- "Predicted Grade & Score" --> User
    System -- "Analytics & Visualizations" --> User
```

### 2. System Architecture
Visualizes the physical components and their interactions.

```mermaid
graph TD
    subgraph "Frontend (React)"
        A[User Dashboard] --> B[Axios API Client]
    end

    subgraph "Backend Gateway (Node.js)"
        B --> C[Express API]
        C --> D[JWT Middleware]
    end

    subgraph "ML Microservice (Flask)"
        C --> E[Inference Engine]
        E --> F[RF Models .pkl]
    end

    subgraph "Storage"
        C --> G[(MongoDB)]
    end

    style A fill:#4f46e5,stroke:#fff,color:#fff
    style C fill:#0891b2,stroke:#fff,color:#fff
    style E fill:#7c3aed,stroke:#fff,color:#fff
    style G fill:#10b981,stroke:#fff,color:#fff
```

### 3. Object Diagram
Visualizes the runtime instances of objects within the system.

```mermaid
graph TD
    subgraph "Runtime Objects"
        U1["<u>user:User</u><br/>name='John Doe'<br/>email='john@example.com'"]
        
        P1["<u>p1:Prediction</u><br/>grade='A'<br/>score=92.5"]
        
        P2["<u>p2:Prediction</u><br/>grade='B'<br/>score=84.2"]
        
        U1 --> P1
        U1 --> P2
    end
```

### 4. DFD Level-1 (Process Decomposition)
Breaks down the system into detailed functional processes.

```mermaid
graph TD
    User((User))
    
    subgraph "Process 1.0: Auth Service"
        P1[1.1 Verify Credentials]
        P2[1.2 Session Management]
    end
    
    subgraph "Process 2.0: Prediction Engine"
        P3[2.1 Data Validation]
        P4[2.2 Feature Encoding]
        P5[2.3 ML Inference]
    end
    
    subgraph "Process 3.0: Data Management"
        P6[3.1 Result Persistence]
        P7[3.2 History Retrieval]
    end
    
    D1[(User DB)]
    D2[(Prediction DB)]
    ML{Flask ML Service}

    User -->|Credentials| P1
    P1 <--> D1
    P1 --> P2
    
    User -->|Student Data| P3
    P3 --> P4
    P4 --> P5
    P5 <--> ML
    
    P5 --> P6
    P6 --> D2
    
    User -->|Request History| P7
    P7 <--> D2
```

### 5. Use Case Diagram
Defines the interactions between actors and the system.

```mermaid
graph LR
    Student((Student))
    Admin((Admin))

    subgraph "Student Performance System"
        UC1(Register/Login)
        UC2(Input Academic Data)
        UC3(Predict Grade & Score)
        UC4(View Performance Dashboard)
        UC5(Download Result Report)
        UC6(System Monitoring)
        UC7(User Management)
    end

    Student --- UC1
    Student --- UC2
    Student --- UC3
    Student --- UC4
    Student --- UC5
    
    Admin --- UC1
    Admin --- UC6
    Admin --- UC7
    Admin --- UC4
```

### 6. UML Class Diagram
Represents the static structure and relationships of system classes.

```mermaid
classDiagram
    class User {
        +String id
        +String name
        +String email
        +String password
        +register()
        +login()
        +getProfile()
    }

    class Prediction {
        +String id
        +ObjectId userId
        +Object inputs
        +String prediction
        +Number score
        +save()
        +static findByUserId()
    }

    class AuthController {
        +registerUser(req, res)
        +loginUser(req, res)
    }

    class PredictionController {
        +makePrediction(req, res)
        +getPredictionHistory(req, res)
    }

    class MLService {
        +predictGrade(data)
        +predictScore(data)
    }

    User "1" -- "0..*" Prediction : makes
    AuthController ..> User : manages
    PredictionController ..> Prediction : manages
    PredictionController ..> MLService : calls
```

### 7. Sequence Diagram (Prediction Flow)
```mermaid
sequenceDiagram
    participant U as User
    participant FE as React Frontend
    participant BE as Node Backend
    participant ML as Flask ML Service
    participant DB as MongoDB

    U->>FE: Fills Form Data
    FE->>BE: POST /api/predict
    BE->>ML: POST /predict-grade (JSON)
    Note over ML: Preprocess & One-Hot Encode
    ML-->>BE: Return Grade & Score
    BE->>DB: Save Record (Async)
    BE-->>FE: Return Combined Data
    FE-->>U: Show ResultCard (Grade/Score)
```

### 8. Entity Relationship Diagram (ERD)
```mermaid
erDiagram
    USER ||--o{ PREDICTION : "makes"
    USER {
        string id PK
        string name
        string email
        string password
    }
    PREDICTION {
        string id PK
        string userId FK
        json inputs
        string prediction
        float score
        datetime createdAt
    }
```

### 9. Activity Diagram (User Workflow)
```mermaid
stateDiagram-v2
    [*] --> Login
    Login --> Dashboard: Success
    Dashboard --> FillForm: User Inputs Data
    FillForm --> Validation: Submit
    Validation --> ML_Service: Valid
    Validation --> FillForm: Error
    ML_Service --> DisplayResult: Result Received
    DisplayResult --> Dashboard: Done
```

---

## 📖 Data Dictionary

Comprehensive list of data elements used in the system.

### Table: User
| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Full name of the student. |
| `email` | String | Unique email address used for login. |
| `password` | String | Hashed password for authentication. |
| `createdAt` | DateTime | Timestamp of account creation. |

### Table: Prediction
| Field | Type | Description |
| :--- | :--- | :--- |
| `userId` | ObjectId | Reference to the owner (User model). |
| `inputs.internals` | Number | Internal marks out of 30. |
| `inputs.assignments`| Number | Assignment marks out of 10. |
| `inputs.viva` | Number | Viva marks out of 20. |
| `inputs.lab_marks` | Number | Laboratory marks out of 30. |
| `inputs.attendance` | Number | Attendance percentage (0-100). |
| `inputs.study_hours`| Number | Hours spent studying per day. |
| `inputs.branch` | String | Student's branch (CSE, ECE, etc.). |
| `prediction` | String | Predicted letter grade (A, B, C, D, F). |
| `score` | Number | Predicted numeric score (0-100). |
| `createdAt` | DateTime | Timestamp when prediction was made. |

---

## 🎯 Evaluation & Viva Tips

### Most Important Diagrams for Evaluation
1.  **System Architecture**: Crucial to show how you integrated MERN with Python.
2.  **Sequence Diagram**: Explains the logic flow across different servers.
3.  **ER Diagram**: Shows you understand structured data storage in NoSQL.

### Viva Presentation Tips
- **Explain the "Why"**: When asked about the Python microservice, explain that Node.js cannot natively run `.pkl` models efficiently, so you used a dedicated Flask service for better performance.
- **Robustness**: Mention that you implemented error handling so the frontend works even if the database is temporarily offline.
- **Preprocessing**: Be ready to explain how you handled the **One-Hot Encoding** for the "Branch" feature in the Python script.
- **Model Choice**: Know that you used **Random Forest** because it handles non-linear academic data relationships better than simple Linear Regression.