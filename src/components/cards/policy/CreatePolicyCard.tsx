import { useState } from "react";
import ConfirmDialog from "../../ConfirmDialog";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  IPolicyRequestForm,
  POLICY_REQUEST_TYPE,
  POLICY_TYPE,
  formToPolicyRequest,
} from "../../../common/apiManager";
import {
  PLATFORMS,
  getPlatformByPfId,
  postPolicyRequest,
} from "../../../common/api";

interface CreatePolicyCardProps {
  className?: string;
  reasonRow: number; // textarea의 row 개수
}

const CreatePolicyCard = ({ className, reasonRow }: CreatePolicyCardProps) => {
  const [form, setForm] = useState<IPolicyRequestForm>({
    plId: "",
    pfId: 1,
    pfName: "",
    rqName: "",
    rqPlus: true,
    rqPoint: 0,
    rqAvailable: true,
    rqReason: "",
    rqType: POLICY_REQUEST_TYPE.CREATE,
  });

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ConfirmDialog
        open={showModal}
        handleConfirm={() => {
          postPolicyRequest(formToPolicyRequest(form));
          setShowModal(false);
        }}
        handleCancel={() => {
          setShowModal(false);
        }}
      >
        정말로 생성하시겠습니까?
      </ConfirmDialog>
      <div className={className}>
        <Card className="relative w-full h-full">
          <CardHeader
            title={
              <div className="flex gap-4">
                <Typography variant="label-l" className="text-onSurface">
                  정책명
                </Typography>
                <TextField
                  variant="standard"
                  className="flex-1"
                  value={form.rqName}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      rqName: e.currentTarget.value,
                    });
                  }}
                />
              </div>
            }
            subheader={
              <FormControl className="flex flex-row gap-4 items-center justify-between w-full mt-2">
                <Typography variant="label-l" className="text-onSurface">
                  제공처
                </Typography>
                <Select
                  className="flex-1"
                  value={form.pfId}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      pfId:
                        typeof e.target.value === "number"
                          ? e.target.value
                          : parseInt(e.target.value),
                    });
                  }}
                  input={<Input size="small" />}
                  renderValue={(pfId) => (
                    <Chip key={pfId} label={getPlatformByPfId(pfId)?.pfName!} />
                  )}
                >
                  {PLATFORMS.map((platform) => (
                    <MenuItem key={platform.pfId} value={platform.pfId}>
                      {platform.pfName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            }
            subheaderTypographyProps={{ className: "mt-4" }}
          />
          <Divider />
          <CardContent>
            <div className="flex flex-col gap-2">
              <TextField
                className="w-[74px]"
                label="코인값"
                variant="standard"
                type="number"
                value={form.rqPoint}
                onChange={(e) => {
                  setForm({
                    ...form,
                    rqPlus: parseInt(e.currentTarget.value) >= 0,
                    rqPoint: parseInt(e.currentTarget.value),
                  });
                }}
              />
              <div className="flex items-center gap-2">
                <FormLabel>상태</FormLabel>
                <RadioGroup
                  className="relative -top-0.5"
                  row
                  value={
                    form.rqAvailable ? POLICY_TYPE.ACTIVE : POLICY_TYPE.INACTIVE
                  }
                  onChange={(e) => {
                    setForm({
                      ...form,
                      rqAvailable: POLICY_TYPE.ACTIVE === e.currentTarget.value,
                    });
                  }}
                >
                  <FormControlLabel
                    value={POLICY_TYPE.ACTIVE}
                    control={<Radio size="small" />}
                    label={POLICY_TYPE.ACTIVE}
                    slotProps={{ typography: { variant: "label-l" } }}
                  />
                  <FormControlLabel
                    value={POLICY_TYPE.INACTIVE}
                    control={<Radio size="small" />}
                    label={POLICY_TYPE.INACTIVE}
                    slotProps={{ typography: { variant: "label-l" } }}
                  />
                </RadioGroup>
              </div>
              <TextField
                required
                multiline
                rows={reasonRow}
                label="설명"
                placeholder="설명을 작성해주세요."
              />
            </div>
          </CardContent>
          <CardActions className="pb-4 pl-4">
            <Button
              variant="contained"
              onClick={() => {
                setShowModal(true);
              }}
            >
              생성
            </Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default CreatePolicyCard;
