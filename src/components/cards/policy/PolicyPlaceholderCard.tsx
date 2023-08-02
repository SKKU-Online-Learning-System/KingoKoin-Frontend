import { Typography } from "@mui/material";

interface PolicyPlaceholderCard {
  className: string;
}

const PolicyPlaceholderCard = ({ className }: PolicyPlaceholderCard) => {
  return (
    <div className={className}>
      <div className="flex flex-col gap-4 items-center justify-center w-full h-full border-dashed border-primary border-2 text-primary">
        <Typography variant="title-l">목록에서 정책을 선택하세요.</Typography>
      </div>
    </div>
  );
};

export default PolicyPlaceholderCard;
