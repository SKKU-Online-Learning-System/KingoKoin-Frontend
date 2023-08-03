import { Typography } from "@mui/material";

interface PlaceholderCardProps {
  className?: string;
  children: React.ReactNode;
}

const PlaceholderCard = ({ className, children }: PlaceholderCardProps) => {
  return (
    <div className={className}>
      <div className="flex flex-col gap-4 items-center justify-center w-full h-full border-dashed border-primary border-2 text-primary">
        <Typography variant="title-l">{children}</Typography>
      </div>
    </div>
  );
};

export default PlaceholderCard;
