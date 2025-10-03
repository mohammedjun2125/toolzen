
declare global {
  interface Window {
    ezstandalone: any;
  }
}

export function refreshAds(ids?: number[]) {
  if (typeof window === "undefined") return;

  window.ezstandalone = window.ezstandalone || {};
  window.ezstandalone.cmd = window.ezstandalone.cmd || [];

  window.ezstandalone.cmd.push(function () {
    if (ids && ids.length > 0) {
      window.ezstandalone.showAds(...ids); // refresh only given placeholders
    } else {
      window.ezstandalone.showAds(); // refresh all ads
    }
  });
}
