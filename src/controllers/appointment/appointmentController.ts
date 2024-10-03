import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { appointmentSchema } from "../../schemas/appointmentSchema";
import { appointmentService } from "../../services/appointment/appointmentService";
export const appointmentController = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { body } = event;
  const appointment = JSON.parse(body);
  console.log("Creating appointment", appointment);

  const { error } = appointmentSchema.validate(appointment);

  if (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  } else {
    const response = await appointmentService.createAppointment(appointment);
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  }
};
