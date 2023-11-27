import { useEffect, useState } from "react";
import usePolicy from "../../../hooks/usePolicy";
import Status from "../../feedback/Status";
import ConfirmDialog from "../../ConfirmDialog";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {
  IPolicyRequestForm,
  POLICY_REQUEST_TYPE,
  POLICY_TYPE,
  formToPolicyRequest,
} from "../../../common/apiManager";
import { getPlatformByPfName, postPolicyRequest } from "../../../common/api";

interface UpdatePolicyCardProps {
  plId: number;
  className?: string;
  reasonRow: number;
}

const UpdatePolicyCard = ({
  plId,
  reasonRow,
  className,
}: UpdatePolicyCardProps) => {
  const [form, setForm] = useState<IPolicyRequestForm>({
    plId: "",
    pfId: 1,
    pfName: "",
    rqName: "",
    rqPlus: true,
    rqPoint: 0,
    rqAvailable: true,
    rqReason: "",
    rqType: POLICY_REQUEST_TYPE.UPDATE,
  });

  const {
    isLoading: policyIsLoading,
    error: policyError,
    data: policy,
  } = usePolicy(plId);

  useEffect(() => {
    if (policy)
      setForm({
        plId: policy.pl_id.toString(),
        pfId: getPlatformByPfName(policy.pf_name)?.pfId!,
        pfName: policy.pf_name,
        rqName: policy.pl_name,
        rqPlus: policy.plus,
        rqPoint: policy.point,
        rqAvailable: policy.available,
        rqReason: "",
        rqType: POLICY_REQUEST_TYPE.UPDATE,
      });
  }, [policy]);

  const render = !policyIsLoading && !policyError && (policy ? true : false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <ConfirmDialog
        open={open}
        handleConfirm={() => {
          postPolicyRequest(formToPolicyRequest(form));
          setOpen(false);
        }}
        handleCancel={() => {
          setOpen(false);
        }}
      >
        정말로 수정하시겠습니까?
      </ConfirmDialog>
      <div className={className}>
        <Card className="relative flex flex-col w-full h-full">
          <CardHeader
            title={form.rqName}
            titleTypographyProps={{ variant: "title-m" }}
            subheader={
              <Chip
                variant="filled"
                label={form.pfName}
                size="small"
                className="mt-2"
              />
            }
            subheaderTypographyProps={{ variant: "label-l", className: "mt-2" }}
          />
          <Divider />
          <CardContent className="flex-1">
            <Status
              isLoading={policyIsLoading}
              error={policyError}
              isData={policy ? true : false}
              className="w-full h-full"
            />
            {render && (
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
                <div className="flex items-end gap-2">
                  <FormLabel>상태</FormLabel>
                  <RadioGroup
                    className="relative -top-0.5"
                    row
                    value={
                      form.rqAvailable
                        ? POLICY_TYPE.ACTIVE
                        : POLICY_TYPE.INACTIVE
                    }
                    onChange={(e) => {
                      setForm({
                        ...form,
                        rqAvailable:
                          POLICY_TYPE.ACTIVE === e.currentTarget.value,
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
            )}
          </CardContent>
          <CardActions className="pb-4 pl-4">
            <Button
              variant="contained"
              onClick={() => {
                setOpen(true);
              }}
            >
              수정
            </Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default UpdatePolicyCard;
