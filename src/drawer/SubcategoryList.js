

import Grid from '@mui/material/Grid'
import CategoryNav from '../category-nav.json'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../store/accordionSlice'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
const { categories, totalByMarka } = CategoryNav[0]['nav']

export default function MarkaSabcategoryList() {
    const { selectedMarka, subcategories } = useSelector(state => state.accordion)
    const dispatch = useDispatch()


    useEffect(() => {
        const categoriesArray = Object.entries(categories)
        const joincategories = categoriesArray.reduce((prev, curr) => {
            const arr = Object.entries(curr[1]['subcategories']).map((m) => { return { subcategory: m[0], total: m[1]['count'] } })
            return [...prev, ...arr]

        }, [])
        const sortedsubcategories = joincategories.sort(function (a, b) {
            var textA = a['subcategory'].toUpperCase();
            var textB = b['subcategory'].toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })
      
        setTimeout(() => {

            dispatch(actions.setSubcategories(sortedsubcategories))
        }, 500)


    }, [])



    function selectSubcategory(subcategory, totalSubcategory) {

        dispatch(actions.setSubcategory({ subcategory, totalSubcategory }))
    }

    if (subcategories.length === 0) {

        return (

            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }

    return subcategories.map((m, i) => {
            const subcategory = m['subcategory']
            const total = m['total']
            const currentChar = subcategory.charAt(0)

            if (i === 0) {

                return <ListItem key={i} component="div" disablePadding>
                        <ListItemButton onClick={() => selectSubcategory(subcategory, total)}>
                            <ListItemText primary={<div style={{ display: 'flex' }}><Typography variant="overline"  style={{ flex:1}}>{subcategory.toUpperCase()}</Typography><Typography variant="overline"  style={{ color: '#9e9e9e'}}>{total}</Typography></div>} />
                        </ListItemButton>
                    </ListItem>
          
                
            }
            else {
                const prevChar = subcategories[i - 1]['subcategory'].charAt(0)
                if (prevChar === currentChar) {
                    return <ListItem key={i} component="div" disablePadding>
                            <ListItemButton onClick={() => selectSubcategory(subcategory, total)}>
                                <ListItemText primary={<div style={{ display: 'flex' }}><Typography variant="overline" style={{ flex:1 }}>{subcategory.toUpperCase()}</Typography><Typography variant="overline"  style={{ color: '#9e9e9e' }}>{total}</Typography></div>} />
                            </ListItemButton>
                        </ListItem>
                     
                  
                } else {

                    return  <ListItem key={i} component="div" disablePadding>
                            <ListItemButton onClick={() => selectSubcategory(subcategory, total)}>
                                <ListItemText primary={<div style={{ display: 'flex' }}><Typography variant="overline" style={{ flex:1 }}>{subcategory.toUpperCase()}</Typography><Typography variant="overline"  style={{ color: '#9e9e9e'}}>{total}</Typography></div>} />
                            </ListItemButton>
                        </ListItem>
                      
                    
                }
            }
        })
        
 


}