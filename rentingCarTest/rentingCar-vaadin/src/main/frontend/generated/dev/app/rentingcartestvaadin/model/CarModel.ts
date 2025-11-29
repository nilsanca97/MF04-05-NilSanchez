import { _getPropertyModel as _getPropertyModel_1, ArrayModel as ArrayModel_1, makeObjectEmptyValueCreator as makeObjectEmptyValueCreator_1, NumberModel as NumberModel_1, ObjectModel as ObjectModel_1, StringModel as StringModel_1 } from "@vaadin/hilla-lit-form";
import type Car_1 from "./Car.js";
import CarExtrasModel_1 from "./CarExtrasModel.js";
import InssuranceCiaModel_1 from "./InssuranceCiaModel.js";
class CarModel<T extends Car_1 = Car_1> extends ObjectModel_1<T> {
    static override createEmptyValue = makeObjectEmptyValueCreator_1(CarModel);
    get id(): StringModel_1 {
        return this[_getPropertyModel_1]("id", (parent, key) => new StringModel_1(parent, key, true, { meta: { annotations: [{ name: "jakarta.persistence.Id" }], javaType: "java.lang.String" } }));
    }
    get brand(): StringModel_1 {
        return this[_getPropertyModel_1]("brand", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get model(): StringModel_1 {
        return this[_getPropertyModel_1]("model", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get plate(): StringModel_1 {
        return this[_getPropertyModel_1]("plate", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get year(): NumberModel_1 {
        return this[_getPropertyModel_1]("year", (parent, key) => new NumberModel_1(parent, key, false, { meta: { javaType: "int" } }));
    }
    get price(): NumberModel_1 {
        return this[_getPropertyModel_1]("price", (parent, key) => new NumberModel_1(parent, key, false, { meta: { javaType: "double" } }));
    }
    get inssuranceCia(): InssuranceCiaModel_1 {
        return this[_getPropertyModel_1]("inssuranceCia", (parent, key) => new InssuranceCiaModel_1(parent, key, true, { meta: { annotations: [{ name: "jakarta.persistence.ManyToOne" }] } }));
    }
    get carExtras(): ArrayModel_1<CarExtrasModel_1> {
        return this[_getPropertyModel_1]("carExtras", (parent, key) => new ArrayModel_1(parent, key, true, (parent, key) => new CarExtrasModel_1(parent, key, true), { meta: { annotations: [{ name: "jakarta.persistence.OneToMany" }], javaType: "java.util.List" } }));
    }
    get availabilityRanges(): StringModel_1 {
        return this[_getPropertyModel_1]("availabilityRanges", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
}
export default CarModel;
