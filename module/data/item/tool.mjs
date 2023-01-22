import SystemDataModel from "../abstract.mjs";
import { FormulaField } from "../fields.mjs";
import EquippableItemTemplate from "./templates/equippable-item.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";
import PhysicalItemTemplate from "./templates/physical-item.mjs";

/**
 * Data definition for Tool items.
 * @mixes ItemDescriptionTemplate
 * @mixes PhysicalItemTemplate
 * @mixes EquippableItemTemplate
 *
 * @property {string} toolType    Tool category as defined in `MOJO.toolTypes`.
 * @property {string} baseItem    Base tool as defined in `MOJO.toolIds` for determining proficiency.
 * @property {string} ability     Default ability when this tool is being used.
 * @property {string} chatFlavor  Additional text added to chat when this tool is used.
 * @property {number} proficient  Level of proficiency in this tool as defined in `MOJO.proficiencyLevels`.
 * @property {string} bonus       Bonus formula added to tool rolls.
 */
export default class ToolData extends SystemDataModel.mixin(
  ItemDescriptionTemplate, PhysicalItemTemplate, EquippableItemTemplate
) {
  /** @inheritdoc */
  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      toolType: new foundry.data.fields.StringField({required: true, label: "MOJO.ItemToolType"}),
      baseItem: new foundry.data.fields.StringField({required: true, label: "MOJO.ItemToolBase"}),
      ability: new foundry.data.fields.StringField({
        required: true, initial: "int", blank: false, label: "MOJO.DefaultAbilityCheck"
      }),
      chatFlavor: new foundry.data.fields.StringField({required: true, label: "MOJO.ChatFlavor"}),
      proficient: new foundry.data.fields.NumberField({
        required: true, nullable: false, initial: 0, min: 0, label: "MOJO.ItemToolProficiency"
      }),
      bonus: new FormulaField({required: true, label: "MOJO.ItemToolBonus"})
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  static migrateData(source) {
    ToolData.#migrateAbility(source);
    return super.migrateData(source);
  }

  /* -------------------------------------------- */

  /**
   * Migrate the ability field.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateAbility(source) {
    if ( Array.isArray(source.ability) ) source.ability = source.ability[0];
  }
}
