# bias-random

[![npm](https://img.shields.io/npm/v/bias-random)](https://www.npmjs.com/package/bias-random)
[![npm](https://img.shields.io/npm/dt/bias-random)](https://www.npmjs.com/package/bias-random)
[![npm](https://img.shields.io/npm/l/bias-random)](https://www.npmjs.com/package/bias-random)

Generates biased random numbers with a customizable bias level, direction, and range

## 📦 Installation

```bash
npm install bias-random

# or
yarn add install bias-random

# or
pnpm install bias-random
```

## 🚀 Usage

```ts
import biasedRandom from "bias-random";

// Default settings:
// -Bias towards lower numbers
// -Bias level of 2
// -Range 0 to 1
// Average resulting value will be 1/3
const defaultResult = biasRandom();

// Cutomize the parmeters (all parameters are optional, defaulting to the values above)
const customResult = biasRandom({ upperBias: true, biasLevel: 4, min: 10, max: 1000 });
```
