import { CircularProgress } from "@mui/material";

interface LoaderProps {
  className: string;
}
const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-center w-full h-full">
        <CircularProgress disableShrink />
      </div>
    </div>
  );
};

export default Loader;
