/* eslint-disable jsx-a11y/img-redundant-alt */
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import './datatable.scss';

function DataTable({ data, columns, loading }) {

    return (
        <div className="data_table">
            <DataGrid
                className="data_grid"
                rows={data}
                columns={columns}
                pageSize={50}
                rowsPerPageOptions={[50,100]}
                // checkboxSelection
                loading={loading}
            />
        </div>
    );
}

export default DataTable;
