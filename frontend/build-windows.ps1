# Windows-compatible build script for Oxtari frontend
Write-Host "Starting build process..."
Set-Location "C:\Users\GAC\Verba\frontend"

Write-Host "Building Next.js application..."
npx next build

Write-Host "Checking if build was successful..."
if (Test-Path "out") {
    Write-Host "Build successful! Copying files to backend..."
    # Remove old files first
    if (Test-Path "../goldenverba/server/frontend/out") {
        Remove-Item "../goldenverba/server/frontend/out/*" -Recurse -Force
    }
    # Copy new files
    Copy-Item "out/*" "../goldenverba/server/frontend/out/" -Recurse -Force
    Write-Host "Cleaning up temporary out directory..."
    Remove-Item "out" -Recurse -Force
    Write-Host "Build and deployment completed successfully!"
} else {
    Write-Host "Build failed - no output directory created"
    Write-Host "Trying alternative approach..."
    # Try development build
    npm run dev
}
