import { SQSEvent } from "aws-lambda";
import { appointmentPeService } from "../../services/appointmentPe/appointmentPeService";
import { Appointment } from "../../types/appointment";

export const appointmentPeController = async (
  event: SQSEvent,
): Promise<void> => {
  for (const record of event.Records) {
    try {
      const appointment: Appointment = JSON.parse(record.body);
      await appointmentPeService.createAppointment(appointment);
    } catch (error) {
      console.error("Error processing appointment:", error);
      throw new Error("Failed to process appointment");
    }
  }
};
