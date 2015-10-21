(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var maybe_1 = require('./monad/maybe');
exports.Just = maybe_1.Just;
exports.Nothing = maybe_1.Nothing;
exports.just = maybe_1.just;
exports.nothing = maybe_1.nothing;
exports.maybe = maybe_1.maybe;
var either_1 = require('./monad/either');
exports.Left = either_1.Left;
exports.Right = either_1.Right;
exports.left = either_1.left;
exports.right = either_1.right;
exports.either = either_1.either;

},{"./monad/either":2,"./monad/maybe":3}],2:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Alias = (function () {
    function Alias() {
    }
    Alias.prototype.eql = function (m) {
        return JSON.stringify(m) == JSON.stringify(this);
    };
    return Alias;
})();
var id = function (_) { return _; };
var Right = (function (_super) {
    __extends(Right, _super);
    function Right(value) {
        _super.call(this);
        this.pure = Right.of;
        this.mreturn = Right.of;
        this.value = value;
    }
    Right.of = function (value) {
        return new Right(value);
    };
    /**
     * Functor fmap
     *
     * ```js
     * Right(1).fmap(id).should.eql(1);
     * ```
     */
    Right.prototype.fmap = function (func) {
        return right(func(this.value));
    };
    /**
     * Applicative apply
     *
     * ```js
     * Right(id).fapply(Right(2)).eql(2)
     * ```
     */
    Right.prototype.fapply = function (m) {
        var _this = this;
        return m.fmap(function (_) { return _this.value(_); });
    };
    /**
     * Monad join
     *
     * ```js
     * nothing.join().eql(nothing)
     * ```
     */
    Right.prototype.mbind = function (func) {
        return func(this.value);
    };
    Right.prototype.mjoin = function () {
        return this.mbind(id);
    };
    /**
 * Fold
 */
    Right.prototype.foldMap = function (f) {
        return f(this.value);
    };
    Right.prototype.foldr = function (f, z) {
        return f(this.value, z);
    };
    Right.prototype.foldl = function (f, z) {
        return f(z, this.value);
    };
    Right.prototype.fold = function () {
        return this.foldMap(id);
    };
    Right.prototype.length = function () {
        return 1;
    };
    Right.prototype.toString = function () {
        return "#<Left #{this.value.toString()}>";
    };
    return Right;
})(Alias);
exports.Right = Right;
var Left = (function (_super) {
    __extends(Left, _super);
    function Left(value) {
        _super.call(this);
        this.pure = Left.of;
        this.mreturn = Left.of;
        this.value = value;
    }
    Left.of = function (value) {
        return new Left(value);
    };
    /**
     * Functor fmap
     *
     * ```js
     * just(2).fmap(id).eql(just(2));
     * ```
     */
    Left.prototype.fmap = function (func) {
        return right(func(this.value));
    };
    /**
     * Applicative apply
     *
     * ```js
     * just(id).fapply(just(2)).eql(just(2))
     * ```
     */
    Left.prototype.fapply = function (m) {
        var _this = this;
        return m.fmap(function (_) { return _this.value(_); });
    };
    /**
     * Monad bind =<<
     *
     * ```js
     * just(2).mbind(f).should.eql(f(2));
     * ```
     * `Maybe a -> (a -> Maybe b) -> Maybe b`
     */
    Left.prototype.mbind = function (func) {
        return func(this.value);
    };
    Left.prototype.mjoin = function () {
        return this.mbind(id);
    };
    /**
     * Fold
     */
    Left.prototype.foldMap = function (_) {
        if (_.mempty)
            return _.mempty;
        if (_ instanceof Array)
            return [];
        return null;
    };
    Left.prototype.foldr = function (f, z) {
        return z;
    };
    Left.prototype.foldl = function (f, z) {
        return z;
    };
    Left.prototype.fold = function () {
        return this.foldMap(id);
    };
    Left.prototype.length = function () {
        return 0;
    };
    Left.prototype.eql = function (m) {
        return JSON.stringify(m) == JSON.stringify(this);
    };
    Left.prototype.toString = function () {
        return "#<Left #{this.value.toString()}>";
    };
    return Left;
})(Alias);
exports.Left = Left;
/**
 * alias to Just's constructor
 */
function right(value) { return new Right(value); }
exports.right = right;
;
function left(value) { return new Left(value); }
exports.left = left;
;
/**
 * either function
 *
 *
 *
 * `either :: (a -> c) -> (b -> c) -> Either a b -> c`
 *
 */
function either(l, r, e) {
    if (e instanceof Left) {
        return l(e.mbind(id));
    }
    else if (e instanceof Right) {
        return r(e.mbind(id));
    }
}
exports.either = either;

},{}],3:[function(require,module,exports){
var id = function (_) { return _; };
var Nothing = (function () {
    function Nothing() {
        this.mempty = this;
        this.foldl = this.foldr;
        this.pure = this.mreturn;
        this.value = undefined;
    }
    /**
     * Monoid append
     * ```js
     * nothing.mappend(just(3)).eql(nothing)
     * ```
     */
    Nothing.prototype.mappend = function (m) {
        return m;
    };
    Nothing.prototype.mjoin = function () {
        return this;
    };
    /**
     * Functor fmap
     *
     * ```js
     * nothing.fmap(id).eql(nothing);
     * ```
     */
    Nothing.prototype.fmap = function (func) {
        return this;
    };
    Nothing.prototype.mreturn = function (v) {
        return new Nothing;
    };
    /**
     * Monad join
     *
     * ```js
     * nothing.join().eql(nothing)
     * ```
     */
    Nothing.prototype.mbind = function (func) {
        return this;
    };
    /**
     * Applicative apply
     *
     * ```js
     * nothing.fapply(just(2)).eql(nothing)
     * ```
     */
    Nothing.prototype.fapply = function (m) {
        return this;
    };
    Nothing.prototype.foldr = function (_, z) {
        return z;
    };
    Nothing.prototype.eql = function (m) {
        return false;
    };
    return Nothing;
})();
exports.Nothing = Nothing;
var Just = (function () {
    function Just(value) {
        this.mempty = exports.nothing;
        this.pure = Just.of;
        this.mreturn = this.pure;
        this.foldr = this.foldl;
        this.value = value;
    }
    Just.of = function (value) {
        return new Just(value);
    };
    /**
     * Monoid append
     * ```js
     * just(2).mappend(just(3)).eql(just(5))
     * ```
     */
    Just.prototype.mappend = function (m) {
        return this.fmap(function (a) { return m.fmap(function (b) { return a + b; }); }).mjoin();
    };
    /**
     * Applicative apply
     *
     * ```js
     * just(id).fapply(just(2)).eql(just(2))
     * ```
     */
    Just.prototype.fapply = function (m) {
        var _this = this;
        return m.fmap(function (_) { return _this.value(_); });
    };
    /**
     * Functor fmap
     *
     * ```js
     * just(2).fmap(id).eql(just(2));
     * ```
     */
    Just.prototype.fmap = function (func) {
        return new Just(func(this.value));
    };
    /**
     * Monad join
     *
     * ```js
     * just(just(3)).mjoin().eql(just(3)).should.be.true
     * ```
     * `Maybe Maybe a -> Maybe a`
     */
    Just.prototype.mjoin = function () {
        return this.mbind(id);
    };
    /**
     * Monad bind =<<
     *
     * ```js
     * just(2).mbind(f).should.eql(f(2));
     * ```
     * `Maybe a -> (a -> Maybe b) -> Maybe b`
     */
    Just.prototype.mbind = function (func) {
        return func(this.value);
    };
    /**
     * Foldable foldl
     */
    Just.prototype.foldl = function (f, z) {
        return f(z, this.value);
    };
    Just.prototype.eql = function (m) {
        var _this = this;
        return maybe(false, function (_) { return JSON.stringify(_this.value) == JSON.stringify(_); }, m);
    };
    return Just;
})();
exports.Just = Just;
/**
 * alias to Just's constructor
 */
function just(value) { return new Just(value); }
exports.just = just;
;
/**
 * alias to Nothing()
 */
exports.nothing = new Nothing();
/**
 * maybe function
 *
 * apply function f to Maybe a, if Nothing, return default value
 *
 * `maybe :: b -> (a -> b) -> Maybe a -> b`
 *
 */
function maybe(dv, f, m) {
    if (m instanceof Just) {
        return f(m.mjoin());
    }
    else {
        return dv;
    }
}
exports.maybe = maybe;

},{}]},{},[1]);
