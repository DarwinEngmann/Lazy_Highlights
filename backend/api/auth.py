from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from core.db import get_db
from core.security import check_password, create_token

router = APIRouter()

@router.post("/login")
def login(credentials: OAuth2PasswordRequestForm = Depends()):
    db = get_db()
    user = db.execute(
        "SELECT * FROM users WHERE username = ?", (credentials.username,)
    ).fetchone()

    if not user or not check_password(credentials.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"token": create_token(user["id"]), "theme": user["theme"]}
