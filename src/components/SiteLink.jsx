import ConfirmDialog from "./ConfirmDialog";
import { useState } from "react";
import { Button } from "@mui/material";

const SiteLink = ({ platform }) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = (url) => {
    // window.location.href = {url};
    window.open(url, "_blank");
    setOpen(false);
  };

  return (
    <>
      <ConfirmDialog
        open={open}
        handleConfirm={() => {
          handleConfirm(platform.pfLink);
        }}
        handleCancel={() => {
          setOpen(false);
        }}
      >{`${platform.pfName}으로 이동하시겠습니까?`}</ConfirmDialog>
      <Button
        key={platform.pfName}
        onClick={() => {
          setOpen(true);
        }}
        className="flex justify-center items-center gap-1 w-[258px] h-[156px] bg-background rounded-lg border-solid border-2 border-primaryhover:shadow-lg hover:scale-[1.03] transition-all"
      >
        {platform.pfLogo ? (
          <>
            <img
              className="w-8 h-8"
              src={platform.pfLogo}
              alt={platform.pfName + " 링크"}
            />
            <div className="text-label-l">{platform.pfName}</div>
          </>
        ) : (
          <div className="text-title-m font-gugi">{platform.pfName}</div>
        )}
      </Button>
    </>
  );
};

export default SiteLink;
