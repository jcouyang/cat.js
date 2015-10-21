# User Guide
首先简单解释一通基本概念

## Semigroup 半群
半群是带有一个二元操作（通常(或者 Haskell)叫 mappend)和集合的代数结构。

半群满足结合律：
```javascript
just(2).mappend(just(1)).mappend(just(3)).eql(
  just(2).mappend(just(1).mappend(just(3)))
) // => true
```

## Monoid 含幺半群
含幺半群当然就是含有_幺元_的半群，二元操作幺元和集合内任何元素都还是该元素。

含幺半群不仅满足半群的结合律，还需要有幺元满足：
```javascript
just(2).mappend(nothing).eql(just(2)) // true
```
其中 nothing 就是 Maybe 含幺半群的幺元

## Functor 函子
函子是范畴的映射，即态射，相对于函数是集合的映射，更抽象的，需要用 fmap 完成范畴之间的映射。

函子有态射唯一性：
```javascript
just(2).fmap(id).eql(just(2)) // true
```
以及可复合态射：
```javascript
just(2).fmap(x=>f(g(x))).eql(
  just(2).fmap(g).fmap(f)
) // => true
```

## Applicative
同样的，当映射存在于函子内，就成了 Applicative Functor，二元操作通常用 fapply 表示

1. 同样的态射唯一性：
```javascript
just(id).fapply(just(2)).eql(just(2)) // true
```
2. 同态射：
```javascript
just(f).fapply(just(2)).eql(just(f(2))) // true
```
3. 交换律：
```javascript
just(f).fapply(just(2)).eql(just(f=>f(2)).fapply(just(f))) // true
```
## Monad 猫呢？
二元操作 mbind 可以把返回猫呢的函数应用到猫呢的 context，类似于 fmap，但是最后 flat 了

结合律：
```javascript
just(2).mbind(f).mbind(g).eql(just(2).mbind(x=>f(x).mbind(g))) // true
```

To be continued....
