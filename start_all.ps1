$baseDir = "a:\NEXSOFT"
$backendPort = 5000
$startedTasks = @()

$mernTasks = @(
    "06_Notes_Management_System",
    "09_Expense_Tracker_Application",
    "10_Blog_Website_with_Authentication",
    "11_Full_Stack_Ecommerce_Website",
    "12_Chat_Application_SocketIO",
    "13_Full_Stack_Task_Management_System"
)

$viteTasks = @(
    "05_Weather_App",
    "06_Notes_Management_System",
    "07_Movie_Search_Application",
    "08_Admin_Dashboard_UI",
    "09_Expense_Tracker_Application",
    "10_Blog_Website_with_Authentication",
    "11_Full_Stack_Ecommerce_Website",
    "12_Chat_Application_SocketIO",
    "13_Full_Stack_Task_Management_System"
)

foreach ($task in $mernTasks) {
    $backendDir = Join-Path $baseDir "$task\backend"
    if (Test-Path $backendDir) {
        $startedTasks += "Started: $task (Backend running on Port $backendPort)"
        $envFile = Join-Path $backendDir ".env"
        if (Test-Path $envFile) {
            (Get-Content $envFile) -replace '^PORT=.*', "PORT=$backendPort" | Set-Content $envFile
        }
        
        Start-Process powershell -ArgumentList "-NoExit -Command `"cd '$backendDir'; node server.js`"" -WindowStyle Minimized
        $backendPort++
        Start-Sleep -Milliseconds 500
    }
}

foreach ($task in $viteTasks) {
    $frontendDir = Join-Path $baseDir "$task\frontend"
    if (-not (Test-Path $frontendDir)) {
        $frontendDir = Join-Path $baseDir $task
    }
    
    if (Test-Path "$frontendDir\package.json") {
        $startedTasks += "Started: $task (Frontend Vite Server - Auto Port)"
        Start-Process powershell -ArgumentList "-NoExit -Command `"cd '$frontendDir'; npm run dev`"" -WindowStyle Minimized
        Start-Sleep -Milliseconds 500
    }
}

$startedTasks | Out-File (Join-Path $baseDir "started_tasks.txt")
Write-Output "Servers launched successfully."
