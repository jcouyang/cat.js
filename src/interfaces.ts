export interface Semigroup {
	mappend(s:Semigroup):Semigroup;
}

export interface Monoid extends Semigroup{
	mempty:Monoid;
}

export interface Functor<A> {
	fmap<A,B>(func:(A)=>B):Functor<B>;
}

interface AtoBfunc {
	<A,B>(A):B;
}

export interface Applicative<C> extends Functor<C>{
	fapply<A,B,C extends AtoBfunc>(a:Applicative<A>):Applicative<B>;
	pure<C>(v:C):Applicative<C>;
}

export interface Monad<A> extends Applicative<A> {
	mbind<B>(func:(A)=>Monad<A|B>):Monad<A|B>;
	mreturn(v:A):Monad<A>
}

export interface Equivable {
	eql(e: Equivable):boolean
}