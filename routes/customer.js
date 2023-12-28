import {Router} from "express";
const router = Router();
import CustomerController from "../app/controllers/CustomerController.js";

router.get('/', CustomerController.getCustomer);
router.post('/', CustomerController.storeCustomer);
router.put('/:id/update', CustomerController.updateCustomer);
router.delete('/:id/delete', CustomerController.deleteCustomer);
router.post('/bulk-create', CustomerController.createBulkCustomer);

export default router;