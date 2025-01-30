import {
  Action,
  Actor,
  Expr,
  Match,
  PerformedAction,
  Reaction,
} from './astTypes.generated';
import type { Visitor } from './astTypes.generated';

export class AstPrinter implements Visitor<string> {
  print(expr: Expr): string {
    return expr.accept(this);
  }

  visitMatchExpr(expr: Match): string {
    return this.parenthesize('Match', ...expr.matchActions);
  }

  visitPerformedActionExpr(expr: PerformedAction): string {
    const args: Array<Expr> = [...expr.actors, expr.action];
    if (expr.reaction !== undefined) {
      args.push(expr.reaction);
    }

    return this.parenthesize('PerformedAction', ...args);
  }

  visitReactionExpr(expr: Reaction): string {
    return this.parenthesize('Reaction', ...expr.actors, expr.action);
  }

  visitActionExpr(expr: Action): string {
    return expr.actionIdentifier;
  }

  visitActorExpr(expr: Actor): string {
    return expr.actorIdentifier;
  }

  private parenthesize(name: string, ...exprs: Array<Expr>): string {
    let output = `(${name}`;

    for (const expr of exprs) {
      const expressionOutput = expr.accept(this);
      output += ` ${expressionOutput}`;
    }

    output += ')';
    return output;
  }
}
