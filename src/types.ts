export interface Property {
  slug: string; title: string; status: 'draft' | 'published';
  purpose: 'buy' | 'rent'; type: 'Apartment' | 'Villa' | 'Townhouse';
  community: string; project: string; developer: string;
  price: number | null; bedrooms: number | null; bathrooms: number | null; size: number | null;
  description: string; images: string[]; floorPlan: string | null;
  permitNumber: string; permitQr: string; agentName: string; agentBrn: string;
  source: string; verifiedAt: string | null;
}
