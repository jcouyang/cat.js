const Maybe = require('../../build/monad/maybe'),
      Just = Maybe.Just,
      just = Maybe.just,
      nothing = Maybe.nothing,
      maybe = Maybe.maybe,
      should = require('should');
const id = _=>_,
      f = _=>_+1,
      g = _=>_-2;
      
describe('Maybe', function() {
  describe('init', function() {
    it('constructor', function() {
      Just.of(3).value.should.be.eql(3)
    })
    
    it('join will take value out',function() {
      just(3).mjoin().should.eql(3);
      Just.of(3).mjoin().should.eql(3);
    })
  })

  describe('functor rules', function() {
    it('#1 identity', function() {
      just(2).fmap(id).eql(just(2));
    })
    it('#2 composition', function() {
      just(2).fmap(x=>f(g(x))).eql(
        just(2).fmap(g).fmap(f)
      )
    })
  })

  describe('aplicative rules', function() {
    it('#1 identity', function() {
      just(id).fapply(just(2)).eql(just(2)).should.be.true;
    })
    it('#2 homomorphism', function() {
      just(f).fapply(just(2)).eql(just(3)).should.be.true;
    })
    it('#3 interchange', function() {
      just(f).fapply(just(2)).eql(just(f=>f(2)).fapply(just(f))).should.be.true;
    })


  })
  describe('monoid rules', function() {
    it('should concat whats inside Maybe', function() {
      just(2).mappend(just(3)).eql(just(5)).should.be.true;
      just([2]).mappend(just([3])).eql(just([2,3])).should.be.true;
    })
    it('should be it self if mappend Nothing', function() {
      just(2).mappend(nothing).eql(just(2)).should.be.true;
      nothing.mappend(just(2)).eql(just(2)).should.be.true;
    })
  })
  
  describe('monad rules', function() {
    it('#1 left identity', function() {
      just(2).mbind(f).should.eql(f(2));
    })
    it('#2 right identity', function() {
      just(2).mbind(Just.of).eql(just(2)).should.be.true;
    })
    it('#3 associativity', function() {
      var f = _=>just(_=>_+1),
          g = _=>just(_=>_-2)
      just(2).mbind(f).mbind(g).eql(just(2).mbind(x=>f(x).mbind(g))).should.be.true
    })
  })

  describe('maybe function', function() {
    it('apply function if Maybe is Just', function() {
      maybe(false, Boolean, Just(2)).should.be.true;
    })
    it('return default if Maybe is Nothing', function() {
      maybe(false, Boolean, nothing).should.be.false;
    })
  })
})
