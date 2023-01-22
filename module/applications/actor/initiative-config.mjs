/**
 * A simple sub-application of the ActorSheet which is used to configure properties related to initiative.
 */
export default class ActorInitiativeConfig extends DocumentSheet {

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["mojo"],
      template: "systems/mojo/templates/apps/initiative-config.hbs",
      width: 360,
      height: "auto"
    });
  }

  /* -------------------------------------------- */

  /** @override */
  get title() {
    return `${game.i18n.localize("MOJO.InitiativeConfig")}: ${this.document.name}`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData(options={}) {
    const source = this.document.toObject();
    const init = source.system.attributes.init || {};
    const flags = source.flags.mojo || {};
    return {
      ability: init.ability,
      abilities: CONFIG.MOJO.abilities,
      bonus: init.bonus,
      initiativeAlert: flags.initiativeAlert,
      initiativeAdv: flags.initiativeAdv
    };
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _getSubmitData(updateData={}) {
    const formData = super._getSubmitData(updateData);
    formData.flags = {mojo: {}};
    for ( const flag of ["initiativeAlert", "initiativeAdv"] ) {
      const k = `flags.mojo.${flag}`;
      if ( formData[k] ) formData.flags.mojo[flag] = true;
      else formData.flags.mojo[`-=${flag}`] = null;
      delete formData[k];
    }
    return formData;
  }
}
