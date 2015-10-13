(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var maybe_1 = require('./monad/maybe');
exports.Just = maybe_1.Just;

},{"./monad/maybe":2}],2:[function(require,module,exports){
var id = function (_) { return _; };
var Nothing = (function () {
    function Nothing() {
        this.mempty = this;
        this.pure = this.mreturn;
        this.value = undefined;
    }
    Nothing.prototype.mappend = function (m) {
        return m;
    };
    Nothing.prototype.mjoin = function () {
        return this;
    };
    Nothing.prototype.fmap = function (func) {
        return this;
    };
    Nothing.prototype.mreturn = function (v) {
        return new Nothing;
    };
    Nothing.prototype.mbind = function (func) {
        return this;
    };
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
        // Monoid
        this.mempty = new Nothing;
        this.pure = Just.of;
        this.mreturn = this.pure;
        this.value = value;
    }
    Just.of = function (value) {
        return new Just(value);
    };
    /**
     * ##Monoid append
     * ```js
     * this.fmap(a=>m.fmap(b=>a+b)).mjoin();
     * ```
     * @param {Maybe}
     * @return {Maybe}
     * @api public
     */
    Just.prototype.mappend = function (m) {
        return this.fmap(function (a) { return m.fmap(function (b) { return a + b; }); }).mjoin();
    };
    //Applicative
    Just.prototype.fapply = function (m) {
        var _this = this;
        return m.fmap(function (_) { return _this.value(_); });
    };
    // Functor
    Just.prototype.fmap = function (func) {
        return new Just(func(this.value));
    };
    // Monad
    Just.prototype.mjoin = function () {
        return this.mbind(id);
    };
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
// alias of constructor
function just(value) { return new Just(value); }
exports.just = just;
;
exports.nothing = new Nothing();
//maybe :: b -> (a -> b) -> Maybe a -> b 
function maybe(dv, f, m) {
    if (m instanceof Just) {
        return f(m.mbind(function (_) { return _; }));
    }
    else {
        return dv;
    }
}
exports.maybe = maybe;

},{}]},{},[1]);
