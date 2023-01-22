/**
 * A type of Roll specific to a damage (or healing) roll in the 5e system.
 * @param {string} formula                       The string formula to parse
 * @param {object} data                          The data object against which to parse attributes within the formula
 * @param {object} [options={}]                  Extra optional arguments which describe or modify the DamageRoll
 * @param {number} [options.criticalBonusDice=0]      A number of bonus damage dice that are added for critical hits
 * @param {number} [options.criticalMultiplier=2]     A critical hit multiplier which is applied to critical hits
 * @param {boolean} [options.multiplyNumeric=false]   Multiply numeric terms by the critical multiplier
 * @param {boolean} [options.powerfulCritical=false]  Apply the "powerful criticals" house rule to critical hits
 * @param {string} [options.criticalBonusDamage]      An extra damage term that is applied only on a critical hit
 */
export default class DamageRoll extends Roll {
  constructor(formula, data, options) {
    super(formula, data, options);
    if ( !this.options.preprocessed ) this.preprocessFormula();
    // For backwards compatibility, skip rolls which do not have the "critical" option defined
    if ( (this.options.critical !== undefined) && !this.options.configured ) this.configureDamage();
  }

  /* -------------------------------------------- */

  /**
   * Create a DamageRoll from a standard Roll instance.
   * @param {Roll} roll
   * @returns {DamageRoll}
   */
  static fromRoll(roll) {
    const newRoll = new this(roll.formula, roll.data, roll.options);
    Object.assign(newRoll, roll);
    return newRoll;
  }

  /* -------------------------------------------- */

  /**
   * The HTML template path used to configure evaluation of this Roll
   * @type {string}
   */
  static EVALUATION_TEMPLATE = "systems/mojo/templates/chat/roll-dialog.hbs";

  /* -------------------------------------------- */

  /**
   * A convenience reference for whether this DamageRoll is a critical hit
   * @type {boolean}
   */
  get isCritical() {
    return this.options.critical;
  }

  /* -------------------------------------------- */
  /*  Damage Roll Methods                         */
  /* -------------------------------------------- */

  /**
   * Perform any term-merging required to ensure that criticals can be calculated successfully.
   * @protected
   */
  preprocessFormula() {
    for ( let [i, term] of this.terms.entries() ) {
      const nextTerm = this.terms[i + 1];
      const prevTerm = this.terms[i - 1];

      // Convert shorthand dX terms to 1dX pre-emptively to allow them to be appropriately doubled for criticals.
      if ( (term instanceof StringTerm) && /^d\d+/.test(term.term) ) {
        const formula = `1${term.term}`;
        const newTerm = new Roll(formula).terms[0];
        this.terms.splice(i, 1, newTerm);
        term = newTerm;
      }

      // Merge parenthetical terms that follow string terms to build a dice term (to allow criticals)
      if ( (term instanceof ParentheticalTerm) && (prevTerm instanceof StringTerm)
        && prevTerm.term.match(/^[0-9]*d$/)) {
        if ( term.isDeterministic ) {
          let newFormula = `${prevTerm.term}${term.evaluate().total}`;
          let deleteCount = 2;

          // Merge in any roll modifiers
          if ( nextTerm instanceof StringTerm ) {
            newFormula += nextTerm.term;
            deleteCount += 1;
          }

          const newTerm = (new Roll(newFormula)).terms[0];
          this.terms.splice(i - 1, deleteCount, newTerm);
          term = newTerm;
        }
      }

      // Merge any parenthetical terms followed by string terms
      else if ( (term instanceof ParentheticalTerm || term instanceof MathTerm) && (nextTerm instanceof StringTerm)
        && nextTerm.term.match(/^d[0-9]*$/)) {
        if ( term.isDeterministic ) {
          const newFormula = `${term.evaluate().total}${nextTerm.term}`;
          const newTerm = (new Roll(newFormula)).terms[0];
          this.terms.splice(i, 2, newTerm);
          term = newTerm;
        }
      }
    }

    // Re-compile the underlying formula
    this._formula = this.constructor.getFormula(this.terms);

    // Mark configuration as complete
    this.options.preprocessed = true;
  }

  /* -------------------------------------------- */

  /**
   * Apply optional modifiers which customize the behavior of the d20term.
   * @protected
   */
  configureDamage() {
    let flatBonus = 0;
    for ( let [i, term] of this.terms.entries() ) {
      // Multiply dice terms
      if ( term instanceof DiceTerm ) {
        term.options.baseNumber = term.options.baseNumber ?? term.number; // Reset back
        term.number = term.options.baseNumber;
        if ( this.isCritical ) {
          let cm = this.options.criticalMultiplier ?? 2;

          // Powerful critical - maximize damage and reduce the multiplier by 1
          if ( this.options.powerfulCritical ) {
            flatBonus += (term.number * term.faces);
            cm = Math.max(1, cm-1);
          }

          // Alter the damage term
          let cb = (this.options.criticalBonusDice && (i === 0)) ? this.options.criticalBonusDice : 0;
          term.alter(cm, cb);
          term.options.critical = true;
        }
      }

      // Multiply numeric terms
      else if ( this.options.multiplyNumeric && (term instanceof NumericTerm) ) {
        term.options.baseNumber = term.options.baseNumber ?? term.number; // Reset back
        term.number = term.options.baseNumber;
        if ( this.isCritical ) {
          term.number *= (this.options.criticalMultiplier ?? 2);
          term.options.critical = true;
        }
      }
    }

    // Add powerful critical bonus
    if ( this.options.powerfulCritical && (flatBonus > 0) ) {
      this.terms.push(new OperatorTerm({operator: "+"}));
      this.terms.push(new NumericTerm({number: flatBonus}, {flavor: game.i18n.localize("MOJO.PowerfulCritical")}));
    }

    // Add extra critical damage term
    if ( this.isCritical && this.options.criticalBonusDamage ) {
      const extra = new Roll(this.options.criticalBonusDamage, this.data);
      if ( !(extra.terms[0] instanceof OperatorTerm) ) this.terms.push(new OperatorTerm({operator: "+"}));
      this.terms.push(...extra.terms);
    }

    // Re-compile the underlying formula
    this._formula = this.constructor.getFormula(this.terms);

    // Mark configuration as complete
    this.options.configured = true;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  toMessage(messageData={}, options={}) {
    messageData.flavor = messageData.flavor || this.options.flavor;
    if ( this.isCritical ) {
      const label = game.i18n.localize("MOJO.CriticalHit");
      messageData.flavor = messageData.flavor ? `${messageData.flavor} (${label})` : label;
    }
    options.rollMode = options.rollMode ?? this.options.rollMode;
    return super.toMessage(messageData, options);
  }

  /* -------------------------------------------- */
  /*  Configuration Dialog                        */
  /* -------------------------------------------- */

  /**
   * Create a Dialog prompt used to configure evaluation of an existing D20Roll instance.
   * @param {object} data                     Dialog configuration data
   * @param {string} [data.title]               The title of the shown dialog window
   * @param {number} [data.defaultRollMode]     The roll mode that the roll mode select element should default to
   * @param {string} [data.defaultCritical]     Should critical be selected as default
   * @param {string} [data.template]            A custom path to an HTML template to use instead of the default
   * @param {boolean} [data.allowCritical=true] Allow critical hit to be chosen as a possible damage mode
   * @param {object} options                  Additional Dialog customization options
   * @returns {Promise<D20Roll|null>}         A resulting D20Roll object constructed with the dialog, or null if the
   *                                          dialog was closed
   */
  async configureDialog({title, defaultRollMode, defaultCritical=false, template, allowCritical=true}={}, options={}) {

    // Render the Dialog inner HTML
    const content = await renderTemplate(template ?? this.constructor.EVALUATION_TEMPLATE, {
      formula: `${this.formula} + @bonus`,
      defaultRollMode,
      rollModes: CONFIG.Dice.rollModes
    });

    // Create the Dialog window and await submission of the form
    return new Promise(resolve => {
      new Dialog({
        title,
        content,
        buttons: {
          critical: {
            condition: allowCritical,
            label: game.i18n.localize("MOJO.CriticalHit"),
            callback: html => resolve(this._onDialogSubmit(html, true))
          },
          normal: {
            label: game.i18n.localize(allowCritical ? "MOJO.Normal" : "MOJO.Roll"),
            callback: html => resolve(this._onDialogSubmit(html, false))
          }
        },
        default: defaultCritical ? "critical" : "normal",
        close: () => resolve(null)
      }, options).render(true);
    });
  }

  /* -------------------------------------------- */

  /**
   * Handle submission of the Roll evaluation configuration Dialog
   * @param {jQuery} html         The submitted dialog content
   * @param {boolean} isCritical  Is the damage a critical hit?
   * @returns {DamageRoll}        This damage roll.
   * @private
   */
  _onDialogSubmit(html, isCritical) {
    const form = html[0].querySelector("form");

    // Append a situational bonus term
    if ( form.bonus.value ) {
      const bonus = new Roll(form.bonus.value, this.data);
      if ( !(bonus.terms[0] instanceof OperatorTerm) ) this.terms.push(new OperatorTerm({operator: "+"}));
      this.terms = this.terms.concat(bonus.terms);
    }

    // Apply advantage or disadvantage
    this.options.critical = isCritical;
    this.options.rollMode = form.rollMode.value;
    this.configureDamage();
    return this;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  static fromData(data) {
    const roll = super.fromData(data);
    roll._formula = this.getFormula(roll.terms);
    return roll;
  }
}
