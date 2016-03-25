/**
    Created by wenxucheng@163.com on 2016/3/3
*/
'use strict';

module.exports = {
    get InitUtil() {return require('./utils/InitUtil')},
    get BaseComponent() {return require('./base/BaseComponent')},
    get TitleBar() {return require('./widgets/TitleBar')},
    get NavBar() {return require('./widgets/navbar/NavBar')},
    get Button() {return require('./widgets/Button')},
    get Loading() {return require('./widgets/loading')},
    get TabBar() {return require('./widgets/TabBar')},
    get ViewStack() {return require('./widgets/ViewStack')},
    get FetchUtil() {return require('./http/FetchUtil')},
    get LtFetch() {return require('./http/LtFetch')},
};
