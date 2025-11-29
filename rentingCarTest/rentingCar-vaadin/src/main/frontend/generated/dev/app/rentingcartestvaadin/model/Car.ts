import type CarExtras_1 from "./CarExtras.js";
import type InssuranceCia_1 from "./InssuranceCia.js";
interface Car {
    id?: string;
    brand?: string;
    model?: string;
    plate?: string;
    year: number;
    price: number;
    inssuranceCia?: InssuranceCia_1;
    carExtras?: Array<CarExtras_1 | undefined>;
    availabilityRanges?: string;
}
export default Car;
