import { _getPropertyModel as _getPropertyModel_1, BooleanModel as BooleanModel_1, makeObjectEmptyValueCreator as makeObjectEmptyValueCreator_1, NumberModel as NumberModel_1, ObjectModel as ObjectModel_1, StringModel as StringModel_1 } from "@vaadin/hilla-lit-form";
import type CarExtras_1 from "./CarExtras.js";
import CarModel_1 from "./CarModel.js";
class CarExtrasModel<T extends CarExtras_1 = CarExtras_1> extends ObjectModel_1<T> {
    static override createEmptyValue = makeObjectEmptyValueCreator_1(CarExtrasModel);
    get id(): StringModel_1 {
        return this[_getPropertyModel_1]("id", (parent, key) => new StringModel_1(parent, key, true, { meta: { annotations: [{ name: "jakarta.persistence.Id" }], javaType: "java.lang.String" } }));
    }
    get name(): StringModel_1 {
        return this[_getPropertyModel_1]("name", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get description(): StringModel_1 {
        return this[_getPropertyModel_1]("description", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get dailyPrice(): NumberModel_1 {
        return this[_getPropertyModel_1]("dailyPrice", (parent, key) => new NumberModel_1(parent, key, false, { meta: { javaType: "double" } }));
    }
    get available(): BooleanModel_1 {
        return this[_getPropertyModel_1]("available", (parent, key) => new BooleanModel_1(parent, key, false, { meta: { javaType: "boolean" } }));
    }
    get category(): StringModel_1 {
        return this[_getPropertyModel_1]("category", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get carFK(): CarModel_1 {
        return this[_getPropertyModel_1]("carFK", (parent, key) => new CarModel_1(parent, key, true, { meta: { annotations: [{ name: "jakarta.persistence.ManyToOne" }] } }));
    }
}
export default CarExtrasModel;
