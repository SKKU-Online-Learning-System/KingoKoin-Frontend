import { Add } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import { DataGrid, GridValueGetterParams } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import { getPolicies } from "../../../common/api";
import { POLICY_REQUEST_TYPE, POLICY_TYPE } from "../../../common/apiManager";
import CustomPagination from "../../CustomPagination";
import Status from "../../feedback/Status";

interface PolicySearchCardProps {
  pageSize: number;
  handleRowClick: (type: POLICY_REQUEST_TYPE, plId?: number) => void;
  className?: string;
}

const PolicySearchCard = ({
  pageSize,
  handleRowClick,
  className,
}: PolicySearchCardProps) => {
  const {
    isLoading: policiesIsLoading,
    error: policiesError,
    data: policies,
  } = useQuery(["policies"], () => getPolicies());

  const render =
    !policiesIsLoading && !policiesError && policies && policies.length > 0;

  const columns = [
    { field: "plName", headerName: "정책명", flex: 2 },
    { field: "plCode", headerName: "정책코드", flex: 1 },
    { field: "pfName", headerName: "제공처", flex: 1.5 },
    {
      field: "point",
      headerName: "코인값",
      flex: 1,
    },
    {
      field: "available",
      headerName: "상태",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params.value ? POLICY_TYPE.ACTIVE : POLICY_TYPE.INACTIVE,
    },
  ];

  return (
    <div className={className}>
      <Card className="w-full h-full relative">
        <CardHeader
          title="정책 조회"
          titleTypographyProps={{ variant: "display" }}
          subheader={`${policies?.length || 0}건`}
          subheaderTypographyProps={{ variant: "label-l", className: "mt-2" }}
        />
        <div className="absolute right-4 top-0 flex items-center gap-0 pt-4 pl-4">
          <Button
            variant="contained"
            endIcon={<Add />}
            onClick={() => {
              handleRowClick(POLICY_REQUEST_TYPE.CREATE);
            }}
          >
            정책생성
          </Button>
        </div>
        <CardContent>
          <Status
            isLoading={policiesIsLoading}
            error={policiesError}
            isData={policies && policies.length > 0}
          />
          {render && (
            <DataGrid
              rows={policies}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: pageSize,
                  },
                },
              }}
              pageSizeOptions={[pageSize]}
              onRowClick={(params) =>
                handleRowClick(POLICY_REQUEST_TYPE.UPDATE, params.row.plId)
              }
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

export default PolicySearchCard;
