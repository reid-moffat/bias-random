import { expect } from 'chai';
import biasedRandom from "../src/index.ts";

suite("Average value", function() {

    test("Test name", function() {
        const iterations = 100_000_000;
        let sum = 0;

        for (let i = 0; i < iterations; i++) {
            sum += biasedRandom({ biasLevel: 19 });
        }

        console.log(`Average: ${sum / iterations}`);
    });
});
