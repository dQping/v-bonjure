<h2 align="center">Logger日志模块</h2>
<p align="center"><img width="600" height="190" src="/documents/assets/logger_icon.png" alt="基于 fetch api 的网络通信模块"></p>

为了方便统一管理开发者的 console.xxx() 信息，框架提供了 Logger 日志模块，禁止直接使用 console.xxx() 的方式自己打日志，请注意我使用了<font color=red size=5>“禁止”</font>二字

原因：console.xxx()的方式确实不会对程序的运行带来任何影响，但是却给框架的日志管理带来了影响，一旦业务开发者使用了console.xxx()的方式，就代表着这部分日志脱离了框架层的管理；

坏处，举两个栗子：

>打包程序对不同环境的日志处理是不同的，比如开发模式日志级别是DEBUG，意味着会输出所有日志，生产环境日志级别是ERROR，如果使用了console.xxx()的方式，那么框架就没法过滤了；

>其次不同开发人员可以通过日志开关控制日志级别和打开/关闭某些模块的日志，console.xxx()的方式没法被控制而必定导致日志污染，会影响别的开发人员调试程序。

## 一、日志的级别
Logger 日志框架内置了5个日志级别，级别依次递增，级别越高输出的信息越少

* DEBUG
    
       输出调试信息，指出细粒度信息事件对调试应用程序是非常有帮助的

* INFO

       输出提示信息，消息在粗粒度级别上突出强调应用程序的运行过程

* WARN

       输出警告信息，表明会出现潜在错误的情形

* ERROR

       输出错误信息，指出发生的错误事件，可能会影响系统的继续运行

* MUTE

       级别最高，不输出任何日志信息

## 二、日志的模块、日期 与 调试数据信息
![image](/documents/assets/logger.png)

## 三、日志的全局开关
为了方便框架、开发者设置日志的输出样式与输出内容，框架提供了全局的如下命令进行相关设置

* loggerConfig命令：设置全局日志的输出样式与输出内容
  
  * loggerConfig(['color', 'level', 'module', 'time'])，代表以 "color" 模式输出日志，日志内容包括：级别信息、模块信息、日期信息

     ![image](/documents/assets/sherry_all.png)

  * loggerConfig(['level', 'module', 'time'])，代表以 非"color" 模式输出日志，日志内容包括：级别信息、模块信息、日期信息

     ![image](/documents/assets/sherry_no_color.png)

  * loggerConfig(['color', 'level', 'module'])，代表以 "color" 模式输出日志，日志内容包括：级别信息、模块信息

     ![image](/documents/assets/sherry_level_module.png)
  
  * loggerConfig 命令剩下的组合可以自己在控制台直接调用 loggerConfig 命令进行实验

* loggerLevel命令：设置全局日志输出的级别

  * loggerLevel('warn')，将全局日志级别设置为 'WARN'，那么将只会输出 级别 >= 'WARN' 的日志信息

  * 其余日志级别：debug、info、error、mute 可以自己在控制台直接调用 loggerLevel 命令进行实验

* loggerOff命令：关闭日志模块
    ```js
    // 关闭 'UIComponents/GroupBox/A' 模块的日志输出
    // 那么 模块'UIComponents/GroupBox' 和 该模块子模块('UIComponents/GroupBox/*') 都将不再输出日志
    loggerOff('UIComponents/GroupBox');
    ```

* loggerOn命令：打开日志模块
    ```js
    loggerOn('UIComponents/GroupBox')
    ```

## 四、在应用中输出日志信息

### 1、导入日志相关依赖
```js
import Logger from '@core/Logger';
```

### 2、输出日志
```js
// 获取一个logger实例，并同时指定日志输出的模块信息
const logger = Logger.getLogger('App/View/Login');

// 输出日志信息
logger.debug('这是一条debug日志哟，调试数据: ', { j: 'j', k: 'k', h: { a: 'a', b: 'b' } });
logger.info('这是一条info日志哟，调试数据: ', { j: 'j', k: 'k', h: { a: 'a', b: 'b' } });
logger.warn('这是一条warn日志哟，调试数据: ', { j: 'j', k: 'k', h: { a: 'a', b: 'b' } });
logger.error('这是一条error日志哟，调试数据: ', { j: 'j', k: 'k', h: { a: 'a', b: 'b' } });
```

## 五、日志的输出规范化

日志的模块名命名规范：模块名首字母大写，采用驼峰法进行命名，子模块用 "/" 分割

* <font color=red size=3>global/\*</font> 是框架层占用的模块名，应用层不要使用它
  >比如模块名 global/http 是框架层用于输出Http模块的相关日志，一旦应用层也使用了 global/* ，那么排查应用日志和框架日志就不那么容易了，所以遵循规范，别自找麻烦

* <font color=red size=3>app/view/\*</font> 用于指定应用视图层的日志；
  >比如模块名 app/view/Login 表示登录模块视图层的日志

* <font color=red size=3>app/store/\*</font> 用于指定应用状态层的日志；
  >比如模块名 app/store/login 表示登录模块状态层的日志

* <font color=red size=3>app/net/\*</font> 用于指定应用网络层的日志；
  >比如模块名 app/net/login 表示登录模块网络层的日志

* <font color=red size=3>app/handler/\*</font> 用于指定应用业务层的日志；
  >比如模块名 app/handler/login 表示登录模块业务层的日志