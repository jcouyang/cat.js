import Type from 'union-type'
import TypeClass, {instance} from '../typeclass'

const Maybe = Type({Just: [Type.Any], Nothing: []});

instance(TypeClass.Functor(Maybe)).where({
  fmap: function(f){
    return Maybe.case({
      Just: a => Maybe.Just(f(a)),
      Nothing: () => Nothing(),
    }, this)
  },
});

instance(TypeClass.Applicative(Maybe)).where({
  pure: Maybe.Just,
  ap: function(m) {
    return Maybe.case({
      Just: f => m.fmap(f),
      Nothing: () => Nothing(),
    }, this)
  }
});

instance(TypeClass.Monad(Maybe)).where({
  return: Maybe.Just,
  fail: () => Nothing(),
  mbind: function(k){
    return Maybe.case({
      Just: x => k(x),
      Nothing: () => Nothing(),
    }, this)
  }
});

instance(TypeClass.Eq(Maybe)).where({
  eq: function(other){
    return Maybe.case({
      Just: x => Maybe.case({
        Just: y => x == y,
        Nothing: false
      }, other),
      Nothing: () => Maybe.case({
        Just: y => false,
        Nothing: true
      }, other)
    }, this)
  }
})
instance(TypeClass.Show(Maybe)).where({
  show: function(){
    return Maybe.case({
      Just: x => `Just(${x})`,
      Nothing: ()=>"Nothing",
    },this)
  }
});

export default Maybe;
