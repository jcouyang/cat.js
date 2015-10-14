(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var maybe_1 = require('./monad/maybe');
exports.Just = maybe_1.Just;
exports.Nothing = maybe_1.Nothing;
exports.just = maybe_1.just;
exports.nothing = maybe_1.nothing;
exports.maybe = maybe_1.maybe;

},{"./monad/maybe":2}],2:[function(require,module,exports){
var id = function (_) { return _; };
var Nothing = (function () {
    function Nothing() {
        this.mempty = this;
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
