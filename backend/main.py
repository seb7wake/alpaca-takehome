from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tortoise.contrib.fastapi import register_tortoise
from routes import sessions

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def health_check():
    return {"status": "healthy"}

app.include_router(sessions.router)
register_tortoise(
    app,
    db_url='sqlite://db.sqlite3',  # or 'postgres://user:pass@localhost:5432/mydb'
    modules={'models': ['models']},
    generate_schemas=True,  # Automatically generate tables
    add_exception_handlers=True,
)