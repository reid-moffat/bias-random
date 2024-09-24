import { expect } from 'chai';
import biasedRandom from "../src/index.ts";

suite("Average value", function() {

    const iterations = 20_000_000; // Gets quite close to real value (~0.1% error) and runs in 2 seconds on average
    const _test = (params: object) => {

        // @ts-ignore
        const { upperBias = false, biasLevel = 2, min = 0, max = 1 } = params;

        let testName = `Bias: ${biasLevel}`;
        if (upperBias || min !== 0 || max !== 1) {
            testName += ` (`;
            testName += upperBias ? "Upper biased" : "";
            testName += (upperBias ? ', ' : '') + `Min: ${min}`;
            testName += (testName.length > 1 ? " " : "") + `Max: ${max}`;
            testName += ')';
        }

        test(testName, function() {
            let sum = 0;
            for (let i = 0; i < iterations; i++) { // @ts-ignore
                sum += biasedRandom(params);
            }

            const average = sum / iterations;
            const expected = min + (upperBias ? 1 - 1 / (biasLevel + 1) : 1 / (biasLevel + 1)) * (max - min);
            const maxError = 0.01 * (max - min);

            console.log(`Average: ${sum / iterations}`);
            console.log(`Expected: ${expected}`);
            console.log(`Max error: ${maxError}`);
            console.log(`Error: ${Math.abs(average - expected)}`);

            expect(average).to.be.closeTo(expected, maxError);
        });
    }

    // Test cases with various combinations of parameters

    _test({});

    _test({ upperBias: true });

    _test({ biasLevel: 3 });

    _test({ biasLevel: 3, upperBias: true });

    _test({ min: -1, max: 1 });

    _test({ min: -1, max: 1, upperBias: true });

    _test({ min: 0, max: 100, biasLevel: 10 });

    _test({ min: 0, max: 100, biasLevel: 10, upperBias: true });

    _test({ min: 5, max: 10, biasLevel: 2 });

    _test({ min: 5, max: 10, biasLevel: 2, upperBias: true });

    _test({ min: 0.999, max: 1, biasLevel: 2 });

    _test({ min: 0, max: 10000, biasLevel: 5 });

    _test({ min: 0, max: 10000, biasLevel: 5, upperBias: true });

    _test({ min: 10, max: 20, biasLevel: 4 });

    _test({ upperBias: true, min: -100, max: 100 });

});
