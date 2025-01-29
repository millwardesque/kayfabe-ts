export class Expr {
	constructor() {}
};

interface Visitor<R> {
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
}

export class Reaction extends Expr {
	actors: Array<Actor>;
	action: Action;

	constructor(actors: Array<Actor>, action: Action) {
		super();
		this.actors = actors;
		this.action = action;
	}
}

export class Action extends Expr {
	actionIdentifier: string;

	constructor(actionIdentifier: string) {
		super();
		this.actionIdentifier = actionIdentifier;
	}
}

export class Actor extends Expr {
	actorIdentifier: string;

	constructor(actorIdentifier: string) {
		super();
		this.actorIdentifier = actorIdentifier;
	}
}
