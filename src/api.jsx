import axios from "axios";
import SKKU_EMBLEM from "./assets/skku_emblem_kor.png";
import SOSD_LOGO from "./assets/sosd_logo.svg";


<<<<<<< HEAD
const host = 'http://kingocoin-dev.cs.skku.edu:8080/'
const koinRouting = '/api/koin'
const userRouting = 'api/user'
const policyRouting = 'api/routing'
const staticsRouting = 'api/statics'
const devRouting = 'api/dev'
const platformRouting = 'api/platform'

/*
 * Fetch Koin
 * @param {number} user_id - 유저 식별자
 * @return {Promise<{ point_curr: number, point_used: number, point_all: number }>} 코인 객체를 반환하는 프로미스 객체
 */
export const fetchKoin = async (user_id) => {
  const dummyKoin = {
    point_total: 180,
    point_plus: 60,
    point_minus: 240,
  };
  try {
    const url = host + koinRouting;
    const response = await axios.get(url);

  const result = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(dummyKoin);
    }, 500);
  });

  // axios.get<IPoint>(".../api/koin/point/`{user_id}/total")
=======
/**
 * Fetch Coin
 * @param {number} user_id - 유저 식별자
 * @return {Promise<{
 * coin_total: number,
 * coin_plus: number,
 * coin_minus: number
 * }>} 코인 객체를 반환하는 프로미스 객체
 */
export const fetchCoin = async () => {
  const dummyCoin = {
    coin_total: 180,
    coin_plus: 240,
    coin_minus: 60,
  };

  const result = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(dummyCoin);
    }, 500);
  });
>>>>>>> origin/dev
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
 * coin:number,
 * coin_total: number,
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
      coin: 10,
      coin_total: 180,
      modified_date: "2023-07-12T04:05:08.000Z",
    },
    {
      dt_id: 1,
      pf_name: "온라인명륜당",
      pl_name: "온라인명륜당 강좌 수강",
      adGroup: "온라인명륜당",
      plus: true,
      coin: 10,
      coin_total: 190,
      modified_date: "2023-07-11T04:05:08.000Z",
    },
    {
      dt_id: 2,
      pf_name: "온라인명륜당",
      pl_name: "온라인명륜당 가입",
      adGroup: "온라인명륜당",
      plus: true,
      coin: 20,
      coin_total: 170,
      modified_date: "2023-07-11T04:05:08.000Z",
    },
    {
      dt_id: 3,
      pf_name: "SOSD",
      pl_name: "분기별 상위 10%",
      adGroup: "SOSD",
      plus: false,
      coin: 50,
      coin_total: 120,
      modified_date: "2023-07-01T04:05:08.000Z",
    },
    {
      dt_id: 4,
      pf_name: "소프트웨어학과 행정실",
      pl_name: "킹고인과의 만남 강연 참석",
      adGroup: "소프트웨어학과",
      plus: true,
      coin: 10,
      coin_total: 100,
      modified_date: "2023-05-10T04:05:08.000Z",
    },
    {
      dt_id: 5,
      pf_name: "SOSD",
      pl_name: "특별 이벤트",
      adGroup: "SOSD",
      plus: true,
      coin: 10,
      coin_total: 90,
      modified_date: "2023-05-09T04:05:08.000Z",
    },
    {
      dt_id: 6,
      pf_name: "SOSD",
      pl_name: "SOSD 회원가입",
      adGroup: "SOSD",
      plus: true,
      coin: 20,
      coin_total: 70,
      modified_date: "2023-05-05T04:05:08.000Z",
    },
    {
      dt_id: 7,
      pf_name: "온라인명륜당",
      pl_name: "온라인명륜당 회원가입",
      adGroup: "온라인명륜당",
      plus: false,
      coin: 50,
      coin_total: 100,
      modified_date: "2023-05-10T04:05:08.000Z",
    },
    {
      dt_id: 8,
      pf_name: "온라인명륜당",
      pl_name: "온라인명륜당 회원가입",
      adGroup: "온라인명륜당",
      plus: true,
      coin: 50,
      coin_total: 100,
      modified_date: "2023-05-10T04:05:08.000Z",
    },
    {
      dt_id: 9,
      pf_name: "온라인명륜당",
      pl_name: "온라인명륜당 회원가입",
      adGroup: "온라인명륜당",
      plus: false,
      coin: 50,
      coin_total: 100,
      modified_date: "2023-05-10T04:05:08.000Z",
    },
  ];

  const result = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(dummyCoinDetails);
    }, 500);
  });

  // axios.get<ICoinDetail[]>(`.../api/Coin/${user_id}/detail?page="${page}"&size="${size}"`)
  return result;
};

/**
 * Link List Data
 * @type {{
 * pf_name: string,
 * pf_logo: string,
 * pf_link: string
 * }[]}
 */
export const dummyPlatforms = [
  {
    pf_name: "온라인명륜당",
    pf_logo: null,
    pf_link: "https://mrdang.cs.skku.edu",
  },
  {
    pf_name: "학과 행사 참석",
    pf_logo: SKKU_EMBLEM,
    pf_link:
      "https://sw.skku.edu/sw/notice.do?mode=list&srCategoryId1=1587&srSearchKey=&srSearchVal=",
  },
  {
    pf_name: "오픈소스플랫폼",
    pf_logo: SOSD_LOGO,
    pf_link: "https://sosd.skku.edu",
  },
  {
    pf_name: "킹고인과의 만남",
    pf_logo: SKKU_EMBLEM,
    pf_link:
      "https://sw.skku.edu/sw/notice.do?mode=list&srCategoryId1=1587&srSearchKey=&srSearchVal=",
  },
];

/**
 * Fetch FNQ List
 * @returns {Promise<{
 * faq_id: number,
 * question: string,
 * answer: string
 * }[]>} 자주 묻는 질문 배열을 반환하는 프로미스 객체
 */
export const fetchFaqs = () => {
  const dummyFaqs = [
    {
      faq_id: 0,
      question: "킹고코인에 사용기한이 있나요?",
      answer: "킹고코인은 매년 초기화됩니다.",
    },
    {
      faq_id: 1,
      question: "휴학생도 킹고코인을 사용할 수 있나요?",
      answer:
        "킹고코인 포인트는 AWS, GPU 개인사용 크레딧, IT 기기대여, 세미나실 사용 등에 사용될 수 있으며, 코리아챌린지와 글로벌챌린지를 비롯한 각종 학과내 행사에 있어서 선발 기준에 적용될 수 있습니다.",
    },
  ];

  const result = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(
        dummyFaqs.map((it) => {
          return { ...it, isToggle: false };
        })
      );
    }, 500);
  });

  // axios.get<ICoinDetail[]>(".../api/Coin/${user_id}?=”${}”")
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
 * coin: number,
 * request_coin: number,
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
      coin: 10,
      request_coin: 20,
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
      coin: 10,
      request_coin: 20,
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
      coin: 20,
      request_coin: 10,
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
      coin: 10,
      request_coin: 20,
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
      coin: 10,
      request_coin: 20,
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
      coin: 10,
      request_coin: 20,
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
      coin: 10,
      request_coin: 20,
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
      coin: 10,
      request_coin: 20,
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
      coin: 10,
      request_coin: 20,
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
      coin: 10,
      request_coin: 20,
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
 * @returns {Promise<{plId: number, plName: string, pfName: string, plus: boolean, coin: number, created_date: string, available: boolean,
 * request_available: false}[]>} 정책 배열을 반환하는 프로미스 객체
 *  * 보안과 관련된 파라미터가 필요할 수 있다.
 */
export const fetchPolicies = async () => {
  const dummyPolicy = [
    {
      plId: 10101,
      plName: "온라인 명륜당 가입",
      pfName: "온라인 명륜당",
      plus: true,
      coin: 5,
      created_date: "2023-05-10T04:05:08.000Z",
      available: true,
    },
    {
      plId: 10102,
      plName: "강좌 시청",
      pfName: "온라인 명륜당",
      plus: true,
      coin: 1,
      created_date: "2023-05-10T04:05:08.000Z",
      available: true,
    },
    {
      plId: 10103,
      plName: "강좌 수료 완료",
      pfName: "온라인 명륜당",
      plus: true,
      coin: 20,
      created_date: "2023-05-10T04:05:08.000Z",
      available: true,
    },
    {
      plId: 20101,
      plName: "특별 이벤트",
      pfName: "온라인 명륜당",
      plus: false,
      coin: 10,
      created_date: "2023-05-10T04:05:08.000Z",
      available: false,
    },
    {
      plId: 20102,
      plName: "화상강연 참석",
      pfName: "소프트웨어학과 행정실",
      plus: true,
      coin: 10,
      created_date: "2023-05-10T04:05:08.000Z",
      available: true,
    },
    {
      plId: 10202,
      plName: "SOSD 가입",
      pfName: "SOSD",
      plus: true,
      coin: 10,
      created_date: "2023-05-10T04:05:08.000Z",
      available: true,
    },
    {
      plId: 20103,
      plName: "해외 봉사 활동 참여",
      pfName: "온라인 명륜당",
      plus: true,
      coin: 10,
      created_date: "2023-05-10T04:05:08.000Z",
      available: true,
    },
    {
      plId: 30101,
      plName: "세미나실 초과 대여 ",
      pfName: "온라인 명륜당",
      plus: true,
      coin: 10,
      created_date: "2023-05-10T04:05:08.000Z",
      available: false,
    },
    {
      plId: 99999,
      plName: "직접입력",
      pfName: "소프트웨어학과 행정실",
      plus: true,
      coin: 0,
      created_date: "2023-05-10T04:05:08.000Z",
      available: true,
    },
  ];

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
 * @param {number} coin
 * @param {number} create_user_id
 * @param {string} reason
 * @returns {Promise<{result: boolean}>} 성공여부를 반환하는 프로미스 객체
 *  * 보안과 관련된 파라미터가 필요할 수 있다.
 */
export const createProposedPolicy = (name, coin, create_user_id, reason) => {};

/**
 * Fetch User List
 * @returns {Promise<{
 * user_id: number,
 * st_id: number,
 * st_name: string,
 * dept: string,
 * coin_total: number,
 * coin_plus: number,
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
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자",
    },
    {
      user_id: 2,
      st_id: 2023123456,
      st_name: "율전이",
      dept: "글로벌바이오메디컬공학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자",
    },
    {
      user_id: 3,
      st_id: 2023123456,
      st_name: "율전이",
      dept: "글로벌바이오메디컬공학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자",
    },
    {
      user_id: 4,
      st_id: 2023123456,
      st_name: "율전이",
      dept: "글로벌바이오메디컬공학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자",
    },
    {
      user_id: 5,
      st_id: 2023123456,
      st_name: "율전이",
      dept: "글로벌바이오메디컬공학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자",
    },
    {
      user_id: 6,
      st_id: 2023123456,
      st_name: "율전이",
      dept: "글로벌바이오메디컬공학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자",
    },
    {
      user_id: 7,
      st_id: 2023123456,
      st_name: "율전이",
      dept: "글로벌바이오메디컬공학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자",
    },
    {
      user_id: 8,
      st_id: 2023123456,
      st_name: "율전이",
      dept: "글로벌바이오메디컬공학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자",
    },
    {
      user_id: 9,
      st_id: 2023123456,
      st_name: "율전이",
      dept: "글로벌바이오메디컬공학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자",
    },
    {
      user_id: 10,
      st_id: 2023123456,
      st_name: "율전이",
      dept: "글로벌바이오메디컬공학과",
      coin_total: 180,
      coin_plus: 240,
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

// 구현에서 제외한 api 목록
// - 코인 자동 부여 (postAutocoin)
// - 학생 저장 및 업데이트 (postUsers)
// - 일별 통계 값 조회 (getStaticsByDay)

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

/**
 * getCoinDetailByAdminId
 * @param {number} adminId - 운영자 식별자
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
export const getCoinDetailByAdminId = (adminId) => {
  const path = `/admin/${adminId}`;
  const result = axios.get(HOST + COIN_ROUTE + path);
  return result;
};

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
 * detailId: number
 * }>} 정책 내역 식별자를 반환하는 프로미스 객체
 */
export const postManualcoin = async (
  stId,
  stName,
  title,
  coin,
  plus,
  adId,
  plId,
  gainedDate
) => {
  const path = `/coin/manual`;
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
 * coinTotal: number,
 * coinPlus: number,
 * role: string
 * }[]>} 학생 정보 배열을 반환하는 프로미스 객체
 */
export const getUsersBySearch = (page, size, column, search) => {
  const path = `/?page=${page}&size=${size}&column=${column}&search=${search}`;
  const result = axios.get(HOST + USER_ROUTE + path);
  return result;
};

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

// policy

/**
 * getPolicies
 * @returns {Promise<{
 * plId: number,
 * plName: string,
 * pfName: string,
 * plus: boolean,
 * coin: number,
 * available: boolean
 * }[]>} 정책 배열을 반환하는 프로미스 객체
 */
export const getPolicies = (userId) => {
  const path = ``;
  const result = axios.get(HOST + POLICY_ROUTE + path);
  return result;
};

/**
 * PostCreate
 * @param {string} plName 정책명
 * @param {string} pfName 플랫폼명
 * @param {boolean} plus 코인값 부호
 * @param {number} coin 코인값
 * @param {boolean} available 정책 활성화 여부
 * @returns {Promise<{
 * plId: number
 * }[]>} 정책 식별자를 반환하는 프로미스 객체
 */
export const PostCreate = (plName, pfName, plus, coin, available) => {
  const path = `/create`;
  const result = axios.post(HOST + POLICY_ROUTE + path, {
    plName,
    pfName,
    plus,
    coin,
    available,
  });

  return result;
};

/**
 * PostModify
 * @param {number} plId 정책 식별자
 * @param {string} plName 정책명
 * @param {string} pfName 플랫폼명
 * @param {boolean} plus 코인값 부호
 * @param {number} coin 코인값
 * @param {boolean} available 정책 활성화 여부
 * @returns {Promise<{
 * plId: number
 * }[]>} 정책 식별자를 반환하는 프로미스 객체
 */
export const PostModify = (plId, plName, pfName, plus, coin, available) => {
  const path = `/modify`;
  const result = axios.post(HOST + POLICY_ROUTE + path, {
    plId,
    plName,
    pfName,
    plus,
    coin,
    available,
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
  const result = axios.get(HOST + PLATFORM_ROUTE + path);
  return result;
};
