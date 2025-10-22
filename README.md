# bias-random

[![npm](https://img.shields.io/npm/v/bias-random)](https://www.npmjs.com/package/bias-random)
[![npm](https://img.shields.io/npm/dt/bias-random)](https://www.npmjs.com/package/bias-random)
[![npm](https://img.shields.io/npm/l/bias-random)](https://www.npmjs.com/package/bias-random)

Generates biased random numbers with a customizable bias level, direction, and range

## 📦 Installation
```bash
npm i bias-random

# or
yarn add bias-random

# or
pnpm i bias-random
```

## 🚀 Usage
```ts
import biasedRandom from "bias-random";

// Default settings:
// -Bias towards lower numbers
// -Bias level of 2
// -Range 0 to 1
// Average resulting value will be 1/3
const defaultResult = biasedRandom();

// Cutomize the parmeters (all parameters are optional, defaulting to the values above)
const customResult = biasedRandom({ upperBias: true, biasLevel: 4, min: 10, max: 1000 });
```

## 🌐 CDN Usage

You can also use bias-random directly in the browser via CDN:
```html
<!-- Using unpkg -->
<script src="https://unpkg.com/bias-random"></script>

<!-- Using jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/bias-random"></script>

<!-- Specify version (recommended for production) -->
<script src="https://unpkg.com/bias-random@1.1.0"></script>
<script src="https://cdn.jsdelivr.net/npm/bias-random@1.1.0"></script>
```

When loaded via CDN, the library is available as the global variable `biasRandom`:
```html
<script>
  const result = biasRandom();
  console.log(result);
</script>
```

## 📃 Changelog

To view the release notes for each version, view the changelog:

* On GitHub: [Link](https://github.com/reid-moffat/bias-random/blob/main/CHANGELOG.md)
* On npm: [package page](https://www.npmjs.com/package/bias-random?activeTab=code) -> CHANGELOG.md
* In the repository: CHANGELOG.md

---

☕ [Buy me a coffee](https://buymeacoffee.com/reidmoffat) if this package helped you!
