import { expect } from 'chai';
import biasedRandom from "../src/index.ts";

suite("Invalid inputs", function() {

    suite("Invalid bias level", function() {
        const _test = (params: object) => {
            test("Params: " + JSON.stringify(params), function() { // @ts-ignore
                const expectedErr = `Parameter 'biasLevel' must be a number least 1 (value: ${params.biasLevel}); use upperBias to swap bias direction`;
                expect(() => biasedRandom(params)).to.throw(TypeError, expectedErr);
            });
        }

        _test({ biasLevel: 0.9999 });
        _test({ biasLevel: 0.2 });
        _test({ biasLevel: 0.5 });
        _test({ biasLevel: 0.7 });
        _test({ biasLevel: -1 });
        _test({ biasLevel: -2 });
        _test({ biasLevel: -124 });
        _test({ biasLevel: -37.8 });

        _test({ biasLevel: "true" });
        _test({ biasLevel: "false" });
    });

    suite("Invalid min/max", function() {
        const _test = (params: object) => {
            test("Params: " + JSON.stringify(params), function() { // @ts-ignore
                const expectedErr = `Parameter 'min' muist be less than 'max' (you can flip them for a valid result). Min value: ${params.min ?? 0} Max value: ${params.max ?? 1}`;
                expect(() => biasedRandom(params)).to.throw(TypeError, expectedErr);
            });
        }

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

    suite("Invalid upperBias type", function() {
        const _test = (params: object) => {
            test("Params: " + JSON.stringify(params), function() { // @ts-ignore
                const expectedErr = `Parameter 'upperBias' must be a boolean, value '${params.upperBias}' is invalid`;
                expect(() => biasedRandom(params)).to.throw(TypeError, expectedErr);
            });
        }

        _test({ upperBias: "true" });
        _test({ upperBias: "false" });
        _test({ upperBias: 0 });
        _test({ upperBias: 1 });
        _test({ upperBias: 1.7 });
        _test({ upperBias: -34 });
        _test({ upperBias: -325.6 });
        _test({ upperBias: null });
        _test({ upperBias: NaN });
    });
});
