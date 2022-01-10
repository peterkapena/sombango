
SET cloudurl="gs://sombango-e96a7.appspot.com/backup"
SET localpath="c:\\srce\\sombango"

@REM call gsutil -m rm -r %cloudurl%

call gcloud firestore export %cloudurl%

call gsutil -m cp -r %cloudurl%   %localpath%

@REM call firebase auth:export accounts.json
@REM call firebase emulators:start --import backup --export-on-exit --inspect-functions

@REM kill port 8080 = 'npx kill-port 8080'
@REM deploy functions = 'firebase deploy --only functions'
@REM deploy web app = 'npm run build' > 'firebase deploy'
