import React, { useState } from "react";
import logo from "../../assets/main_logo_eng.png";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme, ThemeProvider } from "@mui/material";
import { fetchFaqs, dummyPlatforms } from "../../api.jsx";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useQuery } from "react-query";
import Loader from "../../components/Loader";

function Main() {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const theme = createTheme({
      palette: {
        primary: {
          main: '#2B6653',
        },
      },
      typography: {
        fontFamily: ["Noto Sans KR"],
        fontSize: 24,
        fontWeight: 500,
      },
    });
  
    const { isLoading: faqIsLoading, error: faqError, data: faq} = useQuery("faq", fetchFaqs);

    if(faqIsLoading) return <Loader/>;
    if(faqError) return <div>error</div>;

    const Accordion = styled((props) => (
      <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
    }));
  
    const AccordionSummary = styled((props) => (
      <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
      />
    ))(({ theme }) => ({
      borderRadius: '8px',
      backgroundColor:
        theme.palette.mode === 'dark'
          ? "#ffffff"
          : "#ffffff",
      flexDirection: 'row-reverse',
      '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
      },
      '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
      },
    }));
  
    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
      padding: theme.spacing(2),
    }));
  
    

    function CustomizedAccordions() {
      const [expanded, setExpanded] = React.useState(null);
    
      const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
      };
    
      return (
        <div>
          {faq.map((it, index) => (
            <div
              key={it.faq_id}
              className="flex flex-col gap-4 "
            >
              <div className="w-full justify-between items-center mb-4">
                <Accordion
                  expanded={expanded === `panel${index + 1}`}
                  onChange={handleChange(`panel${index + 1}`)}
                >
                  <AccordionSummary
                    aria-controls={`panel${index + 1}d-content`}
                    id={`panel${index + 1}d-header`}
                  >
                    <Typography className="font-noto-sans-kr text-xl font-light">
                      Q. {it.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="pl-8 font-noto-sans-kr text-[20px] font-extralight">
                      {it.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          ))}
        </div>
      );
    }
    
        
    function Logo() {
        return (
        <div className="flex justify-between items-center bg-background px-8 py-8 pt-6 pb-6">
            <div className="flex items-center gap-4">
            <img src={logo} alt="SKKU logo" className="h-12" />
            <span className=" text-lightGray text-logo">|</span>
            <span className="text-logo" style={{ whiteSpace: "nowrap" }}>
                킹고코인
            </span>
            </div>
        </div>
        );
    }
    
  
    function Footer() {
        return (
            <div className="bg-onSurface p-4">
                <div className="flex justify-between">
                    <div className="flex items-center gap-4 p-4">
                        <img src={logo} alt="SKKU logo" className="h-12" />
                        <span className="text-logo fontSize-[24px] text-surface" style={{ whiteSpace: "nowrap" }}>킹고코인</span>
                    </div>
                    <div className="flex justify-end text-surface text-s font-noto-sans-kr font-light">
                        <a className="p-2" href='https://www.skku.edu/skku/etc/pop_email.do' target='_blank' rel="noreferrer">이메일</a><p className="p-2">|</p>
                        <a className="p-2" href='https://www.skku.edu/skku/etc/pop_email.do' target='_blank' rel="noreferrer">무료수집거부</a><p className="p-2">|</p>
                        <a className="p-2" href='https://www.skku.edu/skku/etc/private.do' target='_blank' rel="noreferrer">개인정보처리방침</a>
                    </div>
                </div>
                
                <div>
                    <p className="text-surface p-4 text-s font-noto-sans-kr font-light leading-8">성균관대학교 소프트웨어융합대학<br />
                    경기도 수원시 장안구 서부로2066 성균관대학교 자연과학캠퍼스<br />
                    소프트웨어융합대학 Copyrightⓒ2022 SUNGKYUNKWAN UNIVERSITY ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        );
    }
  
    
    return (
    <div className="bg-surface">
        <div className="min-h-screen">
            <div className="flex items-center justify-end bg-primary h-[40px] p-1">
                <a href="/login" className="pr-8 m-2 text-onPrimary font-noto-sans-kr font-bold">KINGO ID LOGIN</a>
            </div>
            <Logo></Logo>
            <div className="bg-lightGray h-[0.5px]"></div>
            <div className="relative flex justify-center mb-8">
                <video muted autoPlay loop  className="w-full">
                    <source src="https://svr.skku.edu/sw/main_video.mp4" type="video/mp4"/>
                </video>
              <p className="absolute select-none h-full w-full flex justify-center items-center bottom-0 right-0 bg-gradient-to-t from-black opacity-80 to-transparent p-4"></p>
            </div>
                <Container fixed>
                <ThemeProvider theme={theme}>
                    <TabContext value={value}>
                    <Box sx={{ width: '100%', boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.1)' }}>
                        <Tabs value={value} variant="fullWidth" onChange={handleChange} aria-label="secondary tabs example" className="h-[60px]">
                        <Tab label="킹고코인이란?" value="1" className="h-[60px]" />
                        <Tab label="자주 물어보는 질문" value="2" className="h-[60px]" />
                        <Tab label="관련 사이트" value="3" className="h-[60px]" />
                        </Tabs>
                    </Box>
                    <TabPanel value="1">
                        <div>
                        <h1 className="text-title-m p-8">킹고코인이란?</h1>
                        <hr className="bg-[#2B6653] w-[30px] ml-10 p-0.5"></hr>
                        <div className="w-full">
                          <p className="font-noto-sans-kr text-xl font-extralight p-8 ">
                            킹고코인은 성균관대에 학생들의 비교과 활동에 대한 인센티브로서 블록체인 기반의 
                            마일리지 플랫폼입니다. 킹고 코인은 수강 및 질의응답 활동 등에 참여한 구성원들에게 마일리지를 부여하는 시스템입니다.<br/><br/>
                            킹고 코인은 구성원들의 활동을 투명하게 기록하기 위해 퍼블릭 블록체인 플랫폼과 오프 체인 방식을 채택하였습니다. 이는 활동 내역을 퍼블릭 블록체인에 
                            오프 체인 방식으로 모아서 저장하고, 데이터의 신뢰성과 보존성을 보장히며 활동 내역을 신뢰성 있게 영구히 보존할 수 있습니다.<br/><br/>
                            킹고 코인을 통해 성균관대 구성원들은 활동에 대한 인센티브를 받을 수 있을 뿐만 아니라, 마일리지를 활용하여 다양한 혜택과 교내 서비스를 이용할 수 있게 
                            될 것입니다. 이를 통해 학생들의 참여와 활발한 비교과 활동이 장려되고, 성균관대의 학습 및 커뮤니티 환경을 더욱 발전시키는 것이 킹고코인의 목표입니다.
                          </p>
                        </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="2">
                        <div>
                        <h1 className="text-title-m p-8">자주 물어보는 질문</h1>
                        <hr className="bg-[#2B6653] w-[30px] ml-10 p-0.5"></hr>
                        <div className="text-title-m p-8">
                            <CustomizedAccordions />
                        </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="3">
                        <div>
                        <h1 className="text-title-m p-8">관련 사이트</h1>
                        <hr className="bg-[#2B6653] w-[30px] ml-10 p-0.5"></hr>
                        <div className="text-title-l p-8 text-xl">
                            <div className="flex gap-16">
                            {dummyPlatforms.map((it) => (
                                <a
                                key={it.pf_name}
                                href={it.pf_link}
                                target='_blank'
                                rel="noreferrer"
                                className="flex bg-background w-[248px] h-20 justify-center items-center rounded-lg shadow-lg "
                                >
                                {it.pf_logo ? (
                                    <>
                                    <img
                                        className="w-8 h-8 mr-2"
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
                        </div>
                        </div>
                    </TabPanel>
                    </TabContext>
                </ThemeProvider>
                </Container>
        </div>
        
        <Footer></Footer>
    </div>
    );
}
  export default Main;
  
