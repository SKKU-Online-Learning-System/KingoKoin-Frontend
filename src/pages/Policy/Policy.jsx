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
  Fade,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useState } from "react";
import { MdAdd, MdOutlineArrowForward } from "react-icons/md";
import { useQuery } from "react-query";
import { fetchPolicies, fetchProposedPolicies } from "../../api";
import CustomPagination from "../../components/CustomPagination";
import Loader from "../../components/Loader";

// policy detail type
const POLICY_UPDATE = "수정";
const POLICY_CREATE = "생성";
const PROPOSED_READ = "대기조회";
const ACTIVE = "활성화";
const INACTIVE = "비활성화";

const PolicyCreateCard = () => {
  const [value, setValue] = useState({
    createName: "",
    createPfName: "",
    createPlus: true,
    createPoint: 0,
    reason: "",
  });

  const [platform, setPlatform] = useState([]);
  const PLATFORM_LIST = ["온라인 명륜당", "SOSD", ""];

  return (
    <Card className="relative w-[466px] h-full">
      <CardHeader
        title={
          <TextField
            label="정책명"
            variant="standard"
            className="w-full"
            value={value.createName}
            onChange={(e) => {
              setValue({
                ...value,
                createName: e.currentTarget.value,
              });
            }}
          />
        }
        titleTypographyProps={{ variant: "title-m" }}
        subheader={
          <FormControl className="w-full mt-4">
            <InputLabel>제공처</InputLabel>
            <Select
              value={platform}
              onChange={(e) => {
                setPlatform(
                  typeof e.target.value === "string"
                    ? e.target.value.split(",")
                    : e.target.value
                );
              }}
              input={<Input label="제공처" />}
              renderValue={(selected) =>
                selected.map((value) => <Chip key={value} label={value} />)
              }
            >
              {PLATFORM_LIST.map((pfName) => (
                <MenuItem key={pfName} value={pfName}>
                  {pfName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        }
        subheaderTypographyProps={{ variant: "label-l" }}
      />
      <Divider />
      <CardContent className="flex flex-col gap-4">
        <TextField
          label="코인값"
          variant="standard"
          type="number"
          className="w-16"
          value={value.createPlus ? value.createPoint : -value.createPoint}
          onChange={(e) => {
            setValue({
              ...value,
              createPlus: e.currentTarget.value >= 0,
              createPoint: Math.abs(e.currentTarget.value),
            });
          }}
        />
        <TextField
          required
          multiline
          rows={5}
          label="설명"
          placeholder="설명을 작성해주세요."
          className="w-full"
        />
      </CardContent>
      <CardActions className="absolute bottom-0 p-4">
        <Button variant="contained">생성</Button>
        <Button variant="contained">취소</Button>
      </CardActions>
    </Card>
  );
};

const ProposedPolicyReadCard = ({ row }) => {
  return (
    <Card className="relative w-[466px]">
      <CardHeader
        title={row.name}
        titleTypographyProps={{ variant: "title-m" }}
        subheader={
          <div className="flex items-center justify-between">
            <Chip
              variant="filled"
              label={row.pf_name}
              size="small"
              className="mt-2"
            />
            <Typography variant="label-l">{row.date}</Typography>
          </div>
        }
        subheaderTypographyProps={{ variant: "label-l" }}
      />
      <Divider />
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <Typography variant="label-l">코인 값</Typography>
          <div className="flex items-center gap-1">
            <Typography variant="body">
              {row.plus ? row.point : -row.point}
            </Typography>
            <MdOutlineArrowForward />
            <Typography variant="body">
              {row.request_plus ? row.request_point : -row.request_point}
            </Typography>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Typography variant="label-l">상태</Typography>
          <div className="flex items-center gap-1">
            <Chip
              variant="contained"
              color="primary"
              size="small"
              label={row.available ? ACTIVE : INACTIVE}
            />
            <MdOutlineArrowForward />
            <Chip
              variant="contained"
              color="primary"
              size="small"
              label={row.request_available ? ACTIVE : INACTIVE}
            />
          </div>
        </div>
        <Typography rows={5} variant="body" className="w-full">
          {row.reason}
        </Typography>
      </CardContent>
      <CardActions className="absolute bottom-0 p-4">
        <Button variant="contained">승인</Button>
        <Button variant="contained">거부</Button>
      </CardActions>
    </Card>
  );
};

const PolicyUpdateCard = ({ row }) => {
  const [value, setValue] = useState(row);

  useEffect(() => {
    setValue(row);
  }, [row]);

  return (
    <Card className="relative w-[466px] h-full">
      <CardHeader
        title={value.name}
        titleTypographyProps={{ variant: "title-m" }}
        subheader={
          <div className="flex items-center justify-between">
            <Chip
              variant="filled"
              label={value.pf_name}
              size="small"
              className="mt-2"
            />
            <Typography variant="label-l">{value.created_date}</Typography>
          </div>
        }
        subheaderTypographyProps={{ variant: "label-l" }}
      />
      <Divider />
      <CardContent className="flex flex-col gap-4">
        <TextField
          label="코인값"
          variant="standard"
          type="number"
          className="w-16"
          value={value.plus ? value.point : -value.point}
          onChange={(e) => {
            setValue({
              ...value,
              plus: e.currentTarget.value >= 0,
              point: Math.abs(e.currentTarget.value),
            });
          }}
        />
        <div className="flex items-center gap-2">
          <FormLabel>상태</FormLabel>
          <RadioGroup
            row
            value={value.available ? ACTIVE : INACTIVE}
            onChange={(e) => {
              setValue({
                ...value,
                available: ACTIVE === e.currentTarget.value,
              });
            }}
          >
            <FormControlLabel
              value={ACTIVE}
              control={<Radio size="small" />}
              label="활성화"
              slotProps={{ typography: { variant: "label-l" } }}
            />
            <FormControlLabel
              value={INACTIVE}
              control={<Radio size="small" />}
              label="비활성화"
              slotProps={{ typography: { variant: "label-l" } }}
            />
          </RadioGroup>
        </div>
        <TextField
          required
          multiline
          rows={5}
          label="설명"
          placeholder="설명을 작성해주세요."
          className="w-full"
        />
      </CardContent>
      <CardActions className="absolute bottom-0 p-4">
        <Button variant="contained">수정</Button>
        <Button variant="contained">취소</Button>
      </CardActions>
    </Card>
  );
};

const PolicyAvailable = (params) => {
  return (
    <Chip
      color="primary"
      size="small"
      label={params.value ? ACTIVE : INACTIVE}
    />
  );
};

const PolicyPlaceholderCard = ({ handleRowClick }) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-[466px] min-h-full border-dashed border-primary border-2 text-primary">
      <Typography variant="title-l">목록에서 정책을 선택하세요.</Typography>
    </div>
  );
};

const PoliciesCard = ({ handleRowClick }) => {
  const PAGE_SIZE = 4;
  const {
    isLoading: policiesIsLoading,
    error: policiesError,
    data: policies,
  } = useQuery("Policies", fetchPolicies);

  if (policiesIsLoading) return <Loader />;
  if (policiesError) return <div>{policiesError.message}</div>;

  const rows = policies.map((it) => ({
    ...it,
    id: it.pl_id,
    created_date: new Date(it.created_date).toLocaleDateString("ko-KR", {
      timeZone: "UTC",
    }),
  }));

  const columns = [
    { field: "name", headerName: "정책명", width: 200 },
    { field: "pl_id", headerName: "정책코드", flex: 1 },
    { field: "pf_name", headerName: "제공처", width: 150 },
    {
      field: "point",
      headerName: "코인값",
      flex: 1,
      valueGetter: (params) => (params.row.plus ? params.value : -params.value),
    },
    {
      field: "available",
      headerName: "상태",
      flex: 1,
      renderCell: PolicyAvailable,
    },
  ];

  return (
    <Card className="flex-1 h-full">
      <CardHeader
        title="정책 조회"
        titleTypographyProps={{ variant: "display" }}
        subheader={
          <div className="relative flex items-end justify-between">
            {`${policies.length}건`}
            <Button
              className="absolute right-0"
              variant="contained"
              endIcon={<MdAdd />}
              onClick={() => {
                handleRowClick(POLICY_CREATE, {});
              }}
            >
              정책생성
            </Button>
          </div>
        }
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
          onRowClick={(params) => {
            handleRowClick(POLICY_UPDATE, params);
          }}
          slots={{
            pagination: CustomPagination,
          }}
        />
      </CardContent>
    </Card>
  );
};

const ProposedPolicyType = (params) => {
  const CREATE = "생성";
  const UPDATE = "수정";
  const ACTIVATE = "활성화";
  const DEACTIVATE = "비활성화";

  const switchType = useCallback((type) => {
    switch (type) {
      case "CREATE":
        return CREATE;
      case "UPDATE":
        return UPDATE;
      case "ACTIVATE":
        return ACTIVATE;
      case "DEACTIVATE":
        return DEACTIVATE;
      default:
        return "오류";
    }
  }, []);

  return <Chip color="primary" size="small" label={switchType(params.value)} />;
};

const ProposedPoliciesCard = ({ handleRowClick }) => {
  const PAGE_SIZE = 4;

  const {
    isLoading: proposedPoliciesIsLoading,
    error: proposedPoliciesError,
    data: proposedPolicies,
  } = useQuery("proposedPolicies", fetchProposedPolicies);

  if (proposedPoliciesIsLoading) return <Loader />;
  if (proposedPoliciesError) return <div>{proposedPoliciesError.message}</div>;

  const rows = proposedPolicies.map((it) => ({
    ...it,
    id: it.pl_id,
    date: new Date(it.date).toLocaleDateString("ko-KR", {
      timeZone: "UTC",
    }),
  }));

  const columns = [
    { field: "name", headerName: "정책명", flex: 2 },
    { field: "pl_id", headerName: "정책코드", flex: 1 },
    { field: "pf_name", headerName: "제공처", flex: 1.5 },
    {
      field: "request_type",
      headerName: "구분",
      flex: 1,
      renderCell: ProposedPolicyType,
    },
    { field: "create_user_name", headerName: "신청자", flex: 1 },
    { field: "date", headerName: "신청날짜", flex: 1 },
  ];

  return (
    <Card className="flex-1 h-full">
      <CardHeader
        title="승인대기 정책 조회"
        titleTypographyProps={{ variant: "display" }}
        subheader={`${proposedPolicies.length}건`}
        subheaderTypographyProps={{ variant: "label-l", className: "mt-2" }}
      />
      <CardContent>
        <DataGrid
          className="h-[317px]"
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: PAGE_SIZE,
              },
            },
          }}
          onRowClick={(params) => {
            handleRowClick(PROPOSED_READ, params);
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

const Policies = () => {
  const [detail, setDetail] = useState({});
  const [detailShow, setDetailShow] = useState(false);
  const [fade, setFade] = useState(false);

  const handleRowClick = (type, params) => {
    setDetailShow(true);
    setTimeout(() => {
      setDetail({ type, row: params.row });
    }, 100);
    handleFade();
  };

  const handleFade = () => {
    setFade(false);
    setTimeout(() => {
      setFade(true);
    }, 100);
  };

  const handleDetailType = (type) => {
    switch (type) {
      case POLICY_UPDATE:
        return <PolicyUpdateCard row={detail.row} />;
      case POLICY_CREATE:
        return <PolicyCreateCard row={detail.row} />;
      case PROPOSED_READ:
        return <ProposedPolicyReadCard row={detail.row} />;
      default:
        return <PolicyCreateCard row={detail.row} />;
    }
  };

  return (
    <div className="flex flex-col gap-6 justify-center py-16 w-[1152px] mx-auto">
      <section className="flex gap-6">
        {detailShow ? (
          <Fade in={fade}>
            <div className="min-h-full">{handleDetailType(detail.type)}</div>
          </Fade>
        ) : (
          <PolicyPlaceholderCard handleRowClick={handleRowClick} />
        )}
        <PoliciesCard handleRowClick={handleRowClick} />
      </section>
    </div>
  );
};

export default Policies;
