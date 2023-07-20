import { Pagination } from "@mui/material";
import {
  useGridApiContext,
  useGridSelector,
  useGridRootProps,
  gridPageSizeSelector,
  gridFilteredTopLevelRowCountSelector,
  GridPagination,
} from "@mui/x-data-grid";

const getPageCount = (rowCount, pageSize) => {
  if (pageSize > 0 && rowCount > 0) {
    return Math.ceil(rowCount / pageSize);
  }
  return 0;
};

function MyPagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();

  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const visibleTopLevelRowCount = useGridSelector(
    apiRef,
    gridFilteredTopLevelRowCountSelector
  );
  const pageCount = getPageCount(
    rootProps.rowCount ?? visibleTopLevelRowCount,
    pageSize
  );

  return (
    <Pagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props) {
  return (
    <GridPagination
      ActionsComponent={MyPagination}
      labelDisplayedRows={() => {}}
      className="absolute bottom-0 right-0"
    />
  );
}

export default CustomPagination;
