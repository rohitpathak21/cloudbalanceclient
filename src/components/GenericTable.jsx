// components/GenericTable.jsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
} from '@mui/material';

const GenericTable = ({
  columns = [],
  data = [],
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  renderActions,
}) => {
  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
              {columns.map((col) => (
                <TableCell key={col.key} sx={col.sx || {}}>
                  <strong>{col.label}</strong>
                </TableCell>
              ))}
              {renderActions && (
                <TableCell align="center">
                  <strong>Action</strong>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow
                key={row.id || index}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e0e0e0',
                  '& td': { py: 1.5 },
                }}
              >
                {columns.map((col) => (
                  <TableCell key={col.key}>{col.render ? col.render(row) : row[col.key]}</TableCell>
                ))}
                {renderActions && (
                  <TableCell align="center">
                    {renderActions(row)}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        sx={{ mt: 1 }}
      />
    </>
  );
};

export default GenericTable;
