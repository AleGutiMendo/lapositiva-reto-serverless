import { SQSEvent } from "aws-lambda";
import { appointmentClService } from "../../services/appointmentCl/appointmentClService";
import { Appointment } from "../../types/appointment";

export const appointmentClController = async (
  event: SQSEvent,
): Promise<void> => {
  for (const record of event.Records) {
    try {
      const appointment: Appointment = JSON.parse(record.body);
      await appointmentClService.createAppointment(appointment);
    } catch (error) {
      console.error("Error processing appointment:", error);
      throw new Error("Failed to process appointment");
    }
  }
};
