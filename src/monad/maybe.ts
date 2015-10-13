import I = require("../interfaces");
interface Maybe<A> extends I.Monad<A>, I.Monoid, I.Equivable{
	mjoin(): Maybe<A>;
}
const id = _=>_;
export class Nothing<A> implements Maybe<A>{
	private value;
	constructor() {
		this.value = undefined
	}
	mempty = this;
	mappend<B>(m: Maybe<B>) {
		return m;
	}
	mjoin() {
		return this;
	}
	fmap(func) {
		return this;
	}
	mreturn(v) {
		return new Nothing;
	}
	mbind(func) {
		return this;
	}
	fapply(m) {
		return this
	}
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
	// Monoid
	mempty = new Nothing;
	/**
	 * ##Monoid append
	 * ```js
	 * this.fmap(a=>m.fmap(b=>a+b)).mjoin();
	 * ```
	 * @param {Maybe}
	 * @return {Maybe}
	 * @api public
	 */
	mappend<A>(m: Maybe<A>):Maybe<any> {
		return this.fmap(a=>m.fmap(b=>a+b)).mjoin();
	}
	
	//Applicative
	fapply(m) {
		return m.fmap(_=>this.value(_))
	}
	pure = Just.of;

	// Functor
	fmap<B>(func: (A) => A|B): Just<A|B> {
		return new Just(func(this.value));
	}
	
	// Monad
	mjoin():Maybe<A> {
		return this.mbind(id);
	}
	
	mreturn = this.pure;
	
	mbind<B>(func: (A) => Maybe<A>): Maybe<A> {
		return func(this.value);
	}
	
	eql(m: Maybe<A>):boolean {
			return maybe(false, _=> JSON.stringify(this.value) == JSON.stringify(_), m);
	}
}

// alias of constructor
export function just(value) { return new Just(value); };
export const nothing = new Nothing();

//maybe :: b -> (a -> b) -> Maybe a -> b 
export function maybe<A, B>(dv: B, f: (A) => B, m: Maybe<A>): B {
	if (m instanceof Just) {
		return f(m.mbind(_=> _));
	} else {
		return dv;
	}
}