from datetime import datetime
import pytest

def test_get_sessions(client):
    response = client.get("/sessions")
    assert response.status_code == 200
    assert "sessions" in response.json()

def test_generate_summary(client, mocker):
    request_data = {
        "notes": "Test session notes",
        "patient_name": "John Doe",
        "start_date": datetime.now().isoformat(),
        "end_date": datetime.now().isoformat()
    }
    
    mock_generate = mocker.patch('app.services.generate_summary.GenerateSummary')
    mock_instance = mock_generate.return_value
    mock_instance.generate.return_value = "Mocked summary response"
    
    response = client.post("/sessions/generate_summary", json=request_data)
    
    mock_generate.assert_called_once_with(
        request_data["notes"],
        request_data["patient_name"],
        request_data["start_date"],
        request_data["end_date"]
    )
    mock_instance.generate.assert_called_once()
    
    assert response.status_code == 200
    assert response.json() == {"summary": "Mocked summary response"}

def test_generate_summary_no_notes(client):
    request_data = {
        "notes": "",
        "patient_name": "John Doe", 
        "start_date": datetime.now().isoformat(),
        "end_date": datetime.now().isoformat()
    }
    response = client.post("/sessions/generate_summary", json=request_data)
    assert response.status_code == 400
    assert response.json()["detail"] == "Notes are required"

def test_create_session(client):
    request_data = {
        "notes": "Test session notes",
        "ai_summary": "AI generated summary",
        "patient_name": "John Doe",
        "title": "Test Session",
        "start_date": datetime.now().isoformat(),
        "end_date": datetime.now().isoformat()
    }
    response = client.post("/sessions/create", json=request_data)
    assert response.status_code == 200
    assert "session" in response.json()
    session = response.json()["session"]
    assert session["title"] == "Test Session"
    assert session["patient_name"] == "John Doe"

def test_get_session(client):
    # First create a session
    request_data = {
        "notes": "Test session notes",
        "ai_summary": "AI generated summary",
        "patient_name": "John Doe",
        "title": "Test Session",
        "start_date": datetime.now().isoformat(),
        "end_date": datetime.now().isoformat()
    }
    create_response = client.post("/sessions/create", json=request_data)
    session_id = create_response.json()["session"]["id"]
    
    # Then get the session
    response = client.get(f"/sessions/{session_id}")
    assert response.status_code == 200
    assert "session" in response.json()
    assert response.json()["session"]["id"] == session_id

def test_update_session(client):
    # First create a session
    request_data = {
        "notes": "Test session notes",
        "ai_summary": "AI generated summary",
        "patient_name": "John Doe",
        "title": "Test Session",
        "start_date": datetime.now().isoformat(),
        "end_date": datetime.now().isoformat()
    }
    create_response = client.post("/sessions/create", json=request_data)
    session_id = create_response.json()["session"]["id"]
    
    # Update the session
    update_data = request_data.copy()
    update_data["title"] = "Updated Test Session"
    response = client.put(f"/sessions/{session_id}", json=update_data)
    assert response.status_code == 200
    assert response.json()["session"]["title"] == "Updated Test Session"

def test_delete_session(client):
    # First create a session
    request_data = {
        "notes": "Test session notes",
        "ai_summary": "AI generated summary",
        "patient_name": "John Doe",
        "title": "Test Session",
        "start_date": datetime.now().isoformat(),
        "end_date": datetime.now().isoformat()
    }
    create_response = client.post("/sessions/create", json=request_data)
    session_id = create_response.json()["session"]["id"]
    
    # Delete the session
    response = client.delete(f"/sessions/{session_id}")
    assert response.status_code == 200
    assert response.json()["message"] == "Session deleted"
    
    # Verify session is deleted
    get_response = client.get(f"/sessions/{session_id}")
    assert get_response.status_code == 404