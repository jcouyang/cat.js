import I = require("../interfaces");

interface Either<A> extends I.Applicative<A>, I.Monad<A>, I.Foldable<A>, I.Equivable{
}
class Alias {
	constructor(){}
	eql(m):boolean {
			return JSON.stringify(m) == JSON.stringify(this);
	}
}
const id = _=>_;
export class Right<A> extends Alias implements Either<A>{
	private value;
	static of(value) {
		return new Right(value);
	}
	pure = Right.of;
	mreturn = Right.of;
	
	constructor(value) {
		super()
		this.value = value
	}
	/**
	 * Functor fmap
	 * 
	 * ```js
	 * Right(1).fmap(id).should.eql(1);
	 * ```
	 */
	fmap(func) {
		return right(func(this.value));
	}
	/**
	 * Applicative apply
	 * 
	 * ```js
	 * Right(id).fapply(Right(2)).eql(2)
	 * ```
	 */
	fapply(m) {
		return m.fmap(_=>this.value(_))
	}
	/**
	 * Monad join
	 * 
	 * ```js
	 * nothing.join().eql(nothing)
	 * ```
	 */
	mbind(func) {
		return func(this.value);
	}
	mjoin() {
		return this.mbind(id);
	}
		/**
	 * Fold
	 */
	foldMap(f) {
		return f(this.value);
	}
	
	foldr<A,B>(f, z:B):B{
		return f(this.value,z);
	}
	
	foldl<A,B>(f, z:B):B{
		return f(z,this.value);
	}
	
	fold(){
		return this.foldMap(id);
	}
	length(){
		return 1;
	}
	toString() {
		return `#<Left #{this.value.toString()}>`
	}
}

export class Left<A> extends Alias implements Either<A> {
	private value;
	static of(value) {
		return new Left(value);
	}
	pure = Left.of;
	mreturn = Left.of;
	
	constructor(value: A) {
		super()
		this.value = value;
	}

	/**
	 * Functor fmap
	 * 
	 * ```js
	 * just(2).fmap(id).eql(just(2));
	 * ```
	 */
	fmap<B>(func: (A) => B): Either<B> {
		return right(func(this.value));
	}
	/**
	 * Applicative apply
	 * 
	 * ```js
	 * just(id).fapply(just(2)).eql(just(2))
	 * ```
	 */
	fapply<A extends I.AtoBfunc, B, C>(m:Either<C>):Either<B> {
		return <Either<B>>m.fmap(_=>this.value(_))
	}
	/**
	 * Monad bind =<<
	 * 
	 * ```js
	 * just(2).mbind(f).should.eql(f(2));
	 * ```
	 * `Maybe a -> (a -> Maybe b) -> Maybe b`
	 */
	mbind<B>(func: (A) => Either<A>): Either<A> {
		return func(this.value);
	}
	mjoin() {
		return this.mbind(id);
	}
	/**
	 * Fold
	 */
	foldMap(_:any) {
		if (_.mempty) return _.mempty;
		if (_ instanceof Array) return [];
		return null;
	}
	
	foldr<A,B>(f, z:B):B{
		return z
	}
	
	foldl<A,B>(f, z:B):B{
		return z
	}
	
	fold(){
		return this.foldMap(id);
	}
	length(){
		return 0;
	}
	eql(m: Either<A>):boolean {
			return JSON.stringify(m) == JSON.stringify(this);
	}
	
	toString() {
		return `#<Left #{this.value.toString()}>`
	}
}

/**
 * alias to Just's constructor
 */
export function right(value) { return new Right(value); };
export function left(value) { return new Left(value); };

/**
 * either function
 * 
 * 
 * 
 * `either :: (a -> c) -> (b -> c) -> Either a b -> c` 
 * 
 */
export function either<A,B,C>(l:(A)=>C, r: (B) => C, e: Either<A|B>): C {
	if (e instanceof Left) {
		return l(e.mbind(id));
	} else if (e instanceof Right){
		return r(e.mbind(id));
	}
}