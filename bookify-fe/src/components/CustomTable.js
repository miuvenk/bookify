import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const CustomTable = ({ columns, rows, loading, setSelection, selection, checkboxSelection}) => {

    return (
        <Box sx={{ height: 400, width: '100%' }} className="font-mono">
            <DataGrid
                getRowId={(row) => row._id}
                sx={{
                    '& .MuiCheckbox-root svg': {
                        width: 16,
                        height: 16,
                        backgroundColor: 'transparent',
                        //border: '1px solid #500724',
                        // borderRadius: 2,
                    },
                    '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
                        backgroundColor: '#f9a8d4',
                        borderColor: '#500724',
                        color:'#500724'
                    },
                    '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
                        position: 'absolute',
                        display: 'table',
                        border: '2px solid #fff',
                        backgroundColor: '#500724',
                        borderTop: 0,
                        borderLeft: 0,
                        transform: 'rotate(45deg) translate(-50%,-50%)',
                        opacity: 1,
                        transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
                        content: '""',
                        top: '50%',
                        left: '39%',
                        width: 5.71428571,
                        height: 9.14285714,
                    },
                    '& .MuiButtonBase-root-MuiCheckbox-root.Mui-checked': {
                        color:'#500724',
                    },
                    '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
                        width: 8,
                        height: 8,
                        backgroundColor: '#1890ff',
                        transform: 'none',
                        top: '39%',
                        border: 0,
                    },
                    '& .MuiDataGrid-row.Mui-selected':{
                        backgroundColor:'#cb266826'
                    },
                    '& .MuiDataGrid-row.Mui-selected:hover':{
                        backgroundColor:'#cb266826'
                    }
                }}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection = {checkboxSelection}
                disableRowSelectionOnClick
                disableMultipleRowSelection
                onRowSelectionModelChange={(newRowSelection) => {
                    setSelection(newRowSelection);
                }}
                rowSelectionModel={selection}
            />
        </Box>
    )
}

export default CustomTable