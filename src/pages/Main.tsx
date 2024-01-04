import { ExpandMore } from "@mui/icons-material";
// import { getStudentDevToken } from "./../common/api";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import banner from "../assets/banner.jpg";
import { FAQS, PLATFORMS } from "../common/api";
import { PROD_HOST, getAccessCookie } from "../common/apiManager";
import SiteLink from "../components/SiteLink";
import Footer from "../components/frames/Footer";
import Header from "../components/frames/Header";
import { useNavigate, useSearchParams, useMatch } from "react-router-dom";

import {
  JWT_COOKIE,
  USER_ROLE,
  check,
  setAccessCookie,
  setRefreshCookie,
} from "../common/apiManager";

export const PROD_LOGIN = "https://kingocoin.cs.skku.edu/api/";
export const DEV_LOGIN = "http://kingocoin-dev.cs.skku.edu:8080";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  label: string;
}

interface DevLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DevLoginModal: React.FC<DevLoginModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [glsId, setGlsId] = useState("");
  const [stId, setStId] = useState<number>();
  const [role, setRole] = useState<number>();
  const [tokensSet, setTokensSet] = useState(false);
  const navigate = useNavigate();

  const [responseData, setResponseData] = useState<any>(null);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    if (redirectTo) {
    navigate(redirectTo);
  //     // Reset the state if needed
    setRedirectTo(null);
    }
  }, [redirectTo]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`http://kingocoin-dev.cs.skku.edu:8080/api/dev/login/${role}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, glsId, stId }),
    });

    console.log("hi");

    const data = await response.json();
    setResponseData(data);

    if (response.ok) {
      console.log("ok");
      console.log(data);
      // setAccessToken(data.accessToken);
      // setRefreshToken(data.refreshToken);
      //window.location.href = DEV_LOGIN;

      if (data.accessToken) {
        console.log(data.accessToken);
        setAccessCookie(data.accessToken);
        console.log("get cookie: ",getAccessCookie());
      }
      if (data.refreshToken) {
        console.log(data.refreshToken);
        setRefreshCookie(data.refreshToken);
      }
      if (data.accessToken && data.refreshToken) {
        setTokensSet(true);
        console.log(true);
      }

      switch (role) {
        case 1:
          navigate("/admin/users");
          setRedirectTo("/admin/users");
          break;
        case 0:
          navigate("/dashboard");
          setRedirectTo("/dashboard");
          break;
        default:
          navigate("/");
          setRedirectTo("/404");
      }
      console.log("role: ", role);
    } else {
      console.error("Error logging in:", data);
    }

    onClose();
  };

  return (
    <div
      className="modal-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        className="modal-content"
        style={{
          background: "white",
          padding: "20px",
          maxWidth: "400px",
          margin: "50px auto",
        }}
      >
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            value={glsId}
            onChange={(e) => setGlsId(e.target.value)}
            placeholder="GLS ID"
          />
          <input
            value={stId}
            onChange={(e) => setStId(parseInt(e.target.value, 10))}
            placeholder="ST ID"
          />
          <input
            value={role}
            onChange={(e) => setRole(parseInt(e.target.value, 10))}
            placeholder="role"
          />

          <button type="submit">Send</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, label, ...other } = props;

  return (
    <div className="flex items-center justify-center w-full">
      <div hidden={value !== index} {...other} className="w-full">
        {value === index && (
          <div className="flex flex-col w-full gap-4 py-8">
            <h1 className="text-title-m">{label}</h1>
            <hr className="w-8 h-1 ml-2 bg-primary"></hr>
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
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogin = async (
    name: string,
    glsId: string,
    stId: number,
    role: number
  ) => {
    const response = await fetch(DEV_LOGIN + `/api/dev/login/${role}`, {
      method: "POST",
      headers: { Accept: "application/json",},
      body: JSON.stringify({ name, glsId, stId }),
    });

    console.log("h");

  
    // If the response is okay, redirect to the DEV_LOGIN link
    if (response.ok) {
      console.log("success")
      //window.location.href = ""; // Redirect to the DEV_LOGIN link
    } else {
      console.log("fail")
      // Handle the error. Maybe show an error message to the user?
    }

    setIsLoginModalOpen(false); // Close the modal after login or error
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col items-center bg-surface">
      <div className="flex items-center justify-end w-screen h-8 max-w-full p-1 px-8 bg-primary">
        {/* <a href={PROD_LOGIN} className="text-onPrimary text-label-m">
          KINGO ID LOGIN
        </a> */}
        <div
          onClick={() => {
            console.log("Login clicked");
            setIsLoginModalOpen(true);
            console.log(isLoginModalOpen);
            console.log("DEV_LOGIN");
          }}
          className="cursor-pointer text-onPrimary text-label-m"
        >
          KINGO ID LOGIN (DEV)
        </div>
      </div>
      <Header />
      <div className="relative flex justify-center mb-8">
        <img
          src={process.env.PUBLIC_URL + "/main/banner.jpg"}
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
          <Tab label="킹고코인이란?" className="h-16 shadow-sm text-title-l" />
          <Tab
            label="자주 물어보는 질문"
            className="h-16 shadow-sm text-title-l"
          />
          <Tab label="관련 사이트" className="h-16 shadow-sm text-title-l" />
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
            <Accordion key={it.faqId} className="mb-4 rounded-lg shadow">
              <AccordionSummary
                className="flex flex-row-reverse gap-2 mx-2 rounded-lg"
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
      <DevLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <Footer />
    </div>
  );
}

export default Main;
