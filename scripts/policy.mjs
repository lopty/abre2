// @ts-check
/** @param {import('../src/types.js').Property} property @param {{orn: string | null, tradeLicence: string | null}} business */
export function canPublish(property, business) {
 return property.status === 'published' && Boolean(property.permitNumber?.trim() && property.permitQr?.trim() && property.agentName?.trim() && property.agentBrn?.trim() && business.orn && business.tradeLicence);
}
/** @param {import('../src/types.js').Property} property @param {{orn: string | null, tradeLicence: string | null}} business */
export function assertPublishable(property, business) {
 if(property.status === 'published' && !canPublish(property,business)) throw new Error(`Cannot publish ${property.slug}: permit, QR, agent, BRN, ORN and trade licence are required.`);
}
