import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  IStaticsByMonthMinus,
  IStaticsByMonthPlus,
  fetchgetStaticsByDay,
  fetchgetStaticsByMonth,
  fetchgetStaticsMinusByMonth,
  fetchgetStaticsPlusByMonth,
} from "../common/apiDev";
import HighchartsReact from "highcharts-react-official";
import Status from "../components/feedback/Status";

HighchartsMore(Highcharts);
solidGauge(Highcharts);

interface SolidGaugeGraphProps {
  title: string;
  data: Array<any>;
}
const SolidGaugeGraph = ({ title, data }: SolidGaugeGraphProps) => {
  const options = {
    chart: {
      type: "solidgauge",
      plotBorderWidth: 0,
      plotShadow: false,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    pane: {
      center: ["50%", "38%"],
      size: "90%",
      startAngle: -90,
      endAngle: 90,
      background: {
        borderWidth: 0,
        backgroundColor: "#EEE",
        innerRadius: "60%",
        outerRadius: "100%",
        shape: "arc",
        borderRadius: 10,
      },
    },
    tooltip: {
      enabled: false,
    },
    yAxis: {
      min: 0,
      max: 200,
      stops: [
        [0.1, "#62b4a0"],
        [0.3, "#3b937c"],
        [0.6, "#2B6653"],
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      title: {
        y: -70,
      },
      labels: {
        y: 16,
      },
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: 5,
          borderWidth: 0,
          useHTML: true,
        },
      },
    },
    series: [
      {
        borderRadius: 10,
        name: "Speed",
        data: data,
        dataLabels: {
          format:
            '<div class="text-center"><span class="text-3xl text-black">{y} 개</span></div>',
          verticalAlign: "top",
          y: -50,
        },
        tooltip: {
          valueSuffix: "",
        },
      },
    ],
  };

  return (
    <Card className="w-[368px] h-[300px]">
      <CardHeader title={title} titleTypographyProps={{ variant: "display" }} />
      <CardContent>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </CardContent>
    </Card>
  );
};

interface LineGraphProps {
  showMonthlyGraph: boolean;
}

const LineGraph = ({ showMonthlyGraph }: LineGraphProps) => {
  const {
    isLoading: staticsByMonthIsLoading,
    error: staticsByMonthError,
    data: staticsByMonth,
  } = useQuery("staticsByMonth", fetchgetStaticsByMonth);
  const options = {
    chart: {
      type: "line",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: staticsByMonth?.map((item) => item.month).reverse(),
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    colors: ["#2B6653"],
    legend: {
      enabled: false,
    },
    series: [
      {
        name: showMonthlyGraph ? "코인 보유량" : "트랜잭션 수",
        data: showMonthlyGraph
          ? staticsByMonth?.map((item) => item.pointTotal).reverse()
          : staticsByMonth?.map((item) => item.transactionTotal).reverse(),
      },
    ],
  };

  return (
    <Card>
      <CardHeader
        title={
          showMonthlyGraph
            ? `월별 코인 보유량 그래프`
            : "월별 트랜잭션 수 그래프"
        }
        titleTypographyProps={{ variant: "display" }}
      />
      <CardContent>
        <div className="flex items-center w-full">
          <Status
            isLoading={staticsByMonthIsLoading}
            error={staticsByMonthError}
            isData={staticsByMonth && staticsByMonth.length > 0}
          />
          <HighchartsReact
            highcharts={Highcharts}
            containerProps={{ style: { width: "100%" } }}
            options={options}
          />
        </div>
      </CardContent>
    </Card>
  );
};

interface BarGraphProps {
  showMonthlyGraph: boolean;
  isPlusGraph: boolean;
}
const BarGraph = ({ showMonthlyGraph, isPlusGraph }: BarGraphProps) => {
  const fetchFunction = isPlusGraph
    ? fetchgetStaticsPlusByMonth
    : fetchgetStaticsMinusByMonth;
  const title = isPlusGraph
    ? showMonthlyGraph
      ? `전월 코인 획득량`
      : "전월 획득 트랜잭션 수"
    : showMonthlyGraph
    ? `전월 코인 사용량`
    : "전월 사용 트랜잭션 수";

  const queryKey = isPlusGraph ? "dataPlus" : "dataMinus";

  const { isLoading, error, data } = useQuery<
    IStaticsByMonthPlus[] | IStaticsByMonthMinus[]
  >(queryKey, fetchFunction);

  const processedData = data?.map((item: any) => ({
    name: item.pfName,
    y: isPlusGraph
      ? showMonthlyGraph
        ? item.pointPlus
        : item.transactionPlus
      : showMonthlyGraph
      ? item.pointMinus
      : item.transactionMinus,
    drilldown: item.pfName,
  }));

  const options = {
    chart: {
      type: "bar",
      height: 200,
      width: 550,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        enabled: false,
      },
      gridLineWidth: 0,
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y}",
        },
      },
    },
    colors: ["#2B6653", "#3b937c", "#62b4a0", "#b7ded5"],
    series: [
      {
        name: "Categories",
        colorByPoint: true,
        data: processedData,
      },
    ],
  };

  return (
    <Card className="w-[564px] h-[300px]">
      <CardHeader title={title} titleTypographyProps={{ variant: "display" }} />
      <CardContent>
        <div className="flex items-center">
          <HighchartsReact highcharts={Highcharts} options={options} />
          <Status
            isLoading={isLoading}
            error={error}
            isData={data && data.length > 0}
          />
        </div>
      </CardContent>
    </Card>
  );
};

function Analysis() {
  const toggleGraph = () => {
    setShowMonthlyGraph((prevShowMonthlyGraph) => !prevShowMonthlyGraph);
  };

  const [showMonthlyGraph, setShowMonthlyGraph] = useState(true);

  const {
    isLoading: staticsByDayIsLoading,
    error: staticsByDayError,
    data: staticsByDay,
  } = useQuery("staticsByDay", fetchgetStaticsByDay);

  return (
    <div className="flex flex-col gap-6 justify-center py-16 w-[1152px] mx-auto">
      <div className="flex gap-6 w-full">
        <SolidGaugeGraph
          title={"오늘의 평균 코인 보유량"}
          data={[staticsByDay?.[0].pointTotal || 0]}
        />
        <SolidGaugeGraph
          title={"오늘의 평균 코인 획득량"}
          data={[staticsByDay?.[0].pointPlus || 0]}
        />
        <SolidGaugeGraph
          title={"오늘의 평균 코인 사용량"}
          data={[staticsByDay?.[0].pointMinus || 0]}
        />
      </div>
      <div className="flex items-center">
        <Typography variant="body">트랜잭션</Typography>
        <Switch
          checked={showMonthlyGraph}
          onChange={toggleGraph}
          color="primary"
          inputProps={{ "aria-label": "Show Monthly Graph" }}
        />
        <Typography variant="body">코인</Typography>
      </div>
      <div className="flex w-full">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <LineGraph showMonthlyGraph={showMonthlyGraph} />
            <div className="flex gap-6 mt-12 items-center">
              <BarGraph
                showMonthlyGraph={showMonthlyGraph}
                isPlusGraph={true}
              />
              <BarGraph
                showMonthlyGraph={showMonthlyGraph}
                isPlusGraph={false}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Analysis;
