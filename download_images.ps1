$images = @{
    "monteverde_1.jpg" = "https://upload.wikimedia.org/wikipedia/commons/4/4e/Monteverde_Cloud_Forest_Reserve_-_panoramio.jpg";
    "monteverde_2.jpg" = "https://upload.wikimedia.org/wikipedia/commons/0/07/Monteverde_Cloud_Forest_Reserve_Suspension_Bridge.jpg";
    "monteverde_3.jpg" = "https://upload.wikimedia.org/wikipedia/commons/7/7b/Pharomachrus_mocinno_Monteverde_01.jpg";
    "arenal_1.jpg" = "https://upload.wikimedia.org/wikipedia/commons/1/10/Arenal_Volcano_from_the_air.jpg";
    "arenal_2.jpg" = "https://upload.wikimedia.org/wikipedia/commons/f/f6/La_Fortuna_de_San_Carlos_Costa_Rica_Cascade.jpg";
    "arenal_3.jpg" = "https://upload.wikimedia.org/wikipedia/commons/e/ec/Rio_Celeste_waterfall_Costa_Rica.jpg";
    "tortuguero_1.jpg" = "https://upload.wikimedia.org/wikipedia/commons/6/65/Tortuguero_canals.jpg";
    "tortuguero_2.jpg" = "https://upload.wikimedia.org/wikipedia/commons/b/b3/Tortuguero_National_Park.jpg";
    "tortuguero_3.jpg" = "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tortuguero_Canal_Costa_Rica.jpg";
    "caribbean_1.jpg" = "https://upload.wikimedia.org/wikipedia/commons/1/1e/Puerto_Viejo_de_Talamanca%2C_Costa_Rica.jpg";
    "caribbean_2.jpg" = "https://upload.wikimedia.org/wikipedia/commons/0/0a/Cahuita_National_Park_Beach.jpg";
    "caribbean_3.jpg" = "https://upload.wikimedia.org/wikipedia/commons/9/9f/Three-toed_sloth_costa_rica.jpg";
    "pacuare.jpg" = "https://upload.wikimedia.org/wikipedia/commons/f/f6/Pacuare_River_Rafting.jpg";
    "corcovado_1.jpg" = "https://upload.wikimedia.org/wikipedia/commons/f/f3/Tapir_Corcovado_National_Park.jpg";
    "corcovado_2.jpg" = "https://upload.wikimedia.org/wikipedia/commons/7/7a/Corcovado_Station_Sirena.jpg";
    "corcovado_3.jpg" = "https://upload.wikimedia.org/wikipedia/commons/4/4e/Ara_macao_%28Corcovado%2C_2011%29.jpg";
    "marino_1.jpg" = "https://upload.wikimedia.org/wikipedia/commons/6/62/Whale_Tail_Uvita.jpg";
    "marino_2.jpg" = "https://upload.wikimedia.org/wikipedia/commons/a/a2/Humpback_whale_breaching_Costa_Rica.jpg";
    "marino_3.jpg" = "https://upload.wikimedia.org/wikipedia/commons/5/53/Manuel_Antonio_National_Park_Beach.jpg";
    "samara_1.jpg" = "https://upload.wikimedia.org/wikipedia/commons/2/29/Playa_Samara_Costa_Rica.jpg";
    "samara_2.jpg" = "https://upload.wikimedia.org/wikipedia/commons/a/a9/Isla_Tortuga_Costa_Rica.jpg";
    "samara_3.jpg" = "https://upload.wikimedia.org/wikipedia/commons/8/8d/Crocodylus_acutus_Tarcoles.jpg";
    "hero.jpg" = "https://upload.wikimedia.org/wikipedia/commons/2/22/Monteverde_Cloud_Forest_Reserve.jpg"
}

Write-Host "Starting slow download..."
foreach ($name in $images.Keys) {
    Write-Host "Downloading $name..."
    $url = $images[$name]
    $out = "assets/$name"
    try {
        Invoke-WebRequest -Uri $url -OutFile $out -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" -UseBasicParsing -TimeoutSec 30
        $i = Get-Item $out
        if ($i.Length -lt 10000) { Write-Host "  WARNING: Small file" } else { Write-Host "  OK: $($i.Length) bytes" }
    } catch {
        Write-Host "  ERROR: $_"
    }
    Start-Sleep -Seconds 5
}
