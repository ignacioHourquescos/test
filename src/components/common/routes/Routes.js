import React from "react";
import { Route } from "react-router-dom";
import RouteComponent from "../route-component/RouteComponents";

export default function Routes(routes) {
  return routes.map((r) => (
    <Route exact key={r.m.code} path={r.m.path}>
      {RouteComponent(r)}
    </Route>
  ));
}
