export interface PasswordProperties {
    /**
     * The number of letters to be included in the password.
     */
    letters: number;

    /**
     * The number of uppercase letters to be included in the password.
     */
    uppercase: number;

    /**
     * The number of digits to be included in the password.
     */
    numbers: number;

    /**
     * The number of special characters to be included in the password.
     */
    characters: number;
}

export class Password {
    /**
     * List of letters to generate a password.
     *
     * @private
     */
    private readonly letters: string[] = [
        'a', 'b', 'c', 'd', 'e',
        'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o',
        'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y',
        'z',
    ];

    /**
     * List of numbers to generate a password.
     *
     * @private
     */
    private readonly numbers: string[] = [
        '0', '1', '2', '3', '4',
        '5', '6', '7', '8', '9',
    ];

    /**
     * List of special characters to generate a password.
     *
     * @private
     */
    private readonly characters: string[] = [
        '!', '"', '#', '$', '%',
        '&', '\'', '(', ')', '*',
        '+', ',', '-', '.', '/',
        ':', ';', '<', '=', '>',
        '?', '@', '[', '~', ']',
        '^', '_', '`', '{', '|',
        '}', '\\',
    ];

    /**
     * Properties for generating a password.
     *
     * @private
     */
    private readonly properties: PasswordProperties = {
        letters: 5,
        uppercase: 5,
        numbers: 5,
        characters: 5,
    };

    /**
     * Password constructor.
     *
     * @param properties Properties for generating a password.
     */
    constructor(properties: Partial<PasswordProperties> = {}) {
        this.properties = {
            ...this.properties,
            ...properties,
        };
    }

    /**
     * Creates a new password.
     *
     * @param properties
     */
    create(properties: Partial<PasswordProperties> = {}) {
        let password = '';
        let options = {...this.properties, ...properties};

        if (!Password.isValid(options)) {
            throw new Error('Password must include at least one group of characters.');
        }

        options.letters && (password += Password.createPart(this.letters, options.letters));
        options.uppercase && (password += Password.createPart(this.letters, options.uppercase).toUpperCase());
        options.numbers && (password += Password.createPart(this.numbers, options.numbers));
        options.characters && (password += Password.createPart(this.characters, options.characters));

        return Password.shuffle(password);
    }

    /**
     * Returns true if at least one character group is used, otherwise returns false.
     *
     * @param properties
     * @private
     */
    private static isValid(properties: PasswordProperties) {
        return properties.letters || properties.uppercase || properties.numbers || properties.characters;
    }

    /**
     * Creates part of the password.
     *
     * @param charset
     * @param length
     *
     * @private
     */
    private static createPart(charset: string[], length: number): string {
        let part = '';

        for (let i = 0; i < length; i++) {
            part += charset[Math.ceil(Math.random() * (charset.length - 1))];
        }

        return part;
    }

    /**
     * Shuffles password characters.
     *
     * @param password
     *
     * @private
     */
    private static shuffle(password: string): string {
        return [...password].sort(() => Math.random() - 0.5).join('');
    }
}
