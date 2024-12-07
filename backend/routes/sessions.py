from fastapi import APIRouter, HTTPException
from models import Session
from datetime import datetime
from services.generate_summary import GenerateSummary
from pydantic import BaseModel
router = APIRouter(prefix="/sessions", tags=["sessions"])

class SummaryRequest(BaseModel):
    notes: str

class SessionRequest(BaseModel):
    notes: str
    ai_summary: str
    start_date: datetime
    end_date: datetime
    patient_name: str
    title: str

@router.get("/")
async def get_sessions():
    sessions = await Session.all()
    print(sessions)
    return {"sessions": sessions}

@router.post("/generate_summary")
async def generate_summary(request: SummaryRequest):
    if not request.notes:
        raise HTTPException(status_code=400, detail="Notes are required")
    
    summary = await GenerateSummary(request.notes).generate()
    print(summary)
    return {"summary": summary}

@router.post("/create")
async def create_session(request: SessionRequest):
    session = await Session.create(**request.model_dump())
    return {"session": session}

@router.get("/{id}")
async def get_session(id: int):
    session = await Session.get(id=id)
    return {"session": session}

@router.put("/{id}")
async def update_session(id: int, request: SessionRequest):
    session = await Session.get(id=id)
    print(request.model_dump())
    await session.update_from_dict(request.model_dump())
    return {"session": session}

@router.delete("/{id}")
async def delete_session(id: int):
    session = await Session.get(id=id)
    await session.delete()
    return {"message": "Session deleted"}