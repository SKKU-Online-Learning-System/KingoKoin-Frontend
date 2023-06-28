import React, {useState} from "react";
// Initialization for ES Users
import {
  Collapse,
  initTE,
} from "tw-elements";

initTE({ Collapse });

function Dashboard(props) {
  const [section1Open, setSection1Open] = useState(false);
  const [section2Open, setSection2Open] = useState(false);
  return (
    <div>
        <div className="CoinNum flex justify-center">
        <div className="px-20 pt-20">
          <span className="text-SKKU_GREEN text-6xl font-bold flex justify-center pb-10">180</span>
          <div className="flex justify-center text-3xl pb-20">보유중인 포인트</div>
        </div>
        <div className="px-20 pt-20">
          <span className="text-SKKU_GREEN text-6xl font-bold flex justify-center pb-10">240</span>
          <div className="flex justify-center text-3xl pb-20">획득한 포인트</div>
        </div>
        <div className="px-20 pt-20">
          <span className="text-SKKU_GREEN text-6xl font-bold flex justify-center pb-10">60</span>
          <div className="flex justify-center text-3xl">사용한 포인트</div>
        </div>
      </div>

      <div>
      <div className="text-4xl font-bold pl-16 pb-5">코인 내역</div>
        <div className="flex justify-center px-10 w-auto h-64 table-auto overflow-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-auto">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
              <tr className="text-center border-b dark:bg-gray-800 dark:border-gray-700">
                <th className="px-6 py-3">날짜</th>
                <th className="px-6 py-3">내용</th>
                <th className="px-6 py-3">획득한 코인</th>
                <th className="px-6 py-3">사용한 코인</th>
                <th className="px-6 py-3">누계</th>
              </tr>
            </thead>
            <tbody className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-center">
                <td className="px-6 py-4">0000.00.00</td>
                <td className="px-6 py-4">AWS 이용</td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4">10</td>
                <td className="px-6 py-4">40</td>
              </tr>
              <tr className="text-center">
                <td className="px-6 py-4">0000.00.00</td>
                <td className="px-6 py-4">IT 화상강연 참여</td>
                <td className="px-6 py-4">10</td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4">50</td>
              </tr>
              <tr className="text-center">
                <td className="px-6 py-4">0000.00.00</td>
                <td className="px-6 py-4">온라인 명륜당 회원가입</td>
                <td className="px-6 py-4">30</td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4">40</td>
              </tr>
              <tr className="text-center">
                <td className="px-6 py-4">0000.00.00</td>
                <td className="px-6 py-4">세미나실 추가 이용 - 2시간</td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4">20</td>
                <td className="px-6 py-4">10</td>
              </tr>
              <tr className="text-center">
                <td className="px-6 py-4">0000.00.00</td>
                <td className="px-6 py-4">오픈소스 플랫폼 레벨업</td>
                <td className="px-6 py-4">30</td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4">30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="text-3xl font-bold pl-16 pb-5 pt-10">F&A</div>
        
        <div id="accordion-collapse" data-accordion="collapse" className="px-10">
          <div className="bg-gray-50 ">
            <h2>
              <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left " onClick={() => setSection1Open(!section1Open)} aria-expanded={section1Open}>
                <span className="text-xl font-bold text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">휴학생도 킹고코인을 사용하고 받을 수 있나요?</span>
                <svg className={`w-6 h-6 ${section1Open ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd">
                  </path>
                </svg>
              </button>
            </h2>

            {section1Open && (
              <div className="p-5 dark:bg-gray-900">
                <p className="mb-2 text-gray-500">
                  킹고코인 포인트는 AWS, GPU 개인 사용 크레딧, IT 기기대여, 세미나실 사용에 사용 등에 사용될 수 있으며, 코리아챌린지와 글로벌챌린지를 비롯한 각종 학과내 행사에 있어서 선발 기준에 적용될 수 있습니다.
                </p>
              </div>
            )}

            <h2>
              <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left " onClick={() => setSection2Open(!section2Open)} aria-expanded={section2Open}>
                <span className="text-xl font-bold text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">휴학생도 킹고코인을 사용하고 받을 수 있나요?</span>
                <svg className={`w-6 h-6 ${section2Open ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd">
                  </path>
                </svg>
              </button>
            </h2>

            {section2Open && (
              <div className="p-5 dark:bg-gray-900">
                <p className="mb-2 text-gray-500">
                  킹고코인 포인트는 AWS, GPU 개인 사용 크레딧, IT 기기대여, 세미나실 사용에 사용 등에 사용될 수 있으며, 코리아챌린지와 글로벌챌린지를 비롯한 각종 학과내 행사에 있어서 선발 기준에 적용될 수 있습니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="text-3xl font-bold pl-16 pb-5 pt-10">코인을 더 모으고 싶다면?</div>
        <div className="flex justify-center flex-nowrap gap-10">
          <div className=" bg-gray-50 p-5">
            <a href = "https://mrdang.cs.skku.edu/">
              온라인 명륜당
            </a>
          </div> 

          <div className=" bg-gray-50 p-5">
            <a href = "https://itglobal.cs.skku.edu/login">
              글로벌 IT 강연
            </a>
          </div>  
          <div className=" bg-gray-50 p-5">
            <a href = "https://sosd.skku.edu/community/article/195/">
              오픈 소스 플랫폼
            </a>
          </div> 
          <div className=" bg-gray-50 p-5">
            <a href = "https://sw.skku.edu/sw/notice.do?mode=list&srCategoryId1=1587&srSearchKey=&srSearchVal=">
              킹고인과의 만남
            </a>
          </div> 
        </div>  
      </div>
    </div>
  );
}

export default Dashboard;
