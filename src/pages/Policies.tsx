import { useState } from "react";
import { POLICY_REQUEST_TYPE } from "../common/apiManager";
import CreatePolicyCard from "../components/cards/policy/CreatePolicyCard";
import UpdatePolicyCard from "../components/cards/policy/UpdatePolicyCard";
import PolicySearchCard from "../components/cards/table/PolicySearchCard";
import PlaceholderCard from "../components/cards/policy/PolicyPlaceholderCard";
import { Grow } from "@mui/material";

interface IPolicyCard {
  type: POLICY_REQUEST_TYPE;
  plId?: number;
}

const Policies = () => {
  const [open, setOpen] = useState(false);

  const [policyCard, setPolicyCard] = useState<IPolicyCard>({
    type: POLICY_REQUEST_TYPE.EMPTY,
    plId: undefined,
  });

  const handleRowClick = (type: POLICY_REQUEST_TYPE, plId?: number) => {
    setOpen(false);
    setPolicyCard({ type, plId });
    setTimeout(() => {
      setOpen(true);
    }, 100);
  };

  return (
    <>
      <section className="flex gap-6">
        <PolicySearchCard
          pageSize={4}
          handleRowClick={handleRowClick}
          className="w-[662px]"
        />
        {policyCard.type === POLICY_REQUEST_TYPE.EMPTY && (
          <PlaceholderCard className="w-[466px]">
            목록에서 정책을 선택하세요.
          </PlaceholderCard>
        )}
        <Grow in={open} timeout={100}>
          <div>
            {policyCard.type === POLICY_REQUEST_TYPE.CREATE && (
              <CreatePolicyCard
                className="w-[466px] h-[438.4px]"
                reasonRow={4}
              />
            )}
            {policyCard.type === POLICY_REQUEST_TYPE.UPDATE && (
              <UpdatePolicyCard
                plId={policyCard.plId!}
                reasonRow={4}
                className="w-[466px] h-[438.4px]"
              />
            )}
          </div>
        </Grow>
      </section>
    </>
  );
};

export default Policies;
