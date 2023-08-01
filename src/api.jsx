import axios from "axios";
import SKKU_EMBLEM from "./assets/skku_emblem_kor.png";
import SOSD_LOGO from "./assets/sosd_logo.svg";

// TODO: api 연결시 에러 핸들링
//
// try {
//   if (await result.status === 200) {
//     return result
//   } else {
//     throw new Error("API 호출 오류");
//   }
// } catch (error) {
//   console.error("API 호출 오류:", error);
//   throw error;
// }

// 07.27(목) api 문서 구현 코드
// 변수명 앞의 언더바 _ 는 이후 추가해야할 변수를 의미한다.

const HOST = "https://kingocoin.cs.skku.edu";
const COIN_ROUTE = "/api/coin";
const USER_ROUTE = "/api/user";
const POLICY_ROUTE = "/api/policy";
const STATICS_ROUTE = "/api/statics";
const DEV_ROUTE = "/api/dev";

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

axios.defaults.baseURL = HOST;
// TODO: CORS 설정 맞추기
// axios.defaults.withCredentials = true;
// axios.defaults.headers.Authorization = `Bearer ${getCookie("accessToken")}`; // getDevToken으로 이동

// TODO: 조정에 따라 api 코드 변경
// 더미 데이터 추가 - response.data.push(...) 삭제
// api 호출 오류 해결 - dummy 삭제

/* Coin */

/**
 * getCoin
 * @param {number} userId - 유저 식별자
 * @return {{
 * coinId: number,
 * userId: number,
 * pointTotal: number,
 * pointPlus: number,
 * pointMinus: number,
 * createdDate: string,
 * modifiedDate: string
 * }} 코인 정보
 */
export const getCoin = async (userId) => {
  const path = `/${userId}`;
  const response = await axios.get(COIN_ROUTE + path);
  return response.data;
};
// getCoin 사용 예제
// const {
//   isLoading: userCoinIsLoading,
//   error: userCoinError,
//   data: userCoin,
// } = useQuery(["userCoin"], () => getCoin(userId));

/**
 * getCoinDetail
 * @param {number} userId 유저 식별자
 * @return {{
 * dtId: number,
 * coinId: number,
 * pointTotal: number,
 * plus: boolean,
 * point: number,
 *
 * plId: number,
 * plName: string,
 * title: string,
 *
 * adId: number,
 * adGroup: string,
 * _pfName: string,
 * _provider: string,
 *
 * createdDate: string,
 * modifiedDate: string
 * }[]} 해당 유저가 부여받은 코인 거래내역 세부사항 배열
 */
export const getCoinDetail = async (userId) => {
  const path = `/${userId}/detail`;
  const response = await axios.get(COIN_ROUTE + path);
  response.data.push({
    dtId: 1,
    coinId: 1,
    pointTotal: 12,
    plus: true,
    point: 1,

    plId: 1,
    plName: "string",
    title: "string",

    adId: 1,
    adGroup: "string",
    _pfName: "string",
    _provider: "string",

    createdDate: "string",
    modifiedDate: "string",
  });

  const result = response.data.map((it) => ({
    ...it,
    id: it.dt_id,
    modified_date: new Date(it.modified_date).toLocaleDateString("ko-KR", {
      timeZone: "UTC",
    }),
  }));

  return result;
};
// getCoinDetail 사용 예제
// const {
//   isLoading: userCoinDetailIsLoading,
//   error: userCoinDetailError,
//   data: userCoinDetail,
// } = useQuery(["userCoinDetail", userId], () => getCoinDetail(userId));

/**
 * getCoinDetailByAdminId
 * @param {number} adId - 운영자 식별자
 * @return {{
 * dtId: number,
 * coinId: number,
 * pointTotal: number,
 * plus: boolean,
 * point: number,
 *
 * plId: number,
 * plName: string,
 * title: string,
 *
 * adId: number,
 * adGroup: string,
 * _pfName: string,
 * _provider: string,
 *
 * createdDate: string,
 * modifiedDate: string
 * }[]} 해당 운영자가 부여한 코인 거래내역 세부사항 배열
 */
export const getCoinDetailByAdminId = async (adId) => {
  const path = `/admin/${adId}`;
  // const response = await axios.get(COIN_ROUTE + path);
  const dummy = [
    {
      dtId: 1,
      coinId: 1,
      pointTotal: 12,
      plus: true,
      point: 1,

      plId: 1,
      plName: "string",
      title: "string",

      adId: 1,
      adGroup: "string",
      _pfName: "string",
      _provider: "string",

      createdDate: "string",
      modifiedDate: "string",
    },
  ];
  return dummy;
};
// getCoinDetailByAdminId 사용 예제
// const {
//   isLoading: adCoinDetailIsLoading,
//   error: adCoinDetailError,
//   data: adCoinDetail,
// } = useQuery(["adCoinDetail"], () => getCoinDetailByAdminId(adId));

/**
 * postManualCoin
 * @param {number} stId 학번
 * @param {string} stName 학생명
 * @param {string} title 제목
 * @param {number} point 코인값
 * @param {number} plus 코인값 부호
 * @param {number} adId 운영자 식별자
 * @param {number} plId 정책 식별자
 * @param {string} gainedDate 부여 날짜
 * @returns {{
 * dtId: number
 * }} 정책 내역 식별자
 */
export const postManualCoin = async (
  stId,
  stName,
  plId,
  title,
  plus,
  point,
  adId,
  gainedDate
) => {
  const path = `/point/manual`;
  const response = await axios.post(COIN_ROUTE + path, {
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

/**
 * getUsersBySearch
 * (column == null || search == null): 모든 유저 검색
 * @param {number} page N번째 페이지
 * @param {number} size 페이지당 row 개수
 * @param {string?} column 검색 필드명
 * @param {string?} search 검색 값
 * @returns {{
 * userId: number,
 * stId: number,
 * stName: string,
 * dept: string,
 * pointTotal: number,
 * pointPlus: number,
 * role: string
 * }[]} 학생 정보 배열
 */
export const getUsersBySearch = async (page, size, column, search) => {
  let path = `/?page=${page}&size=${size}&column=${column}&search=${search}`;
  if (!column || !search) {
    path = `/?page=${page}&size=${size}`;
  }
  // const response = await axios.get(USER_ROUTE + path);
  const dummy = [
    {
      userId: 1,
      stId: 2020312123,
      stName: "학생1",
      dept: "SOSC",
      pointTotal: 10,
      pointPlus: 10,
      role: "admin",
    },
  ];
  return dummy;
};
// getUsersBySearch 사용 예제
// const {
//   isLoading: usersIsLoading,
//   error: usersError,
//   data: users,
// } = useQuery(["users"], () => getUsersBySearch(page, size, column, search));

/**
 * getUserDetail
 * @param {number} userId 사용자 식별자
 * @returns {Promise<{
 * stId: number,
 * stName: string,
 * stDegree: string,
 * stStatus: string,
 * stDept: string
 * }>} 학생 정보를 반환하는 프로미스 객체
 */
export const getUserDetail = async (userId) => {
  const path = `/detail/${userId}`;
  const response = await axios.get(USER_ROUTE + path);
  response.data.push({
    stId: 1,
    stName: "string",
    stDegree: "string",
    stStatus: "string",
    stDept: "string",
  });
  return response.data;
};
// getUserDetail 사용 예제
// const {
//   isLoading: userDetailIsLoading,
//   error: userDetailError,
//   data: userDetail,
// } = useQuery(["userDetail", userId], () => getUserDetail(userId));

/**
 * getPolicies
 * @param {string?} only 전체조회,  null | "me"
 * @returns {Promise<{
 * plId: number,
 * plName: string,
 * pfName: string,
 * plus: boolean,
 * point: number,
 * available: boolean
 * }[]>} 정책 배열을 반환하는 프로미스 객체
 */
export const getPolicies = async (only) => {
  const path = ``;
  // const response = await axios.get(POLICY_ROUTE + path);
  const dummy = [
    {
      plId: 1,
      plName: "name1",
      plCode: "P110102",
      pfName: "플랫폼1",
      plus: true,
      point: 1,
      available: true,
    },
    {
      plId: 1,
      plName: "name1",
      plCode: "P110102",
      pfName: "플랫폼2",
      plus: true,
      point: 1,
      available: true,
    },
  ];
  return dummy;
};
// getPolicies 사용 예제
// const {
//   isLoading: policiesIsLoading,
//   error: policiesError,
//   data: policies,
// } = useQuery(["policies"], getPolicies);

/**
 * 정책 생성 및 수정 요청 (postPolicyRequest)
 * @param {number?} plId 정책명
 * @param {number} pfId 플랫폼명
 * @param {string} rqName 요청 정책명
 * @param {number} rqPoint 요청 코인값
 * @param {string} rqReason 요청 사유
 * @param {boolean} rqPlus 요청 코인값 부호
 * @param {string} rqType 요청 타입 CREATE|UPDATE|DEACTIVATE|ACTIVATE|DELETE
 * @returns {Promise<{
 * rqId: number
 * }[]>} 요청 식별자를 반환하는 프로미스 객체
 */
export const postPolicyRequest = (
  plId,
  pfId,
  rqName,
  rqPoint,
  rqReason,
  rqPlus,
  rqType
) => {
  const path = `/request?plId=${plId}`;
  if (rqType === "CREATE" || plId === null) path = `/request`;
  const result = axios.post(POLICY_ROUTE + path, {
    plId,
    pfId,
    rqName,
    rqPoint,
    rqReason,
    rqPlus,
    rqType,
  });

  return result;
};

/* Statics */

/**
 * getStaticsByMonth
 * @returns {Promise<{
 * smId: number,
 * year: number,
 * month: number,
 * coinTotal: number,
 * createdDate: string,
 * modifiedDate: string
 * }[]>} 정책 배열을 반환하는 프로미스 객체
 */
export const getStaticsByMonth = async () => {
  const path = `/month`;
  const response = await axios.get(STATICS_ROUTE + path);
  return response.data;
};
// getStaticsByMonth 사용 예제
// const {
//   isLoading: statisticIsLoading,
//   error: statisticError,
//   data: statistic,
// } = useQuery(["statistic"], getStaticsByMonth);

/* Dev */

/**
 * getDevToken
 */
export const getDevToken = async () => {
  const path = `/token?key=ssa-dev-key-v1`;
  const result = await axios.get(DEV_ROUTE + path);
  const accessToken = result.data;
  document.cookie = `accessToken=${accessToken}`;
};

/**
 * getJWTClaims
 * @param {string} accessToken JWT토큰
 * @returns {Promise<{
 * userId: number,
 * role: string
 * }>} 유저 정보를 반환하는 프로미스 객체
 */
export const getJWTClaims = async (accessToken) => {
  const path = `/token/claims?token=${accessToken}`;
  const response = await axios.get(DEV_ROUTE + path);
  return response.data;
};
