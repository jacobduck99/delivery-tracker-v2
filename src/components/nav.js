

export function startGps(rawAddress) {
    const address = rawAddress.trim();
    if (!address) {
        alert("Please enter an address first!");
        return;
    }

    const encoded = encodeURIComponent(address);

    const ua = navigator.userAgent || "";
    const isApple =
        /iPhone|iPad|iPod/i.test(ua) ||
        (/\bMacintosh\b/i.test(ua) && navigator.maxTouchPoints > 1);

  // PWA standalone detection
    const isStandalone =
        window.matchMedia?.("(display-mode: standalone)")?.matches ||
    // old iOS
        window.navigator.standalone === true;

  // Map URLs (https for Apple Maps)
    const appleUrl = `https://maps.apple.com/?q=${encoded}`;
    const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${encoded}`;
    const geoUrl = `geo:0,0?q=${encoded}`; // nice mobile fallback

    const targetUrl = isApple ? appleUrl : gmapsUrl;

  // In standalone PWAs on iOS, prefer same-tab navigation.
  // Elsewhere, a new tab is fine.
    if (isStandalone && isApple) {
    // iOS PWA: _blank can be blocked—use same-tab
        location.href = targetUrl;
    } else {
    // Try geo: first on mobile; if blocked, fall back to web URL
        const tried = window.open(geoUrl, "_blank", "noopener,noreferrer");
        if (!tried) {
      // Popup blocked or desktop—use web URL
        window.open(targetUrl, "_blank", "noopener,noreferrer");
    }
  }}
