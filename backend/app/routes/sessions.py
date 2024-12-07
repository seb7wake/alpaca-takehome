from fastapi import APIRouter, HTTPException
from app.models import Session
from datetime import datetime
from app.services.generate_summary import GenerateSummary
from pydantic import BaseModel
router = APIRouter(prefix="/sessions", tags=["sessions"])

class SummaryRequest(BaseModel):
    notes: str
    patient_name: str
    start_date: datetime
    end_date: datetime

class SessionRequest(BaseModel):
    notes: str
    ai_summary: str
    start_date: datetime
    end_date: datetime
    patient_name: str
    title: str

@router.get("/")
async def get_sessions():
    sessions = await Session.all().order_by('-start_date')
    print(sessions)
    return {"sessions": sessions}

@router.post("/generate_summary")
async def generate_summary(request: SummaryRequest):
    if not request.notes:
        raise HTTPException(status_code=400, detail="Notes are required")
    
    summary = await GenerateSummary(request.notes, request.patient_name, request.start_date, request.end_date).generate()
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
    await session.update_from_dict(request.model_dump())
    await session.save()
    return {"session": session}

@router.delete("/{id}")
async def delete_session(id: int):
    session = await Session.get(id=id)
    await session.delete()
    return {"message": "Session deleted"}