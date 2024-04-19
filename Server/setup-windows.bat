@echo off

REM Create a virtual environment
python -m venv env

REM Activate the virtual environment
call env\Scripts\activate

REM Install the requirements
pip install -r requirements.txt