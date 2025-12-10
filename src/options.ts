/**
 * Options object to customize the biased random generated result.
 *
 * The whole object as well as every field is optional.
 */
type BiasedRandomOptions = {
    /** Bias towards the higher number if true, otherwise lower */
    upperBias?: boolean;
    /** Bias factor, must be 1 or greater, default is 2 (1 is no bias) */
    biasLevel?: number;
    /** Minimum value, default is 0 */
    min?: number;
    /** Maximum value, default is 1 */
    max?: number;
}

export default BiasedRandomOptions;
