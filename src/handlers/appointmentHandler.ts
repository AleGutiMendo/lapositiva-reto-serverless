import { appointmentController } from "../controllers/appointment/appointmentController";
import { appointmentPeController } from "../controllers/appointmentPE/appointmentPeController";
import { appointmentClController } from "../controllers/appointmentCl/appointmentClController";

export const handler = appointmentController;
export const peHandler = appointmentPeController;
export const clHandler = appointmentClController;
