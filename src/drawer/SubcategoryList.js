
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { AppContext } from '../App';
import Typography from '@mui/material/Typography';


export default function MarkaSabcategoryList() {


    return <AppContext.Consumer>


        {({ subcategories, selectSubcategory }) => {


            return subcategories.map((m, i) => {
                const subcategory = m['subcategory']
                const total = m['total']
                const node =m['node']
        
             
                        return <ListItem key={i} component="div" disablePadding>
                            <ListItemButton onClick={() => selectSubcategory({subcategory, totalSubcategory:total,node})}>
                                <ListItemText primary={<div style={{ display: 'flex' }}><Typography variant="overline" style={{ flex: 1 }}>{subcategory.toUpperCase()}</Typography><Typography variant="overline" style={{ color: '#9e9e9e' }}>{total}</Typography></div>} />
                            </ListItemButton>
                        </ListItem>

                    
      
            })
        }}
    </AppContext.Consumer>




}