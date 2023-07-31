import Loader from "./Loader";
import NoData from "./NoData";
import UnknownError from "./UnknownError";

interface StatusProps {
  isLoading: boolean;
  error: unknown;
  isData: boolean | undefined;
  className?: string;
}

const Status = ({ isLoading, error, isData, className }: StatusProps) => {
  const render = !isLoading && !(error instanceof Error) && isData;

  return (
    <>
      {!render && (
        <div className={className}>
          {isLoading && <Loader />}
          {error instanceof Error && <UnknownError error={error} />}
          {!isLoading && !isData && <NoData />}
        </div>
      )}
    </>
  );
};

export default Status;
