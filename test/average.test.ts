import { expect } from 'chai';
import biasedRandom from "../src/index.ts";

suite("Average value", function() {

    const iterations = 20_000_000; // Gets quite close to real value (~0.1% error) and runs in 2 seconds
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

    _test({});
});
