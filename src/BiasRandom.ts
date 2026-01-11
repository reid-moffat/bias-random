import BiasedRandomOptions from "./options.ts";

/**
 * Generates a random number between `min` and `max`, with an optional bias towards the lower or upper bound.
 *
 * @param {Object} [options] - Optional configuration object to adjust the behavior of the random number generation.
 * @param {boolean} [options.upperBias=false] - If true, biases the result towards the higher bound (`max`), otherwise biases towards the lower bound (`min`). Default is `false`.
 * @param {number} [options.biasLevel=2] - Determines the strength of the bias (power to raise the random result by). Must be 1 or greater, where `1` means no bias and higher values increase the bias. Default is `2`.
 * @param {number} [options.min=0] - The minimum value for the random number range. Default is `0`.
 * @param {number} [options.max=1] - The maximum value for the random number range. Default is `1`.
 *
 * @returns {number} A random number between `min` and `max`, optionally biased based on the provided options.
 *
 * @throws {TypeError} If `biasLevel` is not a number or is less than 1.
 * @throws {TypeError} If `min` is not less than `max`, or if either `min` or `max` is not a number.
 * @throws {TypeError} If `upperBias` is not a boolean.
 */
const biasedRandom: ((opts?: BiasedRandomOptions) => number) = ({upperBias = false, biasLevel = 2, min = 0, max = 1}: BiasedRandomOptions = {}): number => {

    if (!Number.isFinite(biasLevel) || biasLevel < 1) {
        throw new TypeError(`Parameter 'biasLevel' must be a number at least 1 (value: ${biasLevel}); use upperBias to swap bias direction`);
    }
    if (typeof min !== 'number' || typeof max !== 'number' || !isFinite(min) || !isFinite(max)) {
        throw new TypeError(`Parameters 'min' and 'max' must be finite numbers. Min value: ${min} Max value: ${max}`);
    }
    if (min >= max) {
        throw new TypeError(`Parameter 'min' must be less than 'max' (you can flip them for a valid result). Min value: ${min} Max value: ${max}`);
    }
    if (typeof upperBias !== 'boolean') {
        throw new TypeError(`Parameter 'upperBias' must be a boolean, value '${upperBias}' is invalid`);
    }

    let randomValue: number = Math.pow(Math.random(), biasLevel);

    if (upperBias) {
        randomValue = 1 - randomValue;
    }

    return min + randomValue * (max - min);
}

export default biasedRandom;
