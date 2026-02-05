import BiasedRandomOptions from './options.ts';

/**
 * Generates a random number between `min` and `max`, with an optional bias towards the lower or upper bound
 *
 * @param {Object} [options] - Optional configuration object to adjust the behavior of the random number generation
 * @param {boolean} [options.upperBias=false] - If true, biases the result towards the higher bound (`max`), otherwise biases towards the lower bound (`min`)
 * @param {number} [options.biasLevel=2] - Determines the strength of the bias (power to raise the random result by). Must be 1 or greater, where `1` means no bias and higher values increase the bias
 * @param {number} [options.min=0] - The minimum value for the random number range
 * @param {number} [options.max=1] - The maximum value for the random number range
 *
 * @returns {number} A random number between `min` and `max`, optionally biased based on the provided options
 *
 * @throws {TypeError} If `biasLevel` is not a number or is less than 1
 * @throws {TypeError} If `min` is not less than `max`, or if either `min` or `max` is not a number
 * @throws {TypeError} If `upperBias` is not a boolean
 */
const biasedRandom: (opts?: BiasedRandomOptions) => number = ({
    upperBias = false,
    biasLevel = 2,
    min = 0,
    max = 1,
}: BiasedRandomOptions = {}): number => {
    // Bias level: Finite real number at least 1
    if (typeof biasLevel !== 'number') {
        throw new TypeError(
            `Parameter 'biasLevel' must be a number, received ${biasLevel} (type: ${typeof biasLevel})`
        );
    }
    if (!Number.isFinite(biasLevel)) {
        throw new TypeError(`Parameter biasLevel must be a finite number (value: ${biasLevel})`);
    }
    if (biasLevel < 1) {
        throw new TypeError(
            `Parameter 'biasLevel' must be >= 1 (value: ${biasLevel}); use upperBias to swap bias direction`
        );
    }

    // Min and max: Finite real numbers where min is strictly less than max
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw new TypeError(
            `Parameters 'min' and 'max' must be numbers. Received min: ${min} (type: ${typeof min}), max: ${max} (type: ${typeof max})`
        );
    }
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
        throw new TypeError(
            `Parameters 'min' and 'max' must be finite numbers. Min value: ${min} Max value: ${max}`
        );
    }
    if (min >= max) {
        throw new TypeError(
            `Parameter 'min' must be less than 'max' (you can flip them for a valid result). Min value: ${min} Max value: ${max}`
        );
    }

    // Upper bias: just needs to be a boolean
    if (typeof upperBias !== 'boolean') {
        throw new TypeError(
            `Parameter 'upperBias' must be a boolean, value '${upperBias}' (type: ${typeof upperBias}) is invalid`
        );
    }

    let randomValue: number = Math.pow(Math.random(), biasLevel);

    if (upperBias) {
        randomValue = 1 - randomValue;
    }

    return min + randomValue * (max - min);
};

export default biasedRandom;
