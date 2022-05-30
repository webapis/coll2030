

import React from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {useDispatch} from 'react-redux'
import {actions} from '../../store/breadcrumbSlice'
import MarkaNav from './marka-nav.json'
const { tree: mnavs, mtotal } = MarkaNav[0]['nav']
export default function MarkaMenu(props) {
    const dispatch =useDispatch()
    const { handleTabChange } = props
    function handleSubCategoryClick(subcategory,subCatTotal) {
        dispatch(actions.selectSubcategory({subCatTotal,subcategory}))
      handleTabChange({}, 2)
    }
    function handleMarkaClick(marka) {
  
        dispatch(actions.selectMarka(marka))

    }
  
    function handleCategoryClick(category) {
        dispatch(actions.selectCategory(category))

  
    }
    return (<div>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ flexGrow: 1, }}
      >
        {Object.entries(mnavs).map((n, i) => {
          const marka = n[0]
          const totalByMarka = n[1]['total']
          const categories = Object.entries(n[1])
  
          return (
            <TreeItem  onClick={() => handleMarkaClick(marka)} key={i} nodeId={marka + i} label={<div><span style={{ textTransform:'uppercase' }}>{marka}</span><span style={{ color: '#9e9e9e', marginLeft: 2, borderRadius: 25, padding: 2 }}>({totalByMarka})</span></div>}>
              {Object.entries(categories).filter((f, i) => i > 0).map((s, c) => {
  
                const category = s[1][0]
                const categoryTotal = s[1][1]['total']
                const subcategories = s[1][1]['subcategories']
  
                return (<TreeItem  onClick={() => handleCategoryClick(category)} nodeId={`${marka}-${category}-${c}`} key={c} id={category + i} label={<span><span style={{ textTransform: 'uppercase' }}>{category.replace('-', ' ')}</span><span style={{ color: '#9e9e9e', marginLeft: 2, borderRadius: 25, padding: 2 }}>({categoryTotal})</span></span>} >
                  {
                    <div style={{ maxHeight: '80vh', overflowX: 'hidden', overflowY: 'auto' }}>{
                      Object.entries(subcategories).map((s, sk) => {
                        const subcategory = s[0]
                        const subCatTotal = s[1]
                        return <TreeItem sx={{padding:0.1}} key={sk} id={marka + subcategory} onClick={() => handleSubCategoryClick(subcategory,subCatTotal)} nodeId={`${marka}-${subcategory}-${sk}`} label={<span><span style={{ textTransform: 'capitalize' }}>{subcategory.replace('-', ' ')}</span><span style={{ color: '#9e9e9e', marginLeft: 2, borderRadius: 25, padding: 2 }}>({subCatTotal})</span></span>} />
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