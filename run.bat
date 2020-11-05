@echo off
:A
echo Pulling the new version..
git pull
echo Done!
echo Building app...
start build.bat
TIMEOUT 12
echo Done!
echo Starting bot...
node ./dist/src/index
goto A