
// require('colors');
// const Diff = require('diff');

// const obj1 ={name:'sero'}
// const obj2 ={name:'sero2'}
// const rr= Diff.diffJson (obj1,obj2)
// debugger
// // const one = 'beep boop';
// // const other = 'beep boob blah';

// // const diff = Diff.diffChars(one, other);

// // diff.forEach((part) => {
// //   // green for additions, red for deletions
// //   // grey for common parts
// //   debugger
// //   const color = part.added ? 'green' :
// //     part.removed ? 'red' : 'grey';
// //   process.stderr.write(part.value[color]);
// //});

// console.log();

const { fontWeight } = require('@mui/system')
const fs = require('fs')
const objOld = fs.readFileSync('./projects/dream/data/defacto/pantolon/defacto/768-I3709AZ_22SM_BG106_01_01.json', { encoding: 'utf-8' })



const objNew = {
    title: "defacto Traditional Harem Yüksek Bel Cepli Viskon Pantolon",
    priceNew: "169,00",
    imageUrl: "768/I3709AZ_22SM_BG106_01_01.jpg",
    link: "traditional-harem-yuksek-bel-cepli-viskon-pantolon-2396086",
    timestamp: 1661841277680,
    marka: "defacto",
    subcategory: "pantolon",
    category: "alt-giyim",
    node: "dream",
}


const updatedString =objOld.replace(/"timestamp":.*?,/m,objNew.timestamp+",")

  fs.writeFileSync('./projects/dream/data/defacto/pantolon/defacto/768-I3709AZ_22SM_BG106_01_01.json',updatedString)
debugger
debugger