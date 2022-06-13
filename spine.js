require('dotenv').config()
var TAFFY = require('taffy');


// Create a new database a single object (first record)
const data = require('./api/_files/kadin/data.json')
debugger;
var products = TAFFY(data);

const text = 'Çiçek'
debugger;
var d = products([{ title: { regex: /elbise/i } }]).get();
const splittedByMarkaObj = {}
d.forEach(element => {
    const isArray = Object.prototype.toString.call(splittedByMarkaObj[element.marka]) === '[object Array]';
    const marka = element.title.substring(0,element.title.indexOf(" "))
    if (!isArray) {

        splittedByMarkaObj[marka] = []

        splittedByMarkaObj[marka].push(element)

    } else {

        splittedByMarkaObj[marka].push(element)

    }

});

const convertToArray = Object.values(splittedByMarkaObj)
const sortByLongest = convertToArray.sort(function (a, b) {
    return b.length - a.length;
});

const keys = Object.keys (sortByLongest)
const longestarr = sortByLongest[0]
const orderedArray = []
longestarr.forEach((f,n) => {
    orderedArray.push(...keys.map((k,i)=>{
        return sortByLongest[i][n]
   
    }))
})

const removeUndefined= orderedArray.filter(f=>f !==undefined)

debugger;