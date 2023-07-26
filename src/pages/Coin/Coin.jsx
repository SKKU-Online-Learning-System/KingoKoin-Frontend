import React, { useState } from "react";
import * as xlsx from "xlsx";
import dayjs from "dayjs";
import {
  Card,
  CardHeader,
  CardContent,
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
import { fetchCoinDetails } from "../../api";
import CustomPagination from "../../components/CustomPagination";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const ExcelCard = () => {
  const PAGE_SIZE = 100;

  const [coinDetail, setCoinDetail] = useState({
    stId: "",
    stName: "",
    title: "",
    pfName: "",
    plus: true,
    point: 0,
    createdDate: dayjs(),
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
  if (policiesError) return <div>{policiesError.message}</div>;

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
                setCoinDetail({ ...coinDetail, ...e.target.value });
                console.log(coinDetail);
                if (e.target.value.plId === 99999) setIsMenual(true);
                else setIsMenual(false);
              }}
              className="flex-[2]"
              size="small"
            >
              {policies.map((it) => (
                <MenuItem key={it.plName} value={it}>
                  {it.plName}
                </MenuItem>
              ))}
            </TextField>
            <Grow className="flex-[3]" in={isManual} mountOnEnter unmountOnExit>
              <TextField
                placeholder="제목을 입력해주세요."
                label="제목"
                size="small"
              />
            </Grow>
          </div>
          <TextField
            className="w-full pr-4"
            disabled
            label="제공처"
            value={coinDetail.pfName}
            size="small"
          />
          <div className="flex gap-2 w-full pr-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="w-full flex-[2]"
                value={coinDetail.createdDate}
                onChange={(value) => {
                  setCoinDetail({ ...coinDetail, createdDate: value });
                }}
                slotProps={{ textField: { size: "small" } }}
              />
            </LocalizationProvider>
            <div className="flex gap-2 flex-[3]">
              <TextField
                className="flex-1"
                label="코인값"
                type="number"
                value={coinDetail.plus ? coinDetail.point : -coinDetail.point}
                onChange={(e) => {
                  setCoinDetail({
                    ...coinDetail,
                    plus: e.target.value >= 0,
                    point: Math.abs(e.target.value),
                  });
                }}
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
          </div>
        </CardActions>
      </Card>
    </>
  );
};

const GiveCoinCard = () => {
  const [coinDetail, setCoinDetail] = useState({
    stId: "",
    stName: "",
    title: "",
    pfName: "",
    plus: true,
    point: 0,
    createdDate: dayjs(),
  });

  const {
    isLoading: policiesIsLoading,
    error: policiesError,
    data: policies,
  } = useQuery("Policies", fetchPolicies);

  const [isManual, setIsMenual] = useState(false);
  const [open, setOpen] = useState(false);

  if (policiesIsLoading) return <Loader className="flex-1" />;
  if (policiesError) return <div>{policiesError.message}</div>;

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
        {`${coinDetail.stId} 학번의 ${coinDetail.stName} 학생에게 ${
          coinDetail.plus ? coinDetail.point : -coinDetail.point
        }코인을 부여하시겠습니까?`}
      </ConfirmDialog>
      <CardHeader
        title={"학생코인부여"}
        titleTypographyProps={{ variant: "display" }}
      />
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <TextField
              className="flex-[3]"
              label="학번"
              value={coinDetail.stId}
              onChange={(e) => {
                setCoinDetail({ ...coinDetail, stId: e.target.value });
              }}
              size="small"
              helperText="형식에 올바른 학번을 입력해주세요."
            />
            <TextField
              className="flex-[2]"
              label="이름"
              value={coinDetail.stName}
              onChange={(e) => {
                setCoinDetail({ ...coinDetail, stName: e.target.value });
              }}
              size="small"
            />
          </div>
          <TextField
            select
            defaultValue={policies[0]}
            label="정책"
            onChange={(e) => {
              setCoinDetail({ ...coinDetail, ...e.target.value });
              console.log(coinDetail);
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
            value={coinDetail.pfName}
            size="small"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={coinDetail.createdDate}
              onChange={(value) => {
                setCoinDetail({ ...coinDetail, createdDate: value });
              }}
              slotProps={{ textField: { size: "small" } }}
            />
          </LocalizationProvider>
          <div className="flex gap-2">
            <TextField
              className="flex-1"
              label="코인값"
              type="number"
              value={coinDetail.plus ? coinDetail.point : -coinDetail.point}
              onChange={(e) => {
                setCoinDetail({
                  ...coinDetail,
                  plus: e.target.value >= 0,
                  point: Math.abs(e.target.value),
                });
              }}
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
        </div>
      </CardContent>
    </Card>
  );
};

const UserPointHistory = ({ details }) => {
  const PAGE_SIZE = 4;

  const rows = details.map((it) => ({
    ...it,
    id: it.dt_id,
    modified_date: new Date(it.modified_date).toLocaleDateString("ko-KR", {
      timeZone: "UTC",
    }),
  }));

  const columns = [
    { field: "modified_date", headerName: "날짜", flex: 1 },
    { field: "pl_name", headerName: "내용", flex: 1.5 },
    { field: "adGroup", headerName: "제공처", flex: 1.2 },
    {
      field: "point_plus",
      headerName: "부여한 코인",
      flex: 1,
      valueGetter: (params) => (params.row.plus ? params.row.point : ""),
    },
    {
      field: "point_minus",
      headerName: "차감한 코인",
      flex: 1,
      valueGetter: (params) => (params.row.plus ? "" : params.row.point),
    },
  ];

  return (
    <Card className="flex-1">
      <CardHeader
        title="부여한 코인 내역"
        titleTypographyProps={{ variant: "display" }}
        subheader={`${details.length}건`}
        subheaderTypographyProps={{ variant: "label-l", className: "mt-2" }}
      />
      <CardContent>
        <DataGrid
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
          slots={{
            pagination: CustomPagination,
          }}
        />
      </CardContent>
    </Card>
  );
};

const Coin = () => {
  const {
    isLoading: detailsIsLoading,
    error: detailsError,
    data: details,
  } = useQuery("coinDetails", fetchCoinDetails);

  if (detailsIsLoading) return <Loader />;
  if (detailsError) return <div>{detailsError.message}</div>;

  return (
    <div className="flex flex-col gap-6 justify-center py-16 w-[1152px] mx-auto">
      <section className="flex gap-6">
        <GiveCoinCard />
        <ExcelCard />
      </section>
      <UserPointHistory details={details} />
    </div>
  );
};

export default Coin;
