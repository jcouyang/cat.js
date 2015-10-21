import I = require("../interfaces");

interface Maybe<A> extends I.Monad<A>, I.Functor<A>, I.Foldable<A>, I.Monoid<A>, I.Equivable{
	mjoin(): Maybe<A>;
}
const id = _=>_;
export class Nothing<A> implements Maybe<A>{
	private value;
	constructor() {
		this.value = undefined
	}
	mempty = this;
	/**
	 * Monoid append
	 * ```js
	 * nothing.mappend(just(3)).eql(nothing)
	 * ```
	 */
	mappend<B>(m: Maybe<B>) {
		return m;
	}
	mjoin() {
		return this;
	}
	/**
	 * Functor fmap
	 * 
	 * ```js
	 * nothing.fmap(id).eql(nothing);
	 * ```
	 */
	fmap(func) {
		return this;
	}
	mreturn(v) {
		return new Nothing;
	}
	/**
	 * Monad join
	 * 
	 * ```js
	 * nothing.join().eql(nothing)
	 * ```
	 */
	mbind(func) {
		return this;
	}
	/**
	 * Applicative apply
	 * 
	 * ```js
	 * nothing.fapply(just(2)).eql(nothing)
	 * ```
	 */
	fapply(m) {
		return this
	}
	foldr(_:any, z:A){
		return z;
	}
	foldl = this.foldr;
	
	pure = this.mreturn;
	eql(m: Maybe<A>):boolean {
			return false;
	}
}

export class Just<A> implements Maybe<A> {
	private value;
	static of(value) {
		return new Just(value);
	}
	constructor(value: A) {
		this.value = value;
	}

	mempty = nothing;
	/**
	 * Monoid append
	 * ```js
	 * just(2).mappend(just(3)).eql(just(5))
	 * ```
	 */
	mappend<A>(m: Maybe<A>):Maybe<any> {
		return this.fmap(a=>m.fmap(b=>a+b)).mjoin();
	}
	/**
	 * Applicative apply
	 * 
	 * ```js
	 * just(id).fapply(just(2)).eql(just(2))
	 * ```
	 */
	fapply<A extends I.AtoBfunc, B, C>(m:Maybe<C>):Just<B> {
		return <Just<B>>m.fmap(_=>this.value(_))
	}
	pure = Just.of;

	/**
	 * Functor fmap
	 * 
	 * ```js
	 * just(2).fmap(id).eql(just(2));
	 * ```
	 */
	fmap<B>(func: (A) => B): Just<B> {
		return new Just(func(this.value));
	}
	
	/**
	 * Monad join
	 * 
	 * ```js
	 * just(just(3)).mjoin().eql(just(3)).should.be.true
	 * ```
	 * `Maybe Maybe a -> Maybe a`
	 */
	mjoin():Maybe<A> {
		return this.mbind(id);
	}
	
	mreturn = this.pure;
	/**
	 * Monad bind =<<
	 * 
	 * ```js
	 * just(2).mbind(f).should.eql(f(2));
	 * ```
	 * `Maybe a -> (a -> Maybe b) -> Maybe b`
	 */
	mbind<B>(func: (A) => Maybe<A>): Maybe<A> {
		return func(this.value);
	}
	
	/**
	 * Foldable foldl
	 */
	foldl<A,B,C>(f:(A,B)=>Maybe<C>, z:A){
		return f(z,this.value)
	}
	foldr = this.foldl;
	eql(m: Maybe<A>):boolean {
			return maybe(false, _=> JSON.stringify(this.value) == JSON.stringify(_), m);
	}
}

/**
 * alias to Just's constructor
 */
export function just(value) { return new Just(value); };
/**
 * alias to Nothing()
 */
export const nothing = new Nothing();
/**
 * maybe function
 * 
 * apply function f to Maybe a, if Nothing, return default value
 * 
 * `maybe :: b -> (a -> b) -> Maybe a -> b` 
 * 
 */
export function maybe<A, B>(dv: B, f: (A) => B, m: Maybe<A>): B {
	if (m instanceof Just) {
		return f(m.mjoin());
	} else {
		return dv;
	}
}