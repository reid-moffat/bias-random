import { expect } from 'chai';
import stringifyObject from 'stringify-object';
import biasedRandom, { BiasedRandomOptions } from 'bias-random';

suite('Invalid inputs', function () {
    suite('Invalid bias level', function () {
        const _test = (params: BiasedRandomOptions) => {
            test('Params: ' + stringifyObject(params), function () {
                let expectedErr;
                const biasLevel = params.biasLevel;
                if (typeof biasLevel !== 'number') {
                    expectedErr = `Parameter 'biasLevel' must be a number, received ${biasLevel} (type: ${typeof biasLevel})`;
                } else if (!Number.isFinite(biasLevel)) {
                    expectedErr = `Parameter biasLevel must be a finite number (value: ${biasLevel})`;
                } else {
                    expectedErr = `Parameter 'biasLevel' must be >= 1 (value: ${biasLevel}); use upperBias to swap bias direction`;
                }

                expect(() => biasedRandom(params)).to.throw(TypeError, expectedErr);
            });
        };

        _test({ biasLevel: 0.9999 });
        _test({ biasLevel: 0.2 });
        _test({ biasLevel: 0.5 });
        _test({ biasLevel: 0.7 });
        _test({ biasLevel: -1 });
        _test({ biasLevel: -2 });
        _test({ biasLevel: -124 });
        _test({ biasLevel: -37.8 });

        // @ts-ignore
        _test({ biasLevel: 'true' }); // @ts-ignore
        _test({ biasLevel: 'false' }); // @ts-ignore
        _test({ biasLevel: '' }); // @ts-ignore
        _test({ biasLevel: '1' }); // @ts-ignore
        _test({ biasLevel: '2' }); // @ts-ignore
        _test({ biasLevel: '7' }); // @ts-ignore
        _test({ biasLevel: '3.5' }); // @ts-ignore
        _test({ biasLevel: '-1.5' }); // @ts-ignore
        _test({ biasLevel: '0' }); // @ts-ignore
        _test({ biasLevel: '-0' }); // @ts-ignore
        _test({ biasLevel: '-2' }); // @ts-ignore
        _test({ biasLevel: null }); // @ts-ignore
        _test({ biasLevel: [] }); // @ts-ignore
        _test({ biasLevel: {} }); // @ts-ignore
        _test({ biasLevel: [2] }); // @ts-ignore
        _test({ biasLevel: { value: 2 } });
        _test({ biasLevel: NaN });
        _test({ biasLevel: Infinity });
        _test({ biasLevel: -Infinity });
    });

    suite('Invalid min/max type', function () {
        const _test = (params: BiasedRandomOptions) => {
            test('Params: ' + stringifyObject(params), function () {
                const min = params.min === undefined ? 0 : params.min;
                const max = params.max === undefined ? 1 : params.max;

                let expectedErr;
                if (typeof min !== 'number' || typeof max !== 'number') {
                    expectedErr = `Parameters 'min' and 'max' must be numbers. Received min: ${min} (type: ${typeof min}), max: ${max} (type: ${typeof max})`;
                } else if (!Number.isFinite(min) || !Number.isFinite(max)) {
                    expectedErr = `Parameters 'min' and 'max' must be finite numbers. Min value: ${min} Max value: ${max}`;
                } else if (min >= max) {
                    expectedErr = `Parameter 'min' must be less than 'max' (you can flip them for a valid result). Min value: ${min} Max value: ${max}`;
                }

                expect((): number => biasedRandom(params)).to.throw(TypeError, expectedErr);
            });
        };

        _test({ min: Infinity });
        _test({ max: Infinity });
        _test({ min: Infinity, max: Infinity });
        _test({ min: -Infinity });
        _test({ max: -Infinity });
        _test({ min: -Infinity, max: -Infinity });
        _test({ min: Infinity, max: -Infinity });
        _test({ min: -Infinity, max: Infinity });

        _test({ min: NaN });
        _test({ max: NaN });
        _test({ min: NaN, max: NaN });
        _test({ min: NaN, max: 10 });
        _test({ min: 0, max: NaN });

        // @ts-ignore
        _test({ min: '0' }); // @ts-ignore
        _test({ max: '1' }); // @ts-ignore
        _test({ min: '0', max: '1' }); // @ts-ignore
        _test({ min: null }); // @ts-ignore
        _test({ max: null }); // @ts-ignore
        _test({ min: [] }); // @ts-ignore
        _test({ max: [] }); // @ts-ignore
        _test({ min: {} }); // @ts-ignore
        _test({ max: {} }); // @ts-ignore
        _test({ min: [0] }); // @ts-ignore
        _test({ max: [1] });
    });

    suite('Invalid min/max relationship', function () {
        const _test = (params: BiasedRandomOptions) => {
            test('Params: ' + stringifyObject(params), function () {
                const expectedErr = `Parameter 'min' must be less than 'max' (you can flip them for a valid result). Min value: ${params.min ?? 0} Max value: ${params.max ?? 1}`;
                expect(() => biasedRandom(params)).to.throw(TypeError, expectedErr);
            });
        };

        _test({ min: 1 });
        _test({ min: 1.45 });
        _test({ min: 23 });
        _test({ min: 17.7 });

        _test({ max: 0 });
        _test({ max: -0.01 });
        _test({ max: -0.6 });
        _test({ max: -23 });
        _test({ max: -34.2 });

        _test({ min: 1, max: 1 });
        _test({ min: 2, max: 1 });
        _test({ min: 0, max: 0 });
        _test({ min: -1, max: -5 });
        _test({ min: 10, max: 5 });
    });

    suite('Invalid upperBias type', function () {
        const _test = (params: BiasedRandomOptions) => {
            test('Params: ' + stringifyObject(params), function () {
                const expectedErr = `Parameter 'upperBias' must be a boolean, value '${params.upperBias}' (type: ${typeof params.upperBias}) is invalid`;
                expect(() => biasedRandom(params)).to.throw(TypeError, expectedErr);
            });
        };

        // @ts-ignore
        _test({ upperBias: 'true' }); // @ts-ignore
        _test({ upperBias: 'false' }); // @ts-ignore
        _test({ upperBias: 0 }); // @ts-ignore
        _test({ upperBias: 1 }); // @ts-ignore
        _test({ upperBias: 1.7 }); // @ts-ignore
        _test({ upperBias: -34 }); // @ts-ignore
        _test({ upperBias: -325.6 }); // @ts-ignore
        _test({ upperBias: null }); // @ts-ignore
        _test({ upperBias: NaN }); // @ts-ignore
        _test({ upperBias: [] }); // @ts-ignore
        _test({ upperBias: {} }); // @ts-ignore
        _test({ upperBias: [true] });
    });

    suite('Multiple invalid parameters', function () {
        test('Invalid biasLevel and invalid min', function () {
            expect(() => biasedRandom({ biasLevel: 0.5, min: 5 })).to.throw(TypeError);
        });

        test('Invalid biasLevel and invalid max', function () {
            expect(() => biasedRandom({ biasLevel: -1, max: -5 })).to.throw(TypeError);
        });

        test('Invalid min/max relationship and invalid biasLevel', function () {
            expect(() => biasedRandom({ biasLevel: 0, min: 10, max: 5 })).to.throw(TypeError);
        });

        test('Invalid upperBias and invalid biasLevel', function () {
            // @ts-ignore
            expect(() => biasedRandom({ upperBias: 'true', biasLevel: -1 })).to.throw(TypeError);
        });

        test('Invalid min type and invalid max type', function () {
            // @ts-ignore
            expect(() => biasedRandom({ min: '0', max: '10' })).to.throw(TypeError);
        });

        test('All parameters invalid', function () {
            // @ts-ignore
            expect(() => // @ts-expect-error
                biasedRandom({ biasLevel: -1, min: Infinity, max: NaN, upperBias: 'yes' })
            ).to.throw(TypeError);
        });

        test('Valid biasLevel but min equals max', function () {
            expect(() => biasedRandom({ biasLevel: 2, min: 5, max: 5 })).to.throw(TypeError);
        });

        test('Min is NaN with valid biasLevel', function () {
            expect(() => biasedRandom({ biasLevel: 3, min: NaN })).to.throw(TypeError);
        });

        test('Max is Infinity with inverted min/max', function () {
            expect(() => biasedRandom({ max: Infinity, min: 10 })).to.throw(TypeError);
        });
    });
});
