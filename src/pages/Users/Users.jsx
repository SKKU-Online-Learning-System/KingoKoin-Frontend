import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLogicOperator,
} from "@mui/x-data-grid";
import React, { useState } from "react";
import CustomPagination from "../../components/CustomPagination";

import { useQuery } from "react-query";
import { fetchKoinDetails, fetchUsers } from "../../api";
import Loader from "../../components/Loader";
import { UserPointGraph, UserPointHistory } from "../Dashboard/Dashboard";

function QuickSearchToolbar() {
  return (
    <GridToolbarQuickFilter
      className="w-[270px] pt-4 pl-4"
      quickFilterParser={(searchInput) =>
        searchInput
          .split(",")
          .map((value) => value.trim())
          .filter((value) => value !== "")
      }
      placeholder="검색어를 입력하세요."
    />
  );
}

const UserAuthority = (params) => {
  return (
    <Chip label={params.row.user_authority} size="small" color="primary"></Chip>
  );
};

const UsersCard = ({ handleRowClick }) => {
  const PAGE_SIZE = 4;

  const {
    isLoading: usersIsLoading,
    error: usersError,
    data: users,
  } = useQuery("users", fetchUsers);

  if (usersIsLoading) return <Loader />;
  if (usersError) return <div>An error has occurred: {usersError.message}</div>;

  const rows = users.map((it) => ({
    ...it,
    id: it.user_id,
  }));

  const columns = [
    { field: "st_name", headerName: "이름", flex: 1 },
    { field: "st_id", headerName: "학번", flex: 1 },
    { field: "dept", headerName: "학과", flex: 2 },
    { field: "point_total", headerName: "보유코인", flex: 1 },
    {
      field: "user_authority",
      headerName: "권한",
      flex: 1,
      renderCell: UserAuthority,
    },
  ];

  return (
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
                pageSize: PAGE_SIZE,
              },
            },
            filter: {
              filterModel: {
                items: [],
                quickFilterLogicOperator: GridLogicOperator.Or,
              },
            },
          }}
          pageSizeOptions={[PAGE_SIZE]}
          onRowClick={handleRowClick}
          slots={{
            pagination: CustomPagination,
            toolbar: QuickSearchToolbar,
          }}
        />
      </CardContent>
    </Card>
  );
};

const UserPlaceholderCard = ({ handleRowClick }) => {
  return (
    <div className="flex-1 flex flex-col gap-4 items-center justify-center min-h-full border-dashed border-primary border-2 text-primary">
      <Typography variant="title-l">목록에서 사용자를 선택하세요.</Typography>
    </div>
  );
};

function Users() {
  const [selectedRow, setSelectedRow] = useState({});
  const [detailShow, setDetailShow] = useState(false);

  // selectedRow를 이용하여 데이터 불러오기
  const {
    isLoading: detailsIsLoading,
    error: detailsError,
    data: details,
  } = useQuery("KoinDetails", fetchKoinDetails);

  if (detailsIsLoading) return <Loader />;
  if (detailsError) return <div>{detailsError.message}</div>;

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setDetailShow(true);
  };

  return (
    <div className="flex flex-col gap-6 justify-center py-16 w-[1152px] mx-auto">
      <section>
        <div className="flex gap-6">
          <UsersCard handleRowClick={handleRowClick} />
          {detailShow ? (
            <UserPointGraph details={details} />
          ) : (
            <UserPlaceholderCard />
          )}
        </div>
      </section>
      <section>
        {detailShow ? <UserPointHistory details={details} /> : ""}
      </section>
    </div>
  );
}

export default Users;
