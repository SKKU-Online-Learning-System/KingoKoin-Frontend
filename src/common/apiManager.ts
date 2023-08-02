import { Dayjs } from "dayjs";
import { dayjsToStamp } from "./utils";
import { PLATFORMS } from "./api";

// TODO: PL_ID_MANUAL -> PL_CODE_MANUAL
export const PL_ID_MANUAL = "2";

export enum POLICY_REQUEST_TYPE {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  READ = "READ",
  DEACTIVATE = "DEACTIVATE",
  ACTIVATE = "ACTIVATE",
  DELETE = "DELETE",
  EMPTY = "EMPTY",
}

export enum POLICY_TYPE {
  ACTIVE = "활성",
  INACTIVE = "비활성",
}

export interface IGrantedCoinForm {
  stId: string;
  stName: string;
  plId: string;
  pfName: string;
  title: string;
  point: number;
  adId: number;
  gainedDate: Dayjs;
}

export const formToGrantedCoin = ({
  stId,
  stName,
  plId,
  title,
  point,
  adId,
  gainedDate,
}: IGrantedCoinForm) => {
  console.log("formToGrantedCoin input: ");
  console.log({
    stId,
    stName,
    plId,
    title,
    point,
    adId,
    gainedDate,
  });
  const result = {
    stId: parseInt(stId),
    stName,
    plId: parseInt(plId),
    title,
    plus: point >= 0,
    point,
    adId,
    gainedDate: dayjsToStamp(gainedDate),
  };
  console.log("formToGrantedCoin result: ");
  console.log(result);
  return result;
};

export interface IPolicyRequestForm {
  plId: string;
  pfId: number;
  pfName: string;
  rqName: string;
  rqPlus: boolean;
  rqPoint: number;
  rqAvailable: boolean;
  rqReason: string;
  rqType: POLICY_REQUEST_TYPE;
}

export const formToPolicyRequest = ({
  plId,
  pfId,
  pfName,
  rqName,
  rqPlus,
  rqPoint,
  rqReason,
  rqType,
}: IPolicyRequestForm) => {
  console.log("formToPolicyRequest input: ");
  console.log({
    plId,
    pfId,
    pfName,
    rqName,
    rqPlus,
    rqPoint,
    rqReason,
    rqType,
  });
  const result = {
    plId: parseInt(plId),
    pfId: pfId,
    rqName,
    rqPlus,
    rqPoint,
    rqReason,
    rqType,
  };
  console.log("formToPolicyRequest result: ");
  console.log(result);
  return result;
};

export const getPlatformByPfId = (pfId: number) =>
  PLATFORMS.find((it) => it.pfId === pfId);

export const getPlatformByPfName = (pfName: string) =>
  PLATFORMS.find((it) => it.pfName === pfName);
