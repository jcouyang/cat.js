import test from 'tape';
import {check, gen, property } from 'testcheck';
import Maybe from '../../src/monad/maybe.js'
const Just = Maybe.Just
const Nothing = Maybe.Nothing
let id = _ => _

test('Functor rules', t => {
  t.plan(2)
  
  t.true(check(
    property(
      [gen.int],
      a => Just(a).fmap(id).eq(Just(a))
    )
  ).result, 'identity')

  let f = x=>x+3
  let g = x=>x*5
  t.true(check(
    property(
      [gen.int],
      a => Just(a).fmap(x=>f(g(x))).eq(Just(a).fmap(g).fmap(f))
    )
  ).result, 'composition')
})

test('applicative rules', t=>{
  t.plan(3)

  t.true(check(property(
    [gen.int],
    a => Just(id).ap(Just(a)).eq(Just(a))
  )).result, 'identity')

  let f = _ => _ + 1
  t.true(check(property(
    [gen.int],
    a => Just(f).ap(Just(a)).eq(Just(f(a)))
  )).result, 'homomorphism')
  
  t.true(check(property(
    [gen.int],
    a => Just(f).ap(Just(a)).eq(Just(f=>f(a)).ap(Just(f)))
  )).result, 'interchange')
})


//   describe('monad rules', function() {
//     it('#1 left identity', function() {
//       just(2).mbind(f).should.eql(f(2));
//     })
//     it('#2 right identity', function() {
//       just(2).mbind(Just.of).eql(just(2)).should.be.true;
//     })
//     it('#3 associativity', function() {
//       var f = _=>just(_=>_+1),
//           g = _=>just(_=>_-2)
//       just(2).mbind(f).mbind(g).eql(just(2).mbind(x=>f(x).mbind(g))).should.be.true
//     })
//   })

test('monad rules', t =>{
  t.plan(3)
  let mf = x => Just(x+1)
  let f = x => x+1
  t.true(check(property(
    [gen.int],
    a => Just(a).mbind(mf).eq(Just(f(a)))
  )).result, 'left identity')

  t.true(check(property(
    [gen.int],
    a => Just(a).mbind(Just).eq(Just(a))
  )).result, 'right identity')

  let mg = x=> Just(x * 5)
  t.true(check(property(
    [gen.int],
    a => Just(a).mbind(mf).mbind(mg).eq(Just(a).mbind(x=>mf(x).mbind(mg)))
  )).result, 'associativity')
})

//   describe('monoid rules', function() {
//     it('should concat whats inside Maybe', function() {
//       just(2).mappend(just(3)).eql(just(5)).should.be.true;
//       just([2]).mappend(just([3])).eql(just([2,3])).should.be.true;
//     })
//     it('should be it self if mappend Nothing', function() {
//       just(2).mappend(nothing).eql(just(2)).should.be.true;
//       nothing.mappend(just(2)).eql(just(2)).should.be.true;
//     })
//     it('associativity', function() {
//       just(2).mappend(just(1)).mappend(just(3)).eql(
//         just(2).mappend(just(1).mappend(just(3)))
//       ).should.be.true;
//     })
//   })
  
