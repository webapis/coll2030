
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/accordionSlice'

import { useState } from 'react';

import NavList from './NavList';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
export default function KeywordsList() {
    const { selectedMarka, selectedSubcategory, keywords, fetchingKeywords, accordionOneValue, navKeywords,selectedNavIndex } = useSelector(state => state.accordion)
    const dispatch = useDispatch()
    const [contentHeight, setContentHeight] = useState(80)

    useEffect(() => {
      fetchNavKeywords(`start`)
    }, [])
useEffect(()=>{
if(selectedNavIndex.length>0){

        fetchNavKeywords(selectedNavIndex)
    
   
}

},[selectedNavIndex])

function fetchNavKeywords(selectedNavKeyword){
  
    fetch(`./nav-keywords/${selectedNavKeyword}.json`).then((response) => response.json()).then(data => {
        const { keywords, navMatch } = data
    
        const map = Object.entries(keywords).map((m) => { return { ...m[1], keyword: m[0] } })

        const navKeywords = map.reduce((prev, curr) => {

            if (prev[curr.group] === undefined) {
                return { ...prev, [curr.group]: { keywords: [{ keyword: curr.keyword, index: curr.index, count: curr.count }] } }
            } else {


                return {
                    ...prev, [curr.group]: { keywords: [...prev[curr.group].keywords, { keyword: curr.keyword, index: curr.index, count: curr.count }] }
                }
            }

        }, {})

        dispatch(actions.setNavkeywords({navKeywords,navMatch}))

    })

}
    return <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
            <ListSubheader component="div" id="nested-list-subheader">
                Nested List Items
            </ListSubheader>
        }
    >{
            navKeywords && Object.entries(navKeywords).map((m, i) => {
                const groupName = m[0]
                const keywords = m[1]['keywords']
                return <NavList key={i} groupName={groupName} keywords={keywords} />



            })

        }</List>


}




