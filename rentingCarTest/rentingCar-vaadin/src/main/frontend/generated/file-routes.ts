import { createRoute as createRoute_1 } from "@vaadin/hilla-file-router/runtime.js";
import type { AgnosticRoute as AgnosticRoute_1, RouteModule as RouteModule_1 } from "@vaadin/hilla-file-router/types.js";
import { lazy as lazy_1 } from "react";
import * as Page_1 from "../views/@index.js";
import * as Layout_1 from "../views/@layout.js";
const routes: readonly AgnosticRoute_1[] = [
    createRoute_1("", Layout_1.default, (Layout_1 as RouteModule_1).config, [
        createRoute_1("", Page_1.default, (Page_1 as RouteModule_1).config),
        createRoute_1("bookings", lazy_1(() => import("../views/bookings.js")), { "route": "bookings", "menu": { "order": 2, "icon": "line-awesome/svg/address-book-solid.svg" }, "title": "Bookings", "flowLayout": false }),
        createRoute_1("cars", lazy_1(() => import("../views/cars.js")), { "route": "cars", "menu": { "order": 1, "icon": "line-awesome/svg/car-side-solid.svg" }, "title": "Cars", "flowLayout": false }),
        createRoute_1("clients", lazy_1(() => import("../views/clients.js")), { "route": "clients", "menu": { "order": 3, "icon": "line-awesome/svg/person-booth-solid.svg" }, "title": "Clients", "flowLayout": false })
    ])
];
export default routes;
