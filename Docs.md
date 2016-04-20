# easier-react-native库
**v0.0.2**

## 目录结构
> easier-react-native
>
> > base/
> >
> > http/
> >
> > utils/
> >
> > widgets/
> >
> > index.js
> >

**目录说明**

- **base**

	公共基类包
- **http**

	http请求工具类包
- **utils**

	工具类包
- **widgets**

	自定义控件包
- **index.js**

	库资源导出类


##库资源导出类

**index.js** 导出easier-react-native中所有可使用组件

**应用：**

```
import {
    BaseComponent,
    Button,
    //...
} from 'easier-react-native'
```


## 公共基类

### BaseComponent

**定义：** 所有Component类的基类

**说明：** 继承BaseComponent后，页面默认拥有TitleBar，但不能重写render()方法，需要重写renderBody()方法，用于渲染body内容，也可以在页面渲染完成之后调用setBody()方法重新渲染。如果需要重写界面，只需重写render()方法即可。关于TitleBar，下文有详细介绍。

**新的生命周期：componentDidFocus** 在component获得焦点的时候执行，可将API请求放在此执行，防止component卡顿

**方法：**

- **setBackgroundImage(source)** 设置背景图片，参数为图片资源
- **getTitleBar()** 返回一个TitleBar对象
- **setTitleBar(props:object)** 设置TitleBar属性，详见TitleBar
- **titleBarConfig()** 子类可重写，返回TitleBar属性Object，效果等同setTitleBar(props)
- **setTitle(title:string)** 设置TitleBar title属性
- **renderBody()** 子类可重写，返回body渲染内容
- **getLoading()** 返回Loading对象
- **showLoading(text:string, pointerEvents:bool)** - show loading
- **dismissLoading()** - dismiss loading
- **setLoadingCover(cover:string)** 设置loading背景覆盖范围，默认不覆盖TitleBar，cover='full-screen'覆盖全屏
- **startComponent(name:string, props:object)** Component页面跳转，name为Component，使用之前，请确保Component在Manifest中已注册
- **finish()** 关闭当前页面
- **finishToBefore(name:string, props:object, index:number)** 回到指定页面，若指定的页面不存在，则新建指定页面，index为新建页面放入Component栈的下标，默认为当前页的上一页，props为新建页面参数


**应用：**

```
'use strict';

import {
	BaseComponent
} from 'easier-react-native'

class TestComponent extends BaseComponent {

   	constructor(props) {
        super(props);
	    this.title = 'test title';
	    this.backgroundImage = require('./images/test.png');
	    this.loadingCover = 'full-screen';
	    //or
	    this.setTitle('test title');
	    this.setBackgroundImage(require('./images/test.png'));
	    this.setLoadingCover('full-screen');

	    this.setTitleBar({
	        //...titlebar config
	    });
	}

	renderBody() {
		return (
			<Text>I'm a body</Text>
		);
	}

}

module.exports = TestComponent;
```



##工具类

###InitUtil

**定义：** 初始化项目入口Component

**应用：**

index.ios.js or index.android.js

```
'use strict';

import {
  AppRegistry,
  Component
} from 'react-native';

import {InitUtil} from 'easier-react-native'

class Store extends Component {
  render() {
    return InitUtil.init('Login');
  }
}

AppRegistry.registerComponent('Store', () => Store);
```

##自定义控件

###NavBar

**来源：** <https://github.com/react-native-fellowship/react-native-navbar>

在原有的基础上做了细微的改动和bug修复，感谢原作者

**API**

```
style - (Object, Array) - Style object or array of style objects
    tintColor - (String) - NavigationBar's tint color
    statusBar - (Object):
        style - ('light-content' or 'default') - Style of statusBar
        hidden - (Boolean)
        tintColor - (String) - Status bar tint color
        hideAnimation - ('fade', 'slide', 'none') - Type of statusBar hide animation
        showAnimation - ('fade', 'slide', 'none') - Type of statusBar show animation
    leftButton / rightButton - (Object, React Element) - Either plain object with configuration, or React Element which will be used as a custom left/right button element. Configuration object has following keys:
        title - (String) - Button's title
        tintColor - (String) - Button's text color
        style - (Object, Array) - Style object or array of style objects
        handler - (Function) - onPress function handler
    title - (Object, React Element) - Either plain object with configuration, or React Element which will be used as a custom title element. Configuration object has following keys:
        title - (String) - Button's title
        tintColor - (String) - Title's text color
```

---

###TitleBar

自定义头部控件

**API**

```
extends NavBar API:
   style - (Object, Array) - Style object or array of style objects
   tintColor - (String) - NavigationBar's tint color
   statusBar - (Object):
       style - ('light-content' or 'default') - Style of statusBar
       hidden - (Boolean)
       tintColor - (String) - Status bar tint color
       hideAnimation - ('fade', 'slide', 'none') - Type of statusBar hide animation
       showAnimation - ('fade', 'slide', 'none') - Type of statusBar show animation
   leftButton / rightButton - (Object, React Element) - Either plain object with configuration, or React Element which will be used as a custom left/right button element. Configuration object has following keys:
       title - (String) - Button's title
       tintColor - (String) - Button's text color
       style - (Object, Array) - Style object or array of style objects
       handler - (Function) - onPress function handler
   title - (Object, React Element) - Either plain object with configuration, or React Element which will be used as a custom title element. Configuration object has following keys:
       title - (String) - Button's title
       tintColor - (String) - Title's text color

new API：
leftButton / rightButton:
	hidden - (Boolean) - hidden button
	extends Button all API：
		color - (string) - text color
		fontSize - (number) - text size
		style - (Object) - button background style objects
		imgStyle - (Object) - button image style objects
		pressSource - (source, Object) - button press source, image source or {color:''}
		source - (source, Object) - button source, image source or {color:''}
		onPress - (function) - button press listener
bottomLine - (any) - boolean: Whether show default bottom line
				 - string: show bottom line backgroundColor
				 - object: show bottom line style
				 - element: show bottom view
```

**Method**

- **setTitle(props:string/object)** - update title
- **setLeftButton(props:object/element)** - update leftButton
- **setRightButton(props:object/element)** - update rightButton
- **getTitleProps()** - get title current props
- **getLeftButtonProps()** - get leftButton current props
- **getRightButtonProps()** - get RightButtonProps current props

**应用：**

```
import {
	TitleBar
} from 'easier-react-native'

//...

<TitleBar
    style={styles.titlebar}
    tintColor=‘blue’
    statusBar={{
    	style: 'light-content'
    }}
    leftButton={{
    	title: 'test'
    	handler: () => {
    		console.log('click test');
    	}
    }}
    rightButton={(
    	<View style={{width: 20, height: 20, backgroundColor: 'red'}} />
    )}
    navigator={this.props.navigator}
/>
```

---

###Button

自定义Button控件，感谢原作者：Honaf

**API**

```
color - (string) - text color
fontSize - (number) - text size
style - (Object) - button background style objects
imgStyle - (Object) - button image style objects
pressSource - (source, Object) - button press source, image source or {color:''}
source - (source, Object) - button source, image source or {color:''}
onPress - (function) - button press listener
```


**应用：**

```
import {
	Button
} from 'easier-react-native'

//...

<Button
	color='white'
	style={{wieth: 70, height: 45}}
	imgStyle={{wieth: 70, height: 45}}
	source=require('./image/button.png')
	source=require('./image/button.png')
	onPress=() => {
		console.log('click test');
	} >
	Test Button
</Button>
```

---

###Loading

加载Loading控件

**API**

```
text - (string) - loading text
textStyle - (object) - loading text style
pointerEvents - (bool) - loading can click on the bottom of the content, default is false
bottomStyle - (object) - loading the bottom cover background style
loadingStyle - (object) - loading background style
```

**Method**

- **show(text:string, pointerEvents:bool)** - show loading
- **dismiss()** - dismiss loading
- **isShow()** - return loading is showed

**应用：**

```
import {
	Loading
} from 'easier-react-native'

//...

render() {
	return (
		<loading ref='loading' text='登录中...' />
	);
}

getLoading() {
	return this.refs['loading'];
}

test() {
	this.getLoading().show();
	this.getLoading().show('注册中', false);
	this.getLoading().dismiss();
}

```

---

###CircleProgress

圆形进度条

```
import {
	CircleProgress
} from 'easier-react-native'

//...

<CircleProgress />
```

---

###ViewStack

**说明：** Component容器控件，可放置一个Component的数组加入Stack，Stack中的Component只有调用replaceStack()方法才执行render()渲染界面

**API**

```
stack - ([Component]) - ViewStack stack array, must be a Component array
```

**Method**

- **replaceStack(index:number, isNew:bool)** - Replace the component of the specified index in the stack，isNew said to create a new instance
- **getCurrentIndex()** - The index to get the current display
- **getStack(index:number)** - Specify the subscript component instance


**应用：**

```
import {
	ViewStack
} from 'easier-react-native'

//...

render() {
	return (
		<ViewStack ref='stack' style={styles.content} stack={[<Home />, <Manage />]} />
	);
}

_getStack() {
    return this.refs['stack'];
}

test() {
	this._getStack().replaceStack(1, false);
	let index = this._getStack().getCurrentIndex();
	let component = this._getStack().getStack(1);
}

```


---

###TabBar

tab切换控件

**API**

```
tabItems - ([object/element]) - TabBar item, Can be the object or element of the array
    if object:
        style - (object) - item style
        title - (string) - item title
        titleColor - (string) - item title color
        titleSelected - (string) - item title selected color
        image - (any) - item ico
        selectedImage - (any) - item selected ico
tintColor - (string) - TabBar backgroundColor
style - (object) - TabBar style
handler - (func) - TabBar tab change listener
index - (number) - TabBar init selected index
```

**Method**

- **getCurrentIndex()** - return current selecter item index

**应用：**

```
import {
	TabBar,
	ViewStack
} from 'easier-react-native'

//...

constructor(props) {
    super(props);

    this.tabItems = [
        {title: '首页', titleColor: 'blank', titleSelected: 'red', image: require('../image/xxx.png'), selectedImage: require('../image/xxx.png')},
        (<View style={{width: 20, height: 20, backgroudColor: 'yellow'}} />),
        {title: '管理', titleColor: 'blank', titleSelected: 'red', image: require('../image/xxx.png'), selectedImage: require('../image/xxx.png')},,
    ];

}

renderBody() {
    return (
        <View style={styles.container}>
            <ViewStack ref='stack' style={styles.content} stack={[<Home />, <Manage />]} />
            <TabBar {...this._tabBarConfig()}/>
        </View>
    );
}

_getStack() {
    return this.refs['stack'];
}

_tabBarConfig() {
    return {
        tabItems: this.tabItems,
        tintColor: 'white',
        index: 0,
        handler: (index) => {
            this._getStack().replaceStack(index);
            this.getTitleBar().setTitle(this.tabItems[index].title);
        }
    };
}

```

---

##HTTP请求(未完待续)
