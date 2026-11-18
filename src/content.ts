import business from '../data/business.json' with {type:'json'};
import draft from '../data/properties/lila.json' with {type:'json'};
import type {Property} from './types.js';
type PropertyRecord = Omit<Property, 'status' | 'purpose' | 'type'> & {status:string;purpose:string;type:string};
// Check stored content against the fields consumed by the generator and CMS.
export const draftRecord: PropertyRecord = draft;
export const businessRecord: {name:string;url:string;phone:string;phoneLink:string;whatsapp:string;email:string;address:string;orn:string|null;tradeLicence:string|null;socialProfiles:string[];awards:string[]} = business;
