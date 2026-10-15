@echo off
chcp 65001 > NUL
title CatY - Học Tiếng Anh Cùng Mèo Kỷ Luật
cd /d "%~dp0"

echo ====================================================
echo  🐱 Đang khởi động CatY English (Học Cùng Mèo Kỷ Luật)
echo  📱 Thiết kế công thái học Mobile & Desktop
echo ====================================================

start "" msedge.exe --app="http://localhost:4173" --window-size=430,860
npm run preview -- --port 4173 --host
