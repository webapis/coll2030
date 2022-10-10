import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
export default function KeywordGroup({ groupName, keywords }) {

    return (
        <Paper>
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            subheader={<ListSubheader>{groupName}</ListSubheader>}
        >
            {keywords.map(m => {
                return <ListItem secondaryAction={
                    <IconButton edge="end" aria-label="edit">
                        <EditIcon />
                    </IconButton>
                }>
                    <ListItemText id="switch-list-label-wifi" primary={m.keywords} />

                </ListItem>
            })}


        </List>
        </Paper>
    );
}