Add-Type -AssemblyName System.Drawing

$sourcePath = "Projects\Mendham\Mendham_Image_15_After.png"
$destPath = "Projects\Mendham\Mendham_Image_15_After_optimized.jpg"

write-host "Converting $sourcePath to $destPath..."

try {
    $image = [System.Drawing.Image]::FromFile($sourcePath)

    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    # Quality level 75 (Long)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]75)

    $image.Save($destPath, $codec, $encoderParams)
    $image.Dispose()
    write-host "Conversion successful."
} catch {
    write-error "Conversion failed: $_"
    exit 1
}
