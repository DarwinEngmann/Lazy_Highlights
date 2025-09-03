import bcrypt
import base64

def check_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password)

def create_token(user_id):
    return base64.urlsafe_b64encode(f"user:{user_id}".encode()).decode()
