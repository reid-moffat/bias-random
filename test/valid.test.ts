import { expect } from 'chai';
import biasedRandom, { BiasedRandomOptions } from 'bias-random';

suite('Valid inputs', function () {
    const _test = (params: BiasedRandomOptions) => {
        test('Params: ' + JSON.stringify(params), function () {
            const result: number = biasedRandom(params);

            const { min = 0, max = 1, ..._ } = params;

            expect(result).to.be.at.least(min);
            expect(result).to.be.at.most(max);
        });
    };

    suite('Manual TCs', function () {
        _test({});
        _test({ biasLevel: 2, upperBias: false });
        _test({ biasLevel: 2, upperBias: true });
        _test({ min: 0, max: 1, biasLevel: 2, upperBias: false });
        _test({ min: 0, max: 1, biasLevel: 2, upperBias: true });
        _test({ min: -1, max: 1, biasLevel: 3, upperBias: false });
        _test({ min: -1, max: 1, biasLevel: 3, upperBias: true });
        _test({ min: 0, max: 100, biasLevel: 5, upperBias: false });
        _test({ min: 0, max: 100, biasLevel: 5, upperBias: true });
        _test({ min: 10, max: 20, biasLevel: 4, upperBias: false });
        _test({ min: 10, max: 20, biasLevel: 4, upperBias: true });
        _test({ min: 0, max: 10, biasLevel: 10, upperBias: false });
        _test({ min: 0, max: 10, biasLevel: 10, upperBias: true });
        _test({ min: -100, max: 0, biasLevel: 3, upperBias: false });
        _test({ min: -100, max: 0, biasLevel: 3, upperBias: true });
        _test({ min: -50, max: 50, biasLevel: 1, upperBias: false });
        _test({ min: -50, max: 50, biasLevel: 1, upperBias: true });
        _test({ min: 0, max: 1, biasLevel: 100, upperBias: false });
        _test({ min: 0, max: 1, biasLevel: 100, upperBias: true });
        _test({ min: -1000, max: 1000, biasLevel: 10, upperBias: false });
        _test({ min: -1000, max: 1000, biasLevel: 10, upperBias: true });
        _test({ min: 0.5, max: 0.9, biasLevel: 2, upperBias: false });
        _test({ min: 0.5, max: 0.9, biasLevel: 2, upperBias: true });
        _test({ min: 1, max: 100, biasLevel: 50, upperBias: false });
        _test({ min: 1, max: 100, biasLevel: 50, upperBias: true });
        _test({ min: -100, max: -10, biasLevel: 4, upperBias: false });
        _test({ min: -100, max: -10, biasLevel: 4, upperBias: true });
    });

    suite('Generated tests', function () {
        const generateParams: () => BiasedRandomOptions = (): BiasedRandomOptions => {
            const min: number = Math.random() * 2_000_000 - 1_500_000;
            const max: number = Math.random() * 1_000_000;
            const biasLevel: number = Math.random() * 1000 + 1;
            const upperBias: boolean = Math.random() < 0.5;

            const params: BiasedRandomOptions = {};

            if (Math.random() < 0.7) {
                params.min = min;
            }
            if (params.min || Math.random() < 0.7) {
                params.max = (params.min ?? 0) + (Math.random() < 0.7 ? max : 1);
            }
            if (Math.random() < 0.7) {
                params.biasLevel = biasLevel;
            }
            if (Math.random() < 0.7) {
                params.upperBias = upperBias;
            }

            return params;
        };

        for (let i: number = 0; i < 10_000; ++i) {
            _test(generateParams());
        }
    });
});
