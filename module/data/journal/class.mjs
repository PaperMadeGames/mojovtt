/**
 * Data definition for Class Summary journal entry pages.
 *
 * @property {string} item                             UUID of the class item included.
 * @property {object} description
 * @property {string} description.value                Introductory description for the class.
 * @property {string} description.additionalHitPoints  Additional text displayed beneath the hit points section.
 * @property {string} description.additionalTraits     Additional text displayed beneath the traits section.
 * @property {string} description.additionalEquipment  Additional text displayed beneath the equipment section.
 * @property {string} description.subclass             Introduction to the subclass section.
 * @property {string} subclassHeader                   Subclass header to replace the default.
 * @property {Set<string>} subclassItems               UUIDs of all subclasses to display.
 */
export default class ClassJournalPageData extends foundry.abstract.DataModel {
  static defineSchema() {
    return {
      item: new foundry.data.fields.StringField({required: true, label: "JOURNALENTRYPAGE.MOJO.Class.Item"}),
      description: new foundry.data.fields.SchemaField({
        value: new foundry.data.fields.HTMLField({
          label: "JOURNALENTRYPAGE.MOJO.Class.Description",
          hint: "JOURNALENTRYPAGE.MOJO.Class.DescriptionHint"
        }),
        additionalHitPoints: new foundry.data.fields.HTMLField({
          label: "JOURNALENTRYPAGE.MOJO.Class.AdditionalHitPoints",
          hint: "JOURNALENTRYPAGE.MOJO.Class.AdditionalHitPointsHint"
        }),
        additionalTraits: new foundry.data.fields.HTMLField({
          label: "JOURNALENTRYPAGE.MOJO.Class.AdditionalTraits",
          hint: "JOURNALENTRYPAGE.MOJO.Class.AdditionalTraitsHint"
        }),
        additionalEquipment: new foundry.data.fields.HTMLField({
          label: "JOURNALENTRYPAGE.MOJO.Class.AdditionalEquipment",
          hint: "JOURNALENTRYPAGE.MOJO.Class.AdditionalEquipmentHint"
        }),
        subclass: new foundry.data.fields.HTMLField({
          label: "JOURNALENTRYPAGE.MOJO.Class.SubclassDescription",
          hint: "JOURNALENTRYPAGE.MOJO.Class.SubclassDescriptionHint"
        })
      }),
      subclassHeader: new foundry.data.fields.StringField({
        label: "JOURNALENTRYPAGE.MOJO.Class.SubclassHeader"
      }),
      subclassItems: new foundry.data.fields.SetField(new foundry.data.fields.StringField(), {
        label: "JOURNALENTRYPAGE.MOJO.Class.SubclassItems"
      })
    };
  }
}
