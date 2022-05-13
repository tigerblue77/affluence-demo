import {ReservationHoursModel} from "../reservation-hours.model";

declare module '*.json' {
  const value: ReservationHoursModel[];
  export default value;
}
