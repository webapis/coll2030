const imagePrefixCloudinary = 'https://res.cloudinary.com/codergihub/image/fetch/w_400/'
const imagePrefixImageKit = 'https://ik.imagekit.io/mumrjdehaou/'

const placeholder = 'https://www.mavi.com/_ui/responsive/theme-mavi/images/placeholder.jpg'
const placeholders = {
    defacto: { logo: { image: './logo/defacto.svg', width: '25%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder: 'https://dfcdn.defacto.com.tr/AssetsV2/dist/img/placeholders/placeholder.svg', imageHost: 'https://dfcdn.defacto.com.tr/', detailHost: 'https://www.defacto.com.tr/', postfix: '', imgPostFix: '' },
    koton: { logo: { image: './logo/koton.webp', width: '25%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder: 'http://img-kotonw.mncdn.com/_ui/shared/images/koton-loading-gif2.gif', imageHost: 'https://ktnimg.mncdn.com/mnresize/842/1105/product-images/', detailHost: 'https://www.koton.com/tr/', postfix: '&listName=Kad%C4%B1n%20Giyim%20Modelleri%20I%20Koton', imgPostFix: '?tr=w-400' },
    boyner: { logo: { image: "./logo/boyner.svg", width: '29%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder: 'https://statics.boyner.com.tr/assets/images/loading-icon.gif', imageHost: 'https://statics.boyner.com.tr/mnresize/325/451/productimages/', detailHost: 'https://www.boyner.com.tr/', postfix: '', imgPostFix: '?tr=w-400' },
    ipekyol: { logo: { image: './logo/ipekyol.svg', width: '23%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder: 'https://img1-ipekyol.mncdn.com/images/lazyload/placeHolder.gif', imageHost: 'https://img2-ipekyol.mncdn.com/mnresize/', detailHost: 'https://www.ipekyol.com.tr/', postfix: '', imgPostFix: '?tr=w-400' },
    machka: { logo: { image: './logo/machka.svg', width: '35%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder: 'https://storage.machka.com.tr/Machka/frontend/images/logo-emblem.svg', imageHost: 'https://image.machka.com.tr/unsafe/660x0/10.116.1.50:8000//Machka/products/', detailHost: 'https://www.machka.com.tr/urun/', postfix: '', imgPostFix: '' },
    lcwaikiki: { logo: { image: './logo/lcwaikiki.svg', width: '30%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 480 640'%3E%3Cpath d='M0 0h480v639.4H0z' fill='%23f2f2f2'/%3E%3Cpath d='M235 303.8l-9 30.8h-9.5l-6.3-23.7-6.4 23.7h-8.7l-9.8-30.8h8l6.5 22.8 6-22.8h9l6.2 22.8 6.1-22.8zm25.3 24c0 2.3.5 4.4.7 6.8h-7.3v-.2l-.1-14h-4.2c-3.6 0-9 .6-9 5.4 0 2.6 2.3 3.7 5.2 3.7a6.8 6.8 0 005.6-2.7l.4-.6v6a11.6 11.6 0 01-8 3.2c-5.5 0-10.9-3.2-10.9-9.1a9 9 0 015.4-8.9 24.6 24.6 0 0110.3-1.7h4.5c0-5-2.2-6.7-7-6.7-4.2.3-8.3 1.6-11.8 4l2-7.5c3.4-1.5 7-2.3 10.8-2.4 9.4 0 13.3 4 13.3 13v4l.1 7.7m3.4-23.9h8.1v30.8h-8.1zm12 0h8.1v12.4l9.8-12.4h9.6l-11.6 13.8 12.8 17h-10.2L284 319.7l-.2 14.8h-8zm30.2 0h8.1v30.8H306zm11.8 0h8v12.4l9.9-12.4h9.5l-11.6 13.8 12.9 17H336l-10.2-14.9-.1 14.8h-8.1zm30.5 0h8.1v30.8h-8.2zm-224.5 0h8.2v23.8h13.4v7h-21.6zm53.6 7.4l.4 1.8h-7.8a9 9 0 00-.8-1.5 5.4 5.4 0 00-.8-1 8.2 8.2 0 00-6-2c-2.5-.1-4.9 1-6.5 2.8a12.3 12.3 0 00-2.3 8 10.8 10.8 0 002.5 7.8c1.6 1.8 3.9 2.7 6.3 2.6a7.7 7.7 0 006-2.2 6.3 6.3 0 001.6-3h7.7a12 12 0 01-4.9 7.7c-3 2.2-6.6 3.3-10.3 3.1a17 17 0 01-12.3-4.2c-3-3.2-4.7-7.4-4.4-11.8 0-5.4 1.7-9.6 5-12.5 3.2-2.6 7.2-4 11.3-3.8 6 0 10.5 1.7 13.4 5.1a12.2 12.2 0 011.9 3.2' fill='%23b5b7b9'/%3E%3C/svg%3E", imageHost: 'https://img-lcwaikiki.mncdn.com/mnresize/600/-/pim/productimages/', detailHost: 'https://www.lcwaikiki.com/tr-TR/TR/urun/LC-WAIKIKI/kadin/', postfix: '', imgPostFix: '' },
    mavi: { logo: { image: './logo/mavi.svg', width: '18%', height: 10 }, imagePrefix: imagePrefixImageKit, placeholder: 'https://www.mavi.com/_ui/responsive/theme-mavi/images/placeholder.jpg', imageHost: 'https://sky-static.mavi.com/sys-master/maviTrImages/', detailHost: 'https://www.mavi.com/', postfix: '', imgPostFix: '?tr=w-400' },
    adl: { logo: { width: '15%', heigth: '', image: './logo/adl.jpg' }, imagePrefix: imagePrefixImageKit, placeholder: 'https://www.mavi.com/_ui/responsive/theme-mavi/images/placeholder.jpg', imageHost: 'https://lmb-adl.akinoncdn.com/products/', detailHost: 'https://www.adl.com.tr/', postfix: '', imgPostFix: '?tr=w-400' },
    penti: { logo: { image: './logo/penti.svg', width: '25%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://file-penti.mncdn.com/mnresize/', detailHost: 'https://www.penti.com/tr/', postfix: '', imgPostFix: '' },
    roman: { logo: { image: './logo/roman.png', width: '25%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://romancdn.sysrun.net/Content/ProductImage/Original/', detailHost: 'https://www.roman.com.tr/detay/', postfix: '', imgPostFix: '' },
    beymen: { logo: { image: './logo/beymen.svg', width: '45%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder: 'https://cdn.beymen.com/assets/desktop/img/beymen-placeholder.svg', imageHost: 'https://cdn.beymen.com/mnresize/', detailHost: 'https://www.beymen.com/', postfix: '', imgPostFix: '?tr=w-400' },
    vakko: { logo: { image: './logo/vakko.jpg', width: '30%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder: 'https://vakko.akinoncdn.com/static_omnishop/vakko678/assets/img/noimage.png', imageHost: 'https://vakko.akinoncdn.com/products/', detailHost: 'https://www.vakko.com/', postfix: '', imgPostFix: '?tr=w-400' },
    zara: { logo: { image: './logo/zara.jpg', width: '15%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://static.zara.net/photos/', detailHost: 'https://www.zara.com/tr/tr/', postfix: '', imgPostFix: '?tr=w-400'},
    twist: { logo: { image: './logo/twist.svg', width: '15%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://img2-twist.mncdn.com/mnresize/800/-//Twist/products/', detailHost: 'https://www.twist.com.tr/', postfix: '', imgPostFix: ''},
    hm: { logo: { image: './logo/hm.jpg', width: '15%', height: '' }, imagePrefix: '', placeholder:'./placeholder-img/h&m.webp', imageHost: 'http://lp2.hm.com/hmgoepprod?set=source[', detailHost: 'https://www2.hm.com/tr_tr/', postfix: '', imgPostFix: '' },
}

export default placeholders