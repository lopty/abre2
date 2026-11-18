import {test} from 'node:test';
import assert from 'node:assert/strict';
import {listingCollection} from '../scripts/collections.mjs';
test('empty inventory does not offer nonfunctional unit filters',()=>assert.equal(listingCollection([],{}),''));
test('property cards preserve zero bedrooms, missing prices and safe text',()=>{
 const html=listingCollection([{slug:'studio',title:'Studio <test>',community:'Business Bay',purpose:'rent',type:'Apartment',images:['/assets/test.webp'],bedrooms:0,bathrooms:1,size:450,price:null}],{whatsapp:'971524435019'});
 assert.ok(html.includes('0 beds'));
 assert.ok(html.includes('Price on request'));
 assert.ok(html.includes('Studio &lt;test>'));
 assert.ok(html.includes('/properties/business-bay/studio/'));
 assert.ok(html.includes('data-price=""'));
 assert.ok(html.includes('name="max"'));
 assert.ok(!html.includes('<test>'));
});
