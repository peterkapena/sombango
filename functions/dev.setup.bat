
SET cloudurl="gs://sombango-e96a7.appspot.com/backup"
SET localpath="c:\\srce\\sombango\\functions"

@REM call gsutil -m rm -r %cloudurl%

@REM call gcloud firestore export %cloudurl%

call gsutil -m cp -r %cloudurl%   %localpath%

@REM call firebase auth:export accounts.json

@REM call cd ./functions 
@REM call npm run build:watch 
@REM call cd .. 

@REM call firebase emulators:start --import backup --export-on-exit backup

@REM kill port 8080 = 'npx kill-port 8080'
@REM deploy functions = 'firebase deploy --only functions'
@REM deploy web app = 'npm run build' > 'firebase deploy'

