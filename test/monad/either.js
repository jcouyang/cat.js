const Either = require('../../build/monad/either'),
      Right = Either.Right,
      either = Either.either,
      Left = Either.Left,
      left = Either.left,
      right = Either.right,
      should = require('should');
const id = _=>_,
      f = _=>_+1,
      g = _=>_-2;
      
describe('Either', function() {
  describe('init', function() {
    it('constructor', function() {
      Right.of(3).value.should.be.eql(3);
      right(3).value.should.be.eql(3);
    })
    
    it('join will take value out',function() {
      right(3).mjoin().should.eql(3);
      Left.of(3).mjoin().should.eql(3);
    })
  })

  describe('functor rules', function() {
    it('#1 identity', function() {
      right(2).fmap(id).eql(right(2));
    })
    it('#2 composition', function() {
      right(2).fmap(x=>f(g(x))).eql(
        right(2).fmap(g).fmap(f)
      )
    })
  })

  describe('aplicative rules', function() {
    it('#1 identity', function() {
      left(id).fapply(left(2)).eql(left(2)).should.be.true;
    })
    it('#2 homomorphism', function() {
      right(f).fapply(right(2)).eql(right(3)).should.be.true;
    })
    it('#3 interchange', function() {
      right(f).fapply(right(2)).eql(right(f=>f(2)).fapply(right(f))).should.be.true;
    })
  })
  
  describe('monad rules', function() {
    it('#1 left identity', function() {
      right(2).mbind(f).should.eql(f(2));
    })
    it('#2 right identity', function() {
      left(2).mbind(Left.of).eql(left(2)).should.be.true;
    })
    it('#3 associativity', function() {
      var f = _=>right(_=>_+1),
          g = _=>right(_=>_-2)
      right(2).mbind(f).mbind(g).eql(right(2).mbind(x=>f(x).mbind(g))).should.be.true
    })
  })

  describe('foldabale', function() {
    it('can fold value', function() {
      right(1).foldl((a,b)=>right(a+b), 1).eql(right(2)).should.be.true;
      left(1).foldl((a,b)=>right(a+b), 1).should.eql(1);   
    })
  })
  
  describe('either function', function() {
    it('apply right function', function() {
      either(f, g, right(2)).should.be.eql(0);
    })
    it('apply left function', function() {
      either(f, g, left(2)).should.be.eql(3);
    })
  })
})
