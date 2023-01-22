import * as advancement from "./documents/advancement/_module.mjs";
import { preLocalize } from "./utils.mjs";

// Namespace Configuration Values
const MOJO = {};

// ASCII Artwork
MOJO.ASCII = `
****     ****   *******        **   *******
/**/**   **/**  **/////**      /**  **/////**
/**//** ** /** **     //**     /** **     //**
/** //***  /**/**      /**     /**/**      /**
/**  //*   /**/**      /**     /**/**      /**
/**   /    /**//**     **  **  /**//**     **
/**        /** //*******  //*****  //*******
//         //   ///////    /////    ///////
`;

/**
 * The set of Ability Scores used within the system.
 * @enum {string}
 */
MOJO.abilities = {
  str: "MOJO.AbilityStr",
  dex: "MOJO.AbilityDex",
  con: "MOJO.AbilityCon",
  int: "MOJO.AbilityInt",
  wis: "MOJO.AbilityWis",
  cha: "MOJO.AbilityCha",
  hon: "MOJO.AbilityHon",
  san: "MOJO.AbilitySan"
};
preLocalize("abilities");

/**
 * Localized abbreviations for Ability Scores.
 * @enum {string}
 */
MOJO.abilityAbbreviations = {
  str: "MOJO.AbilityStrAbbr",
  dex: "MOJO.AbilityDexAbbr",
  con: "MOJO.AbilityConAbbr",
  int: "MOJO.AbilityIntAbbr",
  wis: "MOJO.AbilityWisAbbr",
  cha: "MOJO.AbilityChaAbbr",
  hon: "MOJO.AbilityHonAbbr",
  san: "MOJO.AbilitySanAbbr"
};
preLocalize("abilityAbbreviations");

/**
 * Configure which ability score is used as the default modifier for initiative rolls.
 * @type {string}
 */
MOJO.initiativeAbility = "dex";

/**
 * Configure which ability score is used when calculating hit points per level.
 * @type {string}
 */
MOJO.hitPointsAbility = "con";

/* -------------------------------------------- */

/**
 * Configuration data for skills.
 *
 * @typedef {object} SkillConfiguration
 * @property {string} label    Localized label.
 * @property {string} ability  Key for the default ability used by this skill.
 */

/**
 * The set of skill which can be trained with their default ability scores.
 * @enum {SkillConfiguration}
 */
MOJO.skills = {
  acr: { label: "MOJO.SkillAcr", ability: "dex" },
  ani: { label: "MOJO.SkillAni", ability: "wis" },
  arc: { label: "MOJO.SkillArc", ability: "int" },
  ath: { label: "MOJO.SkillAth", ability: "str" },
  dec: { label: "MOJO.SkillDec", ability: "cha" },
  his: { label: "MOJO.SkillHis", ability: "int" },
  ins: { label: "MOJO.SkillIns", ability: "wis" },
  itm: { label: "MOJO.SkillItm", ability: "cha" },
  inv: { label: "MOJO.SkillInv", ability: "int" },
  med: { label: "MOJO.SkillMed", ability: "wis" },
  nat: { label: "MOJO.SkillNat", ability: "int" },
  prc: { label: "MOJO.SkillPrc", ability: "wis" },
  prf: { label: "MOJO.SkillPrf", ability: "cha" },
  per: { label: "MOJO.SkillPer", ability: "cha" },
  rel: { label: "MOJO.SkillRel", ability: "int" },
  slt: { label: "MOJO.SkillSlt", ability: "dex" },
  ste: { label: "MOJO.SkillSte", ability: "dex" },
  sur: { label: "MOJO.SkillSur", ability: "wis" }
};
preLocalize("skills", { key: "label", sort: true });
patchConfig("skills", "label", { since: 2.0, until: 2.2 });

/* -------------------------------------------- */

/**
 * Character alignment options.
 * @enum {string}
 */
MOJO.alignments = {
  lg: "MOJO.AlignmentLG",
  ng: "MOJO.AlignmentNG",
  cg: "MOJO.AlignmentCG",
  ln: "MOJO.AlignmentLN",
  tn: "MOJO.AlignmentTN",
  cn: "MOJO.AlignmentCN",
  le: "MOJO.AlignmentLE",
  ne: "MOJO.AlignmentNE",
  ce: "MOJO.AlignmentCE"
};
preLocalize("alignments");

/* -------------------------------------------- */

/**
 * An enumeration of item attunement types.
 * @enum {number}
 */
MOJO.attunementTypes = {
  NONE: 0,
  REQUIRED: 1,
  ATTUNED: 2
};

/**
 * An enumeration of item attunement states.
 * @type {{"0": string, "1": string, "2": string}}
 */
MOJO.attunements = {
  0: "MOJO.AttunementNone",
  1: "MOJO.AttunementRequired",
  2: "MOJO.AttunementAttuned"
};
preLocalize("attunements");

/* -------------------------------------------- */

/**
 * General weapon categories.
 * @enum {string}
 */
MOJO.weaponProficiencies = {
  sim: "MOJO.WeaponSimpleProficiency",
  mar: "MOJO.WeaponMartialProficiency"
};
preLocalize("weaponProficiencies");

/**
 * A mapping between `MOJO.weaponTypes` and `MOJO.weaponProficiencies` that
 * is used to determine if character has proficiency when adding an item.
 * @enum {(boolean|string)}
 */
MOJO.weaponProficienciesMap = {
  natural: true,
  simpleM: "sim",
  simpleR: "sim",
  martialM: "mar",
  martialR: "mar"
};

/**
 * The basic weapon types in 5e. This enables specific weapon proficiencies or
 * starting equipment provided by classes and backgrounds.
 * @enum {string}
 */
MOJO.weaponIds = {
  battleaxe: "I0WocDSuNpGJayPb",
  blowgun: "wNWK6yJMHG9ANqQV",
  club: "nfIRTECQIG81CvM4",
  dagger: "0E565kQUBmndJ1a2",
  dart: "3rCO8MTIdPGSW6IJ",
  flail: "UrH3sMdnUDckIHJ6",
  glaive: "rOG1OM2ihgPjOvFW",
  greataxe: "1Lxk6kmoRhG8qQ0u",
  greatclub: "QRCsxkCwWNwswL9o",
  greatsword: "xMkP8BmFzElcsMaR",
  halberd: "DMejWAc8r8YvDPP1",
  handaxe: "eO7Fbv5WBk5zvGOc",
  handcrossbow: "qaSro7kFhxD6INbZ",
  heavycrossbow: "RmP0mYRn2J7K26rX",
  javelin: "DWLMnODrnHn8IbAG",
  lance: "RnuxdHUAIgxccVwj",
  lightcrossbow: "ddWvQRLmnnIS0eLF",
  lighthammer: "XVK6TOL4sGItssAE",
  longbow: "3cymOVja8jXbzrdT",
  longsword: "10ZP2Bu3vnCuYMIB",
  mace: "Ajyq6nGwF7FtLhDQ",
  maul: "DizirD7eqjh8n95A",
  morningstar: "dX8AxCh9o0A9CkT3",
  net: "aEiM49V8vWpWw7rU",
  pike: "tC0kcqZT9HHAO0PD",
  quarterstaff: "g2dWN7PQiMRYWzyk",
  rapier: "Tobce1hexTnDk4sV",
  scimitar: "fbC0Mg1a73wdFbqO",
  shortsword: "osLzOwQdPtrK3rQH",
  sickle: "i4NeNZ30ycwPDHMx",
  spear: "OG4nBBydvmfWYXIk",
  shortbow: "GJv6WkD7D2J6rP6M",
  sling: "3gynWO9sN4OLGMWD",
  trident: "F65ANO66ckP8FDMa",
  warpick: "2YdfjN1PIIrSHZii",
  warhammer: "F0Df164Xv1gWcYt0",
  whip: "QKTyxoO0YDnAsbYe"
};

/* -------------------------------------------- */

/**
 * The categories into which Tool items can be grouped.
 *
 * @enum {string}
 */
MOJO.toolTypes = {
  art: "MOJO.ToolArtisans",
  game: "MOJO.ToolGamingSet",
  music: "MOJO.ToolMusicalInstrument"
};
preLocalize("toolTypes", { sort: true });

/**
 * The categories of tool proficiencies that a character can gain.
 *
 * @enum {string}
 */
MOJO.toolProficiencies = {
  ...MOJO.toolTypes,
  vehicle: "MOJO.ToolVehicle"
};
preLocalize("toolProficiencies", { sort: true });

/**
 * The basic tool types in 5e. This enables specific tool proficiencies or
 * starting equipment provided by classes and backgrounds.
 * @enum {string}
 */
MOJO.toolIds = {
  alchemist: "SztwZhbhZeCqyAes",
  bagpipes: "yxHi57T5mmVt0oDr",
  brewer: "Y9S75go1hLMXUD48",
  calligrapher: "jhjo20QoiD5exf09",
  card: "YwlHI3BVJapz4a3E",
  carpenter: "8NS6MSOdXtUqD7Ib",
  cartographer: "fC0lFK8P4RuhpfaU",
  chess: "23y8FvWKf9YLcnBL",
  cobbler: "hM84pZnpCqKfi8XH",
  cook: "Gflnp29aEv5Lc1ZM",
  dice: "iBuTM09KD9IoM5L8",
  disg: "IBhDAr7WkhWPYLVn",
  drum: "69Dpr25pf4BjkHKb",
  dulcimer: "NtdDkjmpdIMiX7I2",
  flute: "eJOrPcAz9EcquyRQ",
  forg: "cG3m4YlHfbQlLEOx",
  glassblower: "rTbVrNcwApnuTz5E",
  herb: "i89okN7GFTWHsvPy",
  horn: "aa9KuBy4dst7WIW9",
  jeweler: "YfBwELTgPFHmQdHh",
  leatherworker: "PUMfwyVUbtyxgYbD",
  lute: "qBydtUUIkv520DT7",
  lyre: "EwG1EtmbgR3bM68U",
  mason: "skUih6tBvcBbORzA",
  navg: "YHCmjsiXxZ9UdUhU",
  painter: "ccm5xlWhx74d6lsK",
  panflute: "G5m5gYIx9VAUWC3J",
  pois: "il2GNi8C0DvGLL9P",
  potter: "hJS8yEVkqgJjwfWa",
  shawm: "G3cqbejJpfB91VhP",
  smith: "KndVe2insuctjIaj",
  thief: "woWZ1sO5IUVGzo58",
  tinker: "0d08g1i5WXnNrCNA",
  viol: "baoe3U5BfMMMxhCU",
  weaver: "ap9prThUB2y9lDyj",
  woodcarver: "xKErqkLo4ASYr5EP"
};

/* -------------------------------------------- */

/**
 * The various lengths of time over which effects can occur.
 * @enum {string}
 */
MOJO.timePeriods = {
  inst: "MOJO.TimeInst",
  turn: "MOJO.TimeTurn",
  round: "MOJO.TimeRound",
  minute: "MOJO.TimeMinute",
  hour: "MOJO.TimeHour",
  day: "MOJO.TimeDay",
  month: "MOJO.TimeMonth",
  year: "MOJO.TimeYear",
  perm: "MOJO.TimePerm",
  spec: "MOJO.Special"
};
preLocalize("timePeriods");

/* -------------------------------------------- */

/**
 * Various ways in which an item or ability can be activated.
 * @enum {string}
 */
MOJO.abilityActivationTypes = {
  action: "MOJO.Action",
  bonus: "MOJO.BonusAction",
  reaction: "MOJO.Reaction",
  minute: MOJO.timePeriods.minute,
  hour: MOJO.timePeriods.hour,
  day: MOJO.timePeriods.day,
  special: MOJO.timePeriods.spec,
  legendary: "MOJO.LegendaryActionLabel",
  lair: "MOJO.LairActionLabel",
  crew: "MOJO.VehicleCrewAction"
};
preLocalize("abilityActivationTypes");

/* -------------------------------------------- */

/**
 * Different things that an ability can consume upon use.
 * @enum {string}
 */
MOJO.abilityConsumptionTypes = {
  ammo: "MOJO.ConsumeAmmunition",
  attribute: "MOJO.ConsumeAttribute",
  hitDice: "MOJO.ConsumeHitDice",
  material: "MOJO.ConsumeMaterial",
  charges: "MOJO.ConsumeCharges"
};
preLocalize("abilityConsumptionTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Creature sizes.
 * @enum {string}
 */
MOJO.actorSizes = {
  tiny: "MOJO.SizeTiny",
  sm: "MOJO.SizeSmall",
  med: "MOJO.SizeMedium",
  lg: "MOJO.SizeLarge",
  huge: "MOJO.SizeHuge",
  grg: "MOJO.SizeGargantuan"
};
preLocalize("actorSizes");

/**
 * Default token image size for the values of `MOJO.actorSizes`.
 * @enum {number}
 */
MOJO.tokenSizes = {
  tiny: 0.5,
  sm: 1,
  med: 1,
  lg: 2,
  huge: 3,
  grg: 4
};

/**
 * Colors used to visualize temporary and temporary maximum HP in token health bars.
 * @enum {number}
 */
MOJO.tokenHPColors = {
  damage: 0xFF0000,
  healing: 0x00FF00,
  temp: 0x66CCFF,
  tempmax: 0x440066,
  negmax: 0x550000
};

/* -------------------------------------------- */

/**
 * Default types of creatures.
 * *Note: Not pre-localized to allow for easy fetching of pluralized forms.*
 * @enum {string}
 */
MOJO.creatureTypes = {
  aberration: "MOJO.CreatureAberration",
  beast: "MOJO.CreatureBeast",
  celestial: "MOJO.CreatureCelestial",
  construct: "MOJO.CreatureConstruct",
  dragon: "MOJO.CreatureDragon",
  elemental: "MOJO.CreatureElemental",
  fey: "MOJO.CreatureFey",
  fiend: "MOJO.CreatureFiend",
  giant: "MOJO.CreatureGiant",
  humanoid: "MOJO.CreatureHumanoid",
  monstrosity: "MOJO.CreatureMonstrosity",
  ooze: "MOJO.CreatureOoze",
  plant: "MOJO.CreaturePlant",
  undead: "MOJO.CreatureUndead"
};

/* -------------------------------------------- */

/**
 * Classification types for item action types.
 * @enum {string}
 */
MOJO.itemActionTypes = {
  mwak: "MOJO.ActionMWAK",
  rwak: "MOJO.ActionRWAK",
  msak: "MOJO.ActionMSAK",
  rsak: "MOJO.ActionRSAK",
  save: "MOJO.ActionSave",
  heal: "MOJO.ActionHeal",
  abil: "MOJO.ActionAbil",
  util: "MOJO.ActionUtil",
  other: "MOJO.ActionOther"
};
preLocalize("itemActionTypes");

/* -------------------------------------------- */

/**
 * Different ways in which item capacity can be limited.
 * @enum {string}
 */
MOJO.itemCapacityTypes = {
  items: "MOJO.ItemContainerCapacityItems",
  weight: "MOJO.ItemContainerCapacityWeight"
};
preLocalize("itemCapacityTypes", { sort: true });

/* -------------------------------------------- */

/**
 * List of various item rarities.
 * @enum {string}
 */
MOJO.itemRarity = {
  common: "MOJO.ItemRarityCommon",
  uncommon: "MOJO.ItemRarityUncommon",
  rare: "MOJO.ItemRarityRare",
  veryRare: "MOJO.ItemRarityVeryRare",
  legendary: "MOJO.ItemRarityLegendary",
  artifact: "MOJO.ItemRarityArtifact"
};
preLocalize("itemRarity");

/* -------------------------------------------- */

/**
 * Enumerate the lengths of time over which an item can have limited use ability.
 * @enum {string}
 */
MOJO.limitedUsePeriods = {
  sr: "MOJO.ShortRest",
  lr: "MOJO.LongRest",
  day: "MOJO.Day",
  charges: "MOJO.Charges"
};
preLocalize("limitedUsePeriods");

/* -------------------------------------------- */

/**
 * Specific equipment types that modify base AC.
 * @enum {string}
 */
MOJO.armorTypes = {
  light: "MOJO.EquipmentLight",
  medium: "MOJO.EquipmentMedium",
  heavy: "MOJO.EquipmentHeavy",
  natural: "MOJO.EquipmentNatural",
  shield: "MOJO.EquipmentShield"
};
preLocalize("armorTypes");

/* -------------------------------------------- */

/**
 * Equipment types that aren't armor.
 * @enum {string}
 */
MOJO.miscEquipmentTypes = {
  clothing: "MOJO.EquipmentClothing",
  trinket: "MOJO.EquipmentTrinket",
  vehicle: "MOJO.EquipmentVehicle"
};
preLocalize("miscEquipmentTypes", { sort: true });

/* -------------------------------------------- */

/**
 * The set of equipment types for armor, clothing, and other objects which can be worn by the character.
 * @enum {string}
 */
MOJO.equipmentTypes = {
  ...MOJO.miscEquipmentTypes,
  ...MOJO.armorTypes
};
preLocalize("equipmentTypes", { sort: true });

/* -------------------------------------------- */

/**
 * The various types of vehicles in which characters can be proficient.
 * @enum {string}
 */
MOJO.vehicleTypes = {
  air: "MOJO.VehicleTypeAir",
  land: "MOJO.VehicleTypeLand",
  space: "MOJO.VehicleTypeSpace",
  water: "MOJO.VehicleTypeWater"
};
preLocalize("vehicleTypes", { sort: true });

/* -------------------------------------------- */

/**
 * The set of Armor Proficiencies which a character may have.
 * @type {object}
 */
MOJO.armorProficiencies = {
  lgt: MOJO.equipmentTypes.light,
  med: MOJO.equipmentTypes.medium,
  hvy: MOJO.equipmentTypes.heavy,
  shl: "MOJO.EquipmentShieldProficiency"
};
preLocalize("armorProficiencies");

/**
 * A mapping between `MOJO.equipmentTypes` and `MOJO.armorProficiencies` that
 * is used to determine if character has proficiency when adding an item.
 * @enum {(boolean|string)}
 */
MOJO.armorProficienciesMap = {
  natural: true,
  clothing: true,
  light: "lgt",
  medium: "med",
  heavy: "hvy",
  shield: "shl"
};

/**
 * The basic armor types in 5e. This enables specific armor proficiencies,
 * automated AC calculation in NPCs, and starting equipment.
 * @enum {string}
 */
MOJO.armorIds = {
  breastplate: "SK2HATQ4abKUlV8i",
  chainmail: "rLMflzmxpe8JGTOA",
  chainshirt: "p2zChy24ZJdVqMSH",
  halfplate: "vsgmACFYINloIdPm",
  hide: "n1V07puo0RQxPGuF",
  leather: "WwdpHLXGX5r8uZu5",
  padded: "GtKV1b5uqFQqpEni",
  plate: "OjkIqlW2UpgFcjZa",
  ringmail: "nsXZejlmgalj4he9",
  scalemail: "XmnlF5fgIO3tg6TG",
  splint: "cKpJmsJmU8YaiuqG",
  studded: "TIV3B1vbrVHIhQAm"
};

/**
 * The basic shield in 5e.
 * @enum {string}
 */
MOJO.shieldIds = {
  shield: "sSs3hSzkKBMNBgTs"
};

/**
 * Common armor class calculations.
 * @enum {{ label: string, [formula]: string }}
 */
MOJO.armorClasses = {
  flat: {
    label: "MOJO.ArmorClassFlat",
    formula: "@attributes.ac.flat"
  },
  natural: {
    label: "MOJO.ArmorClassNatural",
    formula: "@attributes.ac.flat"
  },
  default: {
    label: "MOJO.ArmorClassEquipment",
    formula: "@attributes.ac.armor + @attributes.ac.dex"
  },
  mage: {
    label: "MOJO.ArmorClassMage",
    formula: "13 + @abilities.dex.mod"
  },
  draconic: {
    label: "MOJO.ArmorClassDraconic",
    formula: "13 + @abilities.dex.mod"
  },
  unarmoredMonk: {
    label: "MOJO.ArmorClassUnarmoredMonk",
    formula: "10 + @abilities.dex.mod + @abilities.wis.mod"
  },
  unarmoredBarb: {
    label: "MOJO.ArmorClassUnarmoredBarbarian",
    formula: "10 + @abilities.dex.mod + @abilities.con.mod"
  },
  custom: {
    label: "MOJO.ArmorClassCustom"
  }
};
preLocalize("armorClasses", { key: "label" });

/* -------------------------------------------- */

/**
 * Enumerate the valid consumable types which are recognized by the system.
 * @enum {string}
 */
MOJO.consumableTypes = {
  ammo: "MOJO.ConsumableAmmo",
  potion: "MOJO.ConsumablePotion",
  poison: "MOJO.ConsumablePoison",
  food: "MOJO.ConsumableFood",
  scroll: "MOJO.ConsumableScroll",
  wand: "MOJO.ConsumableWand",
  rod: "MOJO.ConsumableRod",
  trinket: "MOJO.ConsumableTrinket"
};
preLocalize("consumableTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Configuration data for an item with the "feature" type.
 *
 * @typedef {object} FeatureTypeConfiguration
 * @property {string} label                       Localized label for this type.
 * @property {Object<string, string>} [subtypes]  Enum containing localized labels for subtypes.
 */

/**
 * Types of "features" items.
 * @enum {FeatureTypeConfiguration}
 */
MOJO.featureTypes = {
  background: {
    label: "MOJO.Feature.Background"
  },
  class: {
    label: "MOJO.Feature.Class",
    subtypes: {
      artificerInfusion: "MOJO.ClassFeature.ArtificerInfusion",
      channelDivinity: "MOJO.ClassFeature.ChannelDivinity",
      defensiveTactic: "MOJO.ClassFeature.DefensiveTactic",
      eldritchInvocation: "MOJO.ClassFeature.EldritchInvocation",
      elementalDiscipline: "MOJO.ClassFeature.ElementalDiscipline",
      fightingStyle: "MOJO.ClassFeature.FightingStyle",
      huntersPrey: "MOJO.ClassFeature.HuntersPrey",
      ki: "MOJO.ClassFeature.Ki",
      maneuver: "MOJO.ClassFeature.Maneuver",
      metamagic: "MOJO.ClassFeature.Metamagic",
      multiattack: "MOJO.ClassFeature.Multiattack",
      pact: "MOJO.ClassFeature.PactBoon",
      psionicPower: "MOJO.ClassFeature.PsionicPower",
      rune: "MOJO.ClassFeature.Rune",
      superiorHuntersDefense: "MOJO.ClassFeature.SuperiorHuntersDefense"
    }
  },
  monster: {
    label: "MOJO.Feature.Monster"
  },
  race: {
    label: "MOJO.Feature.Race"
  },
  feat: {
    label: "MOJO.Feature.Feat"
  }
};
preLocalize("featureTypes", { key: "label" });
preLocalize("featureTypes.class.subtypes", { sort: true });

/* -------------------------------------------- */

/**
 * @typedef {object} CurrencyConfiguration
 * @property {string} label         Localized label for the currency.
 * @property {string} abbreviation  Localized abbreviation for the currency.
 * @property {number} conversion    Number by which this currency should be multiplied to arrive at a standard value.
 */

/**
 * The valid currency denominations with localized labels, abbreviations, and conversions.
 * The conversion number defines how many of that currency are equal to one GP.
 * @enum {CurrencyConfiguration}
 */
MOJO.currencies = {
  pp: {
    label: "MOJO.CurrencyPP",
    abbreviation: "MOJO.CurrencyAbbrPP",
    conversion: 0.1
  },
  gp: {
    label: "MOJO.CurrencyGP",
    abbreviation: "MOJO.CurrencyAbbrGP",
    conversion: 1
  },
  ep: {
    label: "MOJO.CurrencyEP",
    abbreviation: "MOJO.CurrencyAbbrEP",
    conversion: 2
  },
  sp: {
    label: "MOJO.CurrencySP",
    abbreviation: "MOJO.CurrencyAbbrSP",
    conversion: 10
  },
  cp: {
    label: "MOJO.CurrencyCP",
    abbreviation: "MOJO.CurrencyAbbrCP",
    conversion: 100
  }
};
preLocalize("currencies", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */
/*  Damage Types                                */
/* -------------------------------------------- */

/**
 * Types of damage that are considered physical.
 * @enum {string}
 */
MOJO.physicalDamageTypes = {
  bludgeoning: "MOJO.DamageBludgeoning",
  piercing: "MOJO.DamagePiercing",
  slashing: "MOJO.DamageSlashing"
};
preLocalize("physicalDamageTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Types of damage the can be caused by abilities.
 * @enum {string}
 */
MOJO.damageTypes = {
  ...MOJO.physicalDamageTypes,
  acid: "MOJO.DamageAcid",
  cold: "MOJO.DamageCold",
  fire: "MOJO.DamageFire",
  force: "MOJO.DamageForce",
  lightning: "MOJO.DamageLightning",
  necrotic: "MOJO.DamageNecrotic",
  poison: "MOJO.DamagePoison",
  psychic: "MOJO.DamagePsychic",
  radiant: "MOJO.DamageRadiant",
  thunder: "MOJO.DamageThunder"
};
preLocalize("damageTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Types of damage to which an actor can possess resistance, immunity, or vulnerability.
 * @enum {string}
 * @deprecated
 */
MOJO.damageResistanceTypes = {
  ...MOJO.damageTypes,
  physical: "MOJO.DamagePhysical"
};
preLocalize("damageResistanceTypes", { sort: true });

/* -------------------------------------------- */
/*  Movement                                    */
/* -------------------------------------------- */

/**
 * Different types of healing that can be applied using abilities.
 * @enum {string}
 */
MOJO.healingTypes = {
  healing: "MOJO.Healing",
  temphp: "MOJO.HealingTemp"
};
preLocalize("healingTypes");

/* -------------------------------------------- */

/**
 * The valid units of measure for movement distances in the game system.
 * By default this uses the imperial units of feet and miles.
 * @enum {string}
 */
MOJO.movementTypes = {
  burrow: "MOJO.MovementBurrow",
  climb: "MOJO.MovementClimb",
  fly: "MOJO.MovementFly",
  swim: "MOJO.MovementSwim",
  walk: "MOJO.MovementWalk"
};
preLocalize("movementTypes", { sort: true });

/* -------------------------------------------- */
/*  Measurement                                 */
/* -------------------------------------------- */

/**
 * The valid units of measure for movement distances in the game system.
 * By default this uses the imperial units of feet and miles.
 * @enum {string}
 */
MOJO.movementUnits = {
  ft: "MOJO.DistFt",
  mi: "MOJO.DistMi",
  m: "MOJO.DistM",
  km: "MOJO.DistKm"
};
preLocalize("movementUnits");

/* -------------------------------------------- */

/**
 * The types of range that are used for measuring actions and effects.
 * @enum {string}
 */
MOJO.rangeTypes = {
  self: "MOJO.DistSelf",
  touch: "MOJO.DistTouch",
  spec: "MOJO.Special",
  any: "MOJO.DistAny"
};
preLocalize("rangeTypes");

/* -------------------------------------------- */

/**
 * The valid units of measure for the range of an action or effect. A combination of `MOJO.movementUnits` and
 * `MOJO.rangeUnits`.
 * @enum {string}
 */
MOJO.distanceUnits = {
  ...MOJO.movementUnits,
  ...MOJO.rangeTypes
};
preLocalize("distanceUnits");

/* -------------------------------------------- */

/**
 * Configure aspects of encumbrance calculation so that it could be configured by modules.
 * @enum {{ imperial: number, metric: number }}
 */
MOJO.encumbrance = {
  currencyPerWeight: {
    imperial: 50,
    metric: 110
  },
  strMultiplier: {
    imperial: 15,
    metric: 6.8
  },
  vehicleWeightMultiplier: {
    imperial: 2000, // 2000 lbs in an imperial ton
    metric: 1000 // 1000 kg in a metric ton
  }
};

/* -------------------------------------------- */
/*  Targeting                                   */
/* -------------------------------------------- */

/**
 * Targeting types that apply to one or more distinct targets.
 * @enum {string}
 */
MOJO.individualTargetTypes = {
  self: "MOJO.TargetSelf",
  ally: "MOJO.TargetAlly",
  enemy: "MOJO.TargetEnemy",
  creature: "MOJO.TargetCreature",
  object: "MOJO.TargetObject",
  space: "MOJO.TargetSpace"
};
preLocalize("individualTargetTypes");

/* -------------------------------------------- */

/**
 * Information needed to represent different area of effect target types.
 *
 * @typedef {object} AreaTargetDefinition
 * @property {string} label     Localized label for this type.
 * @property {string} template  Type of `MeasuredTemplate` create for this target type.
 */

/**
 * Targeting types that cover an area.
 * @enum {AreaTargetDefinition}
 */
MOJO.areaTargetTypes = {
  radius: {
    label: "MOJO.TargetRadius",
    template: "circle"
  },
  sphere: {
    label: "MOJO.TargetSphere",
    template: "circle"
  },
  cylinder: {
    label: "MOJO.TargetCylinder",
    template: "circle"
  },
  cone: {
    label: "MOJO.TargetCone",
    template: "cone"
  },
  square: {
    label: "MOJO.TargetSquare",
    template: "rect"
  },
  cube: {
    label: "MOJO.TargetCube",
    template: "rect"
  },
  line: {
    label: "MOJO.TargetLine",
    template: "ray"
  },
  wall: {
    label: "MOJO.TargetWall",
    template: "ray"
  }
};
preLocalize("areaTargetTypes", { key: "label", sort: true });
patchConfig("areaTargetTypes", "template", { since: 2.0, until: 2.2 });

/* -------------------------------------------- */

/**
 * The types of single or area targets which can be applied to abilities.
 * @enum {string}
 */
MOJO.targetTypes = {
  ...MOJO.individualTargetTypes,
  ...Object.fromEntries(Object.entries(MOJO.areaTargetTypes).map(([k, v]) => [k, v.label]))
};
preLocalize("targetTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Denominations of hit dice which can apply to classes.
 * @type {string[]}
 */
MOJO.hitDieTypes = ["d4", "d6", "d8", "d10", "d12"];

/* -------------------------------------------- */

/**
 * The set of possible sensory perception types which an Actor may have.
 * @enum {string}
 */
MOJO.senses = {
  blindsight: "MOJO.SenseBlindsight",
  darkvision: "MOJO.SenseDarkvision",
  tremorsense: "MOJO.SenseTremorsense",
  truesight: "MOJO.SenseTruesight"
};
preLocalize("senses", { sort: true });

/* -------------------------------------------- */
/*  Spellcasting                                */
/* -------------------------------------------- */

/**
 * Define the standard slot progression by character level.
 * The entries of this array represent the spell slot progression for a full spell-caster.
 * @type {number[][]}
 */
MOJO.SPELL_SLOT_TABLE = [
  [2],
  [3],
  [4, 2],
  [4, 3],
  [4, 3, 2],
  [4, 3, 3],
  [4, 3, 3, 1],
  [4, 3, 3, 2],
  [4, 3, 3, 3, 1],
  [4, 3, 3, 3, 2],
  [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1, 1],
  [4, 3, 3, 3, 2, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 2, 1, 1]
];

/* -------------------------------------------- */

/**
 * Various different ways a spell can be prepared.
 */
MOJO.spellPreparationModes = {
  prepared: "MOJO.SpellPrepPrepared",
  pact: "MOJO.PactMagic",
  always: "MOJO.SpellPrepAlways",
  atwill: "MOJO.SpellPrepAtWill",
  innate: "MOJO.SpellPrepInnate"
};
preLocalize("spellPreparationModes");

/* -------------------------------------------- */

/**
 * Subset of `MOJO.spellPreparationModes` that consume spell slots.
 * @type {boolean[]}
 */
MOJO.spellUpcastModes = ["always", "pact", "prepared"];

/* -------------------------------------------- */

/**
 * Configuration data for different types of spellcasting supported.
 *
 * @typedef {object} SpellcastingTypeConfiguration
 * @property {string} label                                                        Localized label.
 * @property {Object<string, SpellcastingProgressionConfiguration>} [progression]  Any progression modes for this type.
 */

/**
 * Configuration data for a spellcasting progression mode.
 *
 * @typedef {object} SpellcastingProgressionConfiguration
 * @property {string} label             Localized label.
 * @property {number} [divisor=1]       Value by which the class levels are divided to determine spellcasting level.
 * @property {boolean} [roundUp=false]  Should fractional values should be rounded up by default?
 */

/**
 * Different spellcasting types and their progression.
 * @type {SpellcastingTypeConfiguration}
 */
MOJO.spellcastingTypes = {
  leveled: {
    label: "MOJO.SpellProgLeveled",
    progression: {
      full: {
        label: "MOJO.SpellProgFull",
        divisor: 1
      },
      half: {
        label: "MOJO.SpellProgHalf",
        divisor: 2
      },
      third: {
        label: "MOJO.SpellProgThird",
        divisor: 3
      },
      artificer: {
        label: "MOJO.SpellProgArt",
        divisor: 2,
        roundUp: true
      }
    }
  },
  pact: {
    label: "MOJO.SpellProgPact"
  }
};
preLocalize("spellcastingTypes", { key: "label", sort: true });
preLocalize("spellcastingTypes.leveled.progression", { key: "label" });

/* -------------------------------------------- */

/**
 * Ways in which a class can contribute to spellcasting levels.
 * @enum {string}
 */
MOJO.spellProgression = {
  none: "MOJO.SpellNone",
  full: "MOJO.SpellProgFull",
  half: "MOJO.SpellProgHalf",
  third: "MOJO.SpellProgThird",
  pact: "MOJO.SpellProgPact",
  artificer: "MOJO.SpellProgArt"
};
preLocalize("spellProgression", { key: "label" });

/* -------------------------------------------- */

/**
 * Valid spell levels.
 * @enum {string}
 */
MOJO.spellLevels = {
  0: "MOJO.SpellLevel0",
  1: "MOJO.SpellLevel1",
  2: "MOJO.SpellLevel2",
  3: "MOJO.SpellLevel3",
  4: "MOJO.SpellLevel4",
  5: "MOJO.SpellLevel5",
  6: "MOJO.SpellLevel6",
  7: "MOJO.SpellLevel7",
  8: "MOJO.SpellLevel8",
  9: "MOJO.SpellLevel9"
};
preLocalize("spellLevels");

/* -------------------------------------------- */

/**
 * The available choices for how spell damage scaling may be computed.
 * @enum {string}
 */
MOJO.spellScalingModes = {
  none: "MOJO.SpellNone",
  cantrip: "MOJO.SpellCantrip",
  level: "MOJO.SpellLevel"
};
preLocalize("spellScalingModes", { sort: true });

/* -------------------------------------------- */

/**
 * Types of components that can be required when casting a spell.
 * @enum {object}
 */
MOJO.spellComponents = {
  vocal: {
    label: "MOJO.ComponentVerbal",
    abbr: "MOJO.ComponentVerbalAbbr"
  },
  somatic: {
    label: "MOJO.ComponentSomatic",
    abbr: "MOJO.ComponentSomaticAbbr"
  },
  material: {
    label: "MOJO.ComponentMaterial",
    abbr: "MOJO.ComponentMaterialAbbr"
  }
};
preLocalize("spellComponents", {keys: ["label", "abbr"]});

/* -------------------------------------------- */

/**
 * Supplementary rules keywords that inform a spell's use.
 * @enum {object}
 */
MOJO.spellTags = {
  concentration: {
    label: "MOJO.Concentration",
    abbr: "MOJO.ConcentrationAbbr"
  },
  ritual: {
    label: "MOJO.Ritual",
    abbr: "MOJO.RitualAbbr"
  }
};
preLocalize("spellTags", {keys: ["label", "abbr"]});

/* -------------------------------------------- */

/**
 * Schools to which a spell can belong.
 * @enum {string}
 */
MOJO.spellSchools = {
  abj: "MOJO.SchoolAbj",
  con: "MOJO.SchoolCon",
  div: "MOJO.SchoolDiv",
  enc: "MOJO.SchoolEnc",
  evo: "MOJO.SchoolEvo",
  ill: "MOJO.SchoolIll",
  nec: "MOJO.SchoolNec",
  trs: "MOJO.SchoolTrs"
};
preLocalize("spellSchools", { sort: true });

/* -------------------------------------------- */

/**
 * Spell scroll item ID within the `MOJO.sourcePacks` compendium for each level.
 * @enum {string}
 */
MOJO.spellScrollIds = {
  0: "rQ6sO7HDWzqMhSI3",
  1: "9GSfMg0VOA2b4uFN",
  2: "XdDp6CKh9qEvPTuS",
  3: "hqVKZie7x9w3Kqds",
  4: "DM7hzgL836ZyUFB1",
  5: "wa1VF8TXHmkrrR35",
  6: "tI3rWx4bxefNCexS",
  7: "mtyw4NS1s7j2EJaD",
  8: "aOrinPg7yuDZEuWr",
  9: "O4YbkJkLlnsgUszZ"
};

/* -------------------------------------------- */
/*  Weapon Details                              */
/* -------------------------------------------- */

/**
 * The set of types which a weapon item can take.
 * @enum {string}
 */
MOJO.weaponTypes = {
  simpleM: "MOJO.WeaponSimpleM",
  simpleR: "MOJO.WeaponSimpleR",
  martialM: "MOJO.WeaponMartialM",
  martialR: "MOJO.WeaponMartialR",
  natural: "MOJO.WeaponNatural",
  improv: "MOJO.WeaponImprov",
  siege: "MOJO.WeaponSiege"
};
preLocalize("weaponTypes");

/* -------------------------------------------- */

/**
 * A subset of weapon properties that determine the physical characteristics of the weapon.
 * These properties are used for determining physical resistance bypasses.
 * @enum {string}
 */
MOJO.physicalWeaponProperties = {
  ada: "MOJO.WeaponPropertiesAda",
  mgc: "MOJO.WeaponPropertiesMgc",
  sil: "MOJO.WeaponPropertiesSil"
};
preLocalize("physicalWeaponProperties", { sort: true });

/* -------------------------------------------- */

/**
 * The set of weapon property flags which can exist on a weapon.
 * @enum {string}
 */
MOJO.weaponProperties = {
  ...MOJO.physicalWeaponProperties,
  amm: "MOJO.WeaponPropertiesAmm",
  fin: "MOJO.WeaponPropertiesFin",
  fir: "MOJO.WeaponPropertiesFir",
  foc: "MOJO.WeaponPropertiesFoc",
  hvy: "MOJO.WeaponPropertiesHvy",
  lgt: "MOJO.WeaponPropertiesLgt",
  lod: "MOJO.WeaponPropertiesLod",
  rch: "MOJO.WeaponPropertiesRch",
  rel: "MOJO.WeaponPropertiesRel",
  ret: "MOJO.WeaponPropertiesRet",
  spc: "MOJO.WeaponPropertiesSpc",
  thr: "MOJO.WeaponPropertiesThr",
  two: "MOJO.WeaponPropertiesTwo",
  ver: "MOJO.WeaponPropertiesVer"
};
preLocalize("weaponProperties", { sort: true });

/* -------------------------------------------- */

/**
 * Compendium packs used for localized items.
 * @enum {string}
 */
MOJO.sourcePacks = {
  ITEMS: "mojo.items"
};

/* -------------------------------------------- */

/**
 * Settings to configure how actors are merged when polymorphing is applied.
 * @enum {string}
 */
MOJO.polymorphSettings = {
  keepPhysical: "MOJO.PolymorphKeepPhysical",
  keepMental: "MOJO.PolymorphKeepMental",
  keepSaves: "MOJO.PolymorphKeepSaves",
  keepSkills: "MOJO.PolymorphKeepSkills",
  mergeSaves: "MOJO.PolymorphMergeSaves",
  mergeSkills: "MOJO.PolymorphMergeSkills",
  keepClass: "MOJO.PolymorphKeepClass",
  keepFeats: "MOJO.PolymorphKeepFeats",
  keepSpells: "MOJO.PolymorphKeepSpells",
  keepItems: "MOJO.PolymorphKeepItems",
  keepBio: "MOJO.PolymorphKeepBio",
  keepVision: "MOJO.PolymorphKeepVision",
  keepSelf: "MOJO.PolymorphKeepSelf"
};
preLocalize("polymorphSettings", { sort: true });

/**
 * Settings to configure how actors are effects are merged when polymorphing is applied.
 * @enum {string}
 */
MOJO.polymorphEffectSettings = {
  keepAE: "MOJO.PolymorphKeepAE",
  keepOtherOriginAE: "MOJO.PolymorphKeepOtherOriginAE",
  keepOriginAE: "MOJO.PolymorphKeepOriginAE",
  keepEquipmentAE: "MOJO.PolymorphKeepEquipmentAE",
  keepFeatAE: "MOJO.PolymorphKeepFeatureAE",
  keepSpellAE: "MOJO.PolymorphKeepSpellAE",
  keepClassAE: "MOJO.PolymorphKeepClassAE",
  keepBackgroundAE: "MOJO.PolymorphKeepBackgroundAE"
};
preLocalize("polymorphEffectSettings", { sort: true });

/**
 * Settings to configure how actors are merged when preset polymorphing is applied.
 * @enum {object}
 */
MOJO.transformationPresets = {
  wildshape: {
    icon: '<i class="fas fa-paw"></i>',
    label: "MOJO.PolymorphWildShape",
    options: {
      keepBio: true,
      keepClass: true,
      keepMental: true,
      mergeSaves: true,
      mergeSkills: true,
      keepEquipmentAE: false
    }
  },
  polymorph: {
    icon: '<i class="fas fa-pastafarianism"></i>',
    label: "MOJO.Polymorph",
    options: {
      keepEquipmentAE: false,
      keepClassAE: false,
      keepFeatAE: false,
      keepBackgroundAE: false
    }
  },
  polymorphSelf: {
    icon: '<i class="fas fa-eye"></i>',
    label: "MOJO.PolymorphSelf",
    options: {
      keepSelf: true
    }
  }
};
preLocalize("transformationPresets", { sort: true, keys: ["label"] });

/* -------------------------------------------- */

/**
 * Skill, ability, and tool proficiency levels.
 * The key for each level represents its proficiency multiplier.
 * @enum {string}
 */
MOJO.proficiencyLevels = {
  0: "MOJO.NotProficient",
  1: "MOJO.Proficient",
  0.5: "MOJO.HalfProficient",
  2: "MOJO.Expertise"
};
preLocalize("proficiencyLevels");

/* -------------------------------------------- */

/**
 * The amount of cover provided by an object. In cases where multiple pieces
 * of cover are in play, we take the highest value.
 * @enum {string}
 */
MOJO.cover = {
  0: "MOJO.None",
  .5: "MOJO.CoverHalf",
  .75: "MOJO.CoverThreeQuarters",
  1: "MOJO.CoverTotal"
};
preLocalize("cover");

/* -------------------------------------------- */

/**
 * A selection of actor attributes that can be tracked on token resource bars.
 * @type {string[]}
 */
MOJO.trackableAttributes = [
  "attributes.ac.value", "attributes.init.bonus", "attributes.movement", "attributes.senses", "attributes.spelldc",
  "attributes.spellLevel", "details.cr", "details.spellLevel", "details.xp.value", "skills.*.passive",
  "abilities.*.value"
];

/* -------------------------------------------- */

/**
 * A selection of actor and item attributes that are valid targets for item resource consumption.
 * @type {string[]}
 */
MOJO.consumableResources = [
  "item.quantity", "item.weight", "item.duration.value", "currency", "details.xp.value", "abilities.*.value",
  "attributes.senses", "attributes.movement", "attributes.ac.flat", "item.armor.value", "item.target", "item.range",
  "item.save.dc"
];

/* -------------------------------------------- */

/**
 * Conditions that can effect an actor.
 * @enum {string}
 */
MOJO.conditionTypes = {
  blinded: "MOJO.ConBlinded",
  charmed: "MOJO.ConCharmed",
  deafened: "MOJO.ConDeafened",
  diseased: "MOJO.ConDiseased",
  exhaustion: "MOJO.ConExhaustion",
  frightened: "MOJO.ConFrightened",
  grappled: "MOJO.ConGrappled",
  incapacitated: "MOJO.ConIncapacitated",
  invisible: "MOJO.ConInvisible",
  paralyzed: "MOJO.ConParalyzed",
  petrified: "MOJO.ConPetrified",
  poisoned: "MOJO.ConPoisoned",
  prone: "MOJO.ConProne",
  restrained: "MOJO.ConRestrained",
  stunned: "MOJO.ConStunned",
  unconscious: "MOJO.ConUnconscious"
};
preLocalize("conditionTypes", { sort: true });

/**
 * Languages a character can learn.
 * @enum {string}
 */
MOJO.languages = {
  common: "MOJO.LanguagesCommon",
  aarakocra: "MOJO.LanguagesAarakocra",
  abyssal: "MOJO.LanguagesAbyssal",
  aquan: "MOJO.LanguagesAquan",
  auran: "MOJO.LanguagesAuran",
  celestial: "MOJO.LanguagesCelestial",
  deep: "MOJO.LanguagesDeepSpeech",
  draconic: "MOJO.LanguagesDraconic",
  druidic: "MOJO.LanguagesDruidic",
  dwarvish: "MOJO.LanguagesDwarvish",
  elvish: "MOJO.LanguagesElvish",
  giant: "MOJO.LanguagesGiant",
  gith: "MOJO.LanguagesGith",
  gnomish: "MOJO.LanguagesGnomish",
  goblin: "MOJO.LanguagesGoblin",
  gnoll: "MOJO.LanguagesGnoll",
  halfling: "MOJO.LanguagesHalfling",
  ignan: "MOJO.LanguagesIgnan",
  infernal: "MOJO.LanguagesInfernal",
  orc: "MOJO.LanguagesOrc",
  primordial: "MOJO.LanguagesPrimordial",
  sylvan: "MOJO.LanguagesSylvan",
  terran: "MOJO.LanguagesTerran",
  cant: "MOJO.LanguagesThievesCant",
  undercommon: "MOJO.LanguagesUndercommon"
};
preLocalize("languages", { sort: true });

/**
 * Maximum allowed character level.
 * @type {number}
 */
MOJO.maxLevel = 20;

/**
 * XP required to achieve each character level.
 * @type {number[]}
 */
MOJO.CHARACTER_EXP_LEVELS = [
  0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000,
  120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000
];

/**
 * XP granted for each challenge rating.
 * @type {number[]}
 */
MOJO.CR_EXP_LEVELS = [
  10, 200, 450, 700, 1100, 1800, 2300, 2900, 3900, 5000, 5900, 7200, 8400, 10000, 11500, 13000, 15000, 18000,
  20000, 22000, 25000, 33000, 41000, 50000, 62000, 75000, 90000, 105000, 120000, 135000, 155000
];

/**
 * @typedef {object} CharacterFlagConfig
 * @property {string} name
 * @property {string} hint
 * @property {string} section
 * @property {typeof boolean|string|number} type
 * @property {string} placeholder
 * @property {string[]} [abilities]
 * @property {Object<string, string>} [choices]
 * @property {string[]} [skills]
 */

/* -------------------------------------------- */

/**
 * Trait configuration information.
 *
 * @typedef {object} TraitConfiguration
 * @property {string} label               Localization key for the trait name.
 * @property {string} [actorKeyPath]      If the trait doesn't directly map to an entry as `traits.[key]`, where is
 *                                        this trait's data stored on the actor?
 * @property {string} [configKey]         If the list of trait options doesn't match the name of the trait, where can
 *                                        the options be found within `CONFIG.MOJO`?
 * @property {string} [labelKey]          If config is an enum of objects, where can the label be found?
 * @property {object} [subtypes]          Configuration for traits that take some sort of base item.
 * @property {string} [subtypes.keyPath]  Path to subtype value on base items, should match a category key.
 * @property {string[]} [subtypes.ids]    Key for base item ID objects within `CONFIG.MOJO`.
 * @property {object} [children]          Mapping of category key to an object defining its children.
 * @property {boolean} [sortCategories]   Whether top-level categories should be sorted.
 */

/**
 * Configurable traits on actors.
 * @enum {TraitConfiguration}
 */
MOJO.traits = {
  saves: {
    label: "MOJO.ClassSaves",
    configKey: "abilities"
  },
  skills: {
    label: "MOJO.TraitSkillProf",
    labelKey: "label"
  },
  languages: {
    label: "MOJO.Languages"
  },
  di: {
    label: "MOJO.DamImm",
    configKey: "damageTypes"
  },
  dr: {
    label: "MOJO.DamRes",
    configKey: "damageTypes"
  },
  dv: {
    label: "MOJO.DamVuln",
    configKey: "damageTypes"
  },
  ci: {
    label: "MOJO.ConImm",
    configKey: "conditionTypes"
  },
  weapon: {
    label: "MOJO.TraitWeaponProf",
    actorKeyPath: "traits.weaponProf",
    configKey: "weaponProficiencies",
    subtypes: { keyPath: "weaponType", ids: ["weaponIds"] }
  },
  armor: {
    label: "MOJO.TraitArmorProf",
    actorKeyPath: "traits.armorProf",
    configKey: "armorProficiencies",
    subtypes: { keyPath: "armor.type", ids: ["armorIds", "shieldIds"] }
  },
  tool: {
    label: "MOJO.TraitToolProf",
    actorKeyPath: "traits.toolProf",
    configKey: "toolProficiencies",
    subtypes: { keyPath: "toolType", ids: ["toolIds"] },
    children: { vehicle: "vehicleTypes" },
    sortCategories: true
  }
};
preLocalize("traits", { key: "label" });

/* -------------------------------------------- */

/**
 * Special character flags.
 * @enum {CharacterFlagConfig}
 */
MOJO.characterFlags = {
  diamondSoul: {
    name: "MOJO.FlagsDiamondSoul",
    hint: "MOJO.FlagsDiamondSoulHint",
    section: "MOJO.Feats",
    type: Boolean
  },
  elvenAccuracy: {
    name: "MOJO.FlagsElvenAccuracy",
    hint: "MOJO.FlagsElvenAccuracyHint",
    section: "MOJO.RacialTraits",
    abilities: ["dex", "int", "wis", "cha"],
    type: Boolean
  },
  halflingLucky: {
    name: "MOJO.FlagsHalflingLucky",
    hint: "MOJO.FlagsHalflingLuckyHint",
    section: "MOJO.RacialTraits",
    type: Boolean
  },
  initiativeAdv: {
    name: "MOJO.FlagsInitiativeAdv",
    hint: "MOJO.FlagsInitiativeAdvHint",
    section: "MOJO.Feats",
    type: Boolean
  },
  initiativeAlert: {
    name: "MOJO.FlagsAlert",
    hint: "MOJO.FlagsAlertHint",
    section: "MOJO.Feats",
    type: Boolean
  },
  jackOfAllTrades: {
    name: "MOJO.FlagsJOAT",
    hint: "MOJO.FlagsJOATHint",
    section: "MOJO.Feats",
    type: Boolean
  },
  observantFeat: {
    name: "MOJO.FlagsObservant",
    hint: "MOJO.FlagsObservantHint",
    skills: ["prc", "inv"],
    section: "MOJO.Feats",
    type: Boolean
  },
  powerfulBuild: {
    name: "MOJO.FlagsPowerfulBuild",
    hint: "MOJO.FlagsPowerfulBuildHint",
    section: "MOJO.RacialTraits",
    type: Boolean
  },
  reliableTalent: {
    name: "MOJO.FlagsReliableTalent",
    hint: "MOJO.FlagsReliableTalentHint",
    section: "MOJO.Feats",
    type: Boolean
  },
  remarkableAthlete: {
    name: "MOJO.FlagsRemarkableAthlete",
    hint: "MOJO.FlagsRemarkableAthleteHint",
    abilities: ["str", "dex", "con"],
    section: "MOJO.Feats",
    type: Boolean
  },
  weaponCriticalThreshold: {
    name: "MOJO.FlagsWeaponCritThreshold",
    hint: "MOJO.FlagsWeaponCritThresholdHint",
    section: "MOJO.Feats",
    type: Number,
    placeholder: 20
  },
  spellCriticalThreshold: {
    name: "MOJO.FlagsSpellCritThreshold",
    hint: "MOJO.FlagsSpellCritThresholdHint",
    section: "MOJO.Feats",
    type: Number,
    placeholder: 20
  },
  meleeCriticalDamageDice: {
    name: "MOJO.FlagsMeleeCriticalDice",
    hint: "MOJO.FlagsMeleeCriticalDiceHint",
    section: "MOJO.Feats",
    type: Number,
    placeholder: 0
  }
};
preLocalize("characterFlags", { keys: ["name", "hint", "section"] });

/**
 * Flags allowed on actors. Any flags not in the list may be deleted during a migration.
 * @type {string[]}
 */
MOJO.allowedActorFlags = ["isPolymorphed", "originalActor"].concat(Object.keys(MOJO.characterFlags));

/* -------------------------------------------- */

/**
 * Advancement types that can be added to items.
 * @enum {*}
 */
MOJO.advancementTypes = {
  HitPoints: advancement.HitPointsAdvancement,
  ItemGrant: advancement.ItemGrantAdvancement,
  ScaleValue: advancement.ScaleValueAdvancement
};

/* -------------------------------------------- */

/**
 * Patch an existing config enum to allow conversion from string values to object values without
 * breaking existing modules that are expecting strings.
 * @param {string} key          Key within MOJO that has been replaced with an enum of objects.
 * @param {string} fallbackKey  Key within the new config object from which to get the fallback value.
 * @param {object} [options]    Additional options passed through to logCompatibilityWarning.
 */
function patchConfig(key, fallbackKey, options) {
  /** @override */
  function toString() {
    const message = `The value of CONFIG.MOJO.${key} has been changed to an object.`
      +` The former value can be acccessed from .${fallbackKey}.`;
    foundry.utils.logCompatibilityWarning(message, options);
    return this[fallbackKey];
  }

  Object.values(MOJO[key]).forEach(o => o.toString = toString);
}

/* -------------------------------------------- */

export default MOJO;
