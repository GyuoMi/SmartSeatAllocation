Write-Host "🚀 Starting MzansiBuilds Hackathon Setup..." -ForegroundColor Cyan

# ==========================================
# 1. Root Monorepo Setup
# ==========================================
Write-Host "📦 Initialising root directory..."
npm init -y | Out-Null
npm install concurrently --save-dev

# ==========================================
# 2. Backend Setup (Express + SQLite)
# ==========================================
Write-Host "⚙️ Setting up Express backend..."
if (!(Test-Path "backend")) { New-Item -ItemType Directory -Path "backend" | Out-Null }
Set-Location backend
npm init -y | Out-Null
npm install express cors better-sqlite3
npm install nodemon --save-dev

New-Item server.js, seed.js -ItemType File -Force | Out-Null
Set-Location ..

# ==========================================
# 3. Frontend Setup (React + Vite)
# ==========================================
Write-Host "🎨 Setting up React frontend with Vite..."
npm create vite@latest frontend -- --template react --yes
Set-Location frontend
npm install

Write-Host "💅 Configuring Tailwind CSS..."
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Safely write Tailwind config line-by-line using literal single quotes
New-Item -ItemType File -Force -Path "tailwind.config.js" | Out-Null
Add-Content -Path 'tailwind.config.js' -Value '/** @type {import("tailwindcss").Config} */'
Add-Content -Path 'tailwind.config.js' -Value 'export default {'
Add-Content -Path 'tailwind.config.js' -Value '  content: ['
Add-Content -Path 'tailwind.config.js' -Value '    "./index.html",'
Add-Content -Path 'tailwind.config.js' -Value '    "./src/**/*.{js,ts,jsx,tsx}",'
Add-Content -Path 'tailwind.config.js' -Value '  ],'
Add-Content -Path 'tailwind.config.js' -Value '  theme: {'
Add-Content -Path 'tailwind.config.js' -Value '    extend: {},'
Add-Content -Path 'tailwind.config.js' -Value '  },'
Add-Content -Path 'tailwind.config.js' -Value '  plugins: [],'
Add-Content -Path 'tailwind.config.js' -Value '}'

# Safely write Tailwind CSS directives line-by-line
New-Item -ItemType File -Force -Path "src/index.css" | Out-Null
Add-Content -Path 'src/index.css' -Value '@tailwind base;'
Add-Content -Path 'src/index.css' -Value '@tailwind components;'
Add-Content -Path 'src/index.css' -Value '@tailwind utilities;'

Set-Location ..

# ==========================================
# 4. Root Package.json Scripts (Native PS JSON)
# ==========================================
Write-Host "🔗 Wiring up monorepo scripts safely..."

$rootPkgPath = "package.json"
$rootPkg = Get-Content $rootPkgPath -Raw | ConvertFrom-Json
if ($null -eq $rootPkg.scripts) {
    $rootPkg | Add-Member -NotePropertyName "scripts" -NotePropertyValue (New-Object PSObject)
}
$rootPkg.scripts | Add-Member -NotePropertyName "start" -NotePropertyValue "concurrently `"npm run server --prefix backend`" `"npm run dev --prefix frontend`"" -Force
$rootPkg.scripts | Add-Member -NotePropertyName "install:all" -NotePropertyValue "npm install && npm install --prefix backend && npm install --prefix frontend" -Force
$rootPkg | ConvertTo-Json -Depth 10 | Set-Content $rootPkgPath

$backendPkgPath = "backend/package.json"
$backendPkg = Get-Content $backendPkgPath -Raw | ConvertFrom-Json
if ($null -eq $backendPkg.scripts) {
    $backendPkg | Add-Member -NotePropertyName "scripts" -NotePropertyValue (New-Object PSObject)
}
$backendPkg.scripts | Add-Member -NotePropertyName "server" -NotePropertyValue "nodemon server.js" -Force
$backendPkg.scripts | Add-Member -NotePropertyName "seed" -NotePropertyValue "node seed.js" -Force
$backendPkg | ConvertTo-Json -Depth 10 | Set-Content $backendPkgPath

Write-Host "✅ Setup complete! Your environment is ready." -ForegroundColor Green
Write-Host "Run 'npm start' in the root directory to launch both servers."