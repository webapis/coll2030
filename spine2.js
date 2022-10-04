const data =require('./spine2.json')
const taffdb =require('taffy')

var db = taffdb(data)

console.log('db',db.insert({name:"by"}))


console.log('db',db().get())