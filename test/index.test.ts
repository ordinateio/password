import {Password} from '../src';

describe('Defaults ...', () => {
    let password = new Password();

    test('By default, the password is 20 characters long.', () => {
        let expected = password.create();

        expect(expected.length).toBe(20);
    });

    test('By default, the password contains lowercase letters.', () => {
        let expected = /[a-z]/.test(password.create());

        expect(expected).toBe(true);
    });

    test('By default, the password contains uppercase letters.', () => {
        let expected = /[A-Z]/.test(password.create());

        expect(expected).toBe(true);
    });

    test('By default, the password contains numbers.', () => {
        let expected = /[0-9]/.test(password.create());

        expect(expected).toBe(true);
    });

    test('By default, the password contains special characters.', () => {
        let expected = /[!"#$%&'()*+,-./:;<=>?@\[~\]^_`{|}\\]/.test(password.create());

        expect(expected).toBe(true);
    });
});

describe('Four-characters ...', () => {
    let password = new Password({
        letters: 1,
        uppercase: 1,
        numbers: 1,
        characters: 1,
    });

    test('The four-character password must contain lowercase letters.', () => {
        let expected = /[a-z]/.test(password.create());

        expect(expected).toBe(true);
    });

    test('The four-character password must contain uppercase letters.', () => {
        let expected = /[A-Z]/.test(password.create());

        expect(expected).toBe(true);
    });

    test('The four-character password must contain numbers.', () => {
        let expected = /[0-9]/.test(password.create());

        expect(expected).toBe(true);
    });

    test('The four-character password must contain special characters.', () => {
        let expected = /[!"#$%&'()*+,-./:;<=>?@\[~\]^_`{|}\\]/.test(password.create());

        expect(expected).toBe(true);
    });
});

describe('Other ...', () => {
    let password = new Password();

    test('Password can only contain numbers.', () => {
        let expected = /[^\d]/.test(password.create({
            letters: 0,
            uppercase: 0,
            numbers: 20,
            characters: 0,
        }));

        expect(expected).toBe(false);
    });

    test('Password can only contain special characters.', () => {
        let expected = /[^!"#$%&'()*+,-./:;<=>?@\[~\]^_`{|}\\]/.test(password.create({
            letters: 0,
            uppercase: 0,
            numbers: 0,
            characters: 20,
        }));

        expect(expected).toBe(false);
    });

    test('Password must contain at least one group of characters.', () => {
        expect(() => password.create({
            letters: 0,
            uppercase: 0,
            numbers: 0,
            characters: 0,
        })).toThrow(Error);
    });

    test('Passwords must be unique for 1000 iterations.', () => {
        let history: string[] = [];

        for (let i = 0; i < 1000; i++) {
            let expected = password.create();

            expect(history.includes(expected)).toBe(false);
            history.push(expected);
        }
    });
});
