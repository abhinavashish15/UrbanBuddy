# Script to update .env file with PostgreSQL connection string
# Run this script: .\update-env.ps1

$envFile = ".env"

if (Test-Path $envFile) {
    $content = Get-Content $envFile -Raw
    
    # Replace MongoDB URL with PostgreSQL URL
    # Update these values with your actual PostgreSQL credentials
    $postgresUrl = 'postgresql://postgres:password@localhost:5432/urbanbuddy?schema=public'
    
    # Replace DATABASE_URL line
    $content = $content -replace 'DATABASE_URL=".*"', "DATABASE_URL=`"$postgresUrl`""
    
    # Ensure all required variables are present
    if ($content -notmatch 'JWT_SECRET=') {
        $content += "`nJWT_SECRET=`"your-super-secret-jwt-key-change-in-production`""
    }
    if ($content -notmatch 'JWT_EXPIRES_IN=') {
        $content += "`nJWT_EXPIRES_IN=`"7d`""
    }
    if ($content -notmatch 'NODE_ENV=') {
        $content += "`nNODE_ENV=development"
    }
    if ($content -notmatch 'MAX_FILE_SIZE=') {
        $content += "`nMAX_FILE_SIZE=5242880"
    }
    if ($content -notmatch 'UPLOAD_PATH=') {
        $content += "`nUPLOAD_PATH=./uploads"
    }
    
    Set-Content -Path $envFile -Value $content
    Write-Host "✅ .env file updated with PostgreSQL connection string"
    Write-Host "⚠️  Please update DATABASE_URL with your actual PostgreSQL credentials:"
    Write-Host "   Format: postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE?schema=public"
} else {
    Write-Host "❌ .env file not found. Creating new one..."
    $newContent = @"
DATABASE_URL="postgresql://postgres:password@localhost:5432/urbanbuddy?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
"@
    Set-Content -Path $envFile -Value $newContent
    Write-Host "✅ Created .env file"
    Write-Host "⚠️  Please update DATABASE_URL with your actual PostgreSQL credentials"
}


