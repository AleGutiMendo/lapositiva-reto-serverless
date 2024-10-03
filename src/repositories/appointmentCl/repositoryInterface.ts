export interface IRepository<T> {
  createAppointment(appointment: any): Promise<T | null>;
}
