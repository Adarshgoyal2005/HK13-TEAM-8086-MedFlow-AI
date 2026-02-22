🏥 MedFlow AI: Intelligent Healthcare Queue Management
MedFlow AI is an advanced patient management system that leverages Reinforcement Learning (PPO) and Gradient Boosting (CatBoost) to optimize hospital queues and minimize patient wait times.

🚀 Key Features
AI-Optimized Booking: Multi-step appointment booking with real-time triage priority.

Dynamic Queue Reshuffling: Utilizes a PPO Reinforcement Learning agent to make "Stay", "Swap", or "Priority" decisions for the queue.

Wait-Time Prediction: Integrates a CatBoost regressor to predict consultation duration based on patient age and triage category.

Live Doctor Dashboard: Real-time visibility into the optimized queue with AI-driven priority badges.

🧠 AI Model Architecture
CatBoost Regressor: Used for predicting the consultation duration. It processes features like Age and TriageCategory to provide an accurate ETA for each patient.

PPO (Proximal Policy Optimization): A Deep Reinforcement Learning model acting as the system's "Decision Maker". It analyzes the queue state to optimize throughput and prioritize critical cases automatically.

🛠️ Tech Stack
Frontend: React.js, Tailwind CSS, Framer Motion, Lucide Icons.

Backend: FastAPI (Python), Uvicorn.

Database: MySQL (via SQLAlchemy).

AI Libraries: catboost, stable-baselines3 (PPO), pandas.
