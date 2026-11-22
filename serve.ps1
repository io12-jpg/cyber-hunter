$ErrorActionPreference = "Stop"
$root = [System.IO.Path]::GetFullPath($PSScriptRoot)
$rootPrefix = $root.TrimEnd([System.IO.Path]::DirectorySeparatorChar) + [System.IO.Path]::DirectorySeparatorChar
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8765/")

try {
  $listener.Start()
  $url = "http://localhost:8765/"
  Write-Host "Cyber Hunter is available at $url. Open this URL in your browser."
  Write-Host "Press Ctrl+C to stop the local server."

  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    try {
      if ($request.HttpMethod -ne "GET" -and $request.HttpMethod -ne "HEAD") {
        $response.StatusCode = 405
        $response.Close()
        continue
      }

      $relativePath = [System.Uri]::UnescapeDataString($request.Url.AbsolutePath.TrimStart("/"))
      if ([string]::IsNullOrWhiteSpace($relativePath)) { $relativePath = "index.html" }
      $filePath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($root, $relativePath))
      if (-not $filePath.StartsWith($rootPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
        $response.StatusCode = 403
        $response.Close()
        continue
      }
      if (-not (Test-Path -LiteralPath $filePath -PathType Leaf)) {
        $response.StatusCode = 404
        $response.Close()
        continue
      }

      $contentType = switch ([System.IO.Path]::GetExtension($filePath).ToLowerInvariant()) {
        ".html" { "text/html; charset=utf-8" }
        ".css" { "text/css; charset=utf-8" }
        ".js" { "text/javascript; charset=utf-8" }
        ".json" { "application/json; charset=utf-8" }
        default { "application/octet-stream" }
      }
      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $response.ContentType = $contentType
      $response.ContentLength64 = $bytes.Length
      $response.Headers["Cache-Control"] = "no-cache"
      if ($request.HttpMethod -eq "GET") { $response.OutputStream.Write($bytes, 0, $bytes.Length) }
      $response.Close()
    } catch {
      Write-Warning ("Request failed for {0}: {1}" -f $request.Url.AbsolutePath, $_.Exception.Message)
      $response.StatusCode = 500
      $response.Close()
    }
  }
} finally {
  if ($listener.IsListening) { $listener.Stop() }
  $listener.Close()
}
