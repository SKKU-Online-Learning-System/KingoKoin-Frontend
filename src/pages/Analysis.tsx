import { useEffect, useState } from "react";
import Highcharts, { Options, SeriesOptionsType } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
import { Card, CardContent, CardHeader, Grid, Switch } from "@mui/material";

HighchartsMore(Highcharts);
solidGauge(Highcharts);

const optionsMonthly = {
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
    categories: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
  },
  yAxis: {
    title: {
      text: "",
    },
  },
  colors: ["#2B6653"],
  legend: {
    enabled: false, // 시리즈 이름 숨기기
  },
  series: [
    {
      name: "코인 보유량",
      data: [
        1000, 1500, 1300, 1200, 1500, 1800, 2000, 1200, 1500, 1800, 1000, 1200,
      ],
    },
  ],
} as unknown as Options;

const optionsTransaction = {
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
    categories: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
  },
  yAxis: {
    title: {
      text: "",
    },
  },
  colors: ["#2B6653"],
  legend: {
    enabled: false, // 시리즈 이름 숨기기
  },
  series: [
    {
      name: "트랜젝션 수",
      data: [50, 30, 20, 40, 10, 15, 25, 35, 45, 50, 55, 60],
    },
  ],
} as unknown as Options;

const optionsKoinPlusByMonth = {
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
  colors: ["#2B6653", "#598D7C", "#82AB9E"],
  series: [
    {
      name: "Categories",
      colorByPoint: true,
      data: [
        {
          name: "온라인 명륜당",
          y: 50,
          drilldown: "온라인 명륜당",
        },
        {
          name: "IT 특강",
          y: 37,
          drilldown: "IT 특강",
        },
        {
          name: "오픈소스 플랫폼",
          y: 73,
          drilldown: "오픈소스 플랫폼",
        },
        {
          name: "관리자 수동 부여",
          y: 14,
          drilldown: "관리자 수동 부여",
        },
      ],
    },
  ],
} as unknown as Options;

const optionsTransactionPlusByMonth = {
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
  colors: ["#2B6653", "#598D7C", "#82AB9E"],
  series: [
    {
      name: "Categories",
      colorByPoint: true,
      data: [
        {
          name: "온라인 명륜당",
          y: 9,
          drilldown: "온라인 명륜당",
        },
        {
          name: "IT 특강",
          y: 15,
          drilldown: "IT 특강",
        },
        {
          name: "오픈소스 플랫폼",
          y: 11,
          drilldown: "오픈소스 플랫폼",
        },
        {
          name: "관리자 수동 부여",
          y: 3,
          drilldown: "관리자 수동 부여",
        },
      ],
    },
  ],
} as unknown as Options;

const optionsKoinMinusByMonth = {
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
  colors: ["#2B6653", "#598D7C", "#82AB9E"],
  series: [
    {
      name: "AWS",
      colorByPoint: true,
      data: [
        {
          name: "AWS ",
          y: 34,
          drilldown: "AWS",
        },
        {
          name: "세미나실 이용",
          y: 72,
          drilldown: "세미나실 이용",
        },
        {
          name: "장비 대여",
          y: 33,
          drilldown: "장비 대여",
        },
      ],
    },
  ],
} as unknown as Options;

const optionsTransactionMinusByMonth = {
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
  colors: ["#2B6653", "#598D7C", "#82AB9E"],
  series: [
    {
      name: "Categories",
      colorByPoint: true,
      data: [
        {
          name: "AWS ",
          y: 25,
          drilldown: "AWS",
        },
        {
          name: "세미나실 이용",
          y: 17,
          drilldown: "세미나실 이용",
        },
        {
          name: "장비 대여",
          y: 30,
          drilldown: "장비 대여",
        },
      ],
    },
  ],
} as unknown as Options;

const optionsAverageTotalByDay = {
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
    center: ["26%", "38%"],
    size: "70%",
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
    max: 300,
    stops: [
      [0.1, "#82AB9E"], // green
      [0.3, "#598D7C"], // yellow
      [0.6, "#2B6653"], // red
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
      data: [160],
      dataLabels: {
        format:
          '<div style="text-align:center"><span style="font-size:32px;color:black>{y} 개</span></div>',
        verticalAlign: "top",
        y: -50,
      },
      tooltip: {
        valueSuffix: "",
      },
    },
  ],
} as unknown as Options;

const optionsAveragePlusByDay = {
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
    center: ["26%", "38%"],
    size: "70%",
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
    max: 300,
    stops: [
      [0.1, "#82AB9E"], // green
      [0.3, "#598D7C"], // yellow
      [0.6, "#2B6653"], // red
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
      data: [240],
      dataLabels: {
        format:
          '<div style="text-align:center"><span style="font-size:32px;color:black>{y} 개</span></div>',
        verticalAlign: "top",
        y: -50,
      },
      tooltip: {
        valueSuffix: "",
      },
    },
  ],
} as unknown as Options;

const optionsAverageMinusByDay = {
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
    center: ["26%", "38%"],
    size: "70%",
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
    max: 300,
    stops: [
      [0.1, "#82AB9E"],
      [0.3, "#598D7C"],
      [0.6, "#2B6653"], // red
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
      data: [80],
      dataLabels: {
        format:
          '<div style="text-align:center"><span style="font-size:32px;color:black>{y} 개</span></div>',
        verticalAlign: "top",
        y: -50,
      },
      tooltip: {
        valueSuffix: "",
      },
    },
  ],
} as unknown as Options;

function Analysis() {
  const [showMonthlyGraph, setShowMonthlyGraph] = useState(true);

  const toggleGraph = () => {
    setShowMonthlyGraph((prevShowMonthlyGraph) => !prevShowMonthlyGraph);
  };

  useEffect(() => {
    const options = showMonthlyGraph ? optionsMonthly : optionsTransaction;

    Highcharts.chart("monthly-graph-container", options);
    Highcharts.chart(
      "coin-plus-graph-container",
      showMonthlyGraph ? optionsKoinPlusByMonth : optionsTransactionPlusByMonth
    );
    Highcharts.chart(
      "coin-minus-graph-container",
      showMonthlyGraph
        ? optionsKoinMinusByMonth
        : optionsTransactionMinusByMonth
    );
  }, [showMonthlyGraph]);

  return (
    <div className="flex flex-col gap-6 justify-center py-16 w-[1152px] mx-auto">
      <div className="flex gap-6 w-full">
        <Card className="w-[368px] h-[300px]">
          <CardHeader
            title="오늘의 평균 코인 보유량"
            titleTypographyProps={{ variant: "display" }}
          />
          <CardContent>
            <div className="flex items-center">
              <HighchartsReact
                highcharts={Highcharts}
                options={optionsAverageTotalByDay}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="w-[368px] h-[300px]">
          <CardHeader
            title="오늘의 평균 코인 획득량"
            titleTypographyProps={{ variant: "display" }}
          />
          <CardContent>
            <div className="flex items-center">
              <HighchartsReact
                highcharts={Highcharts}
                options={optionsAveragePlusByDay}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="w-[368px] h-[300px]">
          <CardHeader
            title="오늘의 평균 코인 사용량"
            titleTypographyProps={{ variant: "display" }}
          />
          <CardContent>
            <div className="flex items-center">
              <HighchartsReact
                highcharts={Highcharts}
                options={optionsAverageMinusByDay}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex-col">
        <Switch
          checked={showMonthlyGraph}
          onChange={toggleGraph}
          color="primary"
          inputProps={{ "aria-label": "Show Monthly Graph" }}
        />
      </div>
      <div className="flexw-full">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title={
                  showMonthlyGraph
                    ? "월별 코인 보유량 그래프"
                    : "트랜젝션 추이 그래프"
                }
                titleTypographyProps={{ variant: "display" }}
              />
              <CardContent>
                <div id="monthly-graph-container" />
              </CardContent>
            </Card>

            <div className="flex gap-6 mt-12 items-center">
              <Card className="w-[564px] h-[300px]">
                <CardHeader
                  title={
                    showMonthlyGraph
                      ? "전월 코인 획득량"
                      : "전월 획득 트랜젝션 수"
                  }
                  titleTypographyProps={{ variant: "display" }}
                />
                <CardContent>
                  <div className="flex items-center">
                    <div id="coin-plus-graph-container" />
                  </div>
                </CardContent>
              </Card>
              <Card className="w-[564px] h-[300px]">
                <CardHeader
                  title={
                    showMonthlyGraph
                      ? "전월 코인 사용량"
                      : "전월 사용 트랜젝션 수"
                  }
                  titleTypographyProps={{ variant: "display" }}
                />
                <CardContent>
                  <div className="flex items-center">
                    <div id="coin-minus-graph-container" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Analysis;
