import { Typography } from "@mui/material";

function Error({ className }) {
  return (
    <div className={className}>
      <div className="flex w-full h-full justify-center items-center">
        <Typography variant="body" className="text-red-600">
          정보를 불러오는 중 오류가 발생했습니다.
        </Typography>
      </div>
    </div>
  );
}

export default Error;
