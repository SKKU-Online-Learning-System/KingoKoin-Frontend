import React, { useState } from "react";
import {
  Box,
  Tab,
  Accordion,
  Tabs,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { fetchFaqs, dummyPlatforms } from "../../api.jsx";

import { BiChevronDown } from "react-icons/bi";
import { useQuery } from "react-query";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import SiteLink from "../../components/SiteLink";
import Footer from "../../components/Footer";

function Faqs() {
  const {
    isLoading: faqIsLoading,
    error: faqError,
    data: faq,
  } = useQuery("faq", fetchFaqs);

  const [expanded, setExpanded] = useState(null);

  if (faqIsLoading) return <Loader />;
  if (faqError) return <div>{faqError.message}</div>;

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {faq.map((it, index) => (
        <div key={it.faq_id} className="flex flex-col gap-4 ">
          <div className="w-full justify-between items-center mb-4">
            <Accordion
              disableGutters
              square
              className="shadow rounded-lg"
              expanded={expanded === index + 1}
              onChange={handleChange(index + 1)}
            >
              <AccordionSummary
                className="flex flex-row-reverse gap-2 rounded-lg mx-2"
                expandIcon={<BiChevronDown className="w-6 h-6" />}
              >
                <Typography variant="title-l">Q. {it.question}</Typography>
              </AccordionSummary>
              <AccordionDetails className="px-12">
                <Typography variant="label-l">A. {it.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      ))}
    </div>
  );
}

function Main() {
  const [tab, setTab] = useState("1");

  return (
    <>
      <div className="flex items-center justify-end bg-primary h-8 p-1 px-8">
        <a href="main/login" className="text-onPrimary text-label-m">
          KINGO ID LOGIN
        </a>
      </div>
      <Header />
      <div className="flex flex-col items-center bg-surface min-h-screen">
        <div className="flex flex-col items-center w-[1152px] py-16">
          <TabContext value={tab}>
            <Box className="w-full shadow">
              <Tabs
                value={tab}
                variant="fullWidth"
                onChange={(e, value) => {
                  setTab(value);
                }}
                className="h-16"
              >
                <Tab
                  label="킹고코인이란?"
                  value="1"
                  className="h-16 text-title-l"
                />
                <Tab
                  label="자주 물어보는 질문"
                  value="2"
                  className="h-16 text-title-l"
                />
                <Tab
                  label="관련 사이트"
                  value="3"
                  className="h-16 text-title-l"
                />
              </Tabs>
            </Box>
            <TabPanel value="1" className="p-0 w-full">
              <div className="flex flex-col w-full">
                <h1 className="text-title-m p-8">킹고코인이란?</h1>
                <hr className="bg-primary w-8 h-1 ml-10"></hr>
                <div className="text-label-l p-8">
                  킹고코인은 성균관대에 학생들의 비교과 활동에 대한 인센티브로서
                  블록체인 기반의 마일리지 플랫폼입니다. 킹고 코인은 수강 및
                  질의응답 활동 등에 참여한 구성원들에게 마일리지를 부여하는
                  시스템입니다.
                  <br />
                  <br />
                  킹고 코인은 구성원들의 활동을 투명하게 기록하기 위해 퍼블릭
                  블록체인 플랫폼과 오프 체인 방식을 채택하였습니다. 이는 활동
                  내역을 퍼블릭 블록체인에 오프 체인 방식으로 모아서 저장하고,
                  데이터의 신뢰성과 보존성을 보장히며 활동 내역을 신뢰성 있게
                  영구히 보존할 수 있습니다.
                  <br />
                  <br />
                  킹고 코인을 통해 성균관대 구성원들은 활동에 대한 인센티브를
                  받을 수 있을 뿐만 아니라, 마일리지를 활용하여 다양한 혜택과
                  교내 서비스를 이용할 수 있게 될 것입니다. 이를 통해 학생들의
                  참여와 활발한 비교과 활동이 장려되고, 성균관대의 학습 및
                  커뮤니티 환경을 더욱 발전시키는 것이 킹고코인의 목표입니다.
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2" className="p-0 w-full">
              <div className="flex flex-col w-full">
                <h1 className="text-title-m p-8">자주 물어보는 질문</h1>
                <hr className="bg-primary w-8 h-1 ml-10"></hr>
                <div className="text-title-m p-8">
                  <Faqs />
                </div>
              </div>
            </TabPanel>
            <TabPanel value="3" className="p-0 w-full">
              <div className="flex flex-col w-full">
                <h1 className="text-title-m p-8">관련 사이트</h1>
                <hr className="bg-primary w-8 h-1 ml-10"></hr>
                <div className="text-title-l p-8">
                  <div className="flex flex-wrap gap-3">
                    {dummyPlatforms.map((it) => (
                      <SiteLink pfInfo={it} key={it.pf_name} />
                    ))}
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Main;
