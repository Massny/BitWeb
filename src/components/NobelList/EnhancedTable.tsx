import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';

import { Languages, NobelPrizeSubset } from '../Types/NobelTypes';
import { nobelTableFlavour } from '../FlavourTexts/FlavourTexts';

interface Props{
    nobelData: NobelPrizeSubset[],
    language: Languages
}

const { nobelPrizeFlavour } = nobelTableFlavour

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof NobelPrizeSubset;
  label: {
    en: string;
    no: string;
    se: string;
  };
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: {
      en: 'Category',
      no: 'Kategori',
      se: 'Kategori'
    }
  },
  {
    id: 'awardYear',
    numeric: true,
    disablePadding: false,
    label: {
      en: 'Year Awarded',
      no: 'År tildelt',
      se: 'År tilldelad'
    },
  },
  {
    id: 'dateAwarded',
    numeric: true,
    disablePadding: false,
    label: {
      en: 'Date Awarded',
      no: 'Dato tildelt',
      se: 'Datum tilldelad'
    },
  },
  {
    id: 'prizeAmount',
    numeric: true,
    disablePadding: false,
    label: {
      en: 'Prize Sum',
      no: 'Premiesum',
      se: 'Prissumma'
    },
  }
];


interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof NobelPrizeSubset) => void;
  order: Order;
  orderBy: string;
  lang: Languages;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, lang, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof NobelPrizeSubset) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            sx={{fontWeight: 'bold'}}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >

              {headCell.label[lang]}

              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}




function EnhancedTableToolbar({lang} : {lang: Languages}) {

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
        <Typography
          sx={{ flex: '1 1 100%', fontWeight: "500", paddingY: '20px' }}
          variant="h4"
          id="tableTitle"
          component="h2"
        >
          {nobelPrizeFlavour[lang]}
        </Typography>
        {/* <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip> */}
        {/* In case I wished to add filtering */}
    </Toolbar>
  );
}
export default function EnhancedTable( { nobelData, language }: Props) {

  // Selecting the right language
  const rows = useMemo(() => (
    nobelData.map((item) => ({
        ...item, category: item.category[language],
      }))
  ),[language,nobelData])

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof NobelPrizeSubset>('category');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof NobelPrizeSubset,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, language, nobelData],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, border: (theme) => (`solid 0.5px ${theme.palette.grey[800]}`), borderRadius: '10px'}} elevation={3} >
        <EnhancedTableToolbar lang={language} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              lang={language}

            />
            <TableBody>
              {visibleRows.map((row, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={index}>
                    <TableCell
                      component="th"
                      id={`${index}`}
                      scope="row"
                      // padding="none"
                    >
                      {row.category}
                    </TableCell>
                    <TableCell align="right">{row.awardYear}</TableCell>
                    <TableCell align="right">{row.dateAwarded}</TableCell>
                    <TableCell align="right">{row.prizeAmount}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}