const keywords=require('./public/keywords.json')

const obj={}
debugger
const reduced =keywords.reduce((prev,curr,index)=>{

    obj[curr.keyword]=curr.subcategory
debugger

    return {...prev,[curr.keyword]:curr.subcategory

    }

},{})
debugger
