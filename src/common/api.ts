import axios, { AxiosError, AxiosResponse } from "axios";
import dayjs from "dayjs";
import SKKU_EMBLEM from "../assets/skku_emblem_kor.png";
import SOSD_LOGO from "../assets/sosd_logo.svg";
import { POLICY_REQUEST_TYPE } from "./apiManager";
import { dayjsToStamp, getCookie } from "./utils";

const HOST = "https://kingocoin.cs.skku.edu";
const COIN_ROUTE = "/api/coin";
const USER_ROUTE = "/api/user";
const POLICY_ROUTE = "/api/policy";
const STATICS_ROUTE = "/api/statics";
const DEV_ROUTE = "/api/dev";

const JWT_COOKIE = "accessToken";

export const PLATFORMS = [
  {
    pfName: "온라인명륜당",
    pfLogo: null,
    pfLink: "https://mrdang.cs.skku.edu",
  },
  {
    pfName: "학과 행사 참석",
    pfLogo: SKKU_EMBLEM,
    pfLink:
      "https://sw.skku.edu/sw/notice.do?mode=list&srCategoryId1=1587&srSearchKey=&srSearchVal=",
  },
  {
    pfName: "오픈소스플랫폼",
    pfLogo: SOSD_LOGO,
    pfLink: "https://sosd.skku.edu",
  },
  {
    pfName: "킹고인과의 만남",
    pfLogo: SKKU_EMBLEM,
    pfLink:
      "https://sw.skku.edu/sw/notice.do?mode=list&srCategoryId1=1587&srSearchKey=&srSearchVal=",
  },
];

export const FAQS = [
  {
    faqId: 0,
    question: "Q. 킹고코인에 사용기한이 있나요?",
    answer: "A. 킹고코인은 매년 초기화됩니다.",
  },
  {
    faqId: 1,
    question: "Q. 휴학생도 킹고코인을 사용할 수 있나요?",
    answer:
      "A. 킹고코인 포인트는 AWS, GPU 개인사용 크레딧, IT 기기대여, 세미나실 사용 등에 사용될 수 있으며, 코리아챌린지와 글로벌챌린지를 비롯한 각종 학과내 행사에 있어서 선발 기준에 적용될 수 있습니다.",
  },
];

const handleAxiosSuccess = (response: AxiosResponse) => {
  return response;
};

const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    console.log("Server Error:", error.response.data);
  } else if (error.request) {
    console.log("No response received:", error.request);
  } else {
    console.log("Error:", error.message);
  }
  return Promise.reject(error);
};

const client = axios.create({
  baseURL: HOST,
});
axios.interceptors.response.use(handleAxiosSuccess, handleAxiosError);

const clientWithToken = axios.create({
  baseURL: HOST,
  withCredentials: true,
  headers: { Authorization: `bearer ${getCookie(JWT_COOKIE)}` },
});
clientWithToken.interceptors.response.use(handleAxiosSuccess, handleAxiosError);

// TODO: testApi 삭제
export const testApi = () => {
  console.log("getCoin");
  console.log(getCoin(1));
  console.log("----------------");
  console.log("getCoinDetail");
  console.log(getCoinDetail(1));
  console.log("----------------");
  console.log("getCoinDetailByAdId");
  console.log(getCoinDetailByAdId(1));
  console.log("----------------");
  console.log("postManualCoin");
  console.log(
    postManualCoin({
      stId: 123,
      stName: "123",
      plId: 123,
      title: "123",
      plus: false,
      point: -123,
      adId: 123,
      gainedDate: dayjsToStamp(dayjs()),
    })
  );
  console.log("----------------");
  console.log("getUsersBySearch");
  console.log(getUsersBySearch({ page: 0, pageSize: 10 }));
  console.log(
    getUsersBySearch({
      page: 0,
      pageSize: 10,
      column: "stId",
      search: "123456",
    })
  );
  console.log(
    getUsersBySearch({
      page: 0,
      pageSize: 10,
      column: "stId",
      search: "20",
    })
  );
  console.log("----------------");
  console.log("getUserDetail");
  console.log(getUserDetail(1));
  console.log("----------------");
  console.log("getPolicies");
  console.log(getPolicies("me"));
  console.log("----------------");
  console.log("postPolicyRequest");
  console.log(
    postPolicyRequest({
      plId: 123,
      pfId: 123,
      rqName: "123",
      rqPlus: true,
      rqPoint: 123,
      rqReason: "123",
      rqType: POLICY_REQUEST_TYPE.UPDATE,
    })
  );
  console.log("----------------");
  console.log("getStaticsByMonth");
  console.log(getStaticsByMonth());
  console.log("----------------");
  console.log("getJWTClaims");
  console.log(getJWTClaims(getCookie(JWT_COOKIE)!));
  console.log("----------------");
};

/* Coin */

interface ICoin {
  coinId: number;
  userId: number;
  pointTotal: number;
  pointPlus: number;
  pointMinus: number;
  createdDate: string;
  modifiedDate: string;
}

export const getCoin = async (userId: number): Promise<ICoin> => {
  const path = `/${userId}`;
  const response = await client.get(COIN_ROUTE + path);
  return response.data;
};
// getCoin 사용 예제
// const {
//   isLoading: userCoinIsLoading,
//   error: userCoinError,
//   data: userCoin,
// } = useQuery(["userCoin"], () => getCoin(userId));

interface ICoinDetail {
  dtId: number;
  coinId: number;
  pointTotal: number;
  plus: boolean;
  point: number;
  plId: number;
  plName: string;
  title: string;
  adId: number;
  adGroup: string;
  provider: string;
  createdDate: string;
  modifiedDate: string;
}

export const getCoinDetail = async (userId: number): Promise<ICoinDetail[]> => {
  const path = `/${userId}/detail`;
  const response = await client.get(COIN_ROUTE + path);

  const result = response.data.map((it: ICoinDetail) => ({
    ...it,
    id: it.dtId,
  }));

  return result;
};
// getCoinDetail 사용 예제
// const {
//   isLoading: userCoinDetailIsLoading,
//   error: userCoinDetailError,
//   data: userCoinDetail,
// } = useQuery(["userCoinDetail", userId], () => getCoinDetail(userId));

export const getCoinDetailByAdId = async (
  adId: number
): Promise<ICoinDetail[]> => {
  const path = `/admin/${adId}`;
  const response = await client.get(COIN_ROUTE + path);
  return response.data;
};
// getCoinDetailByAdId 사용 예제
// const {
//   isLoading: adCoinDetailIsLoading,
//   error: adCoinDetailError,
//   data: adCoinDetail,
// } = useQuery(["adCoinDetail"], () => getCoinDetailByAdId(adId));

interface IGrantedCoin {
  stId: number;
  stName: string;
  plId: number;
  title: string;
  plus: boolean;
  point: number;
  adId: number;
  gainedDate: string;
}

export const postManualCoin = async ({
  stId,
  stName,
  plId,
  title,
  plus,
  point,
  adId,
  gainedDate,
}: IGrantedCoin): Promise<{ dtId: number }> => {
  const path = `/point/manual`;
  const response = await client.post(COIN_ROUTE + path, {
    stId,
    stName,
    title,
    point,
    adId,
    plId,
    plus,
    gainedDate,
  });

  return response.data;
};

/* User */

export interface ISearchOptions {
  order?: "asc" | "desc";
  page: number;
  pageSize: number;
  column?: string;
  search?: string;
}

interface IUser {
  userId: number;
  stId: number;
  stName: string;
  dept: string;
  pointTotal: number;
  pointPlus: number;
  role: string;
}

// TODO: data.length 되돌리기
export const getUsersBySearch = async ({
  order = "desc",
  page,
  pageSize,
  column,
  search,
}: ISearchOptions): Promise<{ data: IUser[]; length: number }> => {
  let path = `/?order=${order}&page=${page}&size=${pageSize}&column=${column}&search=${search}`;

  // (column == undefined || search == undefined): 모든 유저 검색
  if (!column || !search)
    path = `/?order=${order}&page=${page}&size=${pageSize}`;

  const response = await client.get(USER_ROUTE + path);
  const result = {
    data: response.data.map((it: IUser) => ({ ...it, id: it.userId })),
    length: response.data.length,
  };
  return result;
};
// getUsersBySearch 사용 예제
// const {
//   isLoading: usersIsLoading,
//   error: usersError,
//   data: users,
// } = useQuery(["users"], () => getUsersBySearch(searchOptions));

interface IUserDetail {
  stId: number;
  stName: string;
  stDegree: string;
  stStatus: string;
  stDept: string;
}

export const getUserDetail = async (userId: number): Promise<IUserDetail> => {
  const path = `/detail/${userId}`;
  const response = await client.get(USER_ROUTE + path);
  return response.data;
};
// getUserDetail 사용 예제
// const {
//   isLoading: userDetailIsLoading,
//   error: userDetailError,
//   data: userDetail,
// } = useQuery(["userDetail", userId], () => getUserDetail(userId));

interface Policy {
  plId: number;
  plName: string;
  plCode: string;
  pfName: string;
  plus: boolean;
  point: number;
  available: boolean;
}

// TODO: dummy 삭제
export const getPolicies = async (only?: "me"): Promise<Policy[]> => {
  let path = ``;
  if (only) path = `/?only=${only}`;
  // const response = await clientWithToken.get(POLICY_ROUTE + path);
  const response = {
    data: [
      {
        plId: 123,
        plName: "123",
        plCode: "123",
        pfName: "123",
        plus: true,
        point: 123,
        available: true,
      },
      {
        plId: 2,
        plName: "2",
        plCode: "2",
        pfName: "2",
        plus: false,
        point: -2,
        available: false,
      },
    ],
  };

  return response.data;
};
// getPolicies 사용 예제
// const {
//   isLoading: policiesIsLoading,
//   error: policiesError,
//   data: policies,
// } = useQuery(["policies"], () => getPolicies(null));

interface IPolicyRequest {
  plId: number;
  pfId: number;
  rqName: string;
  rqPlus: boolean;
  rqPoint: number;
  rqReason: string;
  rqType: POLICY_REQUEST_TYPE;
}

export const postPolicyRequest = async ({
  plId,
  pfId,
  rqName,
  rqPlus,
  rqPoint,
  rqReason,
  rqType,
}: IPolicyRequest): Promise<{ rqId: number }> => {
  let path = `/request?plId=${plId}`;
  if (rqType === "CREATE" || plId === null) path = `/request`;
  const result = await clientWithToken.post(POLICY_ROUTE + path, {
    plId,
    pfId,
    rqName,
    rqPoint,
    rqReason,
    rqPlus,
    rqType,
  });

  return result.data;
};

/* Statics */

interface IStaticsByMonth {
  smId: number;
  year: number;
  month: number;
  pointTotal: number;
  createdDate: string;
  modifiedDate: string;
}

export const getStaticsByMonth = async (): Promise<IStaticsByMonth[]> => {
  const path = `/month`;
  const response = await client.get(STATICS_ROUTE + path);
  const result = response.data.map((it: IStaticsByMonth) => ({
    ...it,
    id: it.smId,
  }));
  return result;
};
// getStaticsByMonth 사용 예제
// const {
//   isLoading: statisticIsLoading,
//   error: statisticError,
//   data: statistic,
// } = useQuery(["statistic"], getStaticsByMonth);

/* Dev */

export const getDevToken = async () => {
  const path = `/token?key=ssa-dev-key-v1`;
  const result = await client.get(DEV_ROUTE + path);
  const accessToken = result.data;
  document.cookie = `accessToken=${accessToken}`;
};

export const getJWTClaims = async (
  accessToken: string
): Promise<{
  userId: number;
  role: string;
}> => {
  const path = `/token/claims?token=${accessToken}`;
  const response = await client.get(DEV_ROUTE + path);
  // const dummy = {
  //   userId: 1,
  //   role: "ROLE_ADMIN",
  // };
  return response.data;
};
