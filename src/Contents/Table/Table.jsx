import React, { useState } from 'react';
import { DataGrid, GridRowEditStopReasons } from '@mui/x-data-grid';
import columns from './book-column';

const Table = ({ ref, widthOverFlow, setWidthChange, widthChange, rows, setRows}) => {
    const [rowModesModel, setRowModesModel] = useState({});

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    return (
        <DataGrid
            ref={ref}
            onColumnWidthChange={({width, colDef: {field}}) => setWidthChange((prev) => ({...prev, [field]: width}))}
            showToolbar
            rows={rows}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            columns={columns(setRowModesModel, rowModesModel, rows, setRows, widthChange)} 
            initialState={{ pagination: { paginationModel: { pageSize: 10 } },}}
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            sx={{ alignItems: 'center', ml: widthOverFlow ? 'auto' : 0,  px: 1,}}
        />
    )
}

export default Table;
