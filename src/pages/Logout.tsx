import { useNavigate, useSearchParams } from "react-router-dom";
import {
  JWT_COOKIE,
  USER_ROLE,
  check,
  setAccessCookie,
  setRefreshCookie,
} from "../common/apiManager";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Logout = () => {
  const [cookies, , removeCookie] = useCookies();
  useEffect(() => {
    removeCookie("loginUserID");
    removeCookie("uid");
    removeCookie("pToken");
    removeCookie("language");
  }, [removeCookie]);

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return <div>logout</div>;
};

export default Logout;
