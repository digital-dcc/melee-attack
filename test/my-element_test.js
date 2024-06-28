/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {MeleeAttack} from '../melee-attack.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('melee-attack', () => {
  test('is defined', () => {
    const el = document.createElement('melee-attack');
    assert.instanceOf(el, MeleeAttack);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<melee-attack strength="18"></melee-attack>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="wrapper" part="wrapper">
				<div class="buttons" part="buttons">
					<div class="attack" part="attack">
						<button>
							<h2 part="subtitle">Attack</h2>
							1d20+3
						</button>
					</div>
					<div class="damage" part="damage">
						<button>
							<h2 part="subtitle">Damage</h2>
							1d4+3
						</button>
					</div>
				</div>
				<div class="text" part="text">
					<h1 part="title">Melee</h1>
					<h2 part="subtitle">Unarmed</h2>
				</div>
			</div>
    `
    );
  });

  test('renders with a set name', async () => {
    const el = await fixture(html`<melee-attack strength="9" weapon="Flail"></melee-attack>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="wrapper" part="wrapper">
				<div class="buttons" part="buttons">
					<div class="attack" part="attack">
						<button>
							<h2 part="subtitle">Attack</h2>
							1d20
						</button>
					</div>
					<div class="damage" part="damage">
						<button>
							<h2 part="subtitle">Damage</h2>
							1d6
						</button>
					</div>
				</div>
				<div class="text" part="text">
					<h1 part="title">Melee</h1>
					<h2 part="subtitle">Flail</h2>
				</div>
			</div>
    `
    );
  });

  test('handles a click', async () => {
    let clickedCount = 0;
		let weapon;
		let modifier;
    const clickHandler = (event) => {
			clickedCount++;
			weapon = event.detail.weapon;
			modifier = event.detail.modifier;
		}
    const el = await fixture(
      html`<melee-attack
        @attack-rolled=${clickHandler}
        strength="8"
				weapon="Longsword"
      ></melee-attack>`
    );
    const button = el.shadowRoot?.querySelector('button');
    button?.click();
    // @ts-ignore
    await el.updateComplete;
    assert.equal(clickedCount, 1);
    assert.equal(weapon, 'Longsword');
    assert.equal(modifier, '-1');
  });

  test('styling applied', async () => {
    const el = await fixture(html`<melee-attack></melee-attack>`);
    // @ts-ignore
    await el.updateComplete;
    assert.equal(getComputedStyle(el).paddingTop, '0px');
  });
});
