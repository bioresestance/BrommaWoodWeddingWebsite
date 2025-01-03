# Admin Tools

This folder contains tools to access the admin api on the website.

# Usage

Create Authentication File: auth.json

```json
{
  "username": "admin",
  "password": "admin_password"
}
```

Create Users File: users.json

```json
[
  { "username": "Test_Testing", "code": "1234567890", "plus_one": false },
  { "username": "Testing_Testing", "code": "2345678901", "plus_one": false }
]
```

Run the Script:

```sh
python3 manage_users.py
```
