import { useQuery } from "react-query";
import { getPolicies } from "../common/api";

const usePolicy = (plId: number) => {
  const {
    isLoading: policiesIsLoading,
    error: policiesError,
    data: policies,
  } = useQuery(["policies"], () => getPolicies());

  const policy = policies?.find((it) => it.plId === plId);

  return {
    isLoading: policiesIsLoading,
    error: policiesError,
    data: policy,
  };
};
// usePolicy 사용 예제
// const {
//   isLoading: policyIsLoading,
//   error: policyError,
//   data: policy,
// } = usePolicy(plId);

export default usePolicy;
