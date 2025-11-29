import { _getPropertyModel as _getPropertyModel_1, BooleanModel as BooleanModel_1, makeObjectEmptyValueCreator as makeObjectEmptyValueCreator_1, NumberModel as NumberModel_1, ObjectModel as ObjectModel_1, StringModel as StringModel_1 } from "@vaadin/hilla-lit-form";
import type Booking_1 from "./Booking.js";
import CarModel_1 from "./CarModel.js";
import ClientModel_1 from "./ClientModel.js";
class BookingModel<T extends Booking_1 = Booking_1> extends ObjectModel_1<T> {
    static override createEmptyValue = makeObjectEmptyValueCreator_1(BookingModel);
    get id(): StringModel_1 {
        return this[_getPropertyModel_1]("id", (parent, key) => new StringModel_1(parent, key, true, { meta: { annotations: [{ name: "jakarta.persistence.Id" }], javaType: "java.lang.String" } }));
    }
    get bookingDate(): NumberModel_1 {
        return this[_getPropertyModel_1]("bookingDate", (parent, key) => new NumberModel_1(parent, key, false, { meta: { javaType: "int" } }));
    }
    get qtyDays(): NumberModel_1 {
        return this[_getPropertyModel_1]("qtyDays", (parent, key) => new NumberModel_1(parent, key, false, { meta: { javaType: "int" } }));
    }
    get totalAmount(): NumberModel_1 {
        return this[_getPropertyModel_1]("totalAmount", (parent, key) => new NumberModel_1(parent, key, false, { meta: { javaType: "double" } }));
    }
    get car(): CarModel_1 {
        return this[_getPropertyModel_1]("car", (parent, key) => new CarModel_1(parent, key, true, { meta: { annotations: [{ name: "jakarta.persistence.ManyToOne" }] } }));
    }
    get client(): ClientModel_1 {
        return this[_getPropertyModel_1]("client", (parent, key) => new ClientModel_1(parent, key, true, { meta: { annotations: [{ name: "jakarta.persistence.ManyToOne" }] } }));
    }
    get active(): BooleanModel_1 {
        return this[_getPropertyModel_1]("active", (parent, key) => new BooleanModel_1(parent, key, false, { meta: { javaType: "boolean" } }));
    }
}
export default BookingModel;
