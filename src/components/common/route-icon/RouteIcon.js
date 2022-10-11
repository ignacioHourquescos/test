import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { BiCircle, BiSearch } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";

export default function RouteIcon({ code, ...restProps }) {
  switch (code) {
    case "PARTY_MENU":
      return <UserOutlined {...restProps} />;
    case "PARTY_SEARCH_MENU":
      return <BiSearch {...restProps} />;
    case "PARTY_CREATE_MENU":
      return <IoPersonOutline {...restProps} />;
    default:
      return <BiCircle {...restProps} />;
  }
}
