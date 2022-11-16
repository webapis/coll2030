

import NavList from './NavList';
import { AppContext } from '../App';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import subcatObj from '../category-nav-counter.json'
const categories = Object.values(subcatObj).flat()
export default function KeywordsList() {
    return <AppContext.Consumer>{
        (({ navKeywords }) => {


            return <div style={{ position: 'relative' }}>

                <div style={{ height: '70vh', position: 'fixed', width: 300, paddingTop: 100, paddingBottom: 20, overflowY: 'scroll' }}>
                    <div>
                        <CategoryNav />
                    </div>
                    <div>
                        {navKeywords && navKeywords.map((m, i) => {

                            const { groupName, keywords } = m
                          

                            return <FormControl key={i + '-'} component="fieldset" variant="standard" >   <FormLabel component="legend">{groupName}</FormLabel> <NavList groupName={groupName} keywords={keywords} /> </FormControl >

                        })


                        }
                    </div>
                </div></div>
        })
    }</AppContext.Consumer>

}








function CategoryNav() {
    return <AppContext.Consumer>{({ groupName, selectSubcategory,selectedNavIndex }) => {
      
        return <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Kategori</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name={groupName}
                sx={{ height: 300 }}
            >
                {
                    categories.filter(f => {
                        return f.groupName === groupName
                    }).map((m,i) => {
                 
                        return <FormControlLabel key={i} value={m.keywords} control={<Radio checked={selectedNavIndex.includes(m.index)} size="small" onChange={()=>selectSubcategory({functionName:m.functionName,index:m.index,groupName:m.groupName,keywordType:m.keywordType})}/>} label={<div style={{textAlign:'justify'}}><span>{m.title}</span><span style={{ color: '#9ea7aa', fontSize: 14 }}> {m.count}</span></div>} />
                    })
                }


            </RadioGroup>
        </FormControl>

    }}</AppContext.Consumer>
}


