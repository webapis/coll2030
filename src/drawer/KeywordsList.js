
import { AppContext } from '../App';
import FormControl from '@mui/material/FormControl';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Box } from '@mui/material';


import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import subcatObj from '../category-nav-counter.json'
const categories = Object.values(subcatObj).flat()
export default function KeywordsList() {
    return <AppContext.Consumer>{
        (() => {


            return <div style={{ position: 'relative' }}>

                <Box sx={{ marginTop:{xs:0,md:10}, position:{xs:'static',md:'fixed'},zIndex:1000000 }}>
                 
                        <CategoryNav />
                   

                </Box></div>
        })
    }</AppContext.Consumer>

}








function CategoryNav() {
    return <AppContext.Consumer>{({ groupName, selectSubcategory, selectedNavIndex,clearSubcategory }) => {

        return <FormControl>
               <Breadcrumbs separator="›" aria-label="breadcrumb">
               <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                    aria-label="menu"

                    onClick={clearSubcategory}
                  >
                    <HomeIcon />
                  </IconButton>
               <span  >
               {groupName}
    </span>
 
      </Breadcrumbs>
        
            <div style={{ maxHeight: '85vh', overflow: 'auto' }}>
                <RadioGroup

                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name={groupName}

                >
                    {
                        categories.filter(f => {
                            return f.groupName === groupName
                        }).sort((a,b)=>b.count-a.count).map((m, i) => {
                         if(selectedNavIndex.includes(m.index)){
                            window.selectedCategory=m.title
                         }
                            return <FormControlLabel key={i} value={m.keywords} control={<Radio checked={selectedNavIndex.includes(m.index)} size="small" onChange={() => selectSubcategory({ functionName: m.functionName, index: m.index, groupName: m.groupName, keywordType: m.keywordType })} />} label={<div ><span>{m.title}</span><span style={{ color: '#9ea7aa', fontSize: 14 }}> {m.count}</span></div>} />
                        })
                    }


                </RadioGroup>
            </div>
        </FormControl>

    }}</AppContext.Consumer>
}


