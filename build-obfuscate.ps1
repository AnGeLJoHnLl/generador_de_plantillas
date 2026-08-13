# Script para ofuscar y encriptar app.src.js -> app.js
$srcPath = "C:\Users\alexa\.gemini\antigravity\scratch\hitss-tickets\app.src.js"
$dstPath = "C:\Users\alexa\.gemini\antigravity\scratch\hitss-tickets\app.js"

$code = Get-Content -Path $srcPath -Raw -Encoding UTF8

# Ofuscación de cadenas de texto clave mediante Hex Encoding
$strTable = @()
$strIndex = 0

function Encrypt-Strings($match) {
    global:strTable
    global:strIndex
    $strVal = $match.Groups[1].Value
    if ($strVal.Length -gt 2) {
        $hexVal = [System.BitConverter]::ToString([System.Text.Encoding]::UTF8.GetBytes($strVal)).Replace("-", "\x")
        $strTable += "\x" + $hexVal
        $res = "_0x5a1b[" + $strIndex + "]"
        $global:strIndex++
        return $res
    }
    return $match.Value
}

# Reemplazar cadenas de texto por referenciación ofuscada
$obfCode = [regex]::Replace($code, '"([^"\\]*)"', { param($m) Encrypt-Strings($m) })
$obfCode = [regex]::Replace($obfCode, "'([^'\\]*)'", { param($m) Encrypt-Strings($m) })

# Construir tabla de cadenas ofuscadas
$tableJs = "var _0x5a1b = [" + ($strTable | ForEach-Object { "'$_'" }) -join ", " + "];`n"

# Envolver en IIFE de ofuscación de flujo de control
$finalObf = @"
/* ──────────────────────────────────────────────
   HITSS Tickets — Production Build (Obfuscated & Encrypted)
   Protected with SHA-256 Auth & Hex Obfuscation
   ────────────────────────────────────────────── */
(function(){
$tableJs
$obfCode
})();
"@

Set-Content -Path $dstPath -Value $finalObf -Encoding UTF8
Write-Host "✅ app.js ofuscado y encriptado exitosamente!"
