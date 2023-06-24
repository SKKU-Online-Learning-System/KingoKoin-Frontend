import React, { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { dummyFNQ, dummyKoin, dummyKoinDetails } from "../../api.tsx";
import Counter from "./Counter.jsx";
import SKKU_LOGO from "../../assets/skku_emblem_kor.png";
import SODS_LOGO from "../../assets/sosd_logo.svg";

function Page3(props) {
  const dummyLinks = [
    {
      pf_name: "온라인명륜당",
      pf_logo: null,
      pf_link: "https://mrdang.cs.skku.edu",
    },
    {
      pf_name: "학과 행사 참석",
      pf_logo: SKKU_LOGO,
      pf_link:
        "https://sw.skku.edu/sw/notice.do?mode=list&srCategoryId1=1587&srSearchKey=&srSearchVal=",
    },
    {
      pf_name: "오픈소스플랫폼",
      pf_logo: SODS_LOGO,
      pf_link: "https://sosd.skku.edu",
    },
    {
      pf_name: "킹고인과의 만남",
      pf_logo: SKKU_LOGO,
      pf_link:
        "https://sw.skku.edu/sw/notice.do?mode=list&srCategoryId1=1587&srSearchKey=&srSearchVal=",
    },
  ];
  const [FNQ, setFNQ] = useState(dummyFNQ);

  const handleToggle = (id) => {
    const target = FNQ.findIndex((it) => it.id === id);
    setFNQ(
      FNQ.map((item, index) => {
        if (index !== target) {
          return item;
        }
        return {
          ...item,
          isToggle: !item.isToggle,
        };
      })
    );
  };

  return (
    <div className="flex flex-col gap-16 justify-center py-16 w-[1040px] mx-auto">
      <section className="flex gap-32 self-center">
        <div className="flex flex-col gap-4 items-center">
          <Counter start={0} end={dummyKoin.curr} duration={1000}></Counter>
          <span className="text-title-m">보유한 코인</span>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <Counter start={0} end={dummyKoin.all} duration={1000}></Counter>
          <span className="text-title-m">획득한 코인</span>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <Counter start={0} end={dummyKoin.used} duration={1000}></Counter>
          <span className="text-title-m">사용한 코인</span>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <div className="text-display">코인 내역</div>
        <div className="h-[285px] overflow-y-scroll">
          <table className="bg-background w-full rounded-lg">
            <thead>
              <tr className="text-label border-solid border-b-2 border-surface">
                <th className="text-left w-32 p-4">날짜</th>
                <th className="text-left w-40 p-4">플랫폼</th>
                <th className="text-left w-64 p-4">내용</th>
                <th className="text-right w-32 p-4">획득한 코인</th>
                <th className="text-right w-32 p-4">사용한 코인</th>
                <th className="text-right w-32 p-4">보유한 코인</th>
              </tr>
            </thead>
            <tbody>
              {dummyKoinDetails.map((it) => (
                <tr key={it.detail_id} className="text-body">
                  <td className="text-left p-4">
                    {new Date(it.createdAt).toLocaleDateString("ko-KR", {
                      timeZone: "UTC",
                    })}
                  </td>
                  <td className="text-left p-4">{it.pf_name}</td>
                  <td className="text-left p-4">{it.title}</td>
                  <td className="text-right p-4">{it.plus ? it.point : ""}</td>
                  <td className="text-right p-4">{it.plus ? "" : it.point}</td>
                  <td className="text-right p-4">{it.point}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <div className="text-title-m">자주 묻는 질문</div>
        {FNQ.map((it) => (
          <div
            key={it.id}
            className="flex flex-col gap-4 bg-background px-8 py-4 rounded-lg"
          >
            <div className="flex w-full justify-between items-center">
              <div className="text-label">{it.question}</div>
              {it.isToggle ? (
                <AiOutlineUp
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleToggle(it.id)}
                />
              ) : (
                <AiOutlineDown
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleToggle(it.id)}
                />
              )}
            </div>
            {it.isToggle && <p>{it.answer}</p>}
          </div>
        ))}
      </section>
      <section className="flex flex-col gap-4">
        <div className="text-title-m">코인을 더 모으고 싶다면?</div>
        <div className="flex gap-4">
          {dummyLinks.map((it) => (
            <a
              key={it.pf_name}
              href={it.pf_link}
              className="flex bg-background w-[248px] h-20 justify-center items-center rounded-lg"
            >
              {it.pf_logo ? (
                <>
                  <img
                    className="w-8 h-8"
                    src={it.pf_logo}
                    alt={it.pf_name + " 링크"}
                  />
                  <div className="text-label">{it.pf_name}</div>
                </>
              ) : (
                <div className="font-gugi text-xl">{it.pf_name}</div>
              )}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
export default Page3;
