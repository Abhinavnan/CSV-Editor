import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Typography, Box, Button  } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useWindowWidth } from '@react-hook/window-size';
import Papa from 'papaparse';
import Table from './Table/Table';

const Home = () => {
    const [file, setFile] = useState();
    const [array, setArray] = useState(JSON?.parse(localStorage?.getItem('array')) || []);
    const [widthChange, setWidthChange] = useState({});
    const ref = useRef();
    const windowWidth = useWindowWidth();
    const currentWidth = ref.current?.getBoundingClientRect().width;
    const widthOverFlow = useMemo(() => windowWidth < currentWidth, [windowWidth, widthChange, currentWidth]);
    const updatedRows = array.map((item, index) => ({ id: index, ...item }));
    const [rows, setRows] = useState(updatedRows);

    const handleFile = async (file) => {
        Papa.parse(file, {
                    header: true,
                    complete: function(results) {
                        const array = results.data;
                        const normalisedArray = array.slice(0, array.length - 1); //remove last empty row
                        setArray(normalisedArray);
                        localStorage.setItem('array', JSON.stringify(normalisedArray));
                    }
                });
    }
    useEffect(() => {
        file && handleFile(file);
        file && localStorage.setItem('file', file)
    }, [file])

    const clearData = () => {
        localStorage.clear();
        setArray([]);
        setFile();
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',flexGrow: 1, width: '100%',
                justifyContent: 'center', }}>
            {array.length > 0 ?(
                <>  
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, 
                        width: widthOverFlow ? '93%' : currentWidth }}>
                        <Button variant="contained" onClick={clearData}>Edit new Table</Button>
                        <Button variant="contained" onClick={() => setRows(updatedRows)}>Reset Table</Button>
                    </Box>
                    <Box sx={{ overflowX: 'auto', width: '93%', p: '1rem', pt: 1, alignItems: 'center', display: 'flex', 
                        justifyContent: 'center', flexDirection: 'column',}}>
                        <Table widthOverFlow={widthOverFlow} ref={ref} setWidthChange={setWidthChange} 
                            widthChange={widthChange} setRows={setRows} rows={rows}/>
                    </Box>
                </>
            ):(
            <Button variant="contained" component="label" startIcon={<CloudUploadIcon />} >
                <input type="file" accept='text/csv'  hidden onChange={(e) => {setFile(e.target.files[0])}} />
                Upload File
            </Button>)}
        </Box>
    )
}

export default Home;
