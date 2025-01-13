from cryptography.fernet import Fernet

class Encryptor:
    def __init__(self, key: bytes):
        self.cipher = Fernet(key)

    def encrypt(self, data: str) -> bytes:
        return self.cipher.encrypt(data.encode())

    def decrypt(self, token: bytes) -> str:
        return self.cipher.decrypt(token).decode()
    
    def compare(self, data: str, token: bytes) -> bool:
        return self.decrypt(token) == data