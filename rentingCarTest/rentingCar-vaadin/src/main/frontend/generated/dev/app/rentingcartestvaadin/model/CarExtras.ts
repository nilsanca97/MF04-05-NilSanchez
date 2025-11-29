import type Car_1 from "./Car.js";
interface CarExtras {
    id?: string;
    name?: string;
    description?: string;
    dailyPrice: number;
    available: boolean;
    category?: string;
    carFK?: Car_1;
}
export default CarExtras;
