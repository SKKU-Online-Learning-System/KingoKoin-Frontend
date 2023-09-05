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

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return <div>logout</div>;
};

export default Logout;
