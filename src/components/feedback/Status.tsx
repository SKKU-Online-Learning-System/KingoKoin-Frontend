import Loader from "./Loader";
import NoData from "./NoData";
import UnknownError from "./UnknownError";

interface StatusProps {
  isLoading: boolean;
  error: unknown;
  isData: boolean | undefined;
  className?: string;
}

/**
 * 데이터 상태에 따라 로딩, 에러, 데이터 없음의 정보를 보여주는 컴포넌트
 */
const Status = ({ isLoading, error, isData, className }: StatusProps) => {
  const render = !isLoading && !(error instanceof Error) && isData;

  return (
    <>
      {!render && (
        <div className={className}>
          {isLoading && <Loader />}
          {error instanceof Error && <UnknownError error={error} />}
          {!isLoading && !error && !isData && <NoData />}
        </div>
      )}
    </>
  );
};

export default Status;
