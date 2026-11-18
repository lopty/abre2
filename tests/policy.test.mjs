import {test} from 'node:test';
import assert from 'node:assert/strict';
import {canPublish,assertPublishable} from '../scripts/policy.mjs';
const business={orn:'example-orn',tradeLicence:'example-licence'};
const property={slug:'test',status:'published',permitNumber:'example-permit',permitQr:'/qr.webp',agentName:'Example agent',agentBrn:'example-brn'};
test('each required compliance record independently blocks publication',()=>{
 for(const field of ['permitNumber','permitQr','agentName','agentBrn']){
  const incomplete={...property,[field]:''};assert.equal(canPublish(incomplete,business),false);assert.throws(()=>assertPublishable(incomplete,business));
 }
 for(const field of ['orn','tradeLicence'])assert.equal(canPublish(property,{...business,[field]:null}),false);
});
test('drafts never become public even with complete documents',()=>{assert.equal(canPublish({...property,status:'draft'},business),false);assert.doesNotThrow(()=>assertPublishable({...property,status:'draft'},{}));});
test('a complete publication record passes',()=>{assert.equal(canPublish(property,business),true);assert.doesNotThrow(()=>assertPublishable(property,business));});
