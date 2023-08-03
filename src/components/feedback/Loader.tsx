import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
      <CircularProgress disableShrink />
      <p>로딩중입니다..</p>
    </div>
  );
};

export default Loader;
