# Windows-compatible build script for Verba frontend
Write-Host "Building Next.js application..."
npx next build

if (Test-Path "out") {
    Write-Host "Copying build output to backend..."
    Copy-Item "out\*" "../goldenverba/server/frontend/out/" -Recurse -Force
    Write-Host "Cleaning up temporary out directory..."
    Remove-Item "out" -Recurse -Force
    Write-Host "Build completed successfully!"
} else {
    Write-Host "Build failed - no output directory created"
}
