import { Router } from "express";
import { registerLoan } from "../controllers/loanController";

const router = Router();

router.post("/loans", registerLoan);

export default router;
