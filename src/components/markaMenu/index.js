

import React from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {useDispatch,useSelector} from 'react-redux'
import {actions} from '../../store/breadcrumbSlice'
import MarkaNav from './marka-nav.json'
const { tree: mnavs, mtotal } = MarkaNav[0]['nav']

export default function MarkaMenu() {
    const dispatch =useDispatch()
    const currentexpanded = useSelector(state => state.breadcrumb.expanded)
    const selectedSubcategory = useSelector(state => state.breadcrumb.selectedSubcategory)
    function handleSubCategoryClick(subcategory, subCatTotal,selectedSubcategory) {
      dispatch(actions.selectSubcategory({ subcategory, subCatTotal,selectedSubcategory }))
  
    }
 
    function handleMarkaClick(marka,expanded) {
      debugger;
   
        dispatch(actions.selectMarka({ marka, expanded }))
      
    }
  
    function handleCategoryClick(category, expanded) {
      dispatch(actions.selectCategory({ category, expanded }))
      // if(expanded===currentexpanded){

      //   dispatch(actions.selectCategory({ category, expanded:null }))
      // } else{
      
      // }
    }
    return (<div>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ flexGrow: 1, }}
        expanded={currentexpanded}
        selected={[selectedSubcategory]}
      >
        {Object.entries(mnavs).map((n, i) => {
          const marka = n[0]
          const totalByMarka = n[1]['total']
          const categories = Object.entries(n[1])
          const selectedNodeId='top-'+marka + i
          return (
            <TreeItem  onClick={() => handleMarkaClick(marka,selectedNodeId)} key={i} nodeId={selectedNodeId} label={<div><span style={{ textTransform:'uppercase' }}>{marka}</span><span style={{ color: '#9e9e9e', marginLeft: 2, borderRadius: 25, padding: 2 }}>({totalByMarka})</span></div>}>
              {Object.entries(categories).filter((f, i) => i > 0).map((s, c) => {
  
                const category = s[1][0]
                const categoryTotal = s[1][1]['total']
                const subcategories = s[1][1]['subcategories']
                const catNodeId=`${marka}-${category}-${c}`
                return (<TreeItem  onClick={() => handleCategoryClick(category,catNodeId)} nodeId={catNodeId} key={c} id={category + i} label={<span><span style={{ textTransform: 'uppercase' }}>{category.replace('-', ' ')}</span><span style={{ color: '#9e9e9e', marginLeft: 2, borderRadius: 25, padding: 2 }}>({categoryTotal})</span></span>} >
                  {
                    <div style={{ maxHeight: '80vh', overflowX: 'hidden', overflowY: 'auto' }}>{
                      Object.entries(subcategories).map((s, sk) => {
                        const subcategory = s[0]
                        const subCatTotal = s[1]
                        const selectedSubcategory =`${marka}-${subcategory}-${sk}`
                        return <TreeItem sx={{padding:0.1}} key={sk} id={marka + subcategory} onClick={() => handleSubCategoryClick(subcategory,subCatTotal,selectedSubcategory)} nodeId={selectedSubcategory} label={<span><span style={{ textTransform: 'capitalize' }}>{subcategory.replace('-', ' ')}</span><span style={{ color: '#9e9e9e', marginLeft: 2, borderRadius: 25, padding: 2 }}>({subCatTotal})</span></span>} />
                      })
  
                    }</div>}
  
                </TreeItem>)
  
              })}
  
            </TreeItem>
          )
        })}
      </TreeView>
  
  
    </div>)
  }