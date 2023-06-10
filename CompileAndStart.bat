cd Frontend
call npm run build
del /F /Q "..\Backend\public\*"
robocopy /E /move "build" "..\Backend\public"
cd ..
cd "Backend"
start "" "http://localhost:5000/"
node server.js

@echo off
if %ERRORLEVEL% neq 0 (
echo [BATCH][[[An error occurred in the Python script.]]] 
pause
)

