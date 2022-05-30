

import React from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../store/breadcrumbSlice'
import catNav from './category-nav.json'
const { tree: navs, total } = catNav[0]['nav']
export default function ProductMenu(props) {


  const dispatch = useDispatch()
  const currentexpanded = useSelector(state => state.breadcrumb.expanded)
  const selectedSubcategory = useSelector(state => state.breadcrumb.selectedSubcategory)
  function handleSubCategoryClick(subcategory, subCatTotal,selectedSubcategory) {
    dispatch(actions.selectSubcategory({ subcategory, subCatTotal,selectedSubcategory }))

  }

  function handleCategoryClick(category, expanded) {
   
      dispatch(actions.selectCategory({ category, expanded }))
    
    debugger;
    
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
      {Object.entries(navs).map((n, i) => {
        const category = n[0]
        const categoryTotal = n[1]['total']
        const { subcategories } = n[1]
        const nodeId ='top-'+ category + i
        return (
          <TreeItem onClick={() => handleCategoryClick(category, nodeId)} key={i} nodeId={nodeId} label={<div><span style={{ textTransform: 'uppercase' }}>{category.replace('-', ' ')}</span><span style={{ color: '#9e9e9e', marginLeft: 2, borderRadius: 25, padding: 2 }}>({categoryTotal})</span></div>}>
        
              {Object.entries(subcategories).map((s, c) => {
                const subcategory = s[0]
                const subCatTotal = s[1]
                const selectedSubcategory =`${subcategory.replace('-', ' ')}-${c}`
                return <TreeItem sx={{ padding: 0.1 }} key={c} id={subcategory} onClick={() => handleSubCategoryClick(subcategory, subCatTotal,selectedSubcategory)} nodeId={selectedSubcategory} label={<span><span style={{ textTransform: 'capitalize' }}>{subcategory}</span><span style={{ color: '#9e9e9e', marginLeft: 2, borderRadius: 25, padding: 2 }}>({subCatTotal})</span></span>} />
              })}
          
          </TreeItem>
        )
      })}
    </TreeView>
  </div>)
}