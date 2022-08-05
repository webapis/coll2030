
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
                const currentChar = subcategory.charAt(0)

                if (i === 0) {

                    return <ListItem key={i} component="div" disablePadding>
                        <ListItemButton onClick={() => selectSubcategory({subcategory, total})}>
                            <ListItemText primary={<div style={{ display: 'flex' }}><Typography variant="overline" style={{ flex: 1 }}>{subcategory.toUpperCase()}</Typography><Typography variant="overline" style={{ color: '#9e9e9e' }}>{total}</Typography></div>} />
                        </ListItemButton>
                    </ListItem>


                }
                else {
                    const prevChar = subcategories[i - 1]['subcategory'].charAt(0)
                    if (prevChar === currentChar) {
                        return <ListItem key={i} component="div" disablePadding>
                            <ListItemButton onClick={() => selectSubcategory(subcategory, total)}>
                                <ListItemText primary={<div style={{ display: 'flex' }}><Typography variant="overline" style={{ flex: 1 }}>{subcategory.toUpperCase()}</Typography><Typography variant="overline" style={{ color: '#9e9e9e' }}>{total}</Typography></div>} />
                            </ListItemButton>
                        </ListItem>


                    } else {

                        return <ListItem key={i} component="div" disablePadding>
                            <ListItemButton onClick={() => selectSubcategory(subcategory, total)}>
                                <ListItemText primary={<div style={{ display: 'flex' }}><Typography variant="overline" style={{ flex: 1 }}>{subcategory.toUpperCase()}</Typography><Typography variant="overline" style={{ color: '#9e9e9e' }}>{total}</Typography></div>} />
                            </ListItemButton>
                        </ListItem>


                    }
                }
            })
        }}
    </AppContext.Consumer>




}