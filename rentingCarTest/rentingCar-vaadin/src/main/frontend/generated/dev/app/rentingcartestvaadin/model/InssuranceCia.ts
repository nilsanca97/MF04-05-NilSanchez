import type Car_1 from "./Car.js";
interface InssuranceCia {
    id?: string;
    name?: string;
    description?: string;
    qtyEmployee: number;
    cars?: Array<Car_1 | undefined>;
    active: boolean;
}
export default InssuranceCia;
