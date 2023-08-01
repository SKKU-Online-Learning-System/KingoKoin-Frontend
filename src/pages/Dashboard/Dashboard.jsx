import React from "react";
import { useQuery } from "react-query";
import {
  getCoin,
  getCoinDetail,
  getCoinDetailByAdminId,
  getDevToken,
  getJWTClaims,
  getPolicies,
  getStaticsByMonth,
  getUserDetail,
  getUsersBySearch,
  postManualCoin,
  postPolicyRequest,
  PLATFORMS,
  FAQS,
} from "../../api";
import Counter from "./Counter";
import Loader from "../../components/Loader";
import { Card, CardContent, CardHeader } from "@mui/material";
import SiteLink from "../../components/SiteLink";
import UserCoinHistory from "../../components/UserCoinDetail";
import UserCoinGraph from "../../components/UserCoinGraph";
import Error from "../../components/Error";

function Dashboard(props) {
  const userId = 1;

  const {
    isLoading: userCoinIsLoading,
    error: userCoinError,
    data: userCoin,
  } = useQuery(["userCoin"], () => getCoin(userId));

  const {
    isLoading: userDetailIsLoading,
    error: userDetailError,
    data: userDetail,
  } = useQuery(["userDetail", userId], () => getUserDetail(userId));

  const isLoading = userCoinIsLoading || userDetailIsLoading;
  const error = userCoinError || userDetailError;

  if (isLoading) return <Loader />;
  if (error) return <Error />;

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
                  <Counter
                    start={0}
                    end={userCoin.pointTotal}
                    duration={1000}
                  />
                  <div
                    className={
                      userDetail[0].plus
                        ? "flex text-primary"
                        : "flex text-red-600"
                    }
                  >
                    {userDetail[0].point}
                    {userDetail[0].plus ? "▲" : "▼"}
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
                  <Counter start={0} end={userCoin.pointPlus} duration={1000} />
                  <div
                    className={
                      userDetail[0].plus
                        ? "flex text-primary"
                        : "flex text-red-600"
                    }
                  >
                    {userDetail[0].point}
                    {userDetail[0].plus ? "▲" : "▼"}
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
                  <Counter
                    start={0}
                    end={userCoin.pointMinus}
                    duration={1000}
                  />
                  <div
                    className={
                      userDetail[0].plus
                        ? "flex text-red-600"
                        : "flex text-primary"
                    }
                  >
                    {userDetail[0].point}
                    {userDetail[0].plus ? "▼" : "▲"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <UserCoinGraph details={userDetail} />
        </div>
        <Card className="bg-transparent shadow-none w-full">
          <CardHeader
            title="연관 사이트로 이동"
            titleTypographyProps={{ variant: "display" }}
          />
          <CardContent>
            <div className="flex flex-wrap gap-3 w-full">
              {PLATFORMS.map((it) => (
                <SiteLink pfInfo={it} key={it.pfName} />
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
      <section className="flex flex-col gap-4">
        <UserCoinHistory details={userDetail} />
      </section>
      {/* <section className="flex flex-col gap-4">
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
      </section> */}
    </div>
  );
}
export default Dashboard;
