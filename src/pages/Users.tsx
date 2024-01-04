import { useState } from "react";
import UserSearchCard from "../components/cards/table/UserSearchCard";
import { GridRowParams } from "@mui/x-data-grid";
import UserChartCard from "../components/cards/chart/UserChartCard";
import UserCoinDetailCard from "../components/cards/table/UserCoinDetailCard";
import PlaceholderCard from "../components/cards/policy/PolicyPlaceholderCard";
import { Grow } from "@mui/material";

const Users = () => {
  const [open, setOpen] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();

  const handleRowClick = (params: GridRowParams) => {
    setOpen(false);
    setSelectedUserId(params.row.userId as number);
    setTimeout(() => {
      setOpen(true);
    }, 100);
  };

  return (
    <>
      <section className="flex gap-6">
        <UserSearchCard
          pageSize={4}
          handleRowClick={handleRowClick}
          className="w-[644px]"
        />
        <Grow in={open} timeout={100}>
          <div>
            {selectedUserId && (
              <UserChartCard
                userId={selectedUserId}
                pageSize={4}
                className="w-[466px] h-full"
              />
            )}
          </div>
        </Grow>
        {!selectedUserId && (
          <PlaceholderCard className="w-[466px]">
            목록에서 사용자를 선택하세요.
          </PlaceholderCard>
        )}
      </section>
      <Grow in={open} timeout={100}>
        <section className="flex gap-6">
          {selectedUserId && (
            <UserCoinDetailCard userId={selectedUserId} pageSize={4} />
          )}
        </section>
      </Grow>
    </>
  );
};

export default Users;
