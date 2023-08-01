import { Card, CardContent, CardHeader } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CustomPagination from "./CustomPagination";
import { getCoinDetail } from "../api";
import { useQuery } from "react-query";
import Loader from "./Loader";
import Error from "./Error";

/**
 * 코인 내역 카드 (UserCoinDetailCard) -
 * userId를 받아 getCoinDetail api를 호출해 코인 내역을 반환하는 컴포넌트
 *
 * @param {number?} userId 사용자 식별자
 */
const UserCoinDetailCard = ({ userId }) => {
  const PAGE_SIZE = 4;

  const {
    isLoading: userCoinDetailIsLoading,
    error: userCoinDetailError,
    data: userCoinDetail,
  } = useQuery(["userCoinDetail", userId], () => getCoinDetail(userId));

  if (userCoinDetailIsLoading) return <Loader className="w-full" />;
  if (userCoinDetailError) return <Error className="w-full" />;

  const columns = [
    { field: "modifiedDate", headerName: "날짜", flex: 1 }, // modifiedDate vs createdDate
    { field: "adGroup", headerName: "제공처", flex: 1.2 }, // TODO: adGroup -> provider
    { field: "title", headerName: "내용", flex: 1.5 },
    {
      field: "pointPlus",
      headerName: "획득한 코인",
      flex: 1,
      valueGetter: (params) => (params.row.plus ? params.row.point : ""),
    },
    {
      field: "pointMinus",
      headerName: "사용한 코인",
      flex: 1,
      valueGetter: (params) => (params.row.plus ? "" : params.row.point),
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

export default UserCoinDetailCard;
