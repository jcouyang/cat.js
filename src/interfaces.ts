export interface Semigroup<A> {
	mappend(s:Semigroup<A>):Semigroup<A>;
}

export interface Monoid<A> extends Semigroup<A>{
	mempty:Monoid<A>;
}

export interface Foldable<A> {
	fold(m: Monoid<A>):Monoid<A>;
	foldMap<A,B>(f:(A)=>Monoid<B>):Monoid<B>;
	foldr<A,B>(f:(A,B)=>B, b:B):B;
	foldl<A,B>(f:(B,A)=>B, b:B):B
}

export interface Functor<A> {
	fmap<A,B>(func:(A)=>B):Functor<B>;
}

export interface AtoBfunc {
	<A,B>(A):B;
}

export interface Applicative<C> extends Functor<C>{
	fapply<A,B,C extends AtoBfunc>(a:Applicative<A>):Applicative<B>;
	pure<C>(v:C):Applicative<C>;
}

export interface Monad<A> {
	mbind<B>(func:(A)=>Monad<A|B>):Monad<A|B>;
	mreturn(v:A):Monad<A>
}

export interface Equivable {
	eql(e: Equivable):boolean
}