import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import { useDispatch,useSelector } from 'react-redux';
import {actions}from '../store/keywordsSlice'
export default function KeywordGroup({ groupName,keywords }) {
    const {keywords:rootKeywords}=useSelector(state=>state.keywords)
    const dispatch=useDispatch()
    function editKeyword(id){
    
        
        const nextState = rootKeywords[groupName].find(f=>f._id===id)
        
        dispatch(actions.editKeyword(nextState))
    }
    return (
        <Paper>
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            subheader={<ListSubheader>{groupName}</ListSubheader>}
        >
            { keywords.map((m,i) => {
                
                return <ListItem key={i} secondaryAction={
                    <IconButton edge="end" aria-label="edit" onClick={()=>editKeyword(m._id)}>
                        <EditIcon />
                    </IconButton>
                }>
                    <ListItemText name={m._id} primary={<div style={{display:'flex', justifyContent:'space-between'}}><span>{m.title}</span><span>{m.index}</span><span>{m.functionName}</span></div> } />

                </ListItem>
            })}


        </List>
        </Paper>
    );
}