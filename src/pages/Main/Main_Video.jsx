import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/main_logo_eng.png";
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
import SiteLink from "../../components/SiteLink";

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

function Footer() {
  return (
    <div className="bg-onSurface text-surface p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-4 p-4">
          <img src={logo} alt="SKKU logo" className="h-12" />
          <span className="text-logo" style={{ whiteSpace: "nowrap" }}>
            킹고코인
          </span>
        </div>
        <div className="flex justify-end text-body">
          <a
            className="p-2"
            href="https://www.skku.edu/skku/etc/pop_email.do"
            target="_blank"
            rel="noreferrer"
          >
            이메일
          </a>
          <p className="p-2">|</p>
          <a
            className="p-2"
            href="https://www.skku.edu/skku/etc/pop_email.do"
            target="_blank"
            rel="noreferrer"
          >
            무료수집거부
          </a>
          <p className="p-2">|</p>
          <a
            className="p-2"
            href="https://www.skku.edu/skku/etc/private.do"
            target="_blank"
            rel="noreferrer"
          >
            개인정보처리방침
          </a>
        </div>
      </div>
      <div>
        <p className="text-surface p-4 text-body">
          성균관대학교 소프트웨어융합대학
          <br />
          경기도 수원시 장안구 서부로2066 성균관대학교 자연과학캠퍼스
          <br />
          소프트웨어융합대학 Copyrightⓒ2022 SUNGKYUNKWAN UNIVERSITY ALL RIGHTS
          RESERVED.
        </p>
      </div>
    </div>
  );
}

function Main_Video() {
  const [tab, setTab] = useState("1");

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 700;
      setIsSticky(window.scrollY > scrollThreshold);
    };
    console.log(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function Video(){
    return (
      <div className="relative">
        <video muted autoPlay loop className="w-full">
          <source src="https://svr.skku.edu/sw/main_video.mp4" type="video/mp4" />
        </video>
        <p className="absolute select-none h-full w-full flex justify-center items-center bottom-0 right-0 bg-gradient-to-t from-black opacity-80 to-transparent p-4"></p>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        <div className={`z-10 w-full bg-transparent ${isSticky ? '' : 'fixed'}`}>
          <div className="flex items-center justify-end bg-primary h-[40px] p-1">
            <a href="/login" className="pr-8 m-2 text-onPrimary font-noto-sans-kr font-bold">KINGO ID LOGIN</a>
          </div>
          <div className={`flex justify-between items-center px-8 py-8 pt-6 pb-6 bg-gradient-to-t from-transparent to-black opacity-80`}>
            <div className="flex items-center gap-4">
              <img src={logo} alt="SKKU logo" className="h-12" />
              <span className={`text-logo text-white`} style={{ whiteSpace: "nowrap" }}>
                킹고코인
              </span>
            </div>
          </div>
        </div>
      </div>
      <Video/>
      <div>
        
      </div>
      {isSticky ? (
        <>
          <div className="flex items-center justify-end bg-primary h-[40px] p-1">
            <a href="/login" className="pr-8 m-2 text-onPrimary font-noto-sans-kr font-bold">KINGO ID LOGIN</a>
          </div>
          <div className={`flex justify-between items-center px-8 py-8 pt-6 pb-6 bg-surface`}>
            <div className="flex items-center gap-4">
              <img src={logo} alt="SKKU logo" className="h-12" />
              <span className={`text-logo text-black`} style={{ whiteSpace: "nowrap" }}>
                킹고코인
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
        </>
      )}
      <div className="bg-gray-300 h-[0.5px]"/>
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
export default Main_Video;
