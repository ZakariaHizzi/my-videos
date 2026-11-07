Add-Type -AssemblyName System.Drawing

$sites = @("restaurant", "hospital", "travel", "ecommerce", "university")
$cols = 4
$rows = 3
$cw = 360
$ch = 170
$labelH = 22
$outDir = Join-Path $PSScriptRoot "..\public\shots"

foreach ($site in $sites) {
  $bmp = New-Object System.Drawing.Bitmap(($cols * $cw), ($rows * ($ch + $labelH)))
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.Clear([System.Drawing.Color]::FromArgb(255, 20, 20, 20))
  $font = New-Object System.Drawing.Font("Consolas", 12, [System.Drawing.FontStyle]::Bold)
  $brush = [System.Drawing.Brushes]::Yellow
  $fmt = [System.Drawing.StringFormat]::GenericDefault

  for ($i = 1; $i -le 12; $i++) {
    $file = Join-Path $outDir "$site-$i.jpg"
    if (-not (Test-Path $file)) { continue }
    $img = [System.Drawing.Image]::FromFile($file)
    $col = ($i - 1) % $cols
    $row = [math]::Floor(($i - 1) / $cols)
    $x = $col * $cw
    $y = $row * ($ch + $labelH)
    $g.DrawString("$site-$i", $font, $brush, ($x + 4), ($y + 2))
    $g.DrawImage($img, $x, ($y + $labelH), $cw, $ch)
    $img.Dispose()
  }

  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
  $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]85)
  $out = Join-Path $outDir "..\contact-$site.jpg"
  $bmp.Save($out, $codec, $params)
  $g.Dispose(); $bmp.Dispose()
  Write-Output "wrote contact-$site.jpg"
}
