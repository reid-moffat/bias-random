/**
 * Options object to customize the biased random generated result
 *
 * Every field, as well as providing this object itself, is optional
 */
type BiasedRandomOptions = {
    /** Bias towards the maximum number if true, otherwise biased towards the minimum number (default false) */
    upperBias?: boolean;
    /** Bias factor (power to raise the random result by). Must be 1 (no bias) or greater, default is 2 */
    biasLevel?: number;
    /** Minimum value (default 0) */
    min?: number;
    /** Maximum value (default 1) */
    max?: number;
};

export default BiasedRandomOptions;
