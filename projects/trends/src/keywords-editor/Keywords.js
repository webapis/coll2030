import * as React from 'react';
import { AppContext } from '../App';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeywordsFilter from './KeywordsFilter';
import IconButton from '@mui/material/IconButton';
import { Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Switch from '@mui/material/Switch';
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import AppBarComponent from '../AppBarComponent';

export default function Keywords() {

    const navigate =useNavigate()
    return <div style={{ marginTop: 73 }}>
        <AppBarComponent />
        <AppContext.Consumer>{
            ({ keywords, filterKeyword, editKeyword,toggleKeywordState,showDisabledIsChecked,addKeyword }) => {

                const groupByGroupName = keywords.length > 0 ? groupBy(keywords, 'groupName') : []



                const filteredGroupName = JSON.parse(localStorage.getItem('filteredGroupName'))
                const arrayKeywords = Object.entries(groupByGroupName)
                const filtered = arrayKeywords.filter(f => {
                    const groupName = f[0]

                    return groupName.includes(filteredGroupName.groupName)
                })

                function handleEdit(id,name){
                    editKeyword(id, name)
                    navigate('/keywords/editor')
                }

                return <Container>
                   {filteredGroupName.groupName !==''&& <Button onClick={addKeyword}>Add Keywords</Button>}
                    <KeywordsFilter filterKeyword={filterKeyword} />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell align="right">Keywords</TableCell>
                                    <TableCell align="right">Exclude</TableCell>
                                    <TableCell align="right">groupName</TableCell>
                                    <TableCell align="right">Disable</TableCell>
                                    <TableCell align="right">Edit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filtered.map((row) => {
                                    const name = row[0]

                                    const items = row[1]
                                    const itemsFilter =showDisabledIsChecked? items:items.filter(f=>!f.disabled)
                                    return itemsFilter && itemsFilter.map((r) => (
                                        <TableRow
                                            key={r._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {r.title}
                                            </TableCell>
                                            <TableCell align="right">{r.keywords}</TableCell>
                                            <TableCell align="right">{r.exclude}</TableCell>
                                            <TableCell align="right">{r.groupName}</TableCell>
                                            <TableCell align="right">      <Switch id={r._id} checked={!r.disabled} defaultChecked onChange={toggleKeywordState} />
                                            </TableCell>
                                            <TableCell align="right">    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(r._id, name)}>
                                                <EditIcon />
                                            </IconButton></TableCell>
                                        </TableRow>
                                    ))
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            }


        }</AppContext.Consumer>


    </div>
}

function groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

