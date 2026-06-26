@echo off
chcp 65001 > nul
echo ===================================================
echo   Restauration de l'historique des conversations
echo ===================================================
echo.
echo IMPORTANT : Veuillez FERMER completement l'application
echo Antigravity avant de continuer (fermez cette fenetre).
echo.
pause
echo.
echo Restauration de l'index de l'historique en cours...
copy /Y "C:\Users\lcbouchard\.gemini\antigravity\agyhub_summaries_proto.pb.merged" "C:\Users\lcbouchard\.gemini\antigravity\agyhub_summaries_proto.pb"
copy /Y "C:\Users\lcbouchard\.gemini\antigravity\agyhub_summaries_proto.pb.merged" "C:\Users\lcbouchard\.gemini\antigravity\agyhub_summaries_proto.pb.bak"
echo.
echo C'est fait ! Vous pouvez maintenant rouvrir Antigravity.
echo.
pause
