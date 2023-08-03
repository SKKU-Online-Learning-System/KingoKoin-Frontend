import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  MenuItem,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useState } from "react";
import { useQuery } from "react-query";
import { getPolicies, postManualCoin } from "../../../common/api";
import ConfirmDialog from "../../ConfirmDialog";
import { validateStid } from "../../../common/utils";
import Status from "../../feedback/Status";
import {
  IGrantedCoinForm,
  formToGrantedCoin,
  PL_ID_MANUAL,
} from "../../../common/apiManager";

interface CoinGrantCardProps {
  adId: number;
}

const CoinGrantCard = ({ adId }: CoinGrantCardProps) => {
  // TODO: gainedDate를 비롯한 다른 속성값들의 Validation

  const [form, setForm] = useState<IGrantedCoinForm>({
    stId: "",
    stName: "",
    plId: "",
    pfName: "",
    title: "",
    point: 0,
    adId: adId,
    gainedDate: dayjs(),
  });

  const [isManual, setIsMenual] = useState(false);
  const [open, setOpen] = useState(false);
  const [stIdIsValid, setStIdIsValid] = useState(true);

  const {
    isLoading: policiesIsLoading,
    error: policiesError,
    data: policies,
  } = useQuery(["policies"], () => getPolicies());

  const render =
    !policiesIsLoading && !policiesError && policies && policies.length > 0;

  const findPolicyByPlId = (plId: string) =>
    policies?.find((it) => (it.plId === parseInt(plId) ? it : undefined));

  return (
    <>
      <ConfirmDialog
        open={open}
        handleConfirm={() => {
          postManualCoin(formToGrantedCoin(form));
          setOpen(false);
        }}
        handleCancel={() => {
          setOpen(false);
        }}
      >
        {`${form.stName} 학생에게 ${form.point}코인을 부여하시겠습니까?`}
      </ConfirmDialog>
      <Card className="w-[466px]">
        <CardHeader
          title={"학생 코인부여"}
          titleTypographyProps={{ variant: "display" }}
        />
        <CardContent>
          <Status
            isLoading={policiesIsLoading}
            error={policiesError}
            isData={policies && policies.length > 0}
            className="h-[332px]"
          />
          {render && (
            <div className="flex flex-col gap-3 h-[332px]">
              <div className="flex gap-2">
                <TextField
                  className="flex-[3]"
                  label="학번"
                  error={!stIdIsValid}
                  value={form.stId}
                  onChange={(e) => {
                    setForm({ ...form, stId: e.target.value });
                  }}
                  size="small"
                  helperText={
                    stIdIsValid ? "" : "학번을 올바르게 입력해주세요."
                  }
                />
                <TextField
                  className="flex-[2]"
                  label="이름"
                  value={form.stName}
                  onChange={(e) => {
                    setForm({ ...form, stName: e.target.value });
                  }}
                  size="small"
                />
              </div>
              <TextField
                select
                defaultValue={policies[0].plId}
                label="정책"
                onChange={(e) => {
                  setForm({
                    ...form,
                    plId: e.target.value,
                    pfName:
                      findPolicyByPlId(e.target.value)?.pfName ||
                      "제공처를 찾지 못했습니다.",
                    point: findPolicyByPlId(e.target.value)?.point || 0,
                  });
                  if (e.target.value == PL_ID_MANUAL) setIsMenual(true);
                  else setIsMenual(false);
                }}
                size="small"
              >
                {policies.map((it) => (
                  <MenuItem key={it.plName} value={it.plId}>
                    {it.plName}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                disabled
                label="제공처"
                value={form.pfName}
                size="small"
              />
              <Collapse in={isManual} mountOnEnter unmountOnExit>
                <TextField
                  className="w-full"
                  placeholder="제목을 입력해주세요."
                  label="제목"
                  size="small"
                />
              </Collapse>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={form.gainedDate}
                  onChange={(value) => {
                    setForm({
                      ...form,
                      gainedDate: value || dayjs(),
                    });
                  }}
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
              <div className="flex gap-2">
                <TextField
                  className="flex-1"
                  label="코인값"
                  type="number"
                  value={form.point}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      point: parseInt(e.target.value),
                    });
                  }}
                  size="small"
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    const result = validateStid(form.stId);
                    setStIdIsValid(result);
                    if (result) setOpen(true);
                  }}
                >
                  코인부여
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default CoinGrantCard;
