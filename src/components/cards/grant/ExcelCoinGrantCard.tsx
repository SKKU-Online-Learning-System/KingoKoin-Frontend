import { UploadFile } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { useQuery } from "react-query";
import * as xlsx from "xlsx";
import { IPolicy, getPolicies, postManualCoin } from "../../../common/api";
import { PL_ID_MANUAL, formToGrantedCoin } from "../../../common/apiManager";
import ConfirmDialog from "../../ConfirmDialog";
import Status from "../../feedback/Status";

interface ExcelUploaderProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const ExcelUploader = ({ handleFileChange, className }: ExcelUploaderProps) => {
  return (
    <div className={className}>
      <div className="flex flex-col gap-4 flex-1 items-center justify-center w-full h-full p-4 border-dashed border-primary border-2 text-primary">
        <InputLabel
          htmlFor="file"
          className="flex flex-col gap-2 items-center text-primary cursor-pointer"
        >
          <div className="flex gap-2">
            <Typography variant="title-l">엑셀 파일을 업로드하세요.</Typography>
            <UploadFile className="w-6 h-6" />
          </div>
          <Typography variant="body">
            학번, 이름이 입력된 엑셀 파일로 한 번에 최대 100개까지의 데이터를
            입력할 수 있습니다.
          </Typography>
        </InputLabel>
        <input
          hidden
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          type="file"
          id="file"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

interface ExcelCoinGrantCardProps {
  adId: number;
  maxRow: number;
  rowHeight?: number;
}

interface IExcelForm {
  plId: string;
  pfName: string;
  title: string;
  point: number;
  adId: number;
  gainedDate: Dayjs;
}

const ExcelCoinGrantCard = ({
  adId,
  maxRow,
  rowHeight = 32,
}: ExcelCoinGrantCardProps) => {
  // TODO: gainedDate를 비롯한 다른 속성값들의 Validation
  // TODO: 파일 업로드 예외처리
  // TODO: 중복되는 부여 검출

  const [form, setForm] = useState<IExcelForm>({
    plId: "",
    pfName: "",
    title: "",
    point: 0,
    adId: adId,
    gainedDate: dayjs(),
  });

  const [isManual, setIsMenual] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {
    isLoading: policiesIsLoading,
    error: policiesError,
    data: policies,
  } = useQuery(["policies"], () => getPolicies());

  const render =
    !policiesIsLoading && !policiesError && policies && policies.length > 0;

  // excel
  const [excelIsLoading, setExcelIsLoading] = useState(true);
  const [excel, setExcel] = useState<IExcelRow[]>([]);

  interface IExcelRow {
    학번: string;
    이름: string;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    if (file) reader.readAsArrayBuffer(file);

    reader.onload = (e) => {
      // 엑셀 -> JSON 파싱
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = xlsx.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = xlsx.utils.sheet_to_json(worksheet) as Array<IExcelRow>;

      setExcel(json.map((it) => ({ ...it, id: it.학번 })));
      setExcelIsLoading(false);
    };
  };

  const columns: GridColDef[] = [
    { field: "학번", headerName: "학번", flex: 1 },
    { field: "이름", headerName: "이름", flex: 1 },
  ];

  return (
    <>
      <ConfirmDialog
        open={showModal}
        handleConfirm={() => {
          // 확인 버튼 클릭시 실행할 코드
          excel.forEach((it) =>
            postManualCoin(
              formToGrantedCoin({
                ...form,
                stName: it.이름,
                stId: it.학번,
              })
            )
          );
          setShowModal(false);
        }}
        handleCancel={() => {
          setShowModal(false);
        }}
      >
        {`${excel.length}명의 학생에게 ${form.point}코인을 부여하시겠습니까?`}
      </ConfirmDialog>
      <Card className="flex flex-col w-[662px]">
        <CardHeader
          title={"엑셀로 코인부여"}
          titleTypographyProps={{ variant: "display" }}
        />
        <CardContent className="flex flex-col flex-1">
          <Status
            isLoading={policiesIsLoading}
            error={policiesError}
            isData={policies && policies.length > 0}
            className="flex-1"
          />
          <div className="flex flex-col">
            <div className="h-[170.4px]">
              {render && excelIsLoading && (
                <ExcelUploader
                  handleFileChange={handleFileChange}
                  className="h-full"
                />
              )}
              {render && !excelIsLoading && (
                <DataGrid
                  className="overflow-y-scroll"
                  rows={excel}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: maxRow,
                      },
                    },
                  }}
                  pageSizeOptions={[maxRow]}
                  rowHeight={rowHeight}
                  columnHeaderHeight={rowHeight}
                  hideFooter
                />
              )}
            </div>
            <hr />
            {render && (
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <TextField
                    className="flex-[3]"
                    select
                    defaultValue={policies[0].pl_id}
                    label="정책"
                    onChange={(e) => {
                      //객체를 value로 사용하기 위한 캐스팅
                      const policy = e.target.value as unknown as IPolicy;
                      setForm({
                        ...form,
                        plId: policy.pl_id.toString(),
                        pfName: policy.pf_name,
                        point: policy.point,
                        title: policy.pl_name,
                      });
                      if (e.target.value === PL_ID_MANUAL) setIsMenual(true);
                      else setIsMenual(false);
                    }}
                    size="small"
                  >
                    {policies.map((it) => (
                      //@ts-ignore - 객체를 value로 사용하기 위한 타입 무시
                      <MenuItem key={it.plId} value={it}>
                        {it.pl_name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    className="flex-[2]"
                    disabled
                    label="제공처"
                    value={form.pfName}
                    size="small"
                  />
                </div>
                <Collapse in={isManual} mountOnEnter unmountOnExit>
                  <TextField
                    className="w-full"
                    placeholder="제목을 입력해주세요."
                    label="제목"
                    size="small"
                    value={form.title}
                    onChange={(e) => {
                      setForm({ ...form, title: e.target.value });
                    }}
                  />
                </Collapse>
                <div className="flex gap-2">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      className="flex-[3]"
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
                  <div className="flex gap-2 flex-[2]">
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
                        setShowModal(true);
                      }}
                    >
                      코인부여
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ExcelCoinGrantCard;
