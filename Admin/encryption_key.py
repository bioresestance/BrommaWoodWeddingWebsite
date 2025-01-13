# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "cryptography",
# ]
# ///
from cryptography.fernet import Fernet

def main() -> None:
    key = Fernet.generate_key()
    print(f"Key: {key.decode()}")


if __name__ == "__main__":
    main()
