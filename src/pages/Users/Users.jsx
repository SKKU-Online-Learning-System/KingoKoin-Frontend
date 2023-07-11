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
import { fetchUsers } from "../../api";
import Loader from "../../components/Loader";
const UserDetail = () => {
  return <div className="">UserDetail</div>;
};

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) =>
          searchInput
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "")
        }
      />
    </Box>
  );
}

const UserName = (params) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="w-8 h-8" />
      <div className="flex flex-col">
        <Typography variant="label-l">{params.row.st_name}</Typography>
        <Typography variant="body">{params.row.st_id}</Typography>
      </div>
    </div>
  );
};

const UserAuthority = (params) => {
  return (
    <Chip label={params.row.user_authority} size="small" color="primary"></Chip>
  );
};

function Users(props) {
  // Otherwise filter will be applied on fields such as the hidden column id
  const {
    isLoading: usersIsLoading,
    error: usersError,
    data: users,
  } = useQuery("users", fetchUsers);
  const [selectedRow, setSelectedRow] = useState({});
  const [detailIsHidden, setDetailIsHidden] = useState(true);

  if (usersIsLoading) return <Loader />;

  const rows = users.map((it) => ({
    ...it,
    id: it.user_id,
  }));

  const columns = [
    {
      field: "name",
      headerName: "이름",
      flex: 2,
      renderCell: UserName,
    },
    {
      field: "dept",
      headerName: "학과",
      flex: 2,
    },
    { field: "point_plus", headerName: "획득코인", flex: 1 },
    { field: "point_total", headerName: "보유코인", flex: 1 },
    {
      field: "user_authority",
      headerName: "권한",
      flex: 1,
      renderCell: UserAuthority,
    },
  ];

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setDetailIsHidden(false);
  };

  return (
    <div className="flex flex-col gap-16 justify-center py-16 w-[1152px] mx-auto">
      <section>
        <div className="flex gap-6">
          <Card className="w-[759px]">
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
                  filter: {
                    filterModel: {
                      items: [],
                      quickFilterLogicOperator: GridLogicOperator.Or,
                    },
                  },
                }}
                pageSizeOptions={[4]}
                disableRowSelectionOnClick
                onRowClick={handleRowClick}
                slots={{
                  pagination: CustomPagination,
                  toolbar: QuickSearchToolbar,
                }}
              />
            </CardContent>
          </Card>
          {detailIsHidden ? "" : <UserDetail row={selectedRow} />}
        </div>
      </section>
    </div>
  );
}

export default Users;
