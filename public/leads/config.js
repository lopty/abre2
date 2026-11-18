/*
 * Lead capture settings for albaselrealestate.ae.
 * endpoint: the Google Apps Script "Web app URL" (ends in /exec). See docs/leads-setup.md.
 * Use the SAME URL as tuwaiq.ae so both websites fill one Google Sheet.
 */
window.SITE_LEADS = {
  endpoint: 'https://script.google.com/macros/s/AKfycbzDsPvfWdSRDKFRTof__oSqUFQlhv1INbblCZhMuyKGceKnq2C22r9qZGk2yhhzU6LcQQ/exec',
  site: 'albasel',
  siteName: 'Al Basel Real Estate',
  kind: 'realestate',
  whatsapp: '971524435019',
  greeting: 'Hi, I am from your website.',
  phoneDisplay: '+971 52 443 5019',
  phoneTel: '+971524435019',
  privacyUrl: '/privacy/',
  sites: { tuwaiq: 'Tuwaiq Travel', albasel: 'Al Basel Real Estate' }
};
