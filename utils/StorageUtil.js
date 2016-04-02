'use strict'
import Storage from 'react-native-storage';

const defaultStorage = {
    //最大容量，默认值10000条数据循环存储
    size: 10000,

    //数据过期时间，默认一整天（1000 * 3600 * 24秒）
    defaultExpires: 1000 * 3600 * 24,

    //读写时在内存中缓存数据。默认启用。
    enableCache: true,

    //如果storage中没有相应数据，或数据已过期，
    //则会调用相应的sync同步方法，无缝返回最新数据。
    sync : {
        //同步方法的具体说明会在后文提到
    },
}

module.exports = {
    init(storageConfig) {
        //最好在全局范围内创建一个（且只有一个）storage实例，方便使用
        //对于react native
        global.storage = new Storage({
            ...defaultStorage,
            ...storageConfig
        });
    },

    addSync(sync) {
        //初始化storage
        !global.storage && this.init();
        Object.assign(global.storage.sync, sync);
    },
};
