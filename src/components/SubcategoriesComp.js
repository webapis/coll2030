import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

import  ListItem  from '@mui/material/ListItem';

import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import Chip from '@mui/material/Chip';
import { actions } from '../store/breadcrumbSlice'
import { useDispatch } from 'react-redux';

export default function SubcategoriesComp({ subcategories }) {

    const dispatch =useDispatch()
    let scat =''
    if(subcategories[0].subcategory.indexOf('-')!==-1){
        scat =subcategories[0].subcategory.substring(0,subcategories[0].subcategory.indexOf('-'))
    } else{
        scat =subcategories[0].subcategory
    }
    function handleSubCategoryClick(selectedSubcategory, subCatTotal, regex) {
    
        dispatch(actions.selectSubcategory({ selectedSubcategory, subCatTotal, regex }))
    
      }
    return  <Card sx={{ minWidth: 250,margin:1 }} variant="outlined">
   
       
       
      
      <CardContent>
      <Avatar  aria-label="recipe">
            {scat.charAt(0).toUpperCase()}
          </Avatar>
          <List>

        
      {
        subcategories.map((m, i) => {
            const { regex, subCatTotal, subcategory } = m
            let scat =''
            if(subcategory.indexOf('-')!==-1){
                scat =subcategory.substring(subcategory.indexOf('-')+1)
            } else{
                scat =subcategory
            }
            debugger;
            return <ListItem   disableGutters disablePadding   secondaryAction={
                    <Chip label={subCatTotal}/>
              }>


          <ListItemButton    href='#' underline="none" key={i} sx={{display:'block'}} onClick={() => handleSubCategoryClick(scat, subCatTotal, regex)} id={i}>
       

                <ListItemText  sx={{maxWidth:150}}>
                    {scat}
                </ListItemText>
    
            </ListItemButton> 
            
             </ListItem> 
        })

    }
      </List>
      </CardContent>
   </Card> 
}