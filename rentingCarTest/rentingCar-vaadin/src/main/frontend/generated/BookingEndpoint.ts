import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import client_1 from "./connect-client.default.js";
import type Booking_1 from "./dev/app/rentingcartestvaadin/model/Booking.js";
async function getAllBookings_1(init?: EndpointRequestInit_1): Promise<Array<Booking_1 | undefined> | undefined> { return client_1.call("BookingEndpoint", "getAllBookings", {}, init); }
export { getAllBookings_1 as getAllBookings };
