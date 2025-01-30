export class Expr {
	constructor() {}
	accept<R>(visitor: Visitor<R>): R { throw new Error("accept not implemented"); }
};

export interface Visitor<R> {
	visitMatchExpr: (expr: Match) => R;
	visitPerformedActionExpr: (expr: PerformedAction) => R;
	visitReactionExpr: (expr: Reaction) => R;
	visitActionExpr: (expr: Action) => R;
	visitActorExpr: (expr: Actor) => R;
}

export class Match extends Expr {
	matchActions: Array<PerformedAction>;

	constructor(matchActions: Array<PerformedAction>) {
		super();
		this.matchActions = matchActions;
	}

	accept<R>(visitor: Visitor<R>): R {
		return visitor.visitMatchExpr(this);
	}
}

export class PerformedAction extends Expr {
	actors: Array<Actor>;
	action: Action;
	reaction?: Reaction;

	constructor(actors: Array<Actor>, action: Action, reaction?: Reaction) {
		super();
		this.actors = actors;
		this.action = action;
		this.reaction = reaction;
	}

	accept<R>(visitor: Visitor<R>): R {
		return visitor.visitPerformedActionExpr(this);
	}
}

export class Reaction extends Expr {
	actors: Array<Actor>;
	action: Action;

	constructor(actors: Array<Actor>, action: Action) {
		super();
		this.actors = actors;
		this.action = action;
	}

	accept<R>(visitor: Visitor<R>): R {
		return visitor.visitReactionExpr(this);
	}
}

export class Action extends Expr {
	actionIdentifier: string;

	constructor(actionIdentifier: string) {
		super();
		this.actionIdentifier = actionIdentifier;
	}

	accept<R>(visitor: Visitor<R>): R {
		return visitor.visitActionExpr(this);
	}
}

export class Actor extends Expr {
	actorIdentifier: string;

	constructor(actorIdentifier: string) {
		super();
		this.actorIdentifier = actorIdentifier;
	}

	accept<R>(visitor: Visitor<R>): R {
		return visitor.visitActorExpr(this);
	}
}
