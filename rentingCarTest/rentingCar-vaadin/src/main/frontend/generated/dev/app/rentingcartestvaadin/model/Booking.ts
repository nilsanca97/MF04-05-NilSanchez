import type Car_1 from "./Car.js";
import type Client_1 from "./Client.js";
interface Booking {
    id?: string;
    bookingDate: number;
    qtyDays: number;
    totalAmount: number;
    car?: Car_1;
    client?: Client_1;
    active: boolean;
}
export default Booking;
