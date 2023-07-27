import { Button, Typography } from "@mui/material";
import React from "react";

const NotFound = () => {
  const handleButtonClick = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-screen max-w-full h-screen">
      <Typography variant="display">404 Not Found</Typography>
      <Typography variant="label-l">존재하지 않는 페이지입니다</Typography>
      <Button variant="contained" onClick={handleButtonClick}>
        처음 화면으로 돌아가기
      </Button>
    </div>
  );
};

export default NotFound;
