
 import ReactDOM from 'react-dom/client';
 //import TagManager from 'react-gtm-module'
import App from './App'

// const tagManagerArgs = {
//     gtmId: 'GTM-MMJQR6C',
//    // dataLayerName: 'PageDataLayer'
// }
 
// TagManager.initialize(tagManagerArgs)
const dataURL ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAADIBAMAAAD4qwVWAAAAG1BMVEXMzMyWlpacnJyqqqqjo6O3t7fFxcWxsbG+vr6ayVztAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABKUlEQVRoge3SMU/CQByG8beFtitCBcc71OgIie5cPwG4uNKgO0ys8M29nkJijMPVmjA8v6H5t0mfXK8nAQAAAAAAAAAAAMA/s9/uEpOYy2zl7VM/Wn9I+VZvOpMK+yBtytqkg3Ts7qU3P8e33LSUdrd2K1vNm9bw2R5yW7n4VjbSfCm7rhfZRK5pjXRcFM0c3eqPVS+0V238tGpaN0qa+RjfSgf+VeWvfklGYb+aB2GObvlQOsjdcG78lJxaYW63rv5kHdZybvlLi3WF/UrM536dv7HdfoX/mI61M9m1v3y1/FMX3wrnqxg+VRPZvT215CrbohXO/Uv5XmozPZ5bPT/Htn7nT103iketZh21slFuDx21ZK/KrlLa3G07awEAAAAAAAAAAFyYD/jJJjwPERThAAAAAElFTkSuQmCC"
window.dataURL=dataURL
const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(

<App/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

