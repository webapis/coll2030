const title ='Kapüşonlu Fermuarlı Yağmurluk'
const keyword ='Kap'
const regex ='(^|\\s)'+keyword+'(\\s|\\b)'.replace(' ','')
const result =title.split(' ').find(f=>f===keyword)?true:false

debugger