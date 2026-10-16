import page from '../dist/index.html';
import {createService} from './service.mjs';
// First activation stays owner-private and read-only until the owner checks the export.
export default createService({page,v2:true,bootstrapOwnerPrivate:true,initialMaintenance:true});
