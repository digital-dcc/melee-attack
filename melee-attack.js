import {LitElement, html, css} from 'lit';

// @ts-ignore
export class MeleeAttack extends LitElement {
  static get styles() {
    return css`
		:host {
			display: block;
			padding: 0px;
			font-family: var(--main-font, 'Arial', sans-serif);
			font-size: 1em;
		}
		.wrapper {
			border: 1px black solid;
			width: fit-content;
			padding: 5px;
			border-radius: 10px;
			min-width: 60px;
			max-width: min-content;
			display: flex;
			flex-direction: column;
			gap: 3px;
		}
		.buttons {
			display: flex;
			gap: 5px;
			justify-content: center;
		}
		button {
			aspect-ratio: 1 / 1;
			border-radius: 5px;
			border: 1px black solid;
			cursor: pointer;
			background: none;
			min-width: 50px;
			min-height: 50px;
			margin:0;
			padding:0;
			color: black;
		}
		button:hover {
			background-color: rgba(211, 211, 211, 0.5);
		}
		button:active {
			transform: translateY(1px);
		}
		.text {
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: center;
		}
		h1 {
			margin: 0;
			padding: 0;
			font-size: 0.8em;
		}
		h2 {
			margin: 0;
			padding: 0;
			font-size: 0.6em;
		}
    `;
  }

  static get properties() {
    return {
      strength: {type: Number, required: true},
      weapon: {type: String, reflect: true},
			attackDie: {attribute: 'attack-die', type: String, reflect: true},
			damageDie: {attribute: 'damage-die', type: String, reflect: true},
      attackModifierAdjustment: {attribute: 'attack-modifier-adjustment', type: Number},
      attackModifierOverride: {attribute: 'attack-modifier-override', type: Number},
      damageModifierAdjustment: {attribute: 'damage-modifier-adjustment', type: Number},
      damageModifierOverride: {attribute: 'damage-modifier-override', type: Number},
    };
  }

  constructor() {
    super();
    this.strength = null;
    this.weapon = 'Unarmed';
		this.attackDie = '1d20';
		this.damageDie = '1d4';
    this.attackModifierAdjustment = 0;
    this.attackModifierOverride = null;
    this.damageModifierAdjustment = 0;
    this.damageModifierOverride = null;
  }

	connectedCallback() {
		super.connectedCallback();
		this.damageDie = this._damageDieFor(this.weapon);
	}

  render() {
    return html`
      <div class="wrapper" part="wrapper">
				<div class="buttons" part="buttons">
					<div class="attack" part="attack">
						<button @click="${this._attackRoll}">
							<h2 part="subtitle">Attack</h2>
							${this.attackDisplay}
						</button>
					</div>
					<div class="damage" part="damage">
						<button @click="${this._damageRoll}">
							<h2 part="subtitle">Damage</h2>
							${this.damageDisplay}
						</button>
					</div>
				</div>
				<div class="text" part="text">
					<h1 part="title">Melee</h1>
					<h2 part="subtitle">${this.weapon}</h2>
				</div>
			</div>
    `;
  }

	_attackRoll() {
		this.dispatchEvent(new CustomEvent('attack-rolled', { detail: { weapon: this.weapon, modifier: this.attackModifier }}));
	}

	_damageRoll() {
		this.dispatchEvent(new CustomEvent('damage-rolled', { detail: { weapon: this.weapon, modifier: this.damageModifier }}));
	}

	get attackModifier() {
		let modifier = this._modifierFor(this.strength);
    if (this.attackModifierAdjustment) modifier += this.attackModifierAdjustment;
		if (this.attackModifierOverride) modifier = this.attackModifierOverride;
		return modifier;
	}

  get attackDisplay() {
		const mod = this.attackModifier;
		return `${this.attackDie}${mod ? mod > 0 ? `+${mod}` : mod : ''}`;
  }

	get damageModifier() {
		let modifier = this._modifierFor(this.strength);
    if (this.damageModifierAdjustment) modifier += this.damageModifierAdjustment;
		if (this.damageModifierOverride) modifier = this.damageModifierOverride;
		return modifier;
	}

	get damageDisplay() {
		const mod = this.damageModifier;
		return `${this.damageDie}${mod ? mod > 0 ? `+${mod}` : mod : ''}`;
	}

  _damageDieFor(weaponType) {
    switch (weaponType) {
      case 'Battleaxe':
        return '1d10';
      case 'Blackjack':
        return '1d3/2d6';
      case 'Club':
        return '1d4';
      case 'Dagger':
        return '1d4/1d10';
      case 'Flail':
        return '1d6';
      case 'Garrote':
        return '1/3d4';
      case 'Handaxe':
        return '1d6';
      case 'Javelin':
        return '1d6';
      case 'Lance':
        return '1d12';
      case 'Longsword':
        return '1d8';
      case 'Mace':
        return '1d6';
      case 'Polearm':
        return '1d10';
      case 'Short sword':
        return '1d6';
      case 'Spear':
        return '1d8';
      case 'Staff':
        return '1d4';
      case 'Two-handed sword':
        return '1d10';
      case 'Warhammer':
        return '1d8';
      default:
        return '1d4';
    }
  }

  _modifierFor(stat) {
    if (stat <= 3) return -3;
    if (stat >= 4 && stat <= 5) return -2;
    if (stat >= 6 && stat <= 8) return -1;
    if (stat >= 9 && stat <= 12) return 0;
    if (stat >= 13 && stat <= 15) return +1;
    if (stat >= 16 && stat <= 17) return +2;
    if (stat >= 18) return +3;
    return 0;
  }
}

window.customElements.define('melee-attack', MeleeAttack);
