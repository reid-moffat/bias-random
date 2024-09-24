import { expect } from 'chai';
import biasedRandom from "../src/index.ts";

suite("Basic tests", function() {

    suite("Valid inputs", function() {

        const _test = (params: object) => {
            test("Params: " + JSON.stringify(params), function() {
                const result = biasedRandom(params);
            });
        }

        _test({});

        _test({});
    });

    suite("Invalid inputs", function() {
        const _test = (params: object) => {
            test("Params: " + JSON.stringify(params), function() {
                const result = biasedRandom(params);
            });
        }

        _test({});

        _test({});
    });
});
