import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import  ListItem  from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
export default function NestedList({ groupName, keywords }) {
debugger
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
                <ListItemText sx={{fontWeigth:800}} primary={groupName.toUpperCase()} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{paddingLeft:5, height:200,overflowY:'scroll'}}>
                    {keywords   && keywords.map((m) => {
                        debugger
                        return renderRow(m)
                    })}
                </List>
            </Collapse>
        </List>
    );
}



function renderRow(props) {
    const { style, keyword, index ,count} = props;
    debugger

    return (
        <ListItem
        key={index}
        secondaryAction={
           <div>{count}</div>
          }
        disablePadding
      >
        <ListItemButton role={undefined} onClick={()=>{}} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={false}
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


