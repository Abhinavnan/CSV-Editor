import React from 'react';
import { GridActionsCellItem, GridRowModes  } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

const editRow = (params) => {
  const { id, setRowModesModel, rowModesModel, rows, setRows } = params;
  const isInEditMode = rowModesModel?.[id]?.mode === GridRowModes.Edit;

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };  

  const handleCancelClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View, ignoreModifications: true }, });
      const editedRow = rows.find((row) => row.id === id);
      if (editedRow?.isNew) {
          setRows(rows.filter((row) => row.id !== id));
      }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };
  
  if (isInEditMode) {
    return [
      <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveClick(id)} 
        material={{ sx: { color: 'primary.main', }, }} />,
      <GridActionsCellItem icon={<CancelIcon />} label="Cancel" className="textPrimary" onClick={handleCancelClick(id)}
        color="inherit" />, ];
  }
  return [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        className="textPrimary"
        onClick={handleEditClick(id)}
        color="inherit"
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={handleDeleteClick(id)}
        color="inherit"
      />,
  ];
}

const columns = (setRowModesModel, rowModesModel, rows, setRows, widthChange) => [
  { field: 'ID', headerName: 'ID', width: widthChange?.['ID'] || 50, editable: false},
  { field: 'Title', headerName: 'Title', width: widthChange?.['Title'] || 120, editable: true },
  { field: 'Author', headerName: 'Author', width: widthChange?.['Author'] || 120, editable: true },
  { field: 'Genre', headerName: 'Genre', width: widthChange?.['Genre'] || 120, editable: true },
  { field: 'PublishedYear', headerName: 'Published Year', width: widthChange?.['PublishedYear'] || 120, editable: true },
  { field: 'ISBN', headerName: 'ISBN', width: widthChange?.['ISBN'] || 120, editable: true },
  { field: 'actions', headerName: 'Actions', width: widthChange?.['actions'] || 120, type: 'actions', 
    getActions: (params) => editRow({ id: params.id, setRowModesModel, rowModesModel, rows, setRows }) },
];

export default columns;
