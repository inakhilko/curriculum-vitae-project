import {
  memo,
  MouseEvent,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableProps,
  TableRow,
  TableSortLabel,
  useMediaQuery,
} from '@mui/material';
import * as ReactRouter from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DocumentNode, useQuery, useSuspenseQuery } from '@apollo/client';
import { Order, TableColumn } from '../../types/tableTypes.ts';
import { getComparator } from '../../helpers/tableSortHelpers.ts';
import { debounce } from '../../helpers/debounce.ts';
import TableSearchBlock from '../TableSearchBlock';
import NoDataBlock from '../NoDataBlock';
import Loader from '../../UI/Loader';

const { useNavigate, useSearchParams } = ReactRouter;

interface TableTemplateProps {
  columns: TableColumn[];
  query: DocumentNode;
  searchFunction: <T>(data: T, search: string) => T;
  createRows: <T>(data: T) => Partial<T>;
  chooseResponsiveColumns: (isMobile: Boolean, isTablet: Boolean) => string[];
  searchBlockTop?: string;
  tableTop?: string;
}

function TableTemplate({
  columns,
  query,
  queryOptions,
  searchFunction,
  createRows,
  getCellContent,
  chooseResponsiveColumns,
  addButton,
  searchBlockTop,
  tableTop,
}: TableTemplateProps) {
  const { data, loading } = useQuery(query, queryOptions);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 670px)');

  const notDisplayedColumns =
    chooseResponsiveColumns?.(isMobile, isTablet) || [];

  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState<string>(
    searchParams.get('search') || ''
  );
  const [order, setOrder] = useState<Order>(searchParams.get('order') || 'asc');
  const [orderBy, setOrderBy] = useState<string>(
    searchParams.get('orderBy') || ''
  );

  const debouncedSetSearchParams = useCallback(debounce(setSearchParams, 0), [
    debounce,
    setSearchParams,
  ]);

  const inputHandler = useCallback(
    (event) => {
      setSearch(event.target.value);
      debouncedSetSearchParams({ order, orderBy, search: event.target.value });
    },
    [order, orderBy, setSearch, debouncedSetSearchParams]
  );

  const dataToRender = useMemo(() => {
    const searchedData = createRows(searchFunction(data, search));
    return searchedData?.sort(getComparator(order, orderBy));
  }, [data, search, createRows, searchFunction, order, orderBy]);

  const handleRequestSort = (event: MouseEvent<unknown>, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setSearchParams({
      search,
      order: isAsc ? 'desc' : 'asc',
      orderBy: property,
    });
  };

  const createSortHandler = (property) => (event: MouseEvent<unknown>) => {
    handleRequestSort(event, property);
  };

  const onMoreButtonClick = (id) => navigate(id);

  useEffect(() => {
    if (!columns.find(({ id }) => id === orderBy)) {
      setOrderBy('');
    }
    setSearchParams({ search, order, orderBy });
  }, [setSearchParams, setOrderBy]);

  if (loading) return <Loader />;

  return (
    <>
      <TableSearchBlock
        inputValue={search}
        inputHandler={inputHandler}
        addButton={addButton}
        blockTop={searchBlockTop}
      />
      <Suspense fallback={<Loader />}>
        <Table
          stickyHeader
          sx={{
            '& .MuiTableCell-stickyHeader': {
              top: tableTop ? tableTop : 136,
            },
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map(({ id, label, sortable }) => (
                <TableCell
                  key={id}
                  sx={{
                    fontWeight: 600,
                    maxWidth: isTablet ? '130px' : '200px',
                    width: id === 'more' ? '52px' : 'fit-content',
                    display: notDisplayedColumns.includes(id)
                      ? 'none'
                      : 'default',
                  }}
                  sortDirection={orderBy === id ? order : false}
                >
                  {sortable ? (
                    <TableSortLabel
                      active={orderBy === id}
                      direction={orderBy === id ? order : 'asc'}
                      onClick={createSortHandler(id)}
                    >
                      {t(label, { count: 1 })}
                    </TableSortLabel>
                  ) : (
                    t(label, { count: 1 })
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataToRender?.map((data) => (
              <TableRow key={data.id}>
                {columns.map(({ id }) => {
                  return (
                    <TableCell
                      sx={{
                        maxWidth: isTablet ? '130px' : '200px',
                        width: id === 'more' ? '52px' : 'fit-content',
                        display: notDisplayedColumns?.includes(id)
                          ? 'none'
                          : 'default',
                      }}
                      key={id}
                    >
                      {getCellContent
                        ? getCellContent(data, id, onMoreButtonClick, t)
                        : data[id]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {dataToRender?.length === 0 && <NoDataBlock />}
      </Suspense>
    </>
  );
}

export default memo(TableTemplate);
