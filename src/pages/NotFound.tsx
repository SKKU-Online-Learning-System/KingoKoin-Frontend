import { Button, Typography } from "@mui/material";

const NotFound = () => {
  const handleButtonClick = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen max-w-full gap-2">
      <Typography variant="display">404 Not Found</Typography>
      <Typography variant="label-l">존재하지 않는 페이지입니다</Typography>
      <Button variant="contained" onClick={handleButtonClick}>
        메인 화면으로 돌아가기
      </Button>
    </div>
  );
};

export default NotFound;
