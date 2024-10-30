import argparse
import requests
import json

def authenticate(base_url, username, password):
    url = f"{base_url}/admin/login"
    data = {
        "username": username,
        "password": password
    }
    response = requests.post(url, data=data)
    if response.status_code == 200:
        return response.json()["access_token"]
    else:
        raise Exception("Authentication failed")

def ensure_users_exist(base_url, token, users):
    headers = {
        "Authorization": f"Bearer {token}"
    }
    # for user in users:
        # Check if user exists
    response = requests.get(f"{base_url}/admin/guest/test_testing", headers=headers)
    print(response)
        # if response.status_code == 404:
        #     # Create user if not exists
        #     response = requests.post(f"{base_url}/admin/users", headers=headers, json=user)
        #     if response.status_code != 201:
        #         print(f"Failed to create user {user['username']}: {response.text}")
        #     else:
        #         print(f"User {user['username']} created successfully")
        # else:
        #     print(f"User {user['username']} already exists")

def main():
    parser = argparse.ArgumentParser(description="Manage admin endpoints")
    parser.add_argument("--base-url", help="Base URL of the admin API", default="http://localhost:8000")
    parser.add_argument("--auth-file", help="File containing username and password for authentication", default="auth.json")
    parser.add_argument("--users-file", help="File containing list of users to ensure exist on the server", default="users.json")

    args = parser.parse_args()

    with open(args.auth_file, "r") as f:
        auth_data = json.load(f)
        username = auth_data["username"]
        password = auth_data["password"]

    # with open(args.users_file, "r") as f:
    #     users = json.load(f)

    token = authenticate(args.base_url, username, password)
    ensure_users_exist(args.base_url, token, None)

if __name__ == "__main__":
    main()