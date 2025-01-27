* match
    * A collection of performed sequences
* sequence
    * A named sequence of performed actions or invocations of other sequences
* action
    * Named declaration
* actor
    * Named declaration
* Single-line comment operator (#)
* Multiple-actor operator (,)
    * Used to specify multiple actors or reactors performing a single action
    * e.g. Double-dropkick, ref bump
* Dot operator (.)
    * Performs an action one or more actors (i.e. <actor>.<action> or <actor1>, <actor2>.action
    * Can be expanded with perform-on operator
* Perform-on operator (=>)
    * Applies an action from one or more actors to one or more reactors
    * Not required for all actions