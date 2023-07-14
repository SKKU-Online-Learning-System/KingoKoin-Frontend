import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { MdArrowRightAlt } from "react-icons/md";
import { useQuery } from "react-query";
import { fetchProposedPolicies } from "../../api";
import Loader from "../../components/Loader";
import CustomPagination from "../../components/CustomPagination";

const ProposedPolicyName = (params) => {
  return (
    <div className="flex flex-col">
      <Typography variant="label-l">{params.row.name}</Typography>
      <Typography variant="body">{params.row.pl_id}</Typography>
    </div>
  );
};

const ProposedPolicyIsDelete = (params) => {
  return (
    <Chip
      size="small"
      variant="contained"
      color="primary"
      label={params.row.isDelete ? "삭제" : "승인"}
    />
  );
};

const ProposedPolicyDetail = ({
  row: { name, pl_id, pf_name, date, point, request_point, reason },
}) => {
  return (
    <Card className="w-[466px] h-fit">
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
        <Typography variant="label-l">코인값</Typography>
        <div className="flex items-center gap-2 mb-2">
          <Typography variant="body">{point}</Typography>
          <MdArrowRightAlt />
          <Typography variant="body">{request_point}</Typography>
        </div>
        <Typography variant="label-l">신청사유</Typography>
        <Typography variant="body" paragraph>
          {reason}
        </Typography>
      </CardContent>
      <CardActions className="p-4">
        <Button variant="contained" color="primary">
          승인
        </Button>
        <Button variant="contained" color="primary">
          거부
        </Button>
      </CardActions>
    </Card>
  );
};

const ProposedPolicy = (props) => {
  const {
    isLoading: proposedPoliciesIsLoading,
    error: proposedPoliciesError,
    data: proposedPolicies,
  } = useQuery("proposedPolicies", fetchProposedPolicies);
  const [selectedRow, setSelectedRow] = useState({});
  const [detailIsHidden, setDetailIsHidden] = useState(true);

  if (proposedPoliciesIsLoading) return <Loader />;
  if (proposedPoliciesError)
    return <div>An error has occurred: {proposedPoliciesError.message}</div>;

  const rows = proposedPolicies.map((it) => ({
    ...it,
    id: it.pl_id,
    date: new Date(it.date).toLocaleDateString("ko-KR", {
      timeZone: "UTC",
    }),
  }));
  const columns = [
    {
      field: "name",
      headerName: "정책명",
      flex: 2,
      renderCell: ProposedPolicyName,
    },
    {
      field: "isDelete",
      headerName: "분류",
      flex: 1,
      renderCell: ProposedPolicyIsDelete,
    },
    { field: "create_user_name", headerName: "신청자", flex: 1 },
    {
      field: "date",
      headerName: "신청날짜",
      flex: 1,
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
          title="승인 대기 중인 정책"
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
            checkboxSelection
            disableRowSelectionOnClick
            onRowClick={handleRowClick}
            slots={{
              pagination: CustomPagination,
            }}
          ></DataGrid>
        </CardContent>
      </Card>
      {detailIsHidden ? "" : <ProposedPolicyDetail row={selectedRow} />}
    </div>
  );
};

export default ProposedPolicy;
