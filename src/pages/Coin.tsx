import {
  getDevToken,
  getJWTClaims,
  getPolicies,
  getCoinDetail,
  postManualCoin,
  getUsersBySearch,
  getUserDetail,
  getCoin,
  testApi,
} from "../common/api";
import AdminCoinDetailCard from "../components/cards/detail/AdminCoinDetailCard";
import CoinGrantCard from "../components/cards/grant/CoinGrantCard";
import ExcelCoinGrantCard from "../components/cards/grant/ExcelCoinGrantCard";

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
