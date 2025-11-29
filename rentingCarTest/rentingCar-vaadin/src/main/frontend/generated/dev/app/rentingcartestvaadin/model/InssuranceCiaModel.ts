import { _getPropertyModel as _getPropertyModel_1, ArrayModel as ArrayModel_1, BooleanModel as BooleanModel_1, makeObjectEmptyValueCreator as makeObjectEmptyValueCreator_1, NumberModel as NumberModel_1, ObjectModel as ObjectModel_1, StringModel as StringModel_1 } from "@vaadin/hilla-lit-form";
import CarModel_1 from "./CarModel.js";
import type InssuranceCia_1 from "./InssuranceCia.js";
class InssuranceCiaModel<T extends InssuranceCia_1 = InssuranceCia_1> extends ObjectModel_1<T> {
    static override createEmptyValue = makeObjectEmptyValueCreator_1(InssuranceCiaModel);
    get id(): StringModel_1 {
        return this[_getPropertyModel_1]("id", (parent, key) => new StringModel_1(parent, key, true, { meta: { annotations: [{ name: "jakarta.persistence.Id" }], javaType: "java.lang.String" } }));
    }
    get name(): StringModel_1 {
        return this[_getPropertyModel_1]("name", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get description(): StringModel_1 {
        return this[_getPropertyModel_1]("description", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get qtyEmployee(): NumberModel_1 {
        return this[_getPropertyModel_1]("qtyEmployee", (parent, key) => new NumberModel_1(parent, key, false, { meta: { javaType: "int" } }));
    }
    get cars(): ArrayModel_1<CarModel_1> {
        return this[_getPropertyModel_1]("cars", (parent, key) => new ArrayModel_1(parent, key, true, (parent, key) => new CarModel_1(parent, key, true), { meta: { annotations: [{ name: "jakarta.persistence.OneToMany" }], javaType: "java.util.List" } }));
    }
    get active(): BooleanModel_1 {
        return this[_getPropertyModel_1]("active", (parent, key) => new BooleanModel_1(parent, key, false, { meta: { javaType: "boolean" } }));
    }
}
export default InssuranceCiaModel;
