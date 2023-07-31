import { useQuery } from "react-query";
import { getCoinDetail } from "../../api";
import { Card, CardContent, CardHeader } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import CustomPagination from "../CustomPagination";
import { stampToDayjs, dayjsToFormat } from "../../utils";

interface UserCoinDetailCardProps {
  userId: number;
  pageSize: number;
}

const UserCoinDetailCard = ({ userId, pageSize }: UserCoinDetailCardProps) => {
  const {
    isLoading: userCoinDetailIsLoading,
    error: userCoinDetailError,
    data: userCoinDetail,
  } = useQuery(["userCoinDetail", userId], () => getCoinDetail(userId));

  if (userCoinDetailIsLoading) return <div>"loading.."</div>;
  if (userCoinDetailError) return <div>"error.."</div>;
  if (!userCoinDetail) return <div>"no data.."</div>;

  const columns: GridColDef[] = [
    {
      field: "createdDate",
      headerName: "날짜",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        dayjsToFormat(stampToDayjs(params.row.createdDate)),
    },
    { field: "provider", headerName: "제공처", flex: 1.2 },
    { field: "title", headerName: "내용", flex: 1.5 },
    {
      field: "pointPlus",
      headerName: "획득한 코인",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.plus ? params.row.point : "",
    },
    {
      field: "pointMinus",
      headerName: "사용한 코인",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.plus ? "" : -params.row.point,
    },
    { field: "pointTotal", headerName: "보유한 코인", flex: 1 },
  ];

  return (
    <Card className="flex-1">
      <CardHeader
        title="코인 내역"
        titleTypographyProps={{ variant: "display" }}
        subheader={`${userCoinDetail.length}건`}
        subheaderTypographyProps={{ variant: "label-l", className: "mt-2" }}
      />
      <CardContent>
        <DataGrid
          rows={userCoinDetail}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: pageSize,
              },
            },
          }}
          pageSizeOptions={[pageSize]}
          slots={{
            pagination: CustomPagination,
          }}
        />
      </CardContent>
    </Card>
  );
};

export default UserCoinDetailCard;
