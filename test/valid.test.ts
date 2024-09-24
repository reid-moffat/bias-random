import { expect } from 'chai';
import biasedRandom from "../src/index.ts";

suite("Valid inputs", function() {

    const _test = (params: object) => {
        test("Params: " + JSON.stringify(params), function() {
            const result = biasedRandom(params);
        });
    }

    _test({});

    _test({});
});
