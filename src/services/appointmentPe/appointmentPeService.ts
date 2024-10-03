import { AppointmentPeRepository } from "../../repositories/appointmentPe/appointmentPeRepository";
import { Appointment } from "../../types/appointment";

const appointmentPeRepository = new AppointmentPeRepository();

export const appointmentPeService = {
  async createAppointment(appointment: Appointment) {
    return await appointmentPeRepository.createAppointment(appointment);
  },
};
