import { getDevToken } from "../common/api";
import CoinGrantCard from "../components/cards/grant/CoinGrantCard";
import ExcelCoinGrantCard from "../components/cards/grant/ExcelCoinGrantCard";
import AdminCoinDetailCard from "../components/cards/table/AdminCoinDetailCard";

const Coin = () => {
  // TODO: adId 받아오기
  const adId = 1;

  return (
    <>
      <section className="flex gap-6">
        <CoinGrantCard adId={adId} />
        <ExcelCoinGrantCard adId={adId} maxRow={100} />
      </section>
      <section>
        <AdminCoinDetailCard adId={adId} pageSize={4} />
      </section>
    </>
  );
};

export default Coin;
