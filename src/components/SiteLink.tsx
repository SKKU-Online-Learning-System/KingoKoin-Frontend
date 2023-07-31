import ConfirmDialog from "./ConfirmDialog";
import { useState } from "react";
import { Button } from "@mui/material";

interface IPlatform {
  pfName: string;
  pfLink: string;
  pfLogo: string;
}

interface SiteLinkProps {
  platform: IPlatform;
  className: string;
}

const SiteLink = ({ platform, className }: SiteLinkProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = (url: string) => {
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
        className={className}
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
