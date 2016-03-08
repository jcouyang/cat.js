# cat.js

**Ca**tegory **T**heory for **J**ava**S**cript

[![Circle CI](https://circleci.com/gh/jcouyang/cat.js.svg?style=svg)](https://circleci.com/gh/jcouyang/cat.js)
[![NPM](https://img.shields.io/npm/v/cat.js.svg)](https://www.npmjs.com/package/cat.js)

:joy_cat: :arrow_right: :smirk_cat: <br/>
:arrow_down:  :arrow_lower_right: :arrow_down:<br/>
:scream_cat: :arrow_right: :heart_eyes_cat:

## Install
### Browser
```html
<script src="//cdn.rawgit.com/jcouyang/cat.js/master/dist/cat.min.js"></script>
```

### Node/Browserify
```js
let {maybe, just} = require('cat.js');
maybe(false, Boolean, just(2))
// => true
```
## Document
- [User Guide comming soon...but if you can read chinese->>](#文档)
- [API](http://oyanglul.us/cat.js/)


# 猫呢.js

:joy_cat: :arrow_right: :smirk_cat: <br/>
:arrow_down:  :arrow_lower_right: :arrow_down:<br/>
:scream_cat: :arrow_right: :heart_eyes_cat:

猫呢.js 是范畴论的 JavaScript 实现。大概移植 Haskell 但是更符合 JavaScript 的使用习惯。

## 安装
### 浏览器
```html
<script src="//cdn.rawgit.com/jcouyang/cat.js/master/dist/cat.min.js"></script>
```

### Node/Browserify
```js
let {maybe, just} = require('cat.js');
maybe(false, Boolean, just(2))
// => true
```
## 文档
- [User Guide](./docs/README.md)
- [API](http://oyanglul.us/cat.js/)


## Todos
- [ ] Maybe
  - [X] Monoid
  - [X] Functor
  - [X] Applicative
  - [X] Foldable
  - [ ] Traversable
  - [X] Monad
  - [ ] MonadFix
  - [ ] MonadPlus
- [ ] Either
  - [X] Monoid
  - [X] Functor
  - [X] Applicative
  - [X] Foldable
  - [ ] Traversable
  - [X] Monad
  - [ ] MonadFix
  - [ ] MonadPlus
- [ ] Try
- [ ] Native
- [-] Docs
