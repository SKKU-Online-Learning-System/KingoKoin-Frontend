import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { fetchPolicies } from "../../api";
import Loader from "../../components/Loader";
import ProposedPolicy from "./ProposedPolicy";
import ConfirmDialog from "../../components/ConfirmDialog";
import CustomPagination from "../../components/CustomPagination";

const PolicyName = (params) => {
  return (
    <div className="flex flex-col">
      <Typography variant="label-l">{params.row.name}</Typography>
      <Typography variant="body">{params.row.pl_id}</Typography>
    </div>
  );
};

const PolicyIsDelete = (params) => {
  return (
    <Chip
      size="small"
      variant="contained"
      color="primary"
      label={params.row.isDelete ? "미적용" : "적용"}
    />
  );
};

const PolicyDetail = ({ row: { name, pl_id, pf_name, date, point } }) => {
  const [open, setOpen] = useState(false);
  const [requestPoint, setRequestPoint] = useState(point);
  const [reason, setReason] = useState("");
  const [action, setAction] = useState();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setAction(e.nativeEvent.submitter.name);
    setOpen(true);
  }, []);

  const handleCancel = useCallback((e) => {
    setOpen(false);
  }, []);

  const handleConfirm = useCallback((e) => {
    console.log("확인");
    setOpen(false);
    // TODO: 사용자 정보 가져오기
    // TODO: 요청 createProposedPolicy(name, pl_id, requestPoint, created_user_id, reason);
  }, []);

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <Card className="w-[466px]">
          <CardHeader
            title={
              <div className="flex gap-2 items-end">
                <Typography variant="title-m">{name}</Typography>
                <Chip size="small" label={pf_name}></Chip>
              </div>
            }
            subheader={
              <div className="flex justify-end">
                <Typography variant="label-l" color="darkgray">
                  {date}
                </Typography>
              </div>
            }
          ></CardHeader>
          <CardContent className="flex flex-col gap-2">
            <TextField
              label="코인값"
              type="number"
              value={requestPoint}
              onChange={(e) => {
                setRequestPoint(e.currentTarget.value);
              }}
            />
            <TextField
              label="신청사유"
              multiline
              rows={4}
              value={reason}
              onChange={(e) => {
                setReason(e.currentTarget.value);
              }}
            />
          </CardContent>
          <CardActions className="p-4">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              name="수정"
            >
              수정
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              name="삭제"
            >
              삭제
            </Button>
          </CardActions>
        </Card>
      </Box>
      <ConfirmDialog
        open={open}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        action={action}
      />
    </>
  );
};

const PolicyContainer = () => {
  const {
    isLoading: policiesIsLoading,
    error: policiesError,
    data: policies,
  } = useQuery("Policies", fetchPolicies);
  const [selectedRow, setSelectedRow] = useState({});
  const [detailIsHidden, setDetailIsHidden] = useState(true);

  if (policiesIsLoading) return <Loader />;
  if (policiesError)
    return <div>An error has occurred: {policiesError.message}</div>;

  const rows = policies.map((it) => ({
    ...it,
    id: it.pl_id,
    created_date: new Date(it.date).toLocaleDateString("ko-KR", {
      timeZone: "UTC",
    }),
  }));
  const columns = [
    {
      field: "name",
      headerName: "정책명",
      flex: 2,
      renderCell: PolicyName,
    },
    { field: "pf_name", headerName: "제공", flex: 1 },
    { field: "point", headerName: "코인값", flex: 1 },
    {
      field: "isDelete",
      headerName: "분류",
      flex: 1,
      renderCell: PolicyIsDelete,
    },
  ];
  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setDetailIsHidden(false);
  };

  return (
    <div className="flex gap-6">
      <Card className="w-[662px]">
        <CardHeader
          title="정책 조회"
          titleTypographyProps={{ variant: "display" }}
        />
        <CardContent>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 4,
                },
              },
            }}
            pageSizeOptions={[4]}
            onRowClick={handleRowClick}
            slots={{
              pagination: CustomPagination,
            }}
          ></DataGrid>
        </CardContent>
      </Card>
      {detailIsHidden ? "" : <PolicyDetail row={selectedRow} />}
    </div>
  );
};

const Policy = () => {
  return (
    <div className="flex flex-col gap-16 justify-center py-16 w-[1152px] mx-auto">
      <section>
        <ProposedPolicy />
      </section>
      <section>
        <PolicyContainer />
      </section>
    </div>
  );
};

export default Policy;
