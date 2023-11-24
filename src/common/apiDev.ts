// 개발이 필요한 api를 작성한 파일입니다.
// 현재는 임시로 더미 데이터를 작성했습니다.





interface IStaticsByMonthToTal {
  smId: number;
  year: number;
  month: number;
  pointTotal: number;
  createdDate: string;
  modifiedDate: string;
  transactionTotal: number;
}

export const fetchgetStaticsByMonth = async (): Promise<
  IStaticsByMonthToTal[]
> => {
  const dummygetStaticsByMonth = [
    {
      smId: 1,
      year: 2023,
      month: 7,
      pointTotal: 1700,
      transactionTotal: 500,
      createdDate: "2023-06-30T04:05:08.000Z",
      modifiedDate: "2023-06-30T04:05:08.000Z",
    },
    {
      smId: 2,
      year: 2023,
      month: 6,
      pointTotal: 1300,
      transactionTotal: 350,
      createdDate: "2023-05-30T04:05:08.000Z",
      modifiedDate: "2023-05-30T04:05:08.000Z",
    },
    {
      smId: 3,
      year: 2023,
      month: 5,
      pointTotal: 1100,
      transactionTotal: 200,
      createdDate: "2023-04-30T04:05:08.000Z",
      modifiedDate: "2023-04-30T04:05:08.000Z",
    },
    {
      smId: 4,
      year: 2023,
      month: 4,
      pointTotal: 900,
      transactionTotal: 150,
      createdDate: "2023-03-30T04:05:08.000Z",
      modifiedDate: "2023-03-30T04:05:08.000Z",
    },
    {
      smId: 5,
      year: 2023,
      month: 3,
      pointTotal: 500,
      transactionTotal: 100,
      createdDate: "2023-02-30T04:05:08.000Z",
      modifiedDate: "2023-02-30T04:05:08.000Z",
    },
  ];

  const result = new Promise<IStaticsByMonthToTal[]>(function (
    resolve,
    reject
  ) {
    setTimeout(() => {
      resolve(dummygetStaticsByMonth);
    }, 500);
  });

  return result;
};

/** Fetch Coin by Day
 * @returns {Promise<[]>}
 */

interface IStaticsByDay {
  pointTotal: number;
  pointPlus: number;
  pointMinus: number;
  createdDate: string;
  modifiedDate: string;
}

export const fetchgetStaticsByDay = async (): Promise<IStaticsByDay[]> => {
  const dummygetStaticsByDay = [
    {
      pointTotal: 60,
      pointPlus: 110,
      pointMinus: 50,
      createdDate: "2023-06-30T04:05:08.000Z",
      modifiedDate: "2023-06-30T04:05:08.000Z",
    },
  ];

  const result = new Promise<IStaticsByDay[]>(function (resolve, reject) {
    setTimeout(() => {
      resolve(dummygetStaticsByDay);
    }, 500);
  });

  return result;
};

export interface IStaticsByMonthPlus {
  pfName: string;
  pointPlus: number;
  transactionPlus: number;
  createdDate: string;
  modifiedDate: string;
}

export const fetchgetStaticsPlusByMonth = async (): Promise<
  IStaticsByMonthPlus[]
> => {
  const dummygetStaticsPlusByMonth = [
    {
      pfName: "온라인 명륜당",
      pointPlus: 110,
      transactionPlus: 50,
      createdDate: "2023-06-30T04:05:08.000Z",
      modifiedDate: "2023-06-30T04:05:08.000Z",
    },
    {
      pfName: "SOSD",
      pointPlus: 90,
      transactionPlus: 18,
      createdDate: "2023-06-30T04:05:08.000Z",
      modifiedDate: "2023-06-30T04:05:08.000Z",
    },
    {
      pfName: "IT",
      pointPlus: 200,
      transactionPlus: 20,
      createdDate: "2023-06-30T04:05:08.000Z",
      modifiedDate: "2023-06-30T04:05:08.000Z",
    },
    {
      pfName: "소프트웨어학과 행정실",
      pointPlus: 140,
      transactionPlus: 28,
      createdDate: "2023-06-30T04:05:08.000Z",
      modifiedDate: "2023-06-30T04:05:08.000Z",
    },
  ];

  const result = new Promise<IStaticsByMonthPlus[]>(function (resolve, reject) {
    setTimeout(() => {
      resolve(dummygetStaticsPlusByMonth);
    }, 500);
  });

  return result;
};

export interface IStaticsByMonthMinus {
  pfName: string;
  pointMinus: number;
  transactionMinus: number;
  createdDate: string;
  modifiedDate: string;
}

export const fetchgetStaticsMinusByMonth = async (): Promise<
  IStaticsByMonthMinus[]
> => {
  const dummygetStaticsMinusByMonth = [
    {
      pfName: "AWS",
      pointMinus: 110,
      transactionMinus: 11,
      createdDate: "2023-06-30T04:05:08.000Z",
      modifiedDate: "2023-06-30T04:05:08.000Z",
    },
    {
      pfName: "세미나실 대여",
      pointMinus: 70,
      transactionMinus: 17,
      createdDate: "2023-06-30T04:05:08.000Z",
      modifiedDate: "2023-06-30T04:05:08.000Z",
    },
    {
      pfName: "장비 대여",
      pointMinus: 200,
      transactionMinus: 15,
      createdDate: "2023-06-30T04:05:08.000Z",
      modifiedDate: "2023-06-30T04:05:08.000Z",
    },
  ];

  const result = new Promise<IStaticsByMonthMinus[]>(function (
    resolve,
    reject
  ) {
    setTimeout(() => {
      resolve(dummygetStaticsMinusByMonth);
    }, 500);
  });

  return result;
};

export interface IsCoinDetail {
  dt_id: number,
  pf_name: string,
  pl_name: string,
  adGroup: string,
  plus: boolean,
  coin: number,
  coin_total: number,
  modified_date: string
}

export const fetchCoinDetails = async (): Promise<IsCoinDetail[]> => {
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
      {
        dt_id: 10,
        pf_name: "소프트웨어학과 행정실",
        pl_name: "장비 대여",
        adGroup: "소프트웨어학과",
        plus: false,
        coin: 10,
        coin_total: 180,
        modified_date: "2023-07-12T04:05:08.000Z",
      },
      {
        dt_id: 11,
        pf_name: "온라인명륜당",
        pl_name: "온라인명륜당 강좌 수강",
        adGroup: "온라인명륜당",
        plus: true,
        coin: 10,
        coin_total: 190,
        modified_date: "2023-07-11T04:05:08.000Z",
      },
      {
        dt_id: 12,
        pf_name: "온라인명륜당",
        pl_name: "온라인명륜당 가입",
        adGroup: "온라인명륜당",
        plus: true,
        coin: 20,
        coin_total: 170,
        modified_date: "2023-07-11T04:05:08.000Z",
      },
      {
        dt_id: 13,
        pf_name: "SOSD",
        pl_name: "분기별 상위 10%",
        adGroup: "SOSD",
        plus: false,
        coin: 50,
        coin_total: 120,
        modified_date: "2023-07-01T04:05:08.000Z",
      },
      {
        dt_id: 14,
        pf_name: "소프트웨어학과 행정실",
        pl_name: "킹고인과의 만남 강연 참석",
        adGroup: "소프트웨어학과",
        plus: true,
        coin: 10,
        coin_total: 100,
        modified_date: "2023-05-10T04:05:08.000Z",
      },
      {
        dt_id: 15,
        pf_name: "SOSD",
        pl_name: "특별 이벤트",
        adGroup: "SOSD",
        plus: true,
        coin: 10,
        coin_total: 90,
        modified_date: "2023-05-09T04:05:08.000Z",
      },
      {
        dt_id: 16,
        pf_name: "SOSD",
        pl_name: "SOSD 회원가입",
        adGroup: "SOSD",
        plus: true,
        coin: 20,
        coin_total: 70,
        modified_date: "2023-05-05T04:05:08.000Z",
      },
      {
        dt_id: 17,
        pf_name: "온라인명륜당",
        pl_name: "온라인명륜당 회원가입",
        adGroup: "온라인명륜당",
        plus: false,
        coin: 50,
        coin_total: 100,
        modified_date: "2023-05-10T04:05:08.000Z",
      },
      {
        dt_id: 18,
        pf_name: "온라인명륜당",
        pl_name: "온라인명륜당 회원가입",
        adGroup: "온라인명륜당",
        plus: true,
        coin: 50,
        coin_total: 100,
        modified_date: "2023-05-10T04:05:08.000Z",
      },
      {
        dt_id: 19,
        pf_name: "온라인명륜당",
        pl_name: "온라인명륜당 회원가입",
        adGroup: "온라인명륜당",
        plus: false,
        coin: 50,
        coin_total: 100,
        modified_date: "2023-05-10T04:05:08.000Z",
      },
    ];

    const result = new Promise<IsCoinDetail[]>(function (
      resolve,
      reject
    ) {
      setTimeout(() => {
        resolve(dummyCoinDetails);
      }, 500);
    });
  
    return result;
}

export interface IsStudentInformation {
  user_id: number,
  st_id: number,
  st_name: string,
  dept: string,
  coin_total: number,
  coin_plus: number,
  user_authority: string
}

export const fetchUsers = async (): Promise<
  IsStudentInformation[]
> => {
  const dummyUsers = [
    {
      user_id: 1,
      st_id: 2022310001,
      st_name: "학생1",
      dept: "소프트웨어학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자"
    },
    {
      user_id: 2,
      st_id: 2022310002,
      st_name: "학생2",
      dept: "소프트웨어학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자"
    },
    {
      user_id: 3,
      st_id: 2022310003,
      st_name: "학생3",
      dept: "소프트웨어학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자"
    },
    {
      user_id: 4,
      st_id: 2022310004,
      st_name: "학생4",
      dept: "소프트웨어학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자"
    },
    {
      user_id: 5,
      st_id: 2022310005,
      st_name: "학생5",
      dept: "소프트웨어학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자"
    },
    {
      user_id: 6,
      st_id: 2022310006,
      st_name: "학생6",
      dept: "소프트웨어학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자"
    },
    {
      user_id: 7,
      st_id: 2022310007,
      st_name: "학생7",
      dept: "소프트웨어학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자"
    },
    {
      user_id: 8,
      st_id: 2022310008,
      st_name: "학생8",
      dept: "소프트웨어학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자"
    },
    {
      user_id: 9,
      st_id: 2022310009,
      st_name: "학생9",
      dept: "소프트웨어학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자"
    },
    {
      user_id: 10,
      st_id: 2022310010,
      st_name: "학생10",
      dept: "소프트웨어학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자"
    },
    {
      user_id: 11,
      st_id: 2022310011,
      st_name: "학생11",
      dept: "소프트웨어학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자"
    },
    {
      user_id: 12,
      st_id: 2022310012,
      st_name: "학생12",
      dept: "소프트웨어학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자"
    },
    {
      user_id: 13,
      st_id: 2022310013,
      st_name: "학생13",
      dept: "소프트웨어학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자"
    },
    {
      user_id: 14,
      st_id: 2022310014,
      st_name: "학생14",
      dept: "소프트웨어학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자"
    },
    {
      user_id: 15,
      st_id: 20223100015,
      st_name: "학생15",
      dept: "소프트웨어학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자"
    },
    {
      user_id: 16,
      st_id: 2022310016,
      st_name: "학생16",
      dept: "소프트웨어학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자"
    },
    {
      user_id: 17,
      st_id: 2022310017,
      st_name: "학생17",
      dept: "소프트웨어학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자"
    },
    {
      user_id: 18,
      st_id: 2022310018,
      st_name: "학생18",
      dept: "소프트웨어학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자"
    },
    {
      user_id: 19,
      st_id: 2022310019,
      st_name: "학생19",
      dept: "소프트웨어학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자"
    },
    {
      user_id: 20,
      st_id: 2022310020,
      st_name: "학생20",
      dept: "소프트웨어학과",
      coin_total: 180,
      coin_plus: 240,
      user_authority: "사용자"
    }
  ];

  const result = new Promise<IsStudentInformation[]>(function (
    resolve,
    reject
  ) {
    setTimeout(() => {
      resolve(dummyUsers);
    }, 500);
  });

  return result;
};

