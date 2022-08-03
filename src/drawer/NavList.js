import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/accordionSlice'
export default function NestedList({ groupName, keywords }) {

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List

            component="nav"
            aria-labelledby="nested-list-subheader"

        >

            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText sx={{ fontWeigth: 800 }} primary={groupName.toUpperCase()} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ paddingLeft: 0, maxHeight: 200, overflowY: 'auto' }}>
                    {keywords && keywords.map((m, i) => {
                        const { keyword, index, count } = m;
                        return <RenderRow key={i} keyword={keyword} index={index} count={count} />
                    })}
                </List>
            </Collapse>
        </List>
    );
}



function RenderRow(props) {
    const dispatch = useDispatch()
    const { selectedNavIndex } = useSelector(state => state.accordion)
    const { keyword, index, count } = props;
    const matchfound = selectedNavIndex.split('-').find(f => f === index.replace('-', '')) ? true : false
    if (matchfound) {

    }
    function handleClick({ index, keyword }) {

        dispatch(actions.setSelectedNavIndex({ index, keyword }))
    }
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
                        disableRipple
                        inputProps={{ 'aria-labelledby': "" }}
                    />
                </ListItemIcon>
                <ListItemText id="s" primary={keyword} />
            </ListItemButton>
        </ListItem>
    );
}


