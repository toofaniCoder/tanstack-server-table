import { useState, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Stack,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useLoaderData, useSearchParams } from 'react-router-dom';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('name', {
    header: 'Full Name',
  }),
  columnHelper.accessor('email', {
    header: 'E-mail Address',
  }),
  columnHelper.accessor('age', {
    header: 'Age',
  }),
];

const Users = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState({
    pageIndex: 0, // page index matlab = page number
    pageSize: 5, // page size matlab = limit
  });
  const users = useLoaderData();
  // log data: console.log('data from server:', data);

  const table = useReactTable({
    data: users.data,
    columns,
    state: {
      pagination,
    },
    pageCount: users.totalCount / users.count,
    manualPagination: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    setSearchParams({
      page: table.getState().pagination.pageIndex + 1,
      limit: table.getState().pagination.pageSize,
    });
  }, [pagination]);
  console.log(table.getState().pagination);
  return (
    <div>
      <TableContainer component={Paper}>
        <Stack sx={{ p: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              show items per page
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={table.getState().pagination.pageSize}
              label="show items per page"
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {[5, 10, 20, 40, 50, 100, 200, 500].map((el) => (
                <MenuItem key={el} value={el}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Stack direction="row" justifyContent={'space-between'} sx={{ p: 3 }}>
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            color="primary"
            variant="contained"
          >
            previous page
          </Button>
          <Typography>
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </Typography>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            color="primary"
            variant="contained"
          >
            next page
          </Button>
        </Stack>
      </TableContainer>
    </div>
  );
};

export default Users;
