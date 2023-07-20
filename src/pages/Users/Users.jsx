import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
  Fade,
} from "@mui/material";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLogicOperator,
} from "@mui/x-data-grid";
import React, { useState, useEffect, useCallback } from "react";
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
      placeholder="학번을 입력하세요."
    />
  );
}

const UserAuthority = (params) => {
  return (
    <Chip label={params.row.user_authority} size="small" color="primary"></Chip>
  );
};

const UsersCard = ({ handleRowClick }) => {
  const [queryOptions, setQueryOptions] = useState({});
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 4,
    page: 0,
  });

  const {
    isLoading: usersIsLoading,
    error: usersError,
    data: users,
  } = useQuery(["users", paginationModel.page], () =>
    fetchUsers(paginationModel, queryOptions)
  );

  // pagination
  const [rowCountState, setRowCountState] = useState(users?.length || 0);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      users?.length !== undefined ? users?.length : prevRowCountState
    );
  }, [users?.length, setRowCountState]);

  // filter
  const onFilterChange = useCallback((filterModel) => {
    setQueryOptions({ ...queryOptions, filterModel: { ...filterModel } });
  }, []);

  // sort
  const handleSortModelChange = useCallback((sortModel) => {
    setQueryOptions({ ...queryOptions, sortModel: [...sortModel] });
  }, []);

  if (usersIsLoading) return <Loader className="w-[662px] h-[495px]" />;
  if (usersError) return <div>{usersError.message}</div>;

  const rows = users.data.map((it) => ({
    ...it,
    id: it.user_id,
  }));

  const columns = [
    { field: "st_name", headerName: "이름", flex: 1, sortable: false },
    { field: "st_id", headerName: "학번", flex: 1, sortable: false },
    { field: "dept", headerName: "학과", flex: 2, sortable: false },
    {
      field: "point_total",
      headerName: "보유코인",
      flex: 1,
      filterable: false,
    },
    // 1차 개발에서 보류된 내용
    // {
    //   field: "user_authority",
    //   headerName: "권한",
    //   flex: 1,
    //   renderCell: UserAuthority,
    // },
  ];

  return (
    <Card className="w-[662px]">
      <CardHeader
        title="사용자 조회"
        titleTypographyProps={{ variant: "display" }}
        subheader={`${users.length}건`}
        subheaderTypographyProps={{ variant: "label-l", className: "mt-2" }}
      />
      <CardContent>
        <DataGrid
          className="h-[369px]"
          rows={rows}
          columns={columns}
          initialState={{
            filter: {
              filterModel: {
                items: [],
                quickFilterLogicOperator: GridLogicOperator.Or,
              },
            },
          }}
          loading={usersIsLoading}
          // pagination
          rowCount={rowCountState}
          pageSizeOptions={[paginationModel.pageSize]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          // sort
          sortingMode="server"
          onSortModelChange={handleSortModelChange}
          // filter
          filterMode="server"
          onFilterModelChange={onFilterChange}
          onRowClick={handleRowClick}
          slots={{
            toolbar: QuickSearchToolbar,
            pagination: CustomPagination,
          }}
        />
      </CardContent>
    </Card>
  );
};

const UserPlaceholderCard = () => {
  return (
    <div className="flex-1 flex flex-col gap-4 items-center justify-center min-h-full border-dashed border-primary border-2 text-primary">
      <Typography variant="title-l">목록에서 사용자를 선택하세요.</Typography>
    </div>
  );
};

function Users() {
  const [selectedRow, setSelectedRow] = useState({});
  const [detailShow, setDetailShow] = useState(false);
  const [fade, setFade] = useState(false);

  // selectedRow를 이용하여 데이터 불러오기
  const {
    isLoading: detailsIsLoading,
    error: detailsError,
    data: details,
  } = useQuery("KoinDetails", () => fetchKoinDetails(selectedRow.user_id));

  if (detailsError) return <div>{detailsError.message}</div>;

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setDetailShow(true);
    handleFade();
  };

  const handleFade = () => {
    setFade(false);
    setTimeout(() => {
      setFade(true);
    }, 300);
  };

  return (
    <div className="flex flex-col gap-6 justify-center py-16 w-[1152px] mx-auto">
      <section>
        <div className="flex gap-6">
          {detailShow ? (
            <Fade in={fade}>
              <div className="flex-1 min-h-full">
                <UserPointGraph details={details} />
              </div>
            </Fade>
          ) : (
            <UserPlaceholderCard />
          )}
          <UsersCard handleRowClick={handleRowClick} />
        </div>
      </section>
      <section>
        {detailShow ? (
          <Fade in={fade}>
            <div>
              <UserPointHistory details={details} />
            </div>
          </Fade>
        ) : (
          ""
        )}
      </section>
    </div>
  );
}

export default Users;
