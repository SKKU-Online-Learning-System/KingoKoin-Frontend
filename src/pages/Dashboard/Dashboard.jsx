import React from "react";
import { useQuery } from "react-query";
import { BiChevronDown } from "react-icons/bi";
import {
  dummyPlatforms,
  fetchFaqs,
  fetchKoin,
  fetchCoinDetails,
} from "../../api";
import Counter from "./Counter";
import Loader from "../../components/Loader";
import {
  Card,
  CardContent,
  CardHeader,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import SiteLink from "../../components/SiteLink";
import UserCoinHistory from "../../components/UserCoinHistory";
import UserCoinGraph from "../../components/UserCoinGraph";

function Dashboard(props) {
  const {
    isLoading: faqsIsLoading,
    error: faqsError,
    data: faqs,
  } = useQuery("Faqs", fetchFaqs);

  const links = dummyPlatforms;

  const {
    isLoading: koinIsLoading,
    error: koinError,
    data: koin,
  } = useQuery("Koin", fetchKoin);

  const {
    isLoading: detailsIsLoading,
    error: detailsError,
    data: details,
  } = useQuery("KoinDetails", fetchCoinDetails);

  const isLoading = faqsIsLoading || koinIsLoading || detailsIsLoading;
  const error = faqsError || koinError || detailsError;

  if (isLoading) return <Loader />;
  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div className="flex flex-col gap-6 justify-center py-16 w-[1152px] mx-auto">
      <section className="flex gap-6 w-full">
        <div className="flex flex-col gap-6 w-full">
          <div className="flex gap-6">
            <Card className="w-[172px]">
              <CardHeader
                title="보유한 코인"
                titleTypographyProps={{ variant: "label-l" }}
              />
              <CardContent>
                <div className="flex items-end">
                  <Counter start={0} end={coin.point_total} duration={1000} />
                  <div
                    className={
                      details[0].plus
                        ? "flex text-primary"
                        : "flex text-red-600"
                    }
                  >
                    {details[0].point}
                    {details[0].plus ? "▲" : "▼"}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="w-[172px]">
              <CardHeader
                title="획득한 코인"
                titleTypographyProps={{ variant: "label-l" }}
              />
              <CardContent>
                <div className="flex items-end">
                  <Counter start={0} end={koin.point_plus} duration={1000} />
                  <div
                    className={
                      details[0].plus
                        ? "flex text-primary"
                        : "flex text-red-600"
                    }
                  >
                    {details[0].point}
                    {details[0].plus ? "▲" : "▼"}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="w-[172px]">
              <CardHeader
                title="사용한 코인"
                titleTypographyProps={{ variant: "label-l" }}
              />
              <CardContent>
                <div className="flex items-end">
                  <Counter start={0} end={koin.point_minus} duration={1000} />
                  <div
                    className={
                      details[0].plus
                        ? "flex text-red-600"
                        : "flex text-primary"
                    }
                  >
                    {details[0].point}
                    {details[0].plus ? "▼" : "▲"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <UserCoinGraph details={details} />
        </div>
        <Card className="bg-transparent shadow-none w-full">
          <CardHeader
            title="연관 사이트로 이동"
            titleTypographyProps={{ variant: "display" }}
          />
          <CardContent>
            <div className="flex flex-wrap gap-3 w-full">
              {links.map((it) => (
                <SiteLink pfInfo={it} key={it.pf_name} />
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
      <section className="flex flex-col gap-4">
        <UserCoinHistory details={details} />
      </section>
      <section className="flex flex-col gap-4">
        <Card className="bg-transparent shadow-none w-full">
          <CardHeader
            title="자주 묻는 질문"
            titleTypographyProps={{ variant: "display" }}
          />
          <CardContent>
            {faqs.map((it) => (
              <Accordion key={it.faq_id}>
                <AccordionSummary
                  expandIcon={<BiChevronDown className="w-6 h-6" />}
                >
                  <Typography variant="title-l">{it.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body">{it.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
export default Dashboard;
