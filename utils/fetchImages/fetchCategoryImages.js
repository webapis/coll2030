const { fetchImages } = require('./fetchImages')
const makeDir =require('make-dir')
const fetch = require('node-fetch')
const plimit = require('p-limit')
const limit = plimit(5);
const categoryNavigation =require('../../src/category-nav-counter.json')
const imagePrefixCloudinary = 'https://res.cloudinary.com/codergihub/image/fetch/h_200/'
const placeholders = require('../../src/drawer/imageComponent/placeholders.json')
const path =require('path')
var promiseRetry = require('promise-retry');
debugger

async function fetchPromise({imageUrls}){

  return new Promise(async (resolve,reject)=>{
    try {
        const urls =[]
                    if(imageUrls){
                        for(let u of imageUrls){
                            const {marka,src}=u
    
                            const imageSource =  placeholders[marka].imageHost.trim() + src 
                            const filename =path.basename(src)
                            const cleanFileName =('_'+filename.slice(0,filename.indexOf('.jpg'))).replace(/\./g, "")+'.jpg'
                            const dirname = path.join(process.cwd(),`sprites`,`${cleanFileName}`)
                            const dirpath =path.dirname(dirname)
                            await makeDir(dirpath)
                            urls.push({url:imageSource,filepath:path.join(process.cwd(),'sprites',`${cleanFileName}`)})
                        }
                        const response = await fetchImages(urls)
                   
                        resolve(response)
                    }
                    resolve(true)
            

 
    } catch (error) {
        debugger
        reject(error)
    }



  }) 
}

async function fetchCategoryImages() {


 const promises=[]

    await Object.entries (categoryNavigation).map(async (m) => {
     
        const categories=m[1]
categories.forEach(cat=>{   
    const {imageUrls}=cat

    promises.push(limit(async()=>await fetchPromise({imageUrls})) )

})

   


})
try {
 const response =   await Promise.all(promises)
 process.exit(0)
    debugger
} catch (error) {
    console.log('error__',error)
    debugger
}


}

(async()=>{
    
    await fetchCategoryImages() 
console.log('fetch images complete')
})()

