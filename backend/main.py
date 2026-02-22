from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from catboost import CatBoostRegressor
from stable_baselines3 import PPO

app = FastAPI()

# 1. CORS Setup (React se connect karne ke liye)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Database Connection (MySQL)
DATABASE_URL = "mysql+pymysql://root:root@root@localhost/data" # Apna password badlo
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

from fastapi import FastAPI
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

app = FastAPI() # Ensure this is here
Base = declarative_base()

class Patient(Base):
    __tablename__ = "patients"
    # Dhyan se dekho: primary_key=True (chote letters aur underscore)
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    age = Column(Integer)
    department = Column(String(50))
    priority = Column(String(20))
    predicted_wait = Column(Float)
Base.metadata.create_all(bind=engine)

# 3. Load AI Models
cat_model = CatBoostRegressor().load_model("models/catboost_predictor.cbm") # Consultation Time
rl_model = PPO.load("models/hospital_scheduler_rl") # Decision Maker

# 4. Data Schemas
class BookingRequest(BaseModel):
    name: str
    age: int
    department: str
    priority: str

# 5. API Endpoints

@app.post("/book")
async def book_appointment(req: BookingRequest):
    # A. CatBoost Prediction
    # Model ko features chahiye: Age, Priority (mapped to numeric), etc.
    input_data = pd.DataFrame([{
        "Age": req.age, 
        "TriageCategory": 1 if req.priority == "Urgent" else 0,
        "FacilityOccupancyRate": 0.7, # Example static value
        "ProvidersOnShift": 5
    }])
    
    wait_time_pred = cat_model.predict(input_data)[0] # Predicted consultation duration

    # B. Save to MySQL
    db = SessionLocal()
    new_patient = Patient(
        name=req.name,
        age=req.age,
        department=req.department,
        priority=req.priority,
        predicted_wait=round(wait_time_pred, 2)
    )
    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)
    db.close()

    return {
        "status": "Success",
        "predicted_wait": round(wait_time_pred, 2),
        "message": f"Appointment booked for {req.name}"
    }

@app.get("/optimize/{dept}")
async def optimize_queue(dept: str):
    # C. RL Agent Logic
    # Yahan RL model queue scan karega aur swap/priority action lega
    # Abhi ke liye hum simple action return kar rahe hain jo RL agent suggest karega
    
    # Example RL Action Call:
    # action, _ = rl_model.predict(current_queue_state)
    
    return {
        "department": dept,
        "action": "Swap", # RL ne bola swap karo
        "notification": "✨ AI Optimized: Your wait time reduced!"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)