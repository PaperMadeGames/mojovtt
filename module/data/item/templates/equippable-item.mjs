/**
 * Data model template with information on items that can be attuned and equipped.
 *
 * @property {number} attunement  Attunement information as defined in `MOJO.attunementTypes`.
 * @property {boolean} equipped   Is this item equipped on its owning actor.
 * @mixin
 */
export default class EquippableItemTemplate extends foundry.abstract.DataModel {
  /** @inheritdoc */
  static defineSchema() {
    return {
      attunement: new foundry.data.fields.NumberField({
        required: true, integer: true, initial: CONFIG.MOJO.attunementTypes.NONE, label: "MOJO.Attunement"
      }),
      equipped: new foundry.data.fields.BooleanField({required: true, label: "MOJO.Equipped"})
    };
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  static migrateData(source) {
    EquippableItemTemplate.#migrateAttunement(source);
    EquippableItemTemplate.#migrateEquipped(source);
  }

  /* -------------------------------------------- */

  /**
   * Migrate the item's attuned boolean to attunement string.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateAttunement(source) {
    if ( (source.attuned === undefined) || (source.attunement !== undefined) ) return;
    source.attunement = source.attuned ? CONFIG.MOJO.attunementTypes.ATTUNED : CONFIG.MOJO.attunementTypes.NONE;
  }

  /* -------------------------------------------- */

  /**
   * Migrate the equipped field.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateEquipped(source) {
    if ( (source.equipped === null) || (source.equipped === undefined) ) source.equipped = false;
  }
}
