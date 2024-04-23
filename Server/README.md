# Server Backend

This folder contains the python backend to handle the API. The python is using the FastAPI framework to handle all incoming API requests. The Backend uses MongoDB as 
the database.

# Requirements

- python 3.10 or greater

# Dev Setup

While in the Server folder, run the following command to setup the virtual python environment:

```bash
python3 -m venv env
```

Then activate the venv with either of the following commands depending on your shell:

**Bash Shell**
```bash
source env/bin/activate
```
**Fish Shell**
```bash
source env/bin/activate.fish
```

Now we need to install our pip requirements:
```bash
pip3 install -r requirements.txt
```

Or, you can just run the `setup.sh`(Linux) or `setup-windows.bat`(Windows) script at the root of the `Server` folder, and it will run the commands for you!

# Start the server

``` bash
uvicorn app.main:app --reload
```