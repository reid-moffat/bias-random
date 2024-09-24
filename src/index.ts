interface BiasedRandomOptions {
  upperBias?: boolean; // Bias towards the higher number if true, otherwise lower
  biasLevel?: number;  // Bias factor, must be 2 or greater, default is 2
  min?: number;        // Minimum value, default is 0
  max?: number;        // Maximum value, default is 1
}

/**
 * Generates a random number, biased towards lower or higher numbers with the level of your choice
 *
 * @param upperBias Set to true to bias this towards higher numbers instead of lower numbers. E.g. with a range of 0
 * to 1, a biasLevel of 2, the average value would be 2/3 (1 - (1 / 3))
 * @param biasLevel How strongly the bias is, default 2. The resulting values have an average value of 1 / (biasLevel
 * + 1) (given upperBias = false and a range of 0 to 1). Can be a decimal number, but must be at least 1 (for less than
 * 1, this is equivalent to using an upperBias, e.g. a bias of 0.5 is the same as an upper bias of 2)
 * @param min Minimum value of the result, default 0. This scales the result, but keeps the relative bias
 * @param max Maximum value of the result, default 1. This scales the result, but keeps the relative bias
 */
const biasedRandom = ({ upperBias = false, biasLevel = 2, min = 0, max = 1 }: BiasedRandomOptions = {}): number => {

  if (biasLevel < 1) {
    throw new TypeError(`Parameter 'biasLevel' must be at least 1 (value: ${biasLevel}); use upperBias to swap bias direction`);
  }
  if (min >= max) {
    throw new TypeError(`Parameter 'min' muist be less than 'max' (you can flip them for a valid result). Min value: ${min} Max value: ${max}`);
  }

  let randomValue = Math.pow(Math.random(), biasLevel);

  if (upperBias) {
    randomValue = 1 - randomValue;
  }

  return min + randomValue * (max - min);
}

export default biasedRandom;
