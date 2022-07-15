


import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/accordionSlice'
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
export default function KeywordsList() {
    const { selectedMarka, selectedSubcategory, keywords } = useSelector(state => state.accordion)
    const dispatch = useDispatch()

    useEffect(() => {

        fetch(`/keywords/marka/${selectedMarka}.json`).then((response) => { return response.json() }).then((data) => {
            const keywords = data[selectedSubcategory]
            dispatch(actions.setKeywords(keywords))
        })

    }, [])

    function selectKeyword({keyword,total}){
   
        dispatch(actions.setSelectedKeyword({keyword,total}))
    }
    return Object.entries(keywords).map((kw,i) => {
        const parentKeywords = kw[0]
        const childKeywords = Object.entries(kw[1]).map(m => {
            return { keyword: m[0], total: m[1] }

        })

        return <TreeView
            key={i}
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ flexGrow: 1 }}
        >
            <TreeItem nodeId="1" label={parentKeywords+" "+ selectedSubcategory}>
                {childKeywords.map((k,d) => {
                    const { keyword,total } = k
                    return <TreeItem key={d} nodeId={d+"ss"} label={keyword} id={keyword}  onClick={()=>selectKeyword({keyword,total})}/>
                })}

            </TreeItem>

        </TreeView>
    })



 



}