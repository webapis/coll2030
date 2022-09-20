const keywords=require('./public/keywords.json')

const obj={}
const reduced =keywords.reduce((prev,curr,index)=>{

    obj[curr.keyword]=curr.subcategory


    return {...prev,[curr.keyword]:curr.subcategory

    }

},{})
debugger
