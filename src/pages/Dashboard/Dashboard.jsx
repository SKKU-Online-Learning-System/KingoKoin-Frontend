import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { dummyLinks, fetchFaqs, fetchKoin, fetchKoinDetails } from "../../api";
import Counter from "./Counter";
import Loader from "../../components/Loader";
import {
  Card,
  CardContent,
  CardHeader,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CustomPagination from "../../components/CustomPagination";

export const UserPointGraph = ({ details }) => {
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

export const UserPointHistory = ({ details }) => {
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

function Dashboard(props) {
  const {
    isLoading: faqsIsLoading,
    error: faqsError,
    data: faqs,
  } = useQuery("Faqs", fetchFaqs);

  const links = dummyLinks;

  const {
    isLoading: koinIsLoading,
    error: koinError,
    data: koin,
  } = useQuery("Koin", fetchKoin);

  const {
    isLoading: detailsIsLoading,
    error: detailsError,
    data: details,
  } = useQuery("KoinDetails", fetchKoinDetails);

  const isLoading = faqsIsLoading || koinIsLoading || detailsIsLoading;
  const error = faqsError || koinError || detailsError;

  if (isLoading) return <Loader />;
  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div className="flex flex-col gap-6 justify-center py-16 w-[1152px] mx-auto">
      <section className="flex gap-6 w-full">
        <div className="flex flex-col gap-6 w-full">
          <div className="flex gap-6">
            <Card className="w-[172px]">
              <CardHeader
                title="보유한 코인"
                titleTypographyProps={{ variant: "label-l" }}
              />
              <CardContent>
                <div className="flex items-end">
                  <Counter start={0} end={koin.point_plus} duration={1000} />
                  <div
                    className={
                      details[0].plus
                        ? "flex text-primary"
                        : "flex text-red-600"
                    }
                  >
                    {details[0].point}
                    {details[0].plus ? "▲" : "▼"}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="w-[172px]">
              <CardHeader
                title="획득한 코인"
                titleTypographyProps={{ variant: "label-l" }}
              />
              <CardContent>
                <div className="flex items-end">
                  <Counter start={0} end={koin.point_plus} duration={1000} />
                  <div
                    className={
                      details[0].plus
                        ? "flex text-primary"
                        : "flex text-red-600"
                    }
                  >
                    {details[0].point}
                    {details[0].plus ? "▲" : "▼"}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="w-[172px]">
              <CardHeader
                title="사용한 코인"
                titleTypographyProps={{ variant: "label-l" }}
              />
              <CardContent>
                <div className="flex items-end">
                  <Counter start={0} end={koin.point_minus} duration={1000} />
                  <div
                    className={
                      details[0].plus
                        ? "flex text-red-600"
                        : "flex text-primary"
                    }
                  >
                    {details[0].point}
                    {details[0].plus ? "▼" : "▲"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <UserPointGraph details={details} />
        </div>
        <Card className="bg-transparent shadow-none w-full">
          <CardHeader
            title="코인 획득처"
            titleTypographyProps={{ variant: "display" }}
          />
          <CardContent>
            <div className="flex flex-wrap gap-3 w-full">
              {links.map((it) => (
                <a
                  key={it.pf_name}
                  href={it.pf_link}
                  target="_blank"
                  className="flex justify-center items-center gap-1 w-[258px] h-[156px] bg-background rounded-lg border-solid border-2 border-primary hover:shadow-lg transition-shadow"
                >
                  {it.pf_logo ? (
                    <>
                      <img
                        className="w-8 h-8"
                        src={it.pf_logo}
                        alt={it.pf_name + " 링크"}
                      />
                      <div className="text-label-l">{it.pf_name}</div>
                    </>
                  ) : (
                    <div className="font-gugi text-xl">{it.pf_name}</div>
                  )}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
      <section className="flex flex-col gap-4">
        <UserPointHistory details={details} />
      </section>
      <section className="flex flex-col gap-4">
        <Card className="bg-transparent shadow-none w-full">
          <CardHeader
            title="자주 묻는 질문"
            titleTypographyProps={{ variant: "display" }}
          />
          <CardContent>
            {faqs.map((it) => (
              <Accordion key={it.faq_id}>
                <AccordionSummary
                  expandIcon={<BiChevronDown className="w-6 h-6" />}
                >
                  <Typography variant="title-l">{it.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body">{it.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
export default Dashboard;
