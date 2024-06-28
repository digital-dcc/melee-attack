---
layout: page.11ty.cjs
title: <melee-attack> ⌲ Home
---

# &lt;melee-attack>

`<melee-attack>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<melee-attack>` is just an HTML element. You can it anywhere you can use HTML!

```html
<melee-attack></melee-attack>
```

  </div>
  <div>

<melee-attack></melee-attack>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<melee-attack>` can be configured with attributed in plain HTML.

```html
<melee-attack name="HTML"></melee-attack>
```

  </div>
  <div>

<melee-attack name="HTML"></melee-attack>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<melee-attack>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name = 'lit-html';

render(
  html`
    <h2>This is a &lt;melee-attack&gt;</h2>
    <melee-attack .name=${name}></melee-attack>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;melee-attack&gt;</h2>
<melee-attack name="lit-html"></melee-attack>

  </div>
</section>
