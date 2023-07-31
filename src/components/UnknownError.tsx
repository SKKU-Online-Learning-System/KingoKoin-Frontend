import { Button } from "@mui/material";

interface ErrorProps {
  error: Error;
  className: string;
}

const UnknownError = ({ error, className }: ErrorProps) => {
  return (
    <div className={className}>
      <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
        <h1 className="text-display">오류가 발생했습니다.</h1>
        <caption className="text-darkGray">{error.message}</caption>
        <div className="text-center">
          <p>요청사항을 처리하는데 실패했습니다.</p>
          <p>오류가 계속 발생한다면 이메일을 통해 문의해주시기 바랍니다.</p>
        </div>
        <Button
          variant="contained"
          onClick={() => {
            window.history.back();
          }}
        >
          되돌아가기
        </Button>
      </div>
      {error.message}
    </div>
  );
};

export default UnknownError;
