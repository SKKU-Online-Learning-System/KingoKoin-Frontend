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

const dummyPolicy = [
  {
    plId: 10101,
    plName: "온라인 명륜당 가입",
    pfName: "온라인 명륜당",
    plus: true,
    point: 5,
    createdDate: "2023-05-10T04:05:08.000Z",
    available: true,
  },
  {
    plId: 10102,
    plName: "강좌 시청",
    pfName: "온라인 명륜당",
    plus: true,
    point: 1,
    createdDate: "2023-05-10T04:05:08.000Z",
    available: true,
  },
  {
    plId: 10103,
    plName: "강좌 수료 완료",
    pfName: "온라인 명륜당",
    plus: true,
    point: 20,
    createdDate: "2023-05-10T04:05:08.000Z",
    available: true,
  },
  {
    plId: 20101,
    plName: "특별 이벤트",
    pfName: "온라인 명륜당",
    plus: false,
    point: 10,
    createdDate: "2023-05-10T04:05:08.000Z",
    available: false,
  },
  {
    plId: 20102,
    plName: "화상강연 참석",
    pfName: "소프트웨어학과 행정실",
    plus: true,
    point: 10,
    createdDate: "2023-05-10T04:05:08.000Z",
    available: true,
  },
  {
    plId: 10202,
    plName: "SOSD 가입",
    pfName: "SOSD",
    plus: true,
    point: 10,
    createdDate: "2023-05-10T04:05:08.000Z",
    available: true,
  },
  {
    plId: 20103,
    plName: "해외 봉사 활동 참여",
    pfName: "온라인 명륜당",
    plus: true,
    point: 10,
    createdDate: "2023-05-10T04:05:08.000Z",
    available: true,
  },
  {
    plId: 30101,
    plName: "세미나실 초과 대여 ",
    pfName: "온라인 명륜당",
    plus: true,
    point: 10,
    createdDate: "2023-05-10T04:05:08.000Z",
    available: false,
  },
  {
    plId: 99999,
    plName: "직접입력",
    pfName: "소프트웨어학과 행정실",
    plus: true,
    point: 0,
    createdDate: "2023-05-10T04:05:08.000Z",
    available: true,
  },
];

const dummyPlatforms = [
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

/**
 * Fetch Coin
 * @param {number} user_id - 유저 식별자
 * @return {Promise<{
 * point_total: number,
 * point_plus: number,
 * point_minus: number
 * }>} 코인 객체를 반환하는 프로미스 객체
 */
export const fetchCoin = async (user_id) => {
  const dummyCoin = {
    point_total: 18,
    point_plus: 24,
    point_minus: 6,
  };

  const result = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(dummyCoin);
    }, 500);
  });

  return result;
};

/**
 * Fetch CoinDetails
 * @param {number} user_id 유저 식별자
 * @param {number} page n번째 페이지
 * @param {number} size 페이지 크기
 * @returns {Promise<{
 * dt_id: number,
 * pf_name: string,
 * pl_name: string,
 * plus: boolean,
 * point:number,
 * point_total: number,
 * modified_date: string
 * }>} 코인 거래내역 세부사항 배열을 반환하는 프로미스 객체
 */
export const fetchCoinDetails = async (user_id) => {
  const dummyCoinDetails = [
    {
      dt_id: 0,
      pf_name: "소프트웨어학과 행정실",
      pl_name: "장비 대여",
      adGroup: "소프트웨어학과",
      plus: false,
      point: 10,
      point_total: 180,
      modified_date: "2023-07-12T04:05:08.000Z",
    },
    {
      dt_id: 1,
      pf_name: "온라인명륜당",
      pl_name: "온라인명륜당 강좌 수강",
      adGroup: "온라인명륜당",
      plus: true,
      point: 10,
      point_total: 190,
      modified_date: "2023-07-11T04:05:08.000Z",
    },
    {
      dt_id: 2,
      pf_name: "온라인명륜당",
      pl_name: "온라인명륜당 가입",
      adGroup: "온라인명륜당",
      plus: true,
      point: 20,
      point_total: 170,
      modified_date: "2023-07-11T04:05:08.000Z",
    },
    {
      dt_id: 3,
      pf_name: "SOSD",
      pl_name: "분기별 상위 10%",
      adGroup: "SOSD",
      plus: false,
      point: 50,
      point_total: 120,
      modified_date: "2023-07-01T04:05:08.000Z",
    },
    {
      dt_id: 4,
      pf_name: "소프트웨어학과 행정실",
      pl_name: "킹고인과의 만남 강연 참석",
      adGroup: "소프트웨어학과",
      plus: true,
      point: 10,
      point_total: 100,
      modified_date: "2023-05-10T04:05:08.000Z",
    },
    {
      dt_id: 5,
      pf_name: "SOSD",
      pl_name: "특별 이벤트",
      adGroup: "SOSD",
      plus: true,
      point: 10,
      point_total: 90,
      modified_date: "2023-05-09T04:05:08.000Z",
    },
    {
      dt_id: 6,
      pf_name: "SOSD",
      pl_name: "SOSD 회원가입",
      adGroup: "SOSD",
      plus: true,
      point: 20,
      point_total: 70,
      modified_date: "2023-05-05T04:05:08.000Z",
    },
    {
      dt_id: 7,
      pf_name: "온라인명륜당",
      pl_name: "온라인명륜당 회원가입",
      adGroup: "온라인명륜당",
      plus: false,
      point: 50,
      point_total: 100,
      modified_date: "2023-05-10T04:05:08.000Z",
    },
    {
      dt_id: 8,
      pf_name: "온라인명륜당",
      pl_name: "온라인명륜당 회원가입",
      adGroup: "온라인명륜당",
      plus: true,
      point: 50,
      point_total: 100,
      modified_date: "2023-05-10T04:05:08.000Z",
    },
    {
      dt_id: 9,
      pf_name: "온라인명륜당",
      pl_name: "온라인명륜당 회원가입",
      adGroup: "온라인명륜당",
      plus: false,
      point: 50,
      point_total: 100,
      modified_date: "2023-05-10T04:05:08.000Z",
    },
  ];

  const result = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(dummyCoinDetails);
    }, 500);
  });

  // axios.get<ICoinDetail[]>(`.../api/coin/${user_id}/detail?page="${page}"&size="${size}"`)
  return result;
};

/**
 * Fetch Proposed Policy List
 * @return {Promise<{
 * request_id: number,
 * pl_id: number,
 * name: string,
 * pf_name: string,
 * request_type: string,
 * plus: boolean,
 * request_plus: number,
 * point: number,
 * request_point: number,
 * available: boolean,
 * request_available: boolean,
 * reason: string,
 * create_user_name: string,
 * date: string,
 * }[]}
 * 보안과 관련된 파라미터가 필요할 수 있다.
 */
export const fetchProposedPolicies = async () => {
  const dummyProposedPolicies = [
    {
      request_id: 1,
      pl_id: 10101,
      name: "온라인 명륜당 가입",
      pf_name: "온라인 명륜당",
      request_type: "UPDATE",
      plus: true,
      request_plus: 10,
      point: 10,
      request_point: 20,
      available: true,
      request_available: true,
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      create_user_name: "율전이",
      date: "2023-07-12T04:05:08.000Z",
    },
    {
      request_id: 2,
      pl_id: 10199,
      name: "특별 이벤트",
      pf_name: "온라인 명륜당",
      request_type: "UPDATE",
      plus: true,
      request_plus: 10,
      point: 10,
      request_point: 20,
      available: true,
      request_available: true,
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      create_user_name: "율전이",
      date: "2023-05-10T04:05:08.000Z",
    },
    {
      request_id: 0,
      pl_id: 10103,
      name: "강좌 수료",
      pf_name: "온라인 명륜당",
      request_type: "UPDATE",
      plus: true,
      request_plus: 10,
      point: 20,
      request_point: 10,
      available: true,
      request_available: true,
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      create_user_name: "율전이",
      date: "2023-07-12T04:05:08.000Z",
    },
    {
      request_id: 3,
      pl_id: 20101,
      name: "SOSD 가입",
      pf_name: "SOSD",
      request_type: "UPDATE",
      plus: true,
      request_plus: 10,
      point: 10,
      request_point: 20,
      available: true,
      request_available: true,
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      create_user_name: "명륜이",
      date: "2023-05-10T04:05:08.000Z",
    },
    {
      request_id: 4,
      pl_id: 20102,
      name: "SOSD 상위 10%",
      pf_name: "SOSD",
      request_type: "UPDATE",
      plus: true,
      request_plus: 10,
      point: 10,
      request_point: 20,
      available: true,
      request_available: true,
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      create_user_name: "명륜이",
      date: "2023-05-10T04:05:08.000Z",
    },
    {
      request_id: 5,
      pl_id: 20103,
      name: "SOSD 특별 이벤트",
      pf_name: "SOSD",
      request_type: "UPDATE",
      plus: true,
      request_plus: 10,
      point: 10,
      request_point: 20,
      available: true,
      request_available: false,
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      create_user_name: "명륜이",
      date: "2023-05-10T04:05:08.000Z",
    },
    {
      request_id: 6,
      pl_id: 20104,
      name: "SOSD 상위 10%",
      pf_name: "온라인 명륜당",
      request_type: "UPDATE",
      plus: true,
      request_plus: 10,
      point: 10,
      request_point: 20,
      available: true,
      request_available: true,
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      create_user_name: "명륜이",
      date: "2023-05-10T04:05:08.000Z",
    },
    {
      request_id: 7,
      pl_id: 20105,
      name: "SOSD 특별 이벤트",
      pf_name: "SOSD",
      request_type: "UPDATE",
      request_plus: 10,
      point: 10,
      request_point: 20,
      available: true,
      request_available: true,
      date: "2023-05-10T04:05:08.000Z",
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      create_user_name: "명륜이",
    },
    {
      request_id: 8,
      pl_id: 20106,
      name: "SOSD 상위 10%",
      pf_name: "온라인 명륜당",
      request_type: "UPDATE",
      plus: true,
      request_plus: 10,
      point: 10,
      request_point: 20,
      available: true,
      request_available: true,
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      create_user_name: "명륜이",
      date: "2023-05-10T04:05:08.000Z",
    },
    {
      request_id: 1,
      pl_id: 20107,
      name: "SOSD 특별 이벤트",
      pf_name: "온라인 명륜당",
      request_type: "UPDATE",
      plus: true,
      request_plus: 10,
      point: 10,
      request_point: 20,
      available: true,
      request_available: true,
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      create_user_name: "명륜이",
      date: "2023-05-10T04:05:08.000Z",
    },
  ];

  const result = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(dummyProposedPolicies);
    }, 500);
  });

  return result;
};

/**
 * Fetch Policy List
 * @returns {Promise<{plId: number, plName: string, pfName: string, plus: boolean, point: number, createdDate: string, available: boolean,
 * request_available: false}[]>} 정책 배열을 반환하는 프로미스 객체
 *  * 보안과 관련된 파라미터가 필요할 수 있다.
 */
export const fetchPolicies = async () => {
  const result = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(dummyPolicy);
    }, 500);
  });

  return result;
};

/**
 * Create Proposed Policy
 * @param {string} name
 * @param {number} pl_id DB에추가필요
 * @param {number} point
 * @param {number} create_user_id
 * @param {string} reason
 * @returns {Promise<{result: boolean}>} 성공여부를 반환하는 프로미스 객체
 *  * 보안과 관련된 파라미터가 필요할 수 있다.
 */
export const createProposedPolicy = (name, point, create_user_id, reason) => {};

/**
 * Fetch User List
 * @returns {Promise<{
 * user_id: number,
 * st_id: number,
 * st_name: string,
 * dept: string,
 * point_total: number,
 * point_plus: number,
 * user_authority: string
 * }[]>} 사용자 배열을 반환하는 프로미스 객체
 *  * 보안과 관련된 파라미터가 필요할 수 있다.
 */
export const fetchUsers = async (paginationModel) => {
  const dummyUsers = [
    {
      user_id: 1,
      st_id: 2023123456,
      st_name: "율전이",
      dept: "글로벌바이오메디컬공학과",
      point_total: 180,
      point_plus: 240,
      user_authority: "사용자",
    },
    {
      user_id: 2,
      st_id: 2023123456,
      st_name: "율전이",
      dept: "글로벌바이오메디컬공학과",
      point_total: 180,
      point_plus: 240,
      user_authority: "사용자",
    },
    {
      user_id: 3,
      st_id: 2023123456,
      st_name: "율전이",
      dept: "글로벌바이오메디컬공학과",
      point_total: 180,
      point_plus: 240,
      user_authority: "사용자",
    },
    {
      user_id: 4,
      st_id: 2023123456,
      st_name: "율전이",
      dept: "글로벌바이오메디컬공학과",
      point_total: 180,
      point_plus: 240,
      user_authority: "사용자",
    },
    {
      user_id: 5,
      st_id: 2023123456,
      st_name: "율전이",
      dept: "글로벌바이오메디컬공학과",
      point_total: 180,
      point_plus: 240,
      user_authority: "사용자",
    },
    {
      user_id: 6,
      st_id: 2023123456,
      st_name: "율전이",
      dept: "글로벌바이오메디컬공학과",
      point_total: 180,
      point_plus: 240,
      user_authority: "사용자",
    },
    {
      user_id: 7,
      st_id: 2023123456,
      st_name: "율전이",
      dept: "글로벌바이오메디컬공학과",
      point_total: 180,
      point_plus: 240,
      user_authority: "사용자",
    },
    {
      user_id: 8,
      st_id: 2023123456,
      st_name: "율전이",
      dept: "글로벌바이오메디컬공학과",
      point_total: 180,
      point_plus: 240,
      user_authority: "사용자",
    },
    {
      user_id: 9,
      st_id: 2023123456,
      st_name: "율전이",
      dept: "글로벌바이오메디컬공학과",
      point_total: 180,
      point_plus: 240,
      user_authority: "사용자",
    },
    {
      user_id: 10,
      st_id: 2023123456,
      st_name: "율전이",
      dept: "글로벌바이오메디컬공학과",
      point_total: 180,
      point_plus: 240,
      user_authority: "사용자",
    },
  ];

  const result = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve({
        length: dummyUsers.length,
        data: dummyUsers
          .slice(
            paginationModel.pageSize * paginationModel.page,
            paginationModel.pageSize * (paginationModel.page + 1)
          )
          .map((it) => ({
            ...it,
            id: it.user_id,
          })),
      });
    }, 100);
  });

  return result;
};

// 07.26(수) api 문서 반영 (수정 요청 사항 반영)

const HOST = "http://kingocoin-dev.cs.skku.edu:8080";
const COIN_ROUTE = "/api/coin";
const USER_ROUTE = "api/user";
const POLICY_ROUTE = "api/policy";
const STATICS_ROUTE = "api/statics";
const DEV_ROUTE = "api/dev";
const PLATFORM_ROUTE = "api/platform";

// Coin

/**
 * getCoin
 * @param {number} userId - 유저 식별자
 * @return {Promise<{
 * coinId: number,
 * userId: number,
 * coinTotal: number,
 * coinPlus: number,
 * coinMinus: number,
 * createdDate: string,
 * modifiedDate: string
 * }>} 코인 객체를 반환하는 프로미스 객체
 */
export const getCoin = async (userId) => {
  const path = `/${userId}`;
  const result = axios.get(HOST + COIN_ROUTE + path);
  return result;
};
// getCoin 사용 예제
// const {
//   isLoading: userCoinIsLoading,
//   error: userCoinError,
//   data: userCoin,
// } = useQuery(["userCoin"], () => getCoin(userId));

/**
 * getCoinDetailByAdminId
 * @param {number} adId - 운영자 식별자
 * @return {Promise<{
 * dtId: number,
 * coinId: number,
 * coinTotal: number,
 * plId: number,
 * plName: string,
 * adId: number,
 * adGroup: string,
 * title: string,
 * plus: bool,
 * coin: number,
 * provider: string,
 * createdDate: string,
 * modifiedDate: string
 * }[]>} 객체를 반환하는 프로미스 객체
 */
export const getCoinDetailByAdminId = (adId) => {
  const path = `/admin/${adId}`;
  const result = axios.get(HOST + COIN_ROUTE + path);
  return result;
};
// getCoinDetailByAdminId 사용 예제
// const {
//   isLoading: adCoinDetailIsLoading,
//   error: adCoinDetailError,
//   data: adCoinDetail,
// } = useQuery(["adCoinDetail"], () => getCoinDetailByAdminId(adId));

/**
 * getCoinDetail
 * @param {number} userId 유저 식별자
 * @returns {Promise<{
 * dtId: number,
 * coinId: number,
 * coinTotal: number,
 * plId: number,
 * plName: string,
 * adId: number,
 * adGroup: string,
 * title: string,
 * plus: boolean,
 * coin: number,
 * provider: string,
 * createdDate: string,
 * modifiedDate: string
 * }>} 코인 거래내역 세부사항 배열을 반환하는 프로미스 객체
 */
export const getCoinDetail = async (userId) => {
  const path = `/${userId}/detail`;
  const result = axios.get(HOST + COIN_ROUTE + path);
  return result;
};
// getCoinDetail 사용 예제
// const {
//   isLoading: userCoinDetailIsLoading,
//   error: userCoinDetailError,
//   data: userCoinDetail,
// } = useQuery(["userCoinDetail"], () => getCoinDetail(userId));

/**
 * postManualCoin
 * @param {number} stId 학번
 * @param {string} stName 학생명
 * @param {string} title 제목 (자동부여시 정책명, 수동부여시 직접입력)
 * @param {number} coin 코인값 (U)
 * @param {number} plus 코인값 부호 (C)
 * @param {number} adId 운영자 식별자 (수동부여시 전달)
 * @param {number} plId 정책 식별자
 * @param {string} gainedDate 부여 날짜
 * @returns {Promise<{
 * dtId: number
 * }>} 정책 내역 식별자를 반환하는 프로미스 객체
 */
export const postManualPoint = async (
  stId,
  stName,
  title,
  coin,
  plus,
  adId,
  plId,
  gainedDate
) => {
  const path = `/point/manual`;
  const result = axios.post(HOST + COIN_ROUTE + path, {
    stId,
    stName,
    title,
    coin,
    plus,
    adId,
    plId,
    gainedDate,
  });

  return result;
};

// User

/**
 * getUsersBySearch
 * @param {number} page N번째 페이지
 * @param {number} size 페이지당 row 개수
 * @param {string} column 검색 필드명
 * @param {string} search 검색 값
 * @returns {Promise<{
 * userId: number,
 * stId: number,
 * stName: string,
 * dept: string,
 * pointTotal: number,
 * pointPlus: number,
 * role: string
 * }[]>} 학생 정보 배열을 반환하는 프로미스 객체
 */
export const getUsersBySearch = (page, size, column, search) => {
  const path = `/?page=${page}&size=${size}&column=${column}&search=${search}`;
  const result = axios.get(HOST + USER_ROUTE + path);
  return result;
};
// getUsersBySearch 사용 예제
// const {
//   isLoading: usersIsLoading,
//   error: usersError,
//   data: users,
// } = useQuery("users", () => getUsersBySearch(page, size, column, search));

/**
 * getUserDetail
 * @param {number} userId 사용자 식별자
 * @returns {Promise<{
 * stId: number,
 * stName: number,
 * stDegree: number,
 * stStatus: number,
 * stDept: number
 * }>} 학생 정보를 반환하는 프로미스 객체
 */
export const getUserDetail = (userId) => {
  const path = `/${userId}/info`;
  const result = axios.get(HOST + USER_ROUTE + path);
  return result;
};
// getUserDetail 사용 예제
// const {
//   isLoading: userDetailIsLoading,
//   error: userDetailError,
//   data: userDetail,
// } = useQuery(["userDetail", userId], () => getUserDetail(userId));

/**
 * getUserRole
 * @param {number} userId 사용자 식별자
 * @returns {Promise<{
 * role: string
 * }>} 사용자 권한을 반환하는 프로미스 객체
 */
export const getUserRole = (userId) => {
  const path = `/${userId}/auth`;
  const result = axios.get(HOST + USER_ROUTE + path);
  return result;
};
// getUserRole 사용 예제
// const {
//   isLoading: userRoleIsLoading,
//   error: userRoleError,
//   data: userRole,
// } = useQuery(["userRole", userId], () => getUserRole(userId));

// policy

/**
 * getPolicies
 * @returns {Promise<{
 * plId: number,
 * plName: string,
 * pfName: string,
 * plus: boolean,
 * point: number,
 * available: boolean
 * }[]>} 정책 배열을 반환하는 프로미스 객체
 */
export const getPolicies = () => {
  const path = ``;
  // const result = axios.get(HOST + POLICY_ROUTE + path);
  const result = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(dummyPolicy);
    }, 500);
  });
  return result;
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
  const result = axios.post(HOST + POLICY_ROUTE + path, {
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

// statics

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
export const getStaticsByMonth = () => {
  const path = `/month`;
  const result = axios.get(HOST + STATICS_ROUTE + path);
  return result;
};
// getStaticsByMonth 사용 예제
// const {
//   isLoading: statisticIsLoading,
//   error: statisticError,
//   data: statistic,
// } = useQuery(["statistic"], getStaticsByMonth);

// platform

/**
 * getPlatforms
 * @returns {Promise<{
 * smId: number,
 * year: number,
 * month: number,
 * coinTotal: number,
 * createdDate: string,
 * modifiedDate: string
 * }[]>} 정책 배열을 반환하는 프로미스 객체
 */
export const getPlatforms = () => {
  const path = ``;
  // const result = axios.get(HOST + PLATFORM_ROUTE + path);
  const result = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(dummyPlatforms);
    }, 500);
  });

  return result;
};
// getPlatforms 사용 예제
// const {
//   isLoading: platformsIsLoading,
//   error: platformsError,
//   data: platforms,
// } = useQuery(["platforms"], getPlatforms);

// 하드 코딩된 데이터

export const FNQS = [
  {
    fnqId: 0,
    question: "Q. 킹고코인에 사용기한이 있나요?",
    answer:
      "A. 킹고코인은 매년 초기화됩니다. 따라서 보유 중인 코인이 사라지기 전에 적절하게 사용하는 것이 권장됩니다.",
  },
  {
    fnqId: 1,
    question: "Q. 킹고코인을 어디에 사용할 수 있나요?",
    answer:
      "A. 킹고코인은 AWS, GPU 개인사용 크레딧, IT 기기대여, 세미나실 사용 등에 사용될 수 있으며, 코리아챌린지와 글로벌챌린지를 비롯한 소프트웨어학과내 각종 행사에 있어서 선발 기준에 적용될 수 있습니다.",
  },
  {
    fnqId: 2,
    question: "Q. 타과생도 킹고코인을 사용할 수 있나요?",
    answer:
      "A. 현재 킹고코인은 소프트웨어학과 원전공생들을 대상으로 하고 있습니다.",
  },
  {
    faq_id: 3,
    question: "Q. 코인 내역에 오류가 발생한 것 같은데 어떻게 해야하나요?",
    answer:
      "A. 홈페이지 아래 이메일로 코인 내역의 스크린샷과 함께 문의 메일을 작성해주시면 확인 후 처리해드리도록 하겠습니다.",
  },
  {
    faq_id: 4,
    question: "Q. 휴학생도 킹고코인을 사용할 수 있나요?",
    answer:
      "A. 성균관대학교 소프트웨어학과 원전공생이라면 학년, 휴학유무와 관계없이 킹고코인을 획득하거나 사용하실 수 있습니다. 다만 혜택에 있어서 휴학유무에 따라 각종 행사 내 선발 기준에 제한이 있을 수 있습니다.",
  },
];
