import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { dummyLinks, fetchFaqs, fetchKoin, fetchKoinDetails } from "../../api";
import Counter from "./Counter";
import Loader from "../../components/Loader";

function Dashboard(props) {
  const {
    isLoading: faqsIsLoading,
    error: faqsError,
    data: faqs,
  } = useQuery("Faqs", fetchFaqs);

  const links = dummyLinks;

  const {
    isLoading: koinIsLoading,
    error: koinError,
    data: koin,
  } = useQuery("Koin", fetchKoin);

  const {
    isLoading: detailsIsLoading,
    error: detailsError,
    data: details,
  } = useQuery("KoinDetails", fetchKoinDetails);

  const queryClient = useQueryClient();

  const isLoading = faqsIsLoading || koinIsLoading || detailsIsLoading;
  const error = faqsError || koinError || detailsError;

  if (isLoading) return <Loader />;
  if (error) return <div>An error has occurred: {error.message}</div>;

  const handleToggle = (id) => {
    const target = faqs.findIndex((it) => it.faq_id === id);
    queryClient.setQueryData(
      "Faqs",
      faqs.map((item, index) => {
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
      <section className="flex self-center justify-around w-full">
        <div className="flex flex-col gap-4 items-center">
          <Counter start={0} end={koin.point_total} duration={1000}></Counter>
          <span className="text-title-m">보유한 코인</span>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <Counter start={0} end={koin.point_plus} duration={1000}></Counter>
          <span className="text-title-m">획득한 코인</span>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <Counter start={0} end={koin.point_minus} duration={1000}></Counter>
          <span className="text-title-m">사용한 코인</span>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <div className="text-display">코인 내역</div>
        <div className="overflow-hidden rounded-lg">
          <table className="bg-primary text-onPrimary w-full sticky top-0">
            <colgroup>
              <col className="w-32" />
              <col className="w-40" />
              <col className="w-64" />
              <col className="w-32" />
              <col className="w-32" />
              <col className="w-32" />
            </colgroup>
            <thead>
              <tr className="text-label-m">
                <th className="text-left p-4">날짜</th>
                <th className="text-left p-4">플랫폼</th>
                <th className="text-left p-4">내용</th>
                <th className="text-right p-4">획득한 코인</th>
                <th className="text-right p-4">사용한 코인</th>
                <th className="text-right p-4">보유한 코인</th>
              </tr>
            </thead>
          </table>
          <div className="h-[208px] overflow-y-scroll">
            <table className="bg-background w-full">
              <colgroup>
                <col className="w-32" />
                <col className="w-40" />
                <col className="w-64" />
                <col className="w-32" />
                <col className="w-32" />
                <col className="w-32" />
              </colgroup>
              <tbody>
                {details.map((it) => (
                  <tr key={it.dt_id} className="text-body">
                    <td className="text-left p-4">
                      {new Date(it.modified_date).toLocaleDateString("ko-KR", {
                        timeZone: "UTC",
                      })}
                    </td>
                    <td className="text-left p-4">{it.pf_name}</td>
                    <td className="text-left p-4">{it.pl_name}</td>
                    <td className="text-right p-4">
                      {it.plus ? it.point : ""}
                    </td>
                    <td className="text-right p-4">
                      {it.plus ? "" : it.point}
                    </td>
                    <td className="text-right p-4">{it.point_total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <div className="text-title-m">자주 묻는 질문</div>
        {faqs.map((it) => (
          <div
            key={it.faq_id}
            className="flex flex-col gap-4 bg-background px-8 py-4 rounded-lg"
          >
            <div className="flex w-full justify-between items-center">
              <div className="text-label-l">{it.question}</div>
              {it.isToggle ? (
                <BiChevronUp
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleToggle(it.faq_id)}
                />
              ) : (
                <BiChevronDown
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleToggle(it.faq_id)}
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
          {links.map((it) => (
            <a
              key={it.pf_name}
              href={it.pf_link}
              className="flex bg-background w-[248px] h-20 justify-center items-center rounded-lg shadow-md "
            >
              {it.pf_logo ? (
                <>
                  <img
                    className="w-8 h-8"
                    src={it.pf_logo}
                    alt={it.pf_name + " 링크"}
                  />
                  <div className="text-label-l">{it.pf_name}</div>
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
export default Dashboard;
