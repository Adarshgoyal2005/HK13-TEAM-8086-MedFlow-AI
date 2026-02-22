🏥 MedFlow AI: Smart Healthcare Queue Management
MedFlow AI ek advanced patient management system hai jo Reinforcement Learning (PPO) aur Gradient Boosting (CatBoost) ka use karke hospital queues ko optimize karta hai aur patient wait-time ko reduce karta hai.

🚀 Key Features
AI-Driven Appointment Booking: Patient details ke sath priority-based booking.

Dynamic Queue Optimization: RL Agent (PPO) use karke real-time mein queue ko reshuffle karna (Stay, Swap, or Priority).

Wait-Time Prediction: CatBoost model patient ki age aur triage category ke basis par consultation time predict karta hai.

Doctor Dashboard: Real-time visibility of AI-optimized queue and patient priority badges.

🧠 AI Models Used
CatBoost Regressor: Consultation duration predict karne ke liye. Ise Age aur TriageCategory jaise features par train kiya gaya hai.

PPO (Proximal Policy Optimization): Ek Deep Reinforcement Learning agent jo hospital ki efficiency badhane ke liye optimal scheduling decisions leta hai.

🛠️ Tech Stack
Frontend: React.js, Tailwind CSS, Lucide Icons, Framer Motion.

Backend: FastAPI (Python), Uvicorn.

Database: MySQL (XAMPP).

Libraries: catboost, stable-baselines3, sqlalchemy, axios.
