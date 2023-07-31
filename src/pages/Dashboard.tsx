import UserCoinDetailCard from "../components/cards/UserCoinDetailCard";

const Dashboard = () => {
  return (
    <div>
      <UserCoinDetailCard userId={1} pageSize={4} />
    </div>
  );
};

export default Dashboard;
