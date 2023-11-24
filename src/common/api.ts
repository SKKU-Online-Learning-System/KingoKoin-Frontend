import SKKU_EMBLEM from "../assets/skku_emblem_kor.png";
import SOSD_LOGO from "../assets/sosd_logo.svg";
import {
  POLICY_REQUEST_TYPE,
  USER_ROLE,
  client,
  clientWithToken,
  refreshClientToken,
  setAccessCookie,
} from "./apiManager";

/** api 라우트 정보 */
enum ROUTE {
  STUDENT = "api/student",
  COIN = "/api/coin",
  USER = "/api/user",
  POLICY = "/api/policy",
  STATICS = "/api/statics",
  DEV = "/api/dev",
  AUTH = "/api/auth",
}

/** 하드코딩된 플랫폼 정보 */
export const PLATFORMS = [
  {
    pfId: 1,
    pfName: "온라인명륜당",
    pfLogo: null,
    pfLink: "https://mrdang.cs.skku.edu",
  },
  {
    pfId: 2,
    pfName: "학과 행사 참석",
    pfLogo: process.env.PUBLIC_URL + SKKU_EMBLEM,
    pfLink:
      "https://sw.skku.edu/sw/notice.do?mode=list&srCategoryId1=1587&srSearchKey=&srSearchVal=",
  },
  {
    pfId: 3,
    pfName: "오픈소스플랫폼",
    pfLogo: process.env.PUBLIC_URL + SOSD_LOGO,
    pfLink: "https://sosd.skku.edu",
  },
  {
    pfId: 4,
    pfName: "킹고인과의 만남",
    pfLogo: process.env.PUBLIC_URL + SKKU_EMBLEM,
    pfLink:
      "https://sw.skku.edu/sw/notice.do?mode=list&srCategoryId1=1587&srSearchKey=&srSearchVal=",
  },
];

export const getPlatformByPfId = (pfId: number) =>
  PLATFORMS.find((it) => it.pfId === pfId);

export const getPlatformByPfName = (pfName: string) =>
  PLATFORMS.find((it) => it.pfName === pfName);

/** 하드코딩된 FAQ 정보 */
export const FAQS = [
  {
    faqId: 0,
    question: "Q. 킹고코인에 사용기한이 있나요?",
    answer:
      "A. 킹고코인은 매년 초기화됩니다. 따라서 보유 중인 코인이 사라지기 전에 적절하게 사용하는 것이 권장됩니다.",
  },
  {
    faqId: 1,
    question: "Q. 킹고코인을 어디에 사용할 수 있나요?",
    answer:
      "A. 킹고코인은 AWS, GPU 개인사용 크레딧, IT 기기대여, 세미나실 사용 등에 사용될 수 있으며, 코리아챌린지와 글로벌챌린지를 비롯한 소프트웨어학과내 각종 행사에 있어서 선발 기준에 적용될 수 있습니다.",
  },
  {
    faqId: 2,
    question: "Q. 타과생도 킹고코인을 사용할 수 있나요?",
    answer:
      "A. 현재 킹고코인은 소프트웨어학과 원전공생들을 대상으로 하고 있습니다.",
  },
  {
    faqId: 3,
    question: "Q. 코인 내역에 오류가 발생한 것 같은데 어떻게 해야하나요?",
    answer:
      "A. 홈페이지 아래 이메일로 코인 내역의 스크린샷과 함께 문의 메일을 작성해주시면 확인 후 조치해드리도록 하겠습니다.",
  },
  {
    faqId: 4,
    question: "Q. 휴학생도 킹고코인을 사용할 수 있나요?",
    answer:
      "A. 성균관대학교 소프트웨어학과 원전공생이라면 학년, 휴학유무와 관계없이 킹고코인을 획득하거나 사용하실 수 있습니다. 다만 혜택에 있어서 휴학유무에 따라 각종 행사 내 선발 기준에 제한이 있을 수 있습니다.",
  },
];

// API 부분 수정중 ~ing
// swagger 문서에 따라 순서대로 정리함

// 1. Student. 학생(student) API

// POST /api/student/{userId} 학생 저장 및 업데이트 (postStudents)
export interface IStudent {
  stId: number;
  stName: string;
  stDegree: string;
  stStatus: string;
  stDept: string;
}

export const postStudents = async (
  userId: number,
  student: IStudent
): Promise<number> => {
  const path = `/${userId}`;
  const response = await clientWithToken.post(ROUTE.STUDENT + path, student);
  return response.data;
};

// GET /api/student/{UserId}/detail 학생 정보 조회 (getStudentDetail)
export interface IStudentDetail {
  userId: number;
  stId: number;
  stName: string;
  stDept: string;
  stDegree: string;
  stStatus: string;
}

export const getStudentDetail = async (
  userId: number
): Promise<IStudentDetail> => {
  const path = `/${userId}/detail`;
  const response = await clientWithToken.get(ROUTE.STUDENT + path);
  return response.data;
};

// GET /api/stduent 학생 리스트 조회 (getStudentsBySearch)
export interface ISearchOptions {
  column?: string; // optional
  search?: string; // optional
  order: "asc" | "desc"; // required
}

export interface IStudentListItem {
  userId: number;
  stId: number;
  stName: string;
  stDept: string;
  pointTotal: number;
  pointPlus: number;
}

export const getStudentsBySearch = async ({
  order = "desc", // 기본값 desc
  column,
  search,
}: ISearchOptions): Promise<IStudentListItem[]> => {
  let path = `/?order=${order}`;
  if (column && search) {
    path += `&column=${column}&search=${search}`;
  }

  const response = await clientWithToken.get(ROUTE.STUDENT + path);
  const result = response.data.map((it: IStudentListItem) => ({
    ...it,
    id: it.userId,
  }));
  return result; // MUI를 위한 id 추가
};

// 2. Policy 정책(Policy) API

// POST /api/policy/request 정책 생성 및 수정 요정 (postPolicyRequest)
interface IPolicyRequest {
  plId?: number;
  pfId: number;
  rqName: string;
  rqPoint: number;
  rqReason: string;
  rqPlus: boolean;
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
  if (rqType === "CREATE" || !plId) path = `/request`;
  const reponse = await clientWithToken.post(ROUTE.POLICY + path, {
    plId,
    pfId,
    rqName,
    rqPoint,
    rqReason,
    rqPlus,
    rqType,
  });

  return reponse.data;
};

// GET /api/policy 정책 조회 (getPoliciesByAdId)
export interface IPolicy {
  plId: number;
  plName: string;
  plCode: string;
  pfName: string;
  plus: boolean;
  point: number;
  available: boolean;
}

export const getPolicies = async (only?: "me"): Promise<IPolicy[]> => {
  let path = `/`;
  if (only) path = `/?only=${only}`;
  const response = await clientWithToken.get(ROUTE.POLICY + path);

  // MUI를 위한 id 추가
  const result = response.data.map((it: IPolicy) => ({
    ...it,
    id: it.plId,
  }));
  return result;
};

// 3. Dev 개발용 API

// GET /api/dev/token/student 학생용 JWT 토큰 발급받기
// export const getStudentDevToken = async () => {
//   // const path = `/token/student?key=ssa-dev-key-v1`;
//   const path = `/token?key=ssa-dev-key-v1`;
//   const result = await client.get(ROUTE.DEV + path);
//   console.log("result:", result);
//   const accessToken = result.data;
//   setAccessCookie(accessToken);
//   refreshClientToken();
// };

// GET /api/dev/tokent/admin
export const getAdminDevToken = async () => {
  const path = `/token/admin?key=ssa-dev-key-v1`;
  const result = await client.get(ROUTE.DEV + path);
  const accessToken = result.data;
  setAccessCookie(accessToken);
  refreshClientToken();
};

// GET /api/dev/token/claims JWT 토큰의 클레임 가져오기
export interface IAuth {
  userId: number;
  role: USER_ROLE;
}

export const getJWTClaims = async (accessToken: string): Promise<IAuth> => {
  const path = `/token/claims?token=${accessToken}`;
  const response = await client.get(ROUTE.DEV + path);
  return response.data;
};

// apiManger.ts에서 사용하는 부분. swagger에는 없다.
export const refreshAccessToken = async (
  refreshToken: string
): Promise<string> => {
  const path = `/refresh?refreshToken=${refreshToken}`;
  const response = await clientWithToken.get(ROUTE.AUTH + path);
  return response.data;
};

// 4. Coin 코인(Coin) API

// POST /api/coin/point/manual 코인 수동 부여 (postManualPoint)
interface IManualGrantedCoin {
  stId: number;
  stName: string;
  title: string;
  point: number;
  plId: number;
  plus: boolean;
  gainedDate: string;
}

export const postManualCoin = async ({
  stId,
  stName,
  title,
  point,
  plId,
  plus,
  gainedDate,
}: IManualGrantedCoin): Promise<{ dtId: number }> => {
  const path = `/point/manual`;
  const response = await clientWithToken.post(ROUTE.COIN + path, {
    stId,
    stName,
    title,
    point,
    plId,
    plus,
    gainedDate,
  });

  return response.data;
};

// POST /api/coin/point/auto 코인 자동 부여 (postAutoPoint)
interface IAutoGrantedCoin {
  stId: number;
  stName: string;
  key: string;
  plId: number;
  provider: string;
  plus: boolean;
}

export const postAutoPoint = async ({
  stId,
  stName,
  key,
  plId,
  provider,
  plus,
}: IAutoGrantedCoin): Promise<number> => {
  const path = `/point/auto`;
  const response = await clientWithToken.post(ROUTE.COIN + path, {
    stId,
    stName,
    key,
    plId,
    provider,
    plus,
  });
  return response.data;
};

// GET /api/coin/{userId} 학생 총 보유 포인트 조회 (getCoin)
export interface ICoin {
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
  const response = await clientWithToken.get(ROUTE.COIN + path);
  return response.data;
};

// GET /api/coin/{userId}/detail 학생의 최근 거래 내역 조회 (getCoinDetailByStudent)
interface ICoinDetailByStudent {
  dtId: number;
  coinId: number;
  pointTotal: number;
  plId: number;
  title: string;
  plus: boolean;
  point: number;
  provider: string;
  createdDate: string;
  modifiedDate: string;
}

export const getCoinDetailByStudent = async (
  userId: number
): Promise<ICoinDetailByStudent[]> => {
  const path = `/${userId}/detail`;
  const response = await clientWithToken.get(ROUTE.COIN + path);

  // MUI를 위한 id 추가
  const result = response.data.map((it: ICoinDetailByStudent) => ({
    ...it,
    id: it.dtId,
  }));
  return result;
};

// GET /api/coin/admin/detail 관리자의 최근 부여 내역 조회 (getCoinDetailByAdmin)
interface ICoinDetailByAdmin {
  dtId: number;
  coinId: number;
  pointTotal: number;
  plId: number;
  title: string;
  plus: boolean;
  point: number;
  provider: string;
  createdDate: string;
  modifiedDate: string;
}

export const getCoinDetailByAdmin = async (
  userId: number
): Promise<ICoinDetailByAdmin[]> => {
  const path = `/${userId}/detail`;
  const response = await clientWithToken.get(ROUTE.COIN + path);

  // MUI를 위한 id 추가
  const result = response.data.map((it: ICoinDetailByAdmin) => ({
    ...it,
    id: it.dtId,
  }));
  return result;
};

/*

아래로는 legacy
혹시 몰라서 일단 주석 처리해놓음

*/

/* Coin api */

// export interface ICoin {
//   coinId: number;
//   userId: number;
//   pointTotal: number;
//   pointPlus: number;
//   pointMinus: number;
//   createdDate: string;
//   modifiedDate: string;
// }

// export const getCoin = async (userId: number): Promise<ICoin> => {
//   const path = `/${userId}`;
//   const response = await client.get(ROUTE.COIN + path);
//   return response.data;
// };
// getCoin 사용 예제
// const {
//   isLoading: userCoinIsLoading,
//   error: userCoinError,
//   data: userCoin,
// } = useQuery(["userCoin"], () => getCoin(userId));

// interface ICoinDetail {
//   dtId: number;
//   coinId: number;
//   pointTotal: number;
//   plus: boolean;
//   point: number;
//   plId: number;
//   plName: string;
//   title: string;
//   adId: number;
//   adGroup: string;
//   provider: string;
//   createdDate: string;
//   modifiedDate: string;
// }

// export const getCoinDetail = async (userId: number): Promise<ICoinDetail[]> => {
//   const path = `/${userId}/detail`;
//   const response = await client.get(ROUTE.COIN + path);

//   // MUI를 위한 id 추가
//   const result = response.data.map((it: ICoinDetail) => ({
//     ...it,
//     id: it.dtId,
//   }));
//   return result;
// };
// getCoinDetail 사용 예제
// const {
//   isLoading: userCoinDetailIsLoading,
//   error: userCoinDetailError,
//   data: userCoinDetail,
// } = useQuery(["userCoinDetail", userId], () => getCoinDetail(userId));

// export const getCoinDetailByAdId = async (
//   adId: number
// ): Promise<ICoinDetail[]> => {
//   const path = `/admin/detail`;
//   const response = await clientWithToken.get(ROUTE.COIN + path);

//   // MUI를 위한 id 추가
//   const result = response.data.map((it: ICoinDetail) => ({
//     ...it,
//     id: it.dtId,
//   }));
//   return result;
// };
// getCoinDetailByAdId 사용 예제
// const {
//   isLoading: adCoinDetailIsLoading,
//   error: adCoinDetailError,
//   data: adCoinDetail,
// } = useQuery(["adCoinDetail"], () => getCoinDetailByAdId(adId));

// interface IGrantedCoin {
//   stId: number;
//   stName: string;
//   plId: number;
//   title: string;
//   plus: boolean;
//   point: number;
//   gainedDate: string;
// }

// export const postManualCoin = async ({
//   stId,
//   stName,
//   plId,
//   title,
//   plus,
//   point,
//   gainedDate,
// }: IGrantedCoin): Promise<{ dtId: number }> => {
//   const path = `/point/manual`;
//   const response = await clientWithToken.post(ROUTE.COIN + path, {
//     stId,
//     stName,
//     title,
//     point,
//     plId,
//     plus,
//     gainedDate,
//   });

//   return response.data;
// };

/* User api */

// export interface ISearchOptions {
//   order?: "asc" | "desc";
//   column?: string;
//   search?: string;
// }

// interface IUser {
//   userId: number;
//   stId: number;
//   stName: string;
//   dept: string;
//   pointTotal: number;
//   pointPlus: number;
//   role: string;
// }

// export const getUsersBySearch = async ({
//   order = "desc", // 코인 보유량 정렬 기본값: 내림차순
//   column,
//   search,
// }: ISearchOptions): Promise<IUser[]> => {
//   let path = `/?order=${order}&column=${column}&search=${search}`;

//   // (column == undefined || search == undefined): 모든 유저 검색
//   if (!column || !search) path = `/?order=${order}`;

//   // MUI를 위한 id 추가
//   const response = await client.get(ROUTE.USER + path);
//   const result = response.data.map((it: IUser) => ({ ...it, id: it.userId }));
//   return result;
// };
// getUsersBySearch 사용 예제
// const {
//   isLoading: usersIsLoading,
//   error: usersError,
//   data: users,
// } = useQuery(["users"], () => getUsersBySearch(searchOptions));

// export interface IUserDetail {
//   stId: number;
//   stName: string;
//   stDegree: string;
//   stStatus: string;
//   stDept: string;
// }

// export const getUserDetail = async (userId: number): Promise<IUserDetail> => {
//   const path = `/detail/${userId}`;
//   const response = await client.get(ROUTE.USER + path);
//   return response.data;
// };
// getUserDetail 사용 예제
// const {
//   isLoading: userDetailIsLoading,
//   error: userDetailError,
//   data: userDetail,
// } = useQuery(["userDetail", userId], () => getUserDetail(userId));

/* Policy api */

// export interface IPolicy {
//   plId: number;
//   plName: string;
//   plCode: string;
//   pfName: string;
//   plus: boolean;
//   point: number;
//   available: boolean;
// }

// export const getPolicies = async (only?: "me"): Promise<IPolicy[]> => {
//   let path = `/`;
//   if (only) path = `/?only=${only}`;
//   const response = await clientWithToken.get(ROUTE.POLICY + path);

//   // MUI를 위한 id 추가
//   const result = response.data.map((it: IPolicy) => ({
//     ...it,
//     id: it.plId,
//   }));
//   return result;
// };
// // getPolicies 사용 예제
// // const {
// //   isLoading: policiesIsLoading,
// //   error: policiesError,
// //   data: policies,
// // } = useQuery(["policies"], () => getPolicies());

// interface IPolicyRequest {
//   plId?: number;
//   pfId: number;
//   rqName: string;
//   rqPlus: boolean;
//   rqPoint: number;
//   rqReason: string;
//   rqType: POLICY_REQUEST_TYPE;
// }

// export const postPolicyRequest = async ({
//   plId,
//   pfId,
//   rqName,
//   rqPlus,
//   rqPoint,
//   rqReason,
//   rqType,
// }: IPolicyRequest): Promise<{ rqId: number }> => {
//   let path = `/request?plId=${plId}`;
//   if (rqType === "CREATE" || !plId) path = `/request`;
//   const result = await clientWithToken.post(ROUTE.POLICY + path, {
//     plId,
//     pfId,
//     rqName,
//     rqPoint,
//     rqReason,
//     rqPlus,
//     rqType,
//   });

//   return result.data;
// };

/* Statics api */

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
  const response = await client.get(ROUTE.STATICS + path);

  // MUI를 위한 id 추가
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

/* Dev api */

// TODO: 업로드시 삭제
// export const getDevToken = async () => {
//   const path = `/token?key=ssa-dev-key-v1`;
//   const result = await client.get(ROUTE.DEV + path);
//   const accessToken = result.data;
//   setAccessCookie(accessToken);
//   refreshClientToken();
// };

// export interface IAuth {
//   userId: number;
//   role: USER_ROLE;
// }

// export const getJWTClaims = async (accessToken: string): Promise<IAuth> => {
//   const path = `/token/claims?token=${accessToken}`;
//   const response = await client.get(ROUTE.DEV + path);
//   return response.data;
// };

// /* Auth api */

// export const refreshAccessToken = async (
//   refreshToken: string
// ): Promise<string> => {
//   const path = `/refresh?refreshToken=${refreshToken}`;
//   const response = await clientWithToken.get(ROUTE.AUTH + path);
//   return response.data;
// };
