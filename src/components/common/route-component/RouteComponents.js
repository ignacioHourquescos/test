import React from "react";
import Demo from "../../pages/demo/Demo";
import Home from "../../pages/home/Home";
import Create from "../../pages/party/create/Create";
import Search from "../../pages/party/search/Search";

export default function RouteComponent({ m, parents, ...restProps }) {
  switch (m.code) {
    case "PARTY_MODULE":
      return <Home {...restProps} />;
    case "PARTY_SEARCH_MENU":
      return <Search title={m.labelCode} parents={parents} {...restProps} />;
    case "PARTY_CREATE_MENU":
      return <Create title={m.labelCode} parents={parents} {...restProps} />;
    default:
      return <Demo title={m.labelCode} parents={parents} {...restProps} />;
  }
}
