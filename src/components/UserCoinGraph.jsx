import { Card, CardContent, CardHeader } from "@mui/material";

const UserCoinGraph = ({ details }) => {
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
