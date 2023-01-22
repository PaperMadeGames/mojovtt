/**
 * A simple form to set actor movement speeds.
 */
export default class ActorMovementConfig extends DocumentSheet {

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["mojo"],
      template: "systems/mojo/templates/apps/movement-config.hbs",
      width: 300,
      height: "auto"
    });
  }

  /* -------------------------------------------- */

  /** @override */
  get title() {
    return `${game.i18n.localize("MOJO.MovementConfig")}: ${this.document.name}`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData(options={}) {
    const source = this.document.toObject();

    // Current movement values
    const movement = source.system.attributes?.movement || {};
    for ( let [k, v] of Object.entries(movement) ) {
      if ( ["units", "hover"].includes(k) ) continue;
      movement[k] = Number.isNumeric(v) ? v.toNearest(0.1) : 0;
    }

    // Allowed speeds
    const speeds = source.type === "group" ? {
      land: "MOJO.MovementLand",
      water: "MOJO.MovementWater",
      air: "MOJO.MovementAir"
    } : {
      walk: "MOJO.MovementWalk",
      burrow: "MOJO.MovementBurrow",
      climb: "MOJO.MovementClimb",
      fly: "MOJO.MovementFly",
      swim: "MOJO.MovementSwim"
    };

    // Return rendering context
    return {
      speeds,
      movement,
      selectUnits: source.type !== "group",
      canHover: source.type !== "group",
      units: CONFIG.MOJO.movementUnits
    };
  }
}
