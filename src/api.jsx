import axios from "axios";
import SKKU_EMBLEM from "./assets/skku_emblem_kor.png";
import SOSD_LOGO from "./assets/sosd_logo.svg";

/**
 * Fetch Koin
 * @param {number} user_id - 유저 식별자
 * @return {Promise<{
 * point_total: number,
 * point_plus: number,
 * point_minus: number
 * }>} 코인 객체를 반환하는 프로미스 객체
 */
export const fetchKoin = async (user_id) => {
  const dummyKoin = {
    point_total: 180,
    point_plus: 240,
    point_minus: 60,
  };

  const result = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(dummyKoin);
    }, 500);
  });

  // axios.get<IPoint>(".../api/koin/point/`{user_id}/total")
  return result;
};

/**
 * Fetch KoinDetails
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
export const fetchKoinDetails = async (user_id) => {
  const dummyKoinDetails = [
    {
      dt_id: 0,
      pf_name: "소프트웨어학과 행정실",
      pl_name: "장비 대여",
      plus: false,
      point: 10,
      point_total: 180,
      modified_date: "2023-07-12T04:05:08.000Z",
    },
    {
      dt_id: 1,
      pf_name: "온라인명륜당",
      pl_name: "온라인명륜당 강좌 수강",
      plus: true,
      point: 10,
      point_total: 190,
      modified_date: "2023-07-11T04:05:08.000Z",
    },
    {
      dt_id: 2,
      pf_name: "온라인명륜당",
      pl_name: "온라인명륜당 가입",
      plus: true,
      point: 20,
      point_total: 170,
      modified_date: "2023-07-11T04:05:08.000Z",
    },
    {
      dt_id: 3,
      pf_name: "SOSD",
      pl_name: "분기별 상위 10%",
      plus: false,
      point: 50,
      point_total: 120,
      modified_date: "2023-07-01T04:05:08.000Z",
    },
    {
      dt_id: 4,
      pf_name: "소프트웨어학과 행정실",
      pl_name: "킹고인과의 만남 강연 참석",
      plus: true,
      point: 10,
      point_total: 100,
      modified_date: "2023-05-10T04:05:08.000Z",
    },
    {
      dt_id: 5,
      pf_name: "SOSD",
      pl_name: "특별 이벤트",
      plus: true,
      point: 10,
      point_total: 90,
      modified_date: "2023-05-09T04:05:08.000Z",
    },
    {
      dt_id: 6,
      pf_name: "SOSD",
      pl_name: "SOSD 회원가입",
      plus: true,
      point: 20,
      point_total: 70,
      modified_date: "2023-05-05T04:05:08.000Z",
    },
    {
      dt_id: 7,
      pf_name: "온라인명륜당",
      pl_name: "온라인명륜당 회원가입",
      plus: false,
      point: 50,
      point_total: 100,
      modified_date: "2023-05-10T04:05:08.000Z",
    },
    {
      dt_id: 8,
      pf_name: "온라인명륜당",
      pl_name: "온라인명륜당 회원가입",
      plus: true,
      point: 50,
      point_total: 100,
      modified_date: "2023-05-10T04:05:08.000Z",
    },
    {
      dt_id: 9,
      pf_name: "온라인명륜당",
      pl_name: "온라인명륜당 회원가입",
      plus: false,
      point: 50,
      point_total: 100,
      modified_date: "2023-05-10T04:05:08.000Z",
    },
  ];

  const result = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(dummyKoinDetails);
    }, 500);
  });

  // axios.get<IKoinDetail[]>(`.../api/koin/${user_id}/detail?page="${page}"&size="${size}"`)
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
export const dummyLinks = [
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

  // axios.get<IKoinDetail[]>(".../api/koin/${user_id}?=”${}”")
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
 * @returns {Promise<{pl_id: number, name: string, pf_name: string, plus: boolean, point: number, created_date: string, available: boolean,
 * request_available: false}[]>} 정책 배열을 반환하는 프로미스 객체
 *  * 보안과 관련된 파라미터가 필요할 수 있다.
 */
export const fetchPolicies = async () => {
  const dummyPolicy = [
    {
      pl_id: 10101,
      name: "온라인 명륜당 가입",
      pf_name: "온라인 명륜당",
      plus: true,
      point: 5,
      created_date: "2023-05-10T04:05:08.000Z",
      available: true,
    },
    {
      pl_id: 10102,
      name: "강좌 시청",
      pf_name: "온라인 명륜당",
      plus: true,
      point: 1,
      created_date: "2023-05-10T04:05:08.000Z",
      available: true,
    },
    {
      pl_id: 10103,
      name: "강좌 수료 완료",
      pf_name: "온라인 명륜당",
      plus: true,
      point: 20,
      created_date: "2023-05-10T04:05:08.000Z",
      available: true,
    },
    {
      pl_id: 20101,
      name: "특별 이벤트",
      pf_name: "온라인 명륜당",
      plus: false,
      point: 10,
      created_date: "2023-05-10T04:05:08.000Z",
      available: false,
    },
    {
      pl_id: 20102,
      name: "화상강연 참석",
      pf_name: "소프트웨어학과 행정실",
      plus: true,
      point: 10,
      created_date: "2023-05-10T04:05:08.000Z",
      available: true,
    },
    {
      pl_id: 10202,
      name: "SOSD 가입",
      pf_name: "SOSD",
      plus: true,
      point: 10,
      created_date: "2023-05-10T04:05:08.000Z",
      available: true,
    },
    {
      pl_id: 10104,
      name: "온라인 명륜당 가입",
      pf_name: "온라인 명륜당",
      plus: true,
      point: 10,
      created_date: "2023-05-10T04:05:08.000Z",
      available: true,
    },
    {
      pl_id: 10105,
      name: "온라인 명륜당 가입",
      pf_name: "온라인 명륜당",
      plus: true,
      point: 10,
      created_date: "2023-05-10T04:05:08.000Z",
      available: false,
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
 * @param {number} point
 * @param {number} create_user_id
 * @param {string} reason
 * @returns {Promise<{result: boolean}>} 성공여부를 반환하는 프로미스 객체
 *  * 보안과 관련된 파라미터가 필요할 수 있다.
 */
export const createProposedPolicy = (name, point, create_user_id, reason) => {};

/**
 * @interface user
 *
 */

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
