import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import type Filter_1 from "./com/vaadin/hilla/crud/filter/Filter.js";
import type Pageable_1 from "./com/vaadin/hilla/mappedtypes/Pageable.js";
import client_1 from "./connect-client.default.js";
import type Client_1 from "./dev/app/rentingcartestvaadin/model/Client.js";
async function count_1(filter: Filter_1 | undefined, init?: EndpointRequestInit_1): Promise<number> { return client_1.call("ClientService", "count", { filter }, init); }
async function exists_1(id: string, init?: EndpointRequestInit_1): Promise<boolean> { return client_1.call("ClientService", "exists", { id }, init); }
async function get_1(id: string, init?: EndpointRequestInit_1): Promise<Client_1 | undefined> { return client_1.call("ClientService", "get", { id }, init); }
async function list_1(pageable: Pageable_1, filter: Filter_1 | undefined, init?: EndpointRequestInit_1): Promise<Array<Client_1>> { return client_1.call("ClientService", "list", { pageable, filter }, init); }
async function delete_1(id: string, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("ClientService", "delete", { id }, init); }
async function deleteAll_1(ids: Array<string>, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("ClientService", "deleteAll", { ids }, init); }
async function save_1(value: Client_1, init?: EndpointRequestInit_1): Promise<Client_1 | undefined> { return client_1.call("ClientService", "save", { value }, init); }
async function saveAll_1(values: Array<Client_1>, init?: EndpointRequestInit_1): Promise<Array<Client_1>> { return client_1.call("ClientService", "saveAll", { values }, init); }
export { count_1 as count, delete_1 as delete, deleteAll_1 as deleteAll, exists_1 as exists, get_1 as get, list_1 as list, save_1 as save, saveAll_1 as saveAll };
