import { getConnection } from "../../utils/db";
import { Appointment } from "../../types/appointment";
import { EventBridge } from "aws-sdk";

const eventBridge = new EventBridge();
export class AppointmentClRepository {
  async createAppointment(appointment: Appointment): Promise<void> {
    const { countryISO } = appointment;
    const connection = await getConnection();
    try {
      const query = `
        INSERT INTO appointments${countryISO} insuredId, scheduleId, countryISO)
        VALUES (?, ?, ?)
      `;
      const values = [
        appointment.insuredId,
        appointment.scheduleId,
        appointment.countryISO,
      ];

      await connection.execute(query, values);
      console.log("Appointment inserted into the database successfully.");

      // Enviar el evento de conformidad a EventBridge
      await eventBridge
        .putEvents({
          Entries: [
            {
              Source: "appointment.source",
              DetailType: "AppointmentConformity",
              Detail: JSON.stringify(appointment),
              EventBusName: "default", // Puedes usar el bus de eventos predeterminado o personalizar uno
            },
          ],
        })
        .promise();

      console.log("Appointment event sent to EventBridge");
    } catch (error) {
      console.error("Error inserting appointment into the database:", error);
      throw error;
    }
  }
}
