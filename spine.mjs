

import mergePrevAndNewData from './utils/mergeNewData.mjs'
const prevData = [
    {
        "title": "nu mor kaplamalı,yandan çıt çıtlı uzun yağmurluk-k215025008 _kcocuk",
        "priceNew": "847.50 ",
        "imageUrl": "s/files/1/0610/7132/7488/products/K21250081_1320x.jpg?v=1652337961 1320w",
        "link": "collections/nu-kids/products/mor-kaplamali-yandan-cit-citli-uzun-yagmurluk-k215025008",
        "timestamp": 1684126162439,
        "marka": "nu",
        "gender": "_kcocuk",
        "delete":"true"
    },
    {
        "title": "nu siyah scuba ve naylon birleşimli, fırfırlı ceket-k215025006 _kcocuk",
        "priceNew": "2,995.00",
        "imageUrl": "s/files/1/0610/7132/7488/products/K215025006-NU0014_1_1320x.jpg?v=1647960815 1320w",
        "link": "collections/nu-kids/products/siyah-scuba-ve-naylon-birlesimli-firfirli-ceket-k215025006",
        "timestamp": 1684039139905,
        "marka": "nu",
        "gender": "_kcocuk",
        "delete":"true"
    },
    
    {
    "title": "slatra erkek siyah 2 iplik basic oversize t-shirt _erkek",
    "priceNew": "179,99",
    "imageUrl": "53661/Uploads/UrunResimleri/thumb/erkek-siyah-2-iplik-basic-oversize-t-s-09beff.jpg",
    "link": "erkek-siyah-2-iplik-basic-oversize-t-shirt",
    "timestamp": 1680591828399,
    "marka": "slatra",
    "gender": "old_erkek",
}, {
    "title": "nike nike alphafly 2 erkek yol yarış ayakkabısı _erkek",
    "priceNew": "6.399,90",
    "imageUrl": "a/images/c_limit,w_592,f_auto/t_product_v1/f9645056-9dc0-4b24-9006-57bf348e8f47/alphafly-2-yol-yar%C4%B1%C5%9F-ayakkab%C4%B1s%C4%B1-jmPrD5.png",
    "link": "tr/t/alphafly-2-yol-yar%C4%B1%C5%9F-ayakkab%C4%B1s%C4%B1-jmPrD5/DN3555-600",
    "timestamp": 1680774159626,
    "marka": "nike",
    "gender": "_erkek"
},
{
    "title": "perspective bayan ekru illas regular fit boğaz detaylı ekru turuncu renk triko elbise _kadin",
    "priceNew": "949,00",
    "imageUrl": "perspective/ContentImages/Product/2022-2023-sonbahar-kis/22100109-436/illas-triko-elbise-0109_22100109-436_ekru-turuncu-ekru_1_buyuk.jpg",
    "link": "ekru-illas-triko-elbise-0109_22100109-436-55",
    "timestamp": 1682412161770,
    "marka": "perspective",
    "gender": "old_kadin"
},
{
    "title": "roman kolsuz örgü triko siyah _kadin",
    "priceNew": "999,99",
    "imageUrl": "kolsuz-orgu-triko-siyah-15156-14-K.jpg",
    "link": "kolsuz-orgu-triko-siyah",
    "timestamp": 1683184986346,
    "marka": "roman",
    "gender": "_kadin"
}
]
const newData = [{
    "title": "slatra erkek siyah 2 iplik basic oversize t-shirt _erkek",
    "priceNew": "179,88",
    "imageUrl": "53661/Uploads/UrunResimleri/thumb/erkek-siyah-2-iplik-basic-oversize-t-s-09beff.jpg",
    "link": "erkek-siyah-2-iplik-basic-oversize-t-shirt",
    "timestamp": 1680591828399,
    "marka": "slatra",
    "gender": "new_erkek",
    
},
{
    "title": "perspective bayan ekru illas regular fit boğaz detaylı ekru turuncu renk triko elbise _kadin",
    "priceNew": "949,00",
    "imageUrl": "perspective/ContentImages/Product/2022-2023-sonbahar-kis/22100109-436/illas-triko-elbise-0109_22100109-436_ekru-turuncu-ekru_1_buyuk.jpg",
    "link": "ekru-illas-triko-elbise-0109_22100109-436-55",
    "timestamp": 1682412161770,
    "marka": "perspective",
    "gender": "new_kadin"
},
{
    "title": "roman kolsuz örgü triko siyah _kadin",
    "priceNew": "999,99",
    "imageUrl": "kolsuz-orgu-triko-siyah-15156-14-K.jpg",
    "link": "kolsuz-orgu-triko-siyah",
    "timestamp": 1683184986346,
    "marka": "roman",
    "gender": "_kadin"
}
]


const mergedData = mergePrevAndNewData({ data: newData, prevData })
debugger
// => false



;

