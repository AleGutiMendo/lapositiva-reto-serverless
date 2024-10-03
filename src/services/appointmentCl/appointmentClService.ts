import { AppointmentClRepository } from "../../repositories/appointmentCl/appointmentClRepository";
import { Appointment } from "../../types/appointment";

const appointmentClRepository = new AppointmentClRepository();

export const appointmentClService = {
  async createAppointment(appointment: Appointment) {
    return await appointmentClRepository.createAppointment(appointment);
  },
};
