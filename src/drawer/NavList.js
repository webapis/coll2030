import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';


import { Typography } from '@mui/material';

import { AppContext } from '../App';
export default function NestedList({ groupName, keywords }) {




    return (
        <Accordion sx={{ width: '100%', overflow: 'auto' }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="button" sx={{ width: '100%', fontWeight: 700 }}>{groupName}</Typography>

            </AccordionSummary>
            <AccordionDetails>
                <List component="div" disablePadding sx={{ paddingLeft: 0, overflowY: 'auto', maxHeight: 300, overflow: 'auto' }}>
                    {keywords && keywords.map((m, i) => {
                        const { keyword, index, count } = m;
                        return <AppContext.Consumer key={i}>{({ setSelectedNavIndex, selectedNavIndex }) => {

                            return <RenderRow handleClick={setSelectedNavIndex} selectedNavIndex={selectedNavIndex} key={index} keyword={keyword} index={index} count={count} />

                        }}</AppContext.Consumer>
                    })}
                </List>
            </AccordionDetails>
        </Accordion>
    );
}



function RenderRow(props) {
    const { handleClick, selectedNavIndex } = props
    const { keyword, index, count } = props;

    const matchfound = selectedNavIndex.split('-').find(f => f === index.replace('-', '')) ? true : false
    return (
        <ListItem
            key={index}
            secondaryAction={
                <div>{count}</div>
            }
            disablePadding
        >
            <ListItemButton onClick={() => handleClick({ index, keyword })} dense id={index} name={keyword}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={matchfound}
                        tabIndex={-1}

                        inputProps={{ 'aria-labelledby': "" }}
                    />
                </ListItemIcon>
                <ListItemText id="s" primary={keyword==='1500'?'1500 >':keyword} />
            </ListItemButton>
        </ListItem>
    );
}


