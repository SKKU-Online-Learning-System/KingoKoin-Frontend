import { Card, CardContent, CardHeader } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import { getStaticsByMonth } from "../../../common/api";
import CustomPagination from "../../CustomPagination";
import Status from "../../feedback/Status";

interface UserChartProps {
  userId: number;
  pageSize: number;
  className?: string;
}

const UserChartCard = ({ userId, pageSize, className }: UserChartProps) => {
  // TODO: userId에 따라 통계를 검색하는 기능 추가
  // TODO: dataGrid -> Chart

  const {
    isLoading: statisticIsLoading,
    error: statisticError,
    data: statistic,
  } = useQuery(["statistic"], getStaticsByMonth);

  const render =
    !statisticIsLoading && !statisticError && statistic && statistic.length > 0;

  const columns: GridColDef[] = [
    { field: "year", headerName: "년", flex: 1 },
    { field: "month", headerName: "월", flex: 1 },
    { field: "pointTotal", headerName: "합계", flex: 1 },
  ];

  return (
    <Card className={className}>
      <CardHeader
        title="누적코인보유량"
        titleTypographyProps={{ variant: "display" }}
        subheader={`최근 ${statistic ? statistic.length : 0}개월`}
        subheaderTypographyProps={{ variant: "label-l", className: "mt-2" }}
      />
      <CardContent>
        <Status
          isLoading={statisticIsLoading}
          error={statisticError}
          isData={statistic && statistic.length > 0}
          className="h-[160px]"
        />
        {render && (
          <DataGrid
            className="h-[160px]"
            rows={statistic}
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
export default UserChartCard;
