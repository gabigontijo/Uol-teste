import PropTypes from "prop-types";
import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
// import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
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
    const count = useMemo(() => {
        const remainder = totalClients.length % itemPerPage
        const division = Math.trunc(totalClients.length / itemPerPage)
        if (remainder > 0){
            return division + 1
        }
        return division
    }, [totalClients, itemPerPage])

    const handleChange = (event, value) => {
        const pageClients = list(totalClients, value, itemPerPage)
        setClientList(pageClients)
        setPage(value);
    };

    return (
        <Stack spacing={10} display="flex" direction={{xs:'column', md: 'row'}} alignItems='center'>
            <Box width={150}>
                <FormControl fullWidth>
                    <Stack spacing={2} display="flex" direction='row' alignItems='center'>
                    <Typography sx={{color: 'text.common'}}>Exibindo</Typography>
                    <Select
                        sx={{padding: '0px', color: 'text.common'}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={itemPerPage}
                        label="Item per Page"
                        onChange={(event) => setItemPerPage(event.target.value)}
                    >
                        <MenuItem sx={{color: 'text.common'}} value={5}>5</MenuItem>
                        <MenuItem sx={{color: 'text.common'}} value={10}>10</MenuItem>
                        <MenuItem sx={{color: 'text.common'}} value={15}>15</MenuItem>
                    </Select>
                    <Typography sx={{color: 'text.common'}}>clientes</Typography>
                    </Stack>
                </FormControl>
            </Box>
            <Box>
                <Pagination count={count === 0 ? 1 : count} page={page} onChange={handleChange} color="primary"/>
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