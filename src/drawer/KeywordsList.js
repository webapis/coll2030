
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/accordionSlice'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';



import NavList from './NavList';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
export default function KeywordsList() {
    const {  navKeywords, selectedNavIndex, selectedKeywords } = useSelector(state => state.accordion)
    const dispatch = useDispatch()
  

    useEffect(() => {


        fetchNavKeywords(`start`)
    }, [])
    useEffect(() => {

        
        if(selectedNavIndex===''){
            fetchNavKeywords(`start`)
        }
        else{
            fetchNavKeywords(selectedNavIndex)
        }

      


        

    }, [selectedNavIndex])
    function handleRemoveIndex({ index, keyword }) {

        dispatch(actions.setSelectedNavIndex({ index, keyword }))
    }
    function fetchNavKeywords(selectedNavKeyword) {
         dispatch(actions.setFetchingKeywords(true))
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

            dispatch(actions.setNavkeywords({ navKeywords, navMatch }))

        })

    }
    return <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
            <ListSubheader component="div" id="nested-list-subheader">
                <Stack direction="row" spacing={1}>
                    {selectedKeywords.map((m, i) => {
                        const {index,keyword}=m
                    return <Chip key={i} label={m.keyword} onDelete={() => handleRemoveIndex({ index, keyword })} />})}
                </Stack>
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




