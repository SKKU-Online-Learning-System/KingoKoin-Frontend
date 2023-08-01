import { Card, CardContent, CardHeader } from "@mui/material";
import { useQuery } from "react-query";
import { getStaticsByMonth } from "../api";

const UserCoinGraph = ({ userId }) => {
  const {
    isLoading: statisticIsLoading,
    error: statisticError,
    data: statistic,
  } = useQuery(["statistic"], getStaticsByMonth);

  return (
    <Card className="flex-1 h-full">
      <CardHeader
        title="누적코인보유량"
        titleTypographyProps={{ variant: "display" }}
      />
      <CardContent>GRAPH</CardContent>
    </Card>
  );
};
export default UserCoinGraph;
