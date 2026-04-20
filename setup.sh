#!/bin/bash

echo "🚀 Starting MzansiBuilds Hackathon Setup..."

# ==========================================
# 1. Root Monorepo Setup
# ==========================================
echo "📦 Initialising root directory..."
npm init -y > /dev/null
# Install concurrently so you can run frontend and backend with one command
npm install concurrently --save-dev

# ==========================================
# 2. Backend Setup (Express + SQLite)
# ==========================================
echo "⚙️ Setting up Express backend..."
mkdir backend
cd backend
npm init -y > /dev/null
npm install express cors better-sqlite3
npm install nodemon --save-dev

# Create basic backend files
touch server.js
touch seed.js
cd ..

# ==========================================
# 3. Frontend Setup (React + Vite)
# ==========================================
echo "🎨 Setting up React frontend with Vite..."
# We use npm create vite to bypass the interactive prompts
npm create vite@latest frontend -- --template react
cd frontend
npm install

# Install and configure Tailwind CSS (Hackathon essential)
echo "💅 Configuring Tailwind CSS..."
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Overwrite tailwind.config.js to scan React files
cat <<EOT > tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOT

# Add Tailwind directives to the main CSS file
cat <<EOT > src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
EOT

cd ..

# ==========================================
# 4. Root Package.json Scripts
# ==========================================
echo "🔗 Wiring up monorepo scripts..."
# Use a bit of node to safely inject the start scripts into the root package.json
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('./package.json'));
pkg.scripts = {
  'start': 'concurrently \"npm run server --prefix backend\" \"npm run dev --prefix frontend\"',
  'install:all': 'npm install && npm install --prefix backend && npm install --prefix frontend'
};
fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
"

# Inject backend nodemon script
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('./backend/package.json'));
pkg.scripts = {
  'server': 'nodemon server.js',
  'seed': 'node seed.js'
};
fs.writeFileSync('./backend/package.json', JSON.stringify(pkg, null, 2));
"

echo "✅ Setup complete! Your environment is ready."
echo "Run 'npm start' in the root directory to launch both servers."