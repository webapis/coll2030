import * as React from 'react';

import TreeItem from '@mui/lab/TreeItem';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import ClearIcon from '@mui/icons-material/Clear';
import { AppContext } from '../App';
export default function NestedList({ groupName, keywords }) {


    debugger
    return (
        <TreeItem nodeId={groupName} label={<span style={{  textTransform: 'capitalize'}}>{groupName.toLowerCase()}</span>}
        >
             <div    style={{padding:10 }}>
            {keywords && keywords.map((m, i) => {
                const { keyword, index, count } = m;
                return <AppContext.Consumer key={i}>{({ setSelectedNavIndex, selectedNavIndex }) => {
                    return <RenderRow handleClick={setSelectedNavIndex} selectedNavIndex={selectedNavIndex} key={index} keyword={keyword} index={index} count={count} />
                }}</AppContext.Consumer>
            })}
            </div>
        </TreeItem>
    );
}



function RenderRow(props) {
    const { handleClick, selectedNavIndex } = props
    const { keyword, index, count } = props;

    const matchfound = selectedNavIndex.split('-').find(f => f === index.replace('-', '')) ? true : false
    return (
        <Chip  style={{margin:1}} color={matchfound ? 'success':'default'}   label={<div><span>{keyword}</span></div>} onDelete={matchfound ?() => (handleClick({ index, keyword })):null } onClick={() => handleClick({ index, keyword }) }
        />
        
    );
}


//        <Chip size="small" style={{margin:1}} color={matchfound ? 'success':'default'}   label={<div><span>{keyword}</span><span style={{backgroundColor:'#bdbdbd',padding:2,fontSize:10, borderRadius:20, marginLeft:10,color:'#fafafa'}}>{count}</span></div>} onDelete={matchfound ?() => (handleClick({ index, keyword })):null } onClick={() => handleClick({ index, keyword }) }/>


/*
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

import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
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



*/