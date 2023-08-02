import { useState } from "react";
import { POLICY_REQUEST_TYPE } from "../common/apiManager";
import CreatePolicyCard from "../components/cards/policy/CreatePolicyCard";
import UpdatePolicyCard from "../components/cards/policy/UpdatePolicyCard";
import PolicySearchCard from "../components/cards/table/PolicySearchCard";
import PolicyPlaceholderCard from "../components/cards/policy/PolicyPlaceholderCard";

interface IPolicyCard {
  type: POLICY_REQUEST_TYPE;
  plId?: number;
}

const Policies = () => {
  const [policyCard, setPolicyCard] = useState<IPolicyCard>({
    type: POLICY_REQUEST_TYPE.EMPTY,
    plId: undefined,
  });

  const handleRowClick = (type: POLICY_REQUEST_TYPE, plId?: number) => {
    setPolicyCard({ type, plId });
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
          <PolicyPlaceholderCard className="w-[466px]" />
        )}
        {policyCard.type === POLICY_REQUEST_TYPE.CREATE && (
          <CreatePolicyCard className="w-[466px]" reasonRow={4} />
        )}
        {policyCard.type === POLICY_REQUEST_TYPE.UPDATE && (
          <UpdatePolicyCard
            plId={policyCard.plId!}
            reasonRow={4}
            className="w-[466px]"
          />
        )}
      </section>
    </>
  );
};

export default Policies;
