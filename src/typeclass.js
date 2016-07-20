import Type from 'union-type';
const Any = () => true;
Type.Any = Any;
const TypeClass = Type({Functor: [Any],
                        Applicative: [Any],
                        Monad: [Any],
                        Show:[Any],
                        Eq:[Any]});
const Instance = Type({
  instance: [TypeClass],
});

const instance = Instance.instance;

const extend = function(protocal, implement){
  return function(a){
    for (let method in protocal) {
      a.prototype[method] = implement[method]
    }
  }
}
// TypeClass prototcal
Instance.prototype.where = function(implement) {
  TypeClass.case({
    Functor: extend({
      fmap: (fn) => `fmap not implemented`
    }, implement),
    Applicative: extend({
      pure: v => 'pure not implemented',
      ap: functor => `ap not implemented`
    }, implement),
    Monad: extend({
      mbind: fn => 'mbind not implemented',
      return: v => 'return not implemented'
    }, implement),
    Show: a => a.prototype.toString = implement.show,
    Eq: extend({
      eq: other => 'eq not implemented'
    }, implement)
  }, this[0]);
}
export default TypeClass
export {instance}
