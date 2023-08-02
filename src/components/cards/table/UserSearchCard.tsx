import { Search } from "@mui/icons-material";
import { Card, CardContent, CardHeader, TextField } from "@mui/material";
import {
  DataGrid,
  GridFilterModel,
  GridLogicOperator,
  GridRowParams,
  GridSortModel,
  getGridStringOperators,
} from "@mui/x-data-grid";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { ISearchOptions, getUsersBySearch } from "../../../common/api";
import CustomPagination from "../../CustomPagination";
import Status from "../../feedback/Status";

interface UserSearchCardProps {
  pageSize: number;
  handleRowClick: (params: GridRowParams) => void;
  className?: string;
}

const UserSearchCard = ({
  pageSize,
  handleRowClick,
  className,
}: UserSearchCardProps) => {
  // TODO: animation 추가
  const [searchOptions, setSearchOptions] = useState<ISearchOptions>({
    order: "desc",
    column: undefined,
    search: undefined,
  });

  const {
    isLoading: usersIsLoading,
    error: usersError,
    data: users,
  } = useQuery(["users"], () => getUsersBySearch(searchOptions));

  // serverside filter
  const onFilterChange = useCallback(
    (filterModel: GridFilterModel) => {
      setSearchOptions({
        ...searchOptions,
        column: filterModel.items[0].field,
        search: filterModel.items[0].value,
      });
    },
    [searchOptions]
  );

  const stringOperators = getGridStringOperators().filter((op) =>
    ["contains"].includes(op.value)
  );

  // serverside sort
  const onSortChange = useCallback(
    (sortModel: GridSortModel) => {
      setSearchOptions({
        ...searchOptions,
        order: sortModel[0].sort ?? undefined,
      });
    },
    [searchOptions]
  );

  const columns = [
    {
      field: "stName",
      headerName: "이름",
      flex: 1,
      sortable: false,
      filterOperators: stringOperators,
    },
    {
      field: "stId",
      headerName: "학번",
      flex: 1,
      sortable: false,
      filterOperators: stringOperators,
    },
    {
      field: "dept",
      headerName: "학과",
      flex: 2,
      sortable: false,
      filterOperators: stringOperators,
    },
    {
      field: "pointTotal",
      headerName: "보유코인",
      flex: 1,
      filterable: false,
    },
  ];

  const render =
    !usersIsLoading && !usersError && users && users.data.length > 0;

  return (
    <div className={className}>
      <Card className="relative w-full h-full">
        <CardHeader
          title="사용자 조회"
          titleTypographyProps={{ variant: "display" }}
          subheader={`${users?.length || 0}건`}
          subheaderTypographyProps={{ variant: "label-l", className: "mt-2" }}
        />
        <div className="absolute right-6 top-8 flex items-center gap-0 pt-4 pl-4">
          <Search className="w-6 h-6" />
          <TextField
            variant="standard"
            placeholder="학번을 입력하세요."
            size="small"
            onChange={(e) => {
              setSearchOptions({
                ...searchOptions,
                column: "stId",
                search: e.target.value,
              });
            }}
          />
        </div>
        <CardContent>
          <Status
            isLoading={usersIsLoading}
            error={usersError}
            isData={users && users.data.length > 0}
          />
          {render && (
            <DataGrid
              className="h-[370px]"
              rows={users.data}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: pageSize,
                  },
                },
                filter: {
                  filterModel: {
                    items: [],
                    quickFilterLogicOperator: GridLogicOperator.Or,
                  },
                },
              }}
              pageSizeOptions={[pageSize]}
              // filter
              filterMode="server"
              onFilterModelChange={onFilterChange}
              // sort
              sortingMode="server"
              onSortModelChange={onSortChange}
              onRowClick={handleRowClick}
              slots={{
                pagination: CustomPagination,
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSearchCard;
