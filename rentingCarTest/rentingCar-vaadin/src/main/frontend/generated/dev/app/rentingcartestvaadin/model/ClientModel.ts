import { _getPropertyModel as _getPropertyModel_1, ArrayModel as ArrayModel_1, BooleanModel as BooleanModel_1, makeObjectEmptyValueCreator as makeObjectEmptyValueCreator_1, NumberModel as NumberModel_1, ObjectModel as ObjectModel_1, StringModel as StringModel_1 } from "@vaadin/hilla-lit-form";
import type Client_1 from "./Client.js";
class ClientModel<T extends Client_1 = Client_1> extends ObjectModel_1<T> {
    static override createEmptyValue = makeObjectEmptyValueCreator_1(ClientModel);
    get id(): StringModel_1 {
        return this[_getPropertyModel_1]("id", (parent, key) => new StringModel_1(parent, key, true, { meta: { annotations: [{ name: "jakarta.persistence.Id" }], javaType: "java.lang.String" } }));
    }
    get name(): StringModel_1 {
        return this[_getPropertyModel_1]("name", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get lastName(): StringModel_1 {
        return this[_getPropertyModel_1]("lastName", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get email(): StringModel_1 {
        return this[_getPropertyModel_1]("email", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get premium(): BooleanModel_1 {
        return this[_getPropertyModel_1]("premium", (parent, key) => new BooleanModel_1(parent, key, false, { meta: { javaType: "boolean" } }));
    }
    get age(): NumberModel_1 {
        return this[_getPropertyModel_1]("age", (parent, key) => new NumberModel_1(parent, key, false, { meta: { javaType: "int" } }));
    }
    get password(): StringModel_1 {
        return this[_getPropertyModel_1]("password", (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }));
    }
    get addresses(): ArrayModel_1<StringModel_1> {
        return this[_getPropertyModel_1]("addresses", (parent, key) => new ArrayModel_1(parent, key, true, (parent, key) => new StringModel_1(parent, key, true, { meta: { javaType: "java.lang.String" } }), { meta: { javaType: "java.util.List" } }));
    }
}
export default ClientModel;
