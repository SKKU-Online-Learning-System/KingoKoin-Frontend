import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";
import banner from "../assets/banner.jpg";
import { FAQS, PLATFORMS, getDevToken } from "../common/api";
import { PROD_HOST } from "../common/apiManager";
import SiteLink from "../components/SiteLink";
import Footer from "../components/frames/Footer";
import Header from "../components/frames/Header";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  label: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, label, ...other } = props;

  return (
    <div className="flex items-center justify-center w-full">
      <div hidden={value !== index} {...other} className="w-full">
        {value === index && (
          <div className="flex flex-col gap-4 py-8 w-full">
            <h1 className="text-title-m">{label}</h1>
            <hr className="bg-primary w-8 h-1 ml-2"></hr>
            <div className="text-label-l">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function Main() {
  /* Panel control */
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col items-center bg-surface">
      <div className="flex items-center justify-end w-screen max-w-full bg-primary h-8 p-1 px-8">
        <a href={PROD_HOST} className="text-onPrimary text-label-m">
          KINGO ID LOGIN
        </a>
      </div>
      <Header />
      <div className="relative flex justify-center mb-8">
        <img
          src={banner}
          className="w-full"
          alt="성균관대학교 삼성정보학술관 전경 사진"
        />
        <p className="absolute select-none h-full w-full flex justify-center items-center bottom-0 right-0 bg-gradient-to-t from-black opacity-80 to-transparent text-right text-white font-bold text-[60px] p-4">
          K I N G O C O I N
        </p>
      </div>
      <div className="w-[1152px] py-8 min-h-screen">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          className="h-16 shadow-md"
        >
          <Tab label="킹고코인이란?" className="h-16 text-title-l shadow-sm" />
          <Tab
            label="자주 물어보는 질문"
            className="h-16 text-title-l shadow-sm"
          />
          <Tab label="관련 사이트" className="h-16 text-title-l shadow-sm" />
        </Tabs>
        <TabPanel value={value} index={0} label="킹고코인이란?">
          킹고코인은 성균관대에 학생들의 비교과 활동에 대한 인센티브로서
          블록체인 기반의 마일리지 플랫폼입니다. 킹고 코인은 수강 및 질의응답
          활동 등에 참여한 구성원들에게 마일리지를 부여하는 시스템입니다.
          <br />
          <br />
          킹고 코인은 구성원들의 활동을 투명하게 기록하기 위해 퍼블릭 블록체인
          플랫폼과 오프 체인 방식을 채택하였습니다. 이는 활동 내역을 퍼블릭
          블록체인에 오프 체인 방식으로 모아서 저장하고, 데이터의 신뢰성과
          보존성을 보장히며 활동 내역을 신뢰성 있게 영구히 보존할 수 있습니다.
          <br />
          <br />
          킹고 코인을 통해 성균관대 구성원들은 활동에 대한 인센티브를 받을 수
          있을 뿐만 아니라, 마일리지를 활용하여 다양한 혜택과 교내 서비스를
          이용할 수 있게 될 것입니다. 이를 통해 학생들의 참여와 활발한 비교과
          활동이 장려되고, 성균관대의 학습 및 커뮤니티 환경을 더욱 발전시키는
          것이 킹고코인의 목표입니다.
        </TabPanel>
        <TabPanel value={value} index={1} label="자주 물어보는 질문">
          {FAQS.map((it) => (
            <Accordion key={it.faqId} className="shadow rounded-lg mb-4">
              <AccordionSummary
                className="flex flex-row-reverse gap-2 rounded-lg mx-2"
                expandIcon={<ExpandMore className="w-6 h-6" />}
              >
                <Typography variant="title-l">{it.question}</Typography>
              </AccordionSummary>
              <AccordionDetails className="px-12">
                <Typography variant="label-l">{it.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>
        <TabPanel value={value} index={2} label="관련 사이트">
          <div className="flex flex-wrap gap-3">
            {PLATFORMS.map((it) => (
              <SiteLink
                platform={it}
                key={it.pfName}
                className="flex justify-center items-center gap-4 w-[270px] py-4 text-onBackground bg-background rounded-lg border-solid border-[1px] border-primary hover:shadow-lg hover:scale-[1.03] transition-all"
              />
            ))}
          </div>
        </TabPanel>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
