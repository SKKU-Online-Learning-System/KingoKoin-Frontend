import { Card, CardContent, CardHeader } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import { getCoinDetailByAdId } from "../../../common/api";
import { dayjsToFormat, stampToDayjs } from "../../../common/utils";
import CustomPagination from "../../CustomPagination";
import Status from "../../feedback/Status";

interface AdminCoinDetailCardProps {
  adId: number;
  pageSize: number;
}

const AdminCoinDetailCard = ({ adId, pageSize }: AdminCoinDetailCardProps) => {
  const {
    isLoading: adCoinDetailIsLoading,
    error: adCoinDetailError,
    data: adCoinDetail,
  } = useQuery(["adCoinDetail"], () => getCoinDetailByAdId(adId));

  const render =
    !adCoinDetailIsLoading &&
    !adCoinDetailError &&
    adCoinDetail &&
    adCoinDetail.length > 0;

  const columns: GridColDef[] = [
    {
      field: "createdDate",
      headerName: "날짜",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        dayjsToFormat(stampToDayjs(params.row.createdDate)),
    },
    { field: "title", headerName: "내용", flex: 1.5 },
    { field: "provider", headerName: "제공처", flex: 1.2 },
    {
      field: "pointPlus",
      headerName: "부여한 코인",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.plus ? params.row.point : "",
    },
    {
      field: "pointMinus",
      headerName: "차감한 코인",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.plus ? "" : params.row.point,
    },
  ];

  return (
    <Card className="flex-1">
      <CardHeader
        title="부여한 코인 내역"
        titleTypographyProps={{ variant: "display" }}
        subheader={`${adCoinDetail ? adCoinDetail.length : 0}건`}
        subheaderTypographyProps={{ variant: "label-l", className: "mt-2" }}
      />
      <CardContent>
        <Status
          isLoading={adCoinDetailIsLoading}
          error={adCoinDetailError}
          isData={adCoinDetail && adCoinDetail.length > 0}
          className="h-[318.4px]"
        />
        {render && (
          <DataGrid
            className="h-[318.4px]"
            rows={adCoinDetail}
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
        )}
      </CardContent>
    </Card>
  );
};

export default AdminCoinDetailCard;
