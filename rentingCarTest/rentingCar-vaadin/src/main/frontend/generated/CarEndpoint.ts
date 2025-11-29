import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import client_1 from "./connect-client.default.js";
import type Car_1 from "./dev/app/rentingcartestvaadin/model/Car.js";
async function getAllCars_1(init?: EndpointRequestInit_1): Promise<Array<Car_1 | undefined> | undefined> { return client_1.call("CarEndpoint", "getAllCars", {}, init); }
export { getAllCars_1 as getAllCars };
