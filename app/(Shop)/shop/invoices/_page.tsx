"use client";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { format } from "timeago.js";

const AllInvoices = ({ invoices }: { invoices: any }) => {
  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "amount", headerName: "Amount", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    { field: "updated_at", headerName: "Updated At", flex: 0.5 },
    {
      field: "status",
      headerName: "Withdraw status",
      flex: 0.5,
    },
  ];

  const rows: any = [];

  invoices &&
    invoices.forEach((invoice: any) => {
      rows.push({
        id: invoice?.id,
        amount: "US$" + invoice?.amount,
        created_at: format(invoice?.createdAt),
        updated_at: format(invoice?.updatedAt),
        status: invoice?.status,
      });
    });

  return (
    <>
      <Box m="20px">
        <Box
          m="40px 0 0 0"
          height="90vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              outline: "none",
            },
            "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
              color: "#fff",
            },
            "& .MuiDataGrid-sortIcon": {
              color: "#fff",
            },
            "& .MuiDataGrid-row": {
              color: "#fff",
              borderBottom: "1px solid #ffffff30!important",
            },
            "& .MuiTablePagination-root": {
              color: "#fff",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none!important",
            },
            "& .name-column--cell": {
              color: "#fff",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#3e4396",
              borderBottom: "none",
              color: "#fff",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#1F2A40",
            },
            "& .MuiDataGrid-footerContainer": {
              color: "dark",
              borderTop: "none",
              backgroundColor: "#3e4396",
            },
            "& .MuiCheckbox-root": {
              color: `#b7ebde !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `#fff !important`,
            },
          }}
        >
          <DataGrid checkboxSelection rows={rows} columns={columns} />
        </Box>
      </Box>
    </>
  );
};

export default AllInvoices;
