import {
  Action,
  Actor,
  Match,
  PerformedAction,
  Reaction,
} from './astTypes.generated';

import { AstPrinter } from './AstPrinter';

const bretHart = new Actor('BretHart');
const undertaker = new Actor('Undertaker');
const punch = new Action('Punch');
const fallDown = new Action('FallDown');
const noSell = new Action('NoSell');

const tree = new Match([
  new PerformedAction([bretHart], punch, new Reaction([undertaker], noSell)),
  new PerformedAction([bretHart], punch, new Reaction([undertaker], noSell)),
  new PerformedAction([bretHart], punch, new Reaction([undertaker], noSell)),
  new PerformedAction([undertaker], punch, new Reaction([bretHart], fallDown)),
]);

console.log(new AstPrinter().print(tree));
