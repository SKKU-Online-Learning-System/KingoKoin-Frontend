import { useState } from "react";
import UserSearchCard from "../components/cards/table/UserSearchCard";
import { GridRowParams } from "@mui/x-data-grid";
import UserChartCard from "../components/cards/chart/UserChartCard";
import UserCoinDetailCard from "../components/cards/table/UserCoinDetailCard";

const Users = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();

  const handleRowClick = (params: GridRowParams) => {
    setSelectedUserId(params.row.stId as number);
  };

  return (
    <>
      <section className="flex gap-6">
        <UserSearchCard
          pageSize={4}
          handleRowClick={handleRowClick}
          className="w-[644px]"
        />
        {selectedUserId && (
          <UserChartCard
            userId={selectedUserId}
            pageSize={4}
            className="w-[466px]"
          />
        )}
      </section>
      <section className="flex gap-6">
        {selectedUserId && (
          <UserCoinDetailCard userId={selectedUserId} pageSize={4} />
        )}
      </section>
    </>
  );
};

export default Users;
