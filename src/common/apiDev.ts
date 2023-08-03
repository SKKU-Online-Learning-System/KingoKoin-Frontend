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
