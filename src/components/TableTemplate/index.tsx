import {
  memo,
  MouseEvent,
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
  TableRow,
  TableSortLabel,
  useMediaQuery,
} from '@mui/material';
import * as ReactRouter from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DocumentNode, useQuery } from '@apollo/client';
import { Order, TableColumn } from '../../types/tableTypes.ts';
import { getComparator } from '../../helpers/tableSortHelpers.ts';
import { debounce } from '../../helpers/debounce.ts';
import TableSearchBlock from '../TableSearchBlock';

const { useNavigate, useSearchParams } = ReactRouter;

interface TableTemplateProps {
  columns: TableColumn[];
  query: DocumentNode;
  searchFunction: <T>(data: T, search: string) => T;
  createRows: <T>(data: T) => Partial<T>;
  chooseResponsiveColumns: (isMobile: Boolean, isTablet: Boolean) => string[];
}

function TableTemplate({
  columns,
  query,
  searchFunction,
  createRows,
  getCellContent,
  chooseResponsiveColumns,
}: TableTemplateProps) {
  const { data } = useQuery(query, {});

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

  return (
    <>
      <TableSearchBlock inputValue={search} inputHandler={inputHandler} />
      <Table
        stickyHeader
        sx={{
          '& .MuiTableCell-stickyHeader': {
            top: 128,
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
          {dataToRender?.map((data, index) => (
            <TableRow key={index}>
              {columns.map(({ id }) => {
                return (
                  <TableCell
                    sx={{
                      maxWidth: isTablet ? '130px' : '200px',
                      display: notDisplayedColumns?.includes(id)
                        ? 'none'
                        : 'default',
                    }}
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
    </>
  );
}

export default memo(TableTemplate);
