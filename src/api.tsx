import axios from "axios";

export const fetchKoin = async () => {
  interface IPoint {
    koin_id: number;
    user_id: number;
    point: number;
    createdAt: string; //ex) "2023-05-10T04:05:08.000Z"
    modifiedAt: string;
  }

  const dummyKoin = {
    curr: 180,
    used: 60,
    all: 240,
  };

  const promise = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(dummyKoin);
    }, 500);
  });

  const result = await promise;
  // axios.get<IPoint>(".../api/koin/point/:user_id/total")
  return result;
};

export const fetchKoinDetails = async () => {
  interface IKoinDetail {
    detail_id: number;
    koin_id: number;
    pf_id: number; //플랫폼 아이디
    pf_name: string; //플랫폼 이름
    policy_id: number; //정책 아이디
    policy_name: string; //정책 이름
    title: string;
    plus: boolean;
    point: number;
    createdAt: string;
    modifiedAt: string; // timestamp는 db용어라 시간은 string으로 통일
  }

  const dummyKoinDetails = [
    {
      detail_id: 0,
      pf_name: "온라인명륜당",
      title: "온라인명륜당 회원가입",
      plus: true,
      point: 50,
      createdAt: "2023-05-10T04:05:08.000Z",
    },
    {
      detail_id: 1,
      pf_name: "온라인명륜당",
      title: "온라인명륜당 회원가입",
      plus: false,
      point: 50,
      createdAt: "2023-05-10T04:05:08.000Z",
    },
    {
      detail_id: 2,
      pf_name: "온라인명륜당",
      title: "온라인명륜당 회원가입",
      plus: true,
      point: 50,
      createdAt: "2023-05-10T04:05:08.000Z",
    },
    {
      detail_id: 3,
      pf_name: "온라인명륜당",
      title: "온라인명륜당 회원가입",
      plus: false,
      point: 50,
      createdAt: "2023-05-10T04:05:08.000Z",
    },
    {
      detail_id: 4,
      pf_name: "온라인명륜당",
      title: "온라인명륜당 회원가입",
      plus: true,
      point: 50,
      createdAt: "2023-05-10T04:05:08.000Z",
    },
    {
      detail_id: 5,
      pf_name: "온라인명륜당",
      title: "온라인명륜당 회원가입",
      plus: false,
      point: 50,
      createdAt: "2023-05-10T04:05:08.000Z",
    },
    {
      detail_id: 6,
      pf_name: "온라인명륜당",
      title: "온라인명륜당 회원가입",
      plus: true,
      point: 50,
      createdAt: "2023-05-10T04:05:08.000Z",
    },
    {
      detail_id: 7,
      pf_name: "온라인명륜당",
      title: "온라인명륜당 회원가입",
      plus: false,
      point: 50,
      createdAt: "2023-05-10T04:05:08.000Z",
    },
    {
      detail_id: 8,
      pf_name: "온라인명륜당",
      title: "온라인명륜당 회원가입",
      plus: true,
      point: 50,
      createdAt: "2023-05-10T04:05:08.000Z",
    },
    {
      detail_id: 9,
      pf_name: "온라인명륜당",
      title: "온라인명륜당 회원가입",
      plus: false,
      point: 50,
      createdAt: "2023-05-10T04:05:08.000Z",
    },
  ];

  const promise = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(dummyKoinDetails);
    }, 500);
  });

  const result = await promise;
  // axios.get<IKoinDetail[]>(".../api/koin/:user_id?pageSize=””")
  return result;
};

export const dummyLinks = [
  {
    pf_name: "온라인명륜당",
    pf_logo: null,
    pf_link: "https://mrdang.cs.skku.edu",
  },
  {
    pf_name: "학과 행사 참석",
    pf_logo: "assets/skku_emblem_kor.png",
    pf_link:
      "https://sw.skku.edu/sw/notice.do?mode=list&srCategoryId1=1587&srSearchKey=&srSearchVal=",
  },
  {
    pf_name: "오픈소스플랫폼",
    pf_logo: "assets/sosd_logo.svg",
    pf_link: "https://sosd.skku.edu",
  },
  {
    pf_name: "킹고인과의 만남",
    pf_logo: "assets/skku_emblem_kor.png",
    pf_link:
      "https://sw.skku.edu/sw/notice.do?mode=list&srCategoryId1=1587&srSearchKey=&srSearchVal=",
  },
];

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
