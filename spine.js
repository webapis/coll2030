let keyword='Uzun'
let  regex ='(^|\\s)'+keyword+'(\\s)|(\\W)'.replace(' ','')
let title='Kapüşonlu Düz Uzun Kollu Kadın Şişme Mont'
const result = title.toLowerCase().split(' ').find(f=>f===keyword.toLowerCase())
debugger