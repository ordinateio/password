import {Password} from '../src';

const ITERATIONS = 100;

describe('By default ...', () => {
    const password = new Password();

    test(`Password consists of 20 characters. Iterations: ${ITERATIONS}.`, () => {
        for (let i = 0; i < ITERATIONS; i++) {
            const value = password.create();

            expect(value.length).toBe(20);
        }
    });

    test(`Password contains uppercase letters. Iterations: ${ITERATIONS}.`, () => {
        for (let i = 0; i < ITERATIONS; i++) {
            const value = /[A-Z]/.test(password.create());

            expect(value).toBe(true);
        }
    });

    test(`Password contains numbers. Iterations: ${ITERATIONS}.`, () => {
        for (let i = 0; i < ITERATIONS; i++) {
            const value = /[0-9]/.test(password.create());

            expect(value).toBe(true);
        }
    });

    test(`Password does not contain special characters. Iterations: ${ITERATIONS}.`, () => {
        for (let i = 0; i < ITERATIONS; i++) {
            const value = /[!"#$%&'()*+,-./:;<=>?@\[~\]^_`{|}\\]/.test(password.create());

            expect(value).toBe(false);
        }
    });
});


describe('Four-character ...', () => {
    const password = new Password({
        characters: true,
        length: 4,
    });

    test(`Password must contain lowercase letters. Iterations: ${ITERATIONS}.`, () => {
        for (let i = 0; i < ITERATIONS; i++) {
            const value = /[a-z]/.test(password.create());

            expect(value).toBe(true);
        }
    });

    test(`Password must contain uppercase letters. Iterations: ${ITERATIONS}.`, () => {
        for (let i = 0; i < ITERATIONS; i++) {
            const value = /[A-Z]/.test(password.create());

            expect(value).toBe(true);
        }
    });

    test(`Password must contain numbers. Iterations: ${ITERATIONS}.`, () => {
        for (let i = 0; i < ITERATIONS; i++) {
            const value = /[0-9]/.test(password.create());

            expect(value).toBe(true);
        }
    });

    test(`Password must contain special characters. Iterations: ${ITERATIONS}.`, () => {
        for (let i = 0; i < ITERATIONS; i++) {
            const value = /[!"#$%&'()*+,-./:;<=>?@\[~\]^_`{|}\\]/.test(password.create());

            expect(value).toBe(true);
        }
    });
});


describe('Rest ...', () => {
    const password = new Password({
        uppercase: false,
        numbers: false,
        characters: true,
    });

    test(`Password can only contain lowercase letters. Iterations: ${ITERATIONS}.`, () => {
        for (let i = 0; i < ITERATIONS; i++) {
            const value = password.create();

            expect(value === value.toLowerCase()).toBe(true);
        }
    });

    test(`Password may not contain numbers. Iterations: ${ITERATIONS}.`, () => {
        for (let i = 0; i < ITERATIONS; i++) {
            const value = /[0-9]/.test(password.create());

            expect(value).toBe(false);
        }
    });

    test(`Password must be unique. Iterations ${ITERATIONS * 10}.`, () => {
        const history: string[] = [];

        for (let i = 0; i < ITERATIONS * 10; i++) {
            const value = password.create();

            expect(history.includes(value)).toBe(false);
            history.push(value);
        }
    });
});
