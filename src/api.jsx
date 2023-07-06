import axios from "axios";
import SKKU_EMBLEM from "./assets/skku_emblem_kor.png";
import SOSD_LOGO from "./assets/sosd_logo.svg";

/**
 * Fetch Koin
 * @param {number} user_id - 유저 식별자
 * @return {Promise<{ point_curr: number, point_used: number, point_all: number }>} 코인 객체를 반환하는 프로미스 객체
 */
export const fetchKoin = async (user_id) => {
  const dummyKoin = {
    point_curr: 180,
    point_used: 60,
    point_all: 240,
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
 * @returns {Promise<{dt_id: number, pf_name: string, title: string, plus: boolean, modifiedAt: string}>} 코인 거래내역 세부사항 배열을 반환하는 프로미스 객체
 */
export const fetchKoinDetails = async (user_id) => {
  const dummyKoinDetails = [
    {
      dt_id: 0,
      pf_name: "온라인명륜당",
      title: "온라인명륜당 회원가입",
      plus: true,
      point: 50,
      modifiedAt: "2023-05-10T04:05:08.000Z",
    },
    {
      dt_id: 1,
      pf_name: "온라인명륜당",
      title: "온라인명륜당 회원가입",
      plus: false,
      point: 50,
      modifiedAt: "2023-05-10T04:05:08.000Z",
    },
    {
      dt_id: 2,
      pf_name: "온라인명륜당",
      title: "온라인명륜당 회원가입",
      plus: true,
      point: 50,
      modifiedAt: "2023-05-10T04:05:08.000Z",
    },
    {
      dt_id: 3,
      pf_name: "온라인명륜당",
      title: "온라인명륜당 회원가입",
      plus: false,
      point: 50,
      modifiedAt: "2023-05-10T04:05:08.000Z",
    },
    {
      dt_id: 4,
      pf_name: "온라인명륜당",
      title: "온라인명륜당 회원가입",
      plus: true,
      point: 50,
      modifiedAt: "2023-05-10T04:05:08.000Z",
    },
    {
      dt_id: 5,
      pf_name: "온라인명륜당",
      title: "온라인명륜당 회원가입",
      plus: false,
      point: 50,
      modifiedAt: "2023-05-10T04:05:08.000Z",
    },
    {
      dt_id: 6,
      pf_name: "온라인명륜당",
      title: "온라인명륜당 회원가입",
      plus: true,
      point: 50,
      modifiedAt: "2023-05-10T04:05:08.000Z",
    },
    {
      dt_id: 7,
      pf_name: "온라인명륜당",
      title: "온라인명륜당 회원가입",
      plus: false,
      point: 50,
      modifiedAt: "2023-05-10T04:05:08.000Z",
    },
    {
      dt_id: 8,
      pf_name: "온라인명륜당",
      title: "온라인명륜당 회원가입",
      plus: true,
      point: 50,
      modifiedAt: "2023-05-10T04:05:08.000Z",
    },
    {
      dt_id: 9,
      pf_name: "온라인명륜당",
      title: "온라인명륜당 회원가입",
      plus: false,
      point: 50,
      modifiedAt: "2023-05-10T04:05:08.000Z",
    },
  ];

  const result = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(dummyKoinDetails);
    }, 500);
  });

  // axios.get<IKoinDetail[]>(".../api/koin/${user_id}?=”${}”")
  return result;
};

/**
 * Link List Data
 * @type {{pf_name: string, pf_logo: string, pf_link: string}[]}
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
 * FNQ List Data
 * @type {{question_id: number, question: string, answer: string}[]}
 */
export const dummyFNQs = [
  {
    question_id: 0,
    question: "킹고코인에 사용기한이 있나요?",
    answer: "킹고코인은 매년 초기화됩니다.",
  },
  {
    question_id: 1,
    question: "휴학생도 킹고코인을 사용할 수 있나요?",
    answer:
      "킹고코인 포인트는 AWS, GPU 개인사용 크레딧, IT 기기대여, 세미나실 사용 등에 사용될 수 있으며, 코리아챌린지와 글로벌챌린지를 비롯한 각종 학과내 행사에 있어서 선발 기준에 적용될 수 있습니다.",
  },
];

/**
 * Fetch Proposed Policy List
 * @return {Promise<{request_id: number, pl_id: number, name: string, plus: boolean, point: number, request_point: number, reason: string, create_user_name: string, created_date: string, isDelete: boolean}[]}
 * 보안과 관련된 파라미터가 필요할 수 있다.
 */
export const fetchProposedPolicies = async () => {
  const dummyProposedPolicy = [
    {
      request_id: 1,
      pl_id: 10101,
      name: "온라인 명륜당 가입",
      plus: true,
      point: 10,
      request_point: 20,
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      create_user_name: "율전이",
      date: "2023-05-10T04:05:08.000Z",
      isDelete: false,
    },
    {
      request_id: 2,
      pl_id: 10102,
      name: "온라인 명륜당 콘텐츠 수강",
      plus: true,
      point: 10,
      request_point: 20,
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      create_user_name: "율전이",
      date: "2023-05-10T04:05:08.000Z",
      isDelete: false,
    },
    {
      request_id: 3,
      pl_id: 20101,
      name: "SOSD 가입",
      plus: true,
      point: 10,
      request_point: 20,
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      create_user_name: "명륜이",
      date: "2023-05-10T04:05:08.000Z",
      isDelete: false,
    },
    {
      request_id: 4,
      pl_id: 20102,
      name: "SOSD 상위 10%",
      plus: true,
      point: 10,
      request_point: 20,
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      create_user_name: "명륜이",
      date: "2023-05-10T04:05:08.000Z",
      isDelete: false,
    },
    {
      request_id: 5,
      pl_id: 20103,
      name: "SOSD 특별 이벤트",
      plus: true,
      point: 10,
      request_point: 20,
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      create_user_name: "명륜이",
      date: "2023-05-10T04:05:08.000Z",
      isDelete: false,
    },
    {
      request_id: 6,
      pl_id: 20104,
      name: "SOSD 상위 10%",
      plus: true,
      point: 10,
      request_point: 20,
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      create_user_name: "명륜이",
      date: "2023-05-10T04:05:08.000Z",
      isDelete: false,
    },
    {
      request_id: 7,
      pl_id: 20105,
      name: "SOSD 특별 이벤트",
      point: 10,
      request_point: 20,
      date: "2023-05-10T04:05:08.000Z",
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      create_user_name: "명륜이",
      isDelete: false,
    },
    {
      request_id: 8,
      pl_id: 20106,
      name: "SOSD 상위 10%",
      plus: true,
      point: 10,
      request_point: 20,
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      create_user_name: "명륜이",
      date: "2023-05-10T04:05:08.000Z",
      isDelete: false,
    },
    {
      request_id: 1,
      pl_id: 20107,
      name: "SOSD 특별 이벤트",
      plus: true,
      point: 10,
      request_point: 20,
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      create_user_name: "명륜이",
      date: "2023-05-10T04:05:08.000Z",
      isDelete: false,
    },
  ];

  const result = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(dummyProposedPolicy);
    }, 500);
  });
};

/**
 * Fetch Policy List
 * @returns {Promise<{pl_id: number, name: string, pf_name: string, plus: boolean, point: number, created_date: string, isDelete: boolean}[]>} 정책 배열을 반환하는 프로미스 객체
 *  * 보안과 관련된 파라미터가 필요할 수 있다.
 */
export const fetchPolicies = async () => {
  const dummyPolicy = [
    {
      pl_id: "10101",
      name: "온라인 명륜당 가입",
      pf_name: "온라인 명륜당",
      plus: true,
      point: 10,
      created_date: "2023-05-10T04:05:08.000Z",
      isDelete: false,
    },
    {
      pl_id: "10101",
      name: "온라인 명륜당 가입",
      pf_name: "온라인 명륜당",
      plus: true,
      point: 10,
      created_date: "2023-05-10T04:05:08.000Z",
      isDelete: false,
    },
    {
      pl_id: "10101",
      name: "온라인 명륜당 가입",
      pf_name: "온라인 명륜당",
      plus: true,
      point: 10,
      created_date: "2023-05-10T04:05:08.000Z",
      isDelete: false,
    },
    {
      pl_id: "10101",
      name: "온라인 명륜당 가입",
      pf_name: "온라인 명륜당",
      plus: true,
      point: 10,
      created_date: "2023-05-10T04:05:08.000Z",
      isDelete: false,
    },
    {
      pl_id: "10101",
      name: "온라인 명륜당 가입",
      pf_name: "온라인 명륜당",
      plus: true,
      point: 10,
      created_date: "2023-05-10T04:05:08.000Z",
      isDelete: false,
    },
    {
      pl_id: "10101",
      name: "온라인 명륜당 가입",
      pf_name: "온라인 명륜당",
      plus: true,
      point: 10,
      created_date: "2023-05-10T04:05:08.000Z",
      isDelete: false,
    },
    {
      pl_id: "10101",
      name: "온라인 명륜당 가입",
      pf_name: "온라인 명륜당",
      plus: true,
      point: 10,
      created_date: "2023-05-10T04:05:08.000Z",
      isDelete: false,
    },
    {
      pl_id: "10101",
      name: "온라인 명륜당 가입",
      pf_name: "온라인 명륜당",
      plus: true,
      point: 10,
      created_date: "2023-05-10T04:05:08.000Z",
      isDelete: false,
    },
  ];

  const result = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(dummyPolicy);
    }, 500);
  });
};
