import { firm } from "@/config/firm";
import { CONSENT_KEY } from "@/lib/analytics";

/**
 * GA4 tag for <head>. The dataLayer/gtag stub always renders so events queue safely;
 * gtag.js loads only when NEXT_PUBLIC_GA4_ID is set AND the visitor has accepted analytics
 * cookies in the cookie notice (opt-in, as the privacy policy states). A Global Privacy
 * Control signal is always treated as a decline.
 */
export function GaHead() {
  const id = firm.analytics.ga4Id.trim();
  const valid = /^G-[A-Z0-9]{4,}$/.test(id) && id !== "G-XXXXXXXXXX";
  const script = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
var c=null;try{c=localStorage.getItem(${JSON.stringify(CONSENT_KEY)})}catch(e){}
var off=c!=="accepted"||navigator.globalPrivacyControl===true;
gtag("consent","default",{ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:off?"denied":"granted"});
window.__oakGa=${JSON.stringify(valid ? id : "")};
window.__oakLoadGa=function(){var id=window.__oakGa;if(!id||window.__oakGaLoaded)return;window.__oakGaLoaded=true;var s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id="+id;document.head.appendChild(s);gtag("js",new Date());gtag("config",id);};
if(!off)window.__oakLoadGa();`;
  return <script id="ga4" dangerouslySetInnerHTML={{ __html: script }} />;
}
