import ConfirmDialog from "./ConfirmDialog";
import { useState } from "react";
import { Button } from "@mui/material";

const SiteLink = ({ pfInfo, ...props }) => {
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
          handleConfirm(pfInfo.pf_link);
        }}
        handleCancel={() => {
          setOpen(false);
        }}
      >{`${pfInfo.pf_name}으로 이동하시겠습니까?`}</ConfirmDialog>
      <Button
        key={pfInfo.pf_name}
        onClick={() => {
          setOpen(true);
        }}
        className="flex justify-center items-center gap-1 w-[258px] h-[156px] bg-background rounded-lg border-solid border-2 border-primaryhover:shadow-lg hover:scale-[1.03] transition-all"
      >
        {pfInfo.pf_logo ? (
          <>
            <img
              className="w-8 h-8"
              src={pfInfo.pf_logo}
              alt={pfInfo.pf_name + " 링크"}
            />
            <div className="text-label-l">{pfInfo.pf_name}</div>
          </>
        ) : (
          <div className="text-title-m font-gugi">{pfInfo.pf_name}</div>
        )}
      </Button>
    </>
  );
};

export default SiteLink;
