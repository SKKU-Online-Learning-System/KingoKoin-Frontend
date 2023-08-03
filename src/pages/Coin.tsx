import { useQuery } from "react-query";
import CoinGrantCard from "../components/cards/grant/CoinGrantCard";
import ExcelCoinGrantCard from "../components/cards/grant/ExcelCoinGrantCard";
import AdminCoinDetailCard from "../components/cards/table/AdminCoinDetailCard";
import { check } from "../common/apiManager";
import Status from "../components/feedback/Status";

const Coin = () => {
  const {
    isLoading: loginIsLoading,
    error: loginError,
    data: login,
  } = useQuery("login", check);

  const render = !loginIsLoading && !loginError && login;

  return (
    <>
      <Status
        isLoading={loginIsLoading}
        error={loginError}
        isData={login ? true : false}
        className="w-screen max-w-full h-screen"
      />
      {render && (
        <>
          <section className="flex gap-6">
            <CoinGrantCard adId={login.userId} />
            <ExcelCoinGrantCard adId={login.userId} maxRow={100} />
          </section>
          <section>
            <AdminCoinDetailCard adId={login.userId} pageSize={4} />
          </section>
        </>
      )}
    </>
  );
};

export default Coin;
