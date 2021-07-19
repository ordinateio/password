import {Password} from '../src';

const ITERATIONS = 100;

test(`By default, the password contains 20 characters. Iterations: ${ITERATIONS}`, () => {
    const password = new Password();

    for (let i = 0; i < ITERATIONS; i++) {
        const received = password.create();
        expect(received.length).toBe(20);
    }
});

test(`By default, the password contains uppercase letters. Iterations: ${ITERATIONS}`, () => {
    const password = new Password();

    for (let i = 0; i < ITERATIONS; i++) {
        const received = /[A-Z]/.test(password.create());
        expect(received).toBe(true);
    }
});

test(`By default, the password contains numbers. Iterations: ${ITERATIONS}`, () => {
    const password = new Password();

    for (let i = 0; i < ITERATIONS; i++) {
        const received = /[0-9]/.test(password.create());
        expect(received).toBe(true);
    }
});

test(`By default, the password contains no special characters. Iterations: ${ITERATIONS}`, () => {
    const password = new Password();

    for (let i = 0; i < ITERATIONS; i++) {
        const received = /[!"#$%&'()*+,-./:;<=>?@\[~\]^_`{|}\\]/.test(password.create());
        expect(received).toBe(false);
    }
});

test(`Four-character password must contain lowercase letters. Iterations: ${ITERATIONS}`, () => {
    const password = new Password({
        characters: true,
        length: 4,
    });

    for (let i = 0; i < ITERATIONS; i++) {
        const received = /[a-z]/.test(password.create());
        expect(received).toBe(true);
    }
});

test(`Four-character password must contain uppercase letters. Iterations: ${ITERATIONS}`, () => {
    const password = new Password({
        characters: true,
        length: 4,
    });

    for (let i = 0; i < ITERATIONS; i++) {
        const received = /[A-Z]/.test(password.create());
        expect(received).toBe(true);
    }
});

test(`Four-character password must contain numbers. Iterations: ${ITERATIONS}`, () => {
    const password = new Password({
        characters: true,
        length: 4,
    });

    for (let i = 0; i < ITERATIONS; i++) {
        const received = /[0-9]/.test(password.create());
        expect(received).toBe(true);
    }
});

test(`Four-character password must contain special characters. Iterations: ${ITERATIONS}`, () => {
    const password = new Password({
        characters: true,
        length: 4,
    });

    for (let i = 0; i < ITERATIONS; i++) {
        const received = /[!"#$%&'()*+,-./:;<=>?@\[~\]^_`{|}\\]/.test(password.create());
        expect(received).toBe(true);
    }
});

test(`Password can only contain lowercase characters. Iterations: ${ITERATIONS}`, () => {
    const password = new Password({
        uppercase: false,
    });

    for (let i = 0; i < ITERATIONS; i++) {
        const received = password.create();
        expect(received === received.toLowerCase()).toBe(true);
    }
});

test(`Password may not contain numbers. Iterations: ${ITERATIONS}`, () => {
    const password = new Password({
        numbers: false,
    });

    for (let i = 0; i < ITERATIONS; i++) {
        const received = /[0-9]/.test(password.create());
        expect(received).toBe(false);
    }
});

test(`Password must be unique for ${ITERATIONS * 10} iterations.`, () => {
    const history: string[] = [];
    const password: Password = new Password({
        characters: true,
    });

    for (let i = 0; i < ITERATIONS * 10; i++) {
        const received = password.create();
        expect(history.includes(received)).toBe(false);
        history.push(received);
    }
});
