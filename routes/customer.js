import {Router} from "express";
const router = Router();
import CustomerController from "../app/controllers/CustomerController.js";

router.get('/', CustomerController.getCustomer)

export default router