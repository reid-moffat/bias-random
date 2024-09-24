interface BiasedRandomOptions {
  upperBias?: boolean; // Bias towards the higher number if true, otherwise lower
  biasLevel?: number;  // Bias factor, must be 2 or greater, default is 2
  min?: number;        // Minimum value, default is 0
  max?: number;        // Maximum value, default is 1
}

/**
 * Generates a random number, biased towards lower of higher numbers
 */
const biasedRandom = ({
  upperBias = false,
  biasLevel = 2,
  min = 0,
  max = 1
}: BiasedRandomOptions = {}): number => {
  if (biasLevel < 2) {
    throw new Error('biasLevel must be 2 or greater.');
  }

  const range = max - min;
  let randomValue = Math.random();

  // Apply bias transformation
  randomValue = Math.pow(randomValue, biasLevel);

  // Reverse for upper bias
  if (upperBias) {
    randomValue = 1 - randomValue;
  }

  // Scale to range
  return min + randomValue * range;
}

export default biasedRandom;
