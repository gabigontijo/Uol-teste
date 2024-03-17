import { useState } from 'react';
import PropTypes from "prop-types";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { list } from '../common/pagination'

export default function PaginationComponent({
    setClientList,
    totalClients,
    currentPage,
    itemPerPage,
    setItemPerPage,
}) {
    const [page, setPage] = useState(currentPage);
    const [count] = useState(Math.round(totalClients.length / itemPerPage));

    const handleChange = (event, value) => {
        const pageClients = list(totalClients, value, itemPerPage)
        setClientList(pageClients)
        setPage(value);
    };

    return (
        <Stack spacing={2} display="flex" direction='row' alignItems='center'>
            <Box width={150}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Item per Page</InputLabel>
                    <Select
                        sx={{padding: '0px'}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={itemPerPage}
                        label="Item per Page"
                        onChange={(event) => setItemPerPage(event.target.value)}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box>
                <Pagination count={count} page={page} onChange={handleChange} color="primary" />
            </Box>
        </Stack>
    )
}

PaginationComponent.propTypes = {
    setClientList: PropTypes.func,
    totalClients: PropTypes.any,
    currentPage: PropTypes.number,
    setItemPerPage: PropTypes.func,
    itemPerPage: PropTypes.number,
};