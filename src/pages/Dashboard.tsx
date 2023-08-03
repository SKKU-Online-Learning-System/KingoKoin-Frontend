import { useQuery } from "react-query";
import CounterCard from "../components/Counter";
import UserChartCard from "../components/cards/chart/UserChartCard";
import { ICoin, PLATFORMS, getCoin } from "../common/api";
import { Card, CardContent, CardHeader } from "@mui/material";
import SiteLink from "../components/SiteLink";
import UserCoinDetailCard from "../components/cards/table/UserCoinDetailCard";
import { check } from "../common/apiManager";
import { dayjsToStamp } from "../common/utils";
import dayjs from "dayjs";
import Status from "../components/feedback/Status";

const Dashboard = () => {
  const {
    isLoading: loginIsLoading,
    error: loginError,
    data: login,
  } = useQuery("login", check);

  const {
    isLoading: userCoinIsLoading,
    error: userCoinError,
    data: userCoin,
  } = useQuery(["userCoin"], () =>
    login
      ? getCoin(login.userId)
      : new Promise<ICoin>((resolve) =>
          resolve({
            coinId: 0,
            userId: 0,
            pointTotal: 0,
            pointPlus: 0,
            pointMinus: 0,
            createdDate: dayjsToStamp(dayjs()),
            modifiedDate: dayjsToStamp(dayjs()),
          })
        )
  );

  const isLoading = loginIsLoading || userCoinIsLoading;
  const error = loginError || userCoinError;
  const isData = login && userCoin ? true : false;

  const render = !isLoading && !error && isData;

  return (
    <>
      <Status
        isLoading={isLoading}
        error={error}
        isData={isData}
        className="w-screen max-w-full h-screen"
      />
      {render && (
        <>
          <section className="flex gap-6 w-full">
            <div className="flex flex-col gap-6 w-full">
              <div className="flex gap-6">
                <CounterCard
                  label={"보유한 코인"}
                  target={userCoin?.pointTotal}
                  deltaPlus={true}
                  delta={0}
                  duration={1000}
                  className="w-[172px]"
                />
                <CounterCard
                  label={"획득한 코인"}
                  target={userCoin?.pointPlus}
                  deltaPlus={true}
                  delta={0}
                  duration={1000}
                  className="w-[172px]"
                />
                <CounterCard
                  label={"사용한 코인"}
                  target={userCoin?.pointMinus}
                  deltaPlus={true}
                  delta={0}
                  duration={1000}
                  className="w-[172px]"
                />
              </div>
              <UserChartCard
                userId={login!.userId}
                pageSize={1}
                className="w-[564px]"
              />
            </div>
            <Card className="bg-transparent shadow-none w-full">
              <CardHeader
                title="연관 사이트로 이동"
                titleTypographyProps={{ variant: "display" }}
              />
              <CardContent>
                <div className="flex flex-wrap gap-3 w-full">
                  {PLATFORMS.map((it) => (
                    <SiteLink
                      platform={it}
                      key={it.pfName}
                      className="flex justify-center items-center gap-1 w-[258px] h-[156.5px] text-onBackground bg-background rounded-lg border-solid border-[1px] border-primary hover:shadow-lg hover:scale-[1.03] transition-all"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
          <section>
            <UserCoinDetailCard userId={login!.userId} pageSize={4} />
          </section>
        </>
      )}
    </>
  );
};

export default Dashboard;
