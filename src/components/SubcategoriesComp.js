import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';
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
    return  <Card sx={{ minWidth: 200,margin:1 }} variant="outlined">
   
       
       
      
      <CardContent>
      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {scat.charAt(0).toUpperCase()}
          </Avatar>
      {
        subcategories.map((m, i) => {
            const { regex, subCatTotal, subcategory } = m
            let scat =''
            if(subcategory.indexOf('-')!==-1){
                scat =subcategory.substring(subcategory.indexOf('-')+1)
            } else{
                scat =subcategory
            }
            
            return  <Button key={i} sx={{display:'block'}} onClick={() => handleSubCategoryClick(subcategory, subCatTotal, regex)} id={i}>{scat}<Chip sx={{ marginLeft: 1 }} size="small" variant="filled" label={subCatTotal} /></Button>
        })

    }
      </CardContent>
   </Card> 
}