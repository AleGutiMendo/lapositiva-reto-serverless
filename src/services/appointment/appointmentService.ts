import { AppointmentRepository } from "../../repositories/appointment/appointmentRepository";
import { Appointment } from "../../types/appointment";

const appointmentRepository = new AppointmentRepository();

export const appointmentService = {
  async createAppointment(appointment: Appointment) {
    return await appointmentRepository.createAppointment(appointment);
  },
};
