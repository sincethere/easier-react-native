# easier-react-native框架

##使用说明

安装命令：

```
$ npm install easier-react-native --save
```

运行后，easier-react-native框架（简称ern）已安装在项目下，然后需要创建一个配置文件，
ern做组件跳转时需要根据此目录匹配名称跳转，具体使用后面介绍。也可以将此文件当做项目清单。创建步骤：

- 1.在node_modules目录下创建文件夹manifest
- 2.在manifest目录创建index.js
- 3.index.js示例代码如下：

```
'use strict';

module.exports = {
	get Login() {return require('../../app/Login')},
    get Register() {return require('../../app/Register')},
    get ResetPassword() {return require('../../app/ResetPassword')},
    get Welcome() {return require('../../app/Welcome')},
}
```

- 4.如果你的项目git管理了，默认是过滤node_modules目录的，请修改.gitignore

```
node_modules/

#update to=>

#排除node_modules/manifest
node_modules/*
!node_modules/manifest
```

至此，ern构建完毕，开始使用ern初始化项目入口，修改index.android.js和index.ios,js，如下:

```
'use strict';

import {
  AppRegistry,
  Component,
} from 'react-native';

import {
	InitUtil,
} from 'easier-react-native';

class EasierDemo extends Component {
  render() {
    return InitUtil.init('Welcome', require('manifest'));
  }
}

AppRegistry.registerComponent('EasierDemo', () => EasierDemo);
```

`InitUtil.init('Welcome', require('manifest'))`为项目初始化，第一个参数`'Welcome'`是项目入口显示的第一个页面的名字，如果Welcome已在manifest中注册，在第一个页面正常显示为你注册的Welcome页面，如果没注册，则显示一个空页面，提示你没有在manifest中注册。第二个参数`require('manifest')`是require你的manifest配置文件，为方便使用你可以将你项目的所有需要require的类都注册在这里，在项目中可以如下方式require:

```
import {
	Login,
	Register,
	Welcome,
	//...更多
} from 'manifest';
```

其他具体业务，请查阅：[easier-react-native文档](https://github.com/wenxucheng/easier-react-native/blob/master/Docs.md)
