// starshipRepository.ts
import { Appointment } from "../../types/appointment";
import { IRepository } from "./repositoryInterface";
import { v4 as uuidv4 } from "uuid";
import * as AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS();
export class AppointmentRepository implements IRepository<string> {
  async createAppointment(data: Appointment): Promise<string | null> {
    const appointmentTable = process.env.APPOINTMENT_TABLE;
    const { countryISO } = data;
    if (!appointmentTable) {
      throw new Error("APPOINTMENT_TABLE is not defined");
    }
    console.log(`Appointment Data ${JSON.stringify(data)}`);

    try {
      const params = {
        TableName: appointmentTable,
        Item: {
          appointmentId: uuidv4(),
          ...data,
          status: "pending",
        },
      };
      console.log(`Params ${JSON.stringify(params)}`);
      const dynamoResult = await dynamoDb.put(params).promise();
      console.log(`Dynamo Result ${JSON.stringify(dynamoResult)}`);
      if (dynamoResult.$response.error) {
        throw new Error(dynamoResult.$response.error.message);
      }
      if (process.env.SNS_TOPIC_ARN) {
        const snsParams = {
          Message: JSON.stringify(params.Item),
          TopicArn: process.env.SNS_TOPIC_ARN,
          MessageAttributes: {
            countryISO: {
              DataType: "String",
              StringValue: `${countryISO}`,
            },
          },
        };
        console.log(`SNS Params ${JSON.stringify(snsParams)}`);
        const snsResult = await sns.publish(snsParams).promise();
        console.log(`SNS Result ${JSON.stringify(snsResult)}`);
      }
      return JSON.stringify({
        message: "Cita registrada en estado pendiente...",
        data: params.Item,
      });
    } catch (error) {
      return JSON.stringify({
        message: "Error al registrar la cita",
        error: (error as Error).message,
      });
    }
  }
}
