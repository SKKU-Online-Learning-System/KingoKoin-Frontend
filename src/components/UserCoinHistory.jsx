import { Card, CardContent, CardHeader } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CustomPagination from "./CustomPagination";

const UserCoinHistory = ({ details }) => {
  const PAGE_SIZE = 4;

  const rows = details.map((it) => ({
    ...it,
    id: it.dt_id,
    modified_date: new Date(it.modified_date).toLocaleDateString("ko-KR", {
      timeZone: "UTC",
    }),
  }));

  const columns = [
    { field: "modified_date", headerName: "날짜", flex: 1 },
    { field: "pf_name", headerName: "제공처", flex: 1.2 },
    { field: "pl_name", headerName: "내용", flex: 1.5 },
    {
      field: "point_plus",
      headerName: "획득한 코인",
      flex: 1,
      valueGetter: (params) => (params.row.plus ? params.row.point : ""),
    },
    {
      field: "point_minus",
      headerName: "사용한 코인",
      flex: 1,
      valueGetter: (params) => (params.row.plus ? "" : params.row.point),
    },
    { field: "point_total", headerName: "보유한 코인", flex: 1 },
  ];

  return (
    <Card className="flex-1">
      <CardHeader
        title="코인 내역"
        titleTypographyProps={{ variant: "display" }}
        subheader={`${details.length}건`}
        subheaderTypographyProps={{ variant: "label-l", className: "mt-2" }}
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

export default UserCoinHistory;
