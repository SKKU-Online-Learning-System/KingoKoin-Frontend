import React, { useState, useEffect } from "react";
import { information } from "../../dummy"; // 생성된 학생 더미 정보
import * as xlsx from "xlsx";
import {
  Card,
  CardHeader,
  CardContent,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  InputLabel,
  CardActions,
  Grow,
} from "@mui/material";
import { MdOutlineUploadFile } from "react-icons/md";
import { fetchPolicies } from "../../api";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useQuery } from "react-query";
import Loader from "../../components/Loader";
import { DataGrid } from "@mui/x-data-grid";

export const ExcelCard = () => {
  const PAGE_SIZE = 50;

  const [koinDetail, setKoinDetail] = useState({
    stId: "",
    stName: "",
    title: "",
    pfName: "",
    plus: true,
    point: 0,
  });

  const {
    isLoading: policiesIsLoading,
    error: policiesError,
    data: policies,
  } = useQuery("Policies", fetchPolicies);

  const [isManual, setIsMenual] = useState(false);
  const [open, setOpen] = useState(false);

  const [excelIsLoading, setExcelIsLoading] = useState(true);
  const [excel, setExcel] = useState([]);

  if (policiesIsLoading) return <Loader />;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) reader.readAsArrayBuffer(file);

    reader.onload = (e) => {
      // 엑셀 -> JSON 파싱
      const data = new Uint8Array(e.target.result);
      const workbook = xlsx.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = xlsx.utils.sheet_to_json(worksheet);

      setExcelIsLoading(false);
      setExcel(json);
    };
  };

  const rows = excel.map((it) => ({ ...it, id: it["이름"] }));
  const columns = [
    { field: "학번", headerName: "학번", flex: 1 },
    { field: "이름", headerName: "이름", flex: 1 },
  ];

  return (
    <>
      <ConfirmDialog
        open={open}
        handleConfirm={(e) => {
          setOpen(false);
        }}
        handleCancel={(e) => {
          setOpen(false);
        }}
      >
        코인을 부여하시겠습니까?
      </ConfirmDialog>
      <Card className="flex flex-col flex-1">
        <CardHeader
          title="엑셀 파일 업로드"
          titleTypographyProps={{ variant: "display" }}
        />
        <CardContent className="flex-1">
          {excelIsLoading ? (
            <div className="flex flex-col gap-4 flex-1 items-center justify-center h-full p-4 border-dashed border-primary border-2 text-primary">
              <InputLabel
                htmlFor="file"
                className="flex flex-col gap-2 items-center text-primary cursor-pointer"
              >
                <div className="flex gap-2">
                  <Typography variant="title-l">
                    엑셀 파일을 업로드하세요.
                  </Typography>
                  <MdOutlineUploadFile className="w-6 h-6" />
                </div>
                <Typography variant="body">
                  학번, 이름이 입력된 엑셀 파일로 한 번에 최대 100개까지의
                  데이터를 입력할 수 있습니다.
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
          ) : (
            <DataGrid
              className="h-[224px] overflow-y-scroll"
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: PAGE_SIZE,
                  },
                },
              }}
              pageSizeOptions={[PAGE_SIZE]}
              loading={excelIsLoading}
              rowHeight={32}
              columnHeaderHeight={32}
              hideFooter
            />
          )}
        </CardContent>
        <CardActions className="flex flex-col items-start gap-3 pb-6">
          <div className="flex gap-2 ml-2 w-full pr-4">
            <TextField
              select
              defaultValue={policies[0]}
              label="정책"
              onChange={(e) => {
                setKoinDetail({ ...koinDetail, ...e.target.value });
                console.log(koinDetail);
                if (e.target.value.plId === 99999) setIsMenual(true);
                else setIsMenual(false);
              }}
              className="w-[270px]"
              size="small"
            >
              {policies.map((it) => (
                <MenuItem key={it.plName} value={it}>
                  {it.plName}
                </MenuItem>
              ))}
            </TextField>
            <Grow className="flex-1" in={isManual} mountOnEnter unmountOnExit>
              <TextField
                placeholder="제목을 입력해주세요."
                label="제목"
                size="small"
              />
            </Grow>
          </div>
          <div className="flex gap-2 w-full pr-4">
            <TextField
              disabled
              label="제공처"
              value={koinDetail.pfName}
              className="w-[270px]"
              size="small"
            />
            <TextField
              label="코인값"
              type="number"
              value={koinDetail.plus ? koinDetail.point : -koinDetail.point}
              onChange={(e) => {
                setKoinDetail({
                  ...koinDetail,
                  plus: e.target.value >= 0,
                  point: Math.abs(e.target.value),
                });
              }}
              className="flex-1"
              size="small"
            />
            <Button
              variant="contained"
              onClick={() => {
                setOpen(true);
              }}
            >
              코인부여
            </Button>
          </div>
        </CardActions>
      </Card>
    </>
  );
};

const GiveKoinCard = () => {
  const [koinDetail, setKoinDetail] = useState({
    stId: "",
    stName: "",
    title: "",
    pfName: "",
    plus: true,
    point: 0,
  });

  const {
    isLoading: policiesIsLoading,
    error: policiesError,
    data: policies,
  } = useQuery("Policies", fetchPolicies);

  const [isManual, setIsMenual] = useState(false);
  const [open, setOpen] = useState(false);

  if (policiesIsLoading) return <Loader className="flex-1" />;

  return (
    <Card className="w-[466px] h-[442px]">
      <ConfirmDialog
        open={open}
        handleConfirm={(e) => {
          setOpen(false);
        }}
        handleCancel={(e) => {
          setOpen(false);
        }}
      >
        코인을 부여하시겠습니까?
      </ConfirmDialog>
      <CardHeader
        title={"학생코인부여"}
        titleTypographyProps={{ variant: "display" }}
      />
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <TextField
              className="flex-1"
              label="학번"
              value={koinDetail.stId}
              onChange={(e) => {
                setKoinDetail({ ...koinDetail, stId: e.target.value });
              }}
              size="small"
            />
            <Button variant="contained">학생조회</Button>
          </div>
          <TextField
            disabled
            label="이름"
            value={koinDetail.stName}
            size="small"
          />
          <TextField
            select
            defaultValue={policies[0]}
            label="정책"
            onChange={(e) => {
              setKoinDetail({ ...koinDetail, ...e.target.value });
              console.log(koinDetail);
              if (e.target.value.plId === 99999) setIsMenual(true);
              else setIsMenual(false);
            }}
            size="small"
          >
            {policies.map((it) => (
              <MenuItem key={it.plName} value={it}>
                {it.plName}
              </MenuItem>
            ))}
          </TextField>

          <Grow in={isManual} mountOnEnter unmountOnExit>
            <TextField
              placeholder="제목을 입력해주세요."
              label="제목"
              size="small"
            />
          </Grow>
          <TextField
            disabled
            label="제공처"
            value={koinDetail.pfName}
            size="small"
          />
          <div className="flex gap-2">
            <TextField
              className="flex-1"
              label="코인값"
              type="number"
              value={koinDetail.plus ? koinDetail.point : -koinDetail.point}
              onChange={(e) => {
                setKoinDetail({
                  ...koinDetail,
                  plus: e.target.value >= 0,
                  point: Math.abs(e.target.value),
                });
              }}
              size="small"
            />
            <Button variant="contained">코인부여</Button>
          </div>
          <Typography variant="body">학생이 보유한 코인: 0</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default GiveKoinCard;
