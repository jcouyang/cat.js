import Type from 'union-type';
import merge from 'ramda/src/merge.js';
const Any = () => true;
const TypeClass = Type({Functor: [Any],
                        Applicative: [Any],
                        Monad: [Any],
                        Show:[Any]});
const Instance = Type({
  instance: [TypeClass],
});
const instance = Instance.instance;

Instance.prototype.where = function(implement) {
  TypeClass.case({
    Functor: a => a.prototype = merge(a.prototype,implement),
    Applicative: a => a.prototype = merge(a.prototype,implement),
    Monad: a => a.prototype = merge(a.prototype,implement),
    Show: a => a.prototype.toString = implement.toString,
  }, this[0]);
}

const Maybe = Type({Just: [Any], Nothing: []});

instance(TypeClass.Functor(Maybe)).where({
  map: function(f){
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
      Just: f => m.map(f),
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

instance(TypeClass.Show(Maybe)).where({
  toString: function(){
    return Maybe.case({
      Just: x => `Just(${x})`,
      Nothing: ()=>"Nothing",
    },this)
  }
})

export default Maybe;
