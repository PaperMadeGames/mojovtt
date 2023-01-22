/**
 * The Mojo game system for Foundry Virtual Tabletop
 */

// Import Configuration
import MOJO from "./module/config.mjs";
import registerSystemSettings from "./module/settings.mjs";

// Import Submodules
import * as applications from "./module/applications/_module.mjs";
import * as canvas from "./module/canvas/_module.mjs";
import * as dataModels from "./module/data/_module.mjs";
import * as dice from "./module/dice/_module.mjs";
import * as documents from "./module/documents/_module.mjs";
import * as migrations from "./module/migration.mjs";
import * as utils from "./module/utils.mjs";
import {ModuleArt} from "./module/module-art.mjs";

/* -------------------------------------------- */
/*  Define Module Structure                     */
/* -------------------------------------------- */

globalThis.mojo = {
  applications,
  canvas,
  config: MOJO,
  dataModels,
  dice,
  documents,
  migrations,
  utils
};

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", function() {
  globalThis.mojo = game.mojo = Object.assign(game.system, globalThis.mojo);
  console.log(`Mojo | Initializing the Mojo Game System - Version ${mojo.version}\n${MOJO.ASCII}`);

  // /** @deprecated */
  // Object.defineProperty(mojo, "entities", {
  //   get() {
  //     foundry.utils.logCompatibilityWarning(
  //       "You are referencing the 'mojo.entities' property which has been deprecated and renamed to "
  //       + "'mojo.documents'. Support for this old path will be removed in a future version.",
  //       { since: "Mojo 2.0", until: "Mojo 2.2" }
  //     );
  //     return mojo.documents;
  //   }
  // });

  // /** @deprecated */
  // Object.defineProperty(mojo, "rollItemMacro", {
  //   get() {
  //     foundry.utils.logCompatibilityWarning(
  //       "You are referencing the 'mojo.rollItemMacro' method which has been deprecated and renamed to "
  //       + "'mojo.documents.macro.rollItem'. Support for this old path will be removed in a future version.",
  //       { since: "Mojo 2.0", until: "Mojo 2.2" }
  //     );
  //     return mojo.documents.macro.rollItem;
  //   }
  // });

  // /** @deprecated */
  // Object.defineProperty(mojo, "macros", {
  //   get() {
  //     foundry.utils.logCompatibilityWarning(
  //       "You are referencing the 'mojo.macros' property which has been deprecated and renamed to "
  //       + "'mojo.documents.macro'. Support for this old path will be removed in a future version.",
  //       { since: "Mojo 2.0", until: "Mojo 2.2" }
  //     );
  //     return mojo.documents.macro;
  //   }
  // });

  // Record Configuration Values
  CONFIG.MOJO = MOJO;
  CONFIG.ActiveEffect.documentClass = documents.ActiveEffect5e;
  CONFIG.Actor.documentClass = documents.Actor5e;
  CONFIG.Item.documentClass = documents.Item5e;
  CONFIG.Token.documentClass = documents.TokenDocument5e;
  CONFIG.Token.objectClass = canvas.Token5e;
  CONFIG.time.roundTime = 6;
  CONFIG.Dice.DamageRoll = dice.DamageRoll;
  CONFIG.Dice.D20Roll = dice.D20Roll;
  CONFIG.MeasuredTemplate.defaults.angle = 53.13; // 5e cone RAW should be 53.13 degrees
  CONFIG.ui.combat = applications.combat.CombatTracker5e;

  // Register System Settings
  registerSystemSettings();

  // Validation strictness.
  _determineValidationStrictness();

  // Configure module art.
  game.mojo.moduleArt = new ModuleArt();

  // Remove honor & sanity from configuration if they aren't enabled
  if ( !game.settings.get("mojo", "honorScore") ) {
    delete MOJO.abilities.hon;
    delete MOJO.abilityAbbreviations.hon;
  }
  if ( !game.settings.get("mojo", "sanityScore") ) {
    delete MOJO.abilities.san;
    delete MOJO.abilityAbbreviations.san;
  }

  // Patch Core Functions
  Combatant.prototype.getInitiativeRoll = documents.combat.getInitiativeRoll;

  // Register Roll Extensions
  CONFIG.Dice.rolls.push(dice.D20Roll);
  CONFIG.Dice.rolls.push(dice.DamageRoll);

  // Hook up system data types
  CONFIG.Actor.systemDataModels = dataModels.actor.config;
  CONFIG.Item.systemDataModels = dataModels.item.config;
  CONFIG.JournalEntryPage.systemDataModels = dataModels.journal.config;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("mojo", applications.actor.ActorSheet5eCharacter, {
    types: ["character"],
    makeDefault: true,
    label: "MOJO.SheetClassCharacter"
  });
  // Actors.registerSheet("mojo", applications.actor.ActorSheet5eNPC, {
  //   types: ["npc"],
  //   makeDefault: true,
  //   label: "MOJO.SheetClassNPC"
  // });
  // Actors.registerSheet("mojo", applications.actor.ActorSheet5eVehicle, {
  //   types: ["vehicle"],
  //   makeDefault: true,
  //   label: "MOJO.SheetClassVehicle"
  // });
  // Actors.registerSheet("mojo", applications.actor.GroupActorSheet, {
  //   types: ["group"],
  //   makeDefault: true,
  //   label: "MOJO.SheetClassGroup"
  // });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("mojo", applications.item.ItemSheet5e, {
    makeDefault: true,
    label: "MOJO.SheetClassItem"
  });
  DocumentSheetConfig.registerSheet(JournalEntryPage, "mojo", applications.journal.JournalClassPageSheet, {
    label: "MOJO.SheetClassClassSummary",
    types: ["class"]
  });

  // Preload Handlebars helpers & partials
  utils.registerHandlebarsHelpers();
  utils.preloadHandlebarsTemplates();
});

/**
 * Determine if this is a 'legacy' world with permissive validation, or one where strict validation is enabled.
 * @internal
 */
function _determineValidationStrictness() {
  dataModels.SystemDataModel._enableV10Validation = game.settings.get("mojo", "strictValidation");
}

/**
 * Update the world's validation strictness setting based on whether validation errors were encountered.
 * @internal
 */
async function _configureValidationStrictness() {
  if ( !game.user.isGM ) return;
  const invalidDocuments = game.actors.invalidDocumentIds.size + game.items.invalidDocumentIds.size;
  const strictValidation = game.settings.get("mojo", "strictValidation");
  if ( invalidDocuments && strictValidation ) {
    await game.settings.set("mojo", "strictValidation", false);
    game.socket.emit("reload");
    foundry.utils.debouncedReload();
  }
}

/* -------------------------------------------- */
/*  Foundry VTT Setup                           */
/* -------------------------------------------- */

/**
 * Prepare attribute lists.
 */
Hooks.once("setup", function() {
  CONFIG.MOJO.trackableAttributes = expandAttributeList(CONFIG.MOJO.trackableAttributes);
  CONFIG.MOJO.consumableResources = expandAttributeList(CONFIG.MOJO.consumableResources);
  game.mojo.moduleArt.registerModuleArt();
});

/* --------------------------------------------- */

/**
 * Expand a list of attribute paths into an object that can be traversed.
 * @param {string[]} attributes  The initial attributes configuration.
 * @returns {object}  The expanded object structure.
 */
function expandAttributeList(attributes) {
  return attributes.reduce((obj, attr) => {
    foundry.utils.setProperty(obj, attr, true);
    return obj;
  }, {});
}

/* --------------------------------------------- */

/**
 * Perform one-time pre-localization and sorting of some configuration objects
 */
Hooks.once("i18nInit", () => utils.performPreLocalization(CONFIG.MOJO));

/* -------------------------------------------- */
/*  Foundry VTT Ready                           */
/* -------------------------------------------- */

/**
 * Once the entire VTT framework is initialized, check to see if we should perform a data migration
 */
Hooks.once("ready", function() {
  // Configure validation strictness.
  _configureValidationStrictness();

  // Apply custom compendium styles to the SRD rules compendium.
  const rules = game.packs.get("mojo.rules");
  rules.apps = [new applications.journal.SRDCompendium(rules)];

  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on("hotbarDrop", (bar, data, slot) => {
    if ( ["Item", "ActiveEffect"].includes(data.type) ) {
      documents.macro.create5eMacro(data, slot);
      return false;
    }
  });

  // Determine whether a system migration is required and feasible
  if ( !game.user.isGM ) return;
  const cv = game.settings.get("mojo", "systemMigrationVersion") || game.world.flags.mojo?.version;
  const totalDocuments = game.actors.size + game.scenes.size + game.items.size;
  if ( !cv && totalDocuments === 0 ) return game.settings.set("mojo", "systemMigrationVersion", game.system.version);
  if ( cv && !isNewerVersion(game.system.flags.needsMigrationVersion, cv) ) return;

  // Perform the migration
  if ( cv && isNewerVersion(game.system.flags.compatibleMigrationVersion, cv) ) {
    ui.notifications.error(game.i18n.localize("MIGRATION.5eVersionTooOldWarning"), {permanent: true});
  }
  migrations.migrateWorld();
});

/* -------------------------------------------- */
/*  Canvas Initialization                       */
/* -------------------------------------------- */

Hooks.on("canvasInit", gameCanvas => {
  gameCanvas.grid.diagonalRule = game.settings.get("mojo", "diagonalMovement");
  SquareGrid.prototype.measureDistances = canvas.measureDistances;
});

/* -------------------------------------------- */
/*  Other Hooks                                 */
/* -------------------------------------------- */

Hooks.on("renderChatMessage", documents.chat.onRenderChatMessage);
Hooks.on("getChatLogEntryContext", documents.chat.addChatMessageContextOptions);

Hooks.on("renderChatLog", (app, html, data) => documents.Item5e.chatListeners(html));
Hooks.on("renderChatPopout", (app, html, data) => documents.Item5e.chatListeners(html));
Hooks.on("getActorDirectoryEntryContext", documents.Actor5e.addDirectoryContextOptions);

/* -------------------------------------------- */
/*  Bundled Module Exports                      */
/* -------------------------------------------- */

export {
  applications,
  canvas,
  dataModels,
  dice,
  documents,
  migrations,
  utils,
  MOJO
};
