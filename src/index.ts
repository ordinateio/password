export interface PasswordProperties {
    /**
     * If 'true' includes uppercase characters in the password.
     */
    uppercase: boolean;

    /**
     * If 'true' includes numbers in the password.
     */
    numbers: boolean;

    /**
     * If 'true' includes special characters in the password.
     */
    characters: boolean;

    /**
     * The length of the required password.
     * The minimum possible password length to include all groups of characters is 4.
     */
    length: number;
}

/**
 * Class Password - Generates strong passwords.
 *
 * [Github]{@link https://github.com/ordinateio/password}
 */
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
        uppercase: true,
        numbers: true,
        characters: false,
        length: 20,
    };

    /**
     * Password constructor.
     *
     * @param properties Properties for generating a password.
     */
    public constructor(properties: Partial<PasswordProperties> = {}) {
        this.properties = {
            ...this.properties,
            ...properties,
        };
    }

    /**
     * Creates a new password.
     */
    public create(): string {
        let password = '';

        const firstPart = Math.floor(this.properties.length / 4);
        password += Password.createPart(this.letters, firstPart);

        const secondPart = firstPart;
        password += this.properties.uppercase
            ? Password.createPart(this.letters, secondPart, true)
            : Password.createPart(this.letters, secondPart);

        const thirdPart = firstPart;
        password += this.properties.numbers
            ? Password.createPart(this.numbers, thirdPart)
            : Password.createPart(this.letters, thirdPart);

        const fourthPart = this.properties.length - firstPart - secondPart - thirdPart;
        password += this.properties.characters
            ? Password.createPart(this.characters, fourthPart)
            : Password.createPart(this.letters, fourthPart);

        return Password.shuffle(password);
    }

    /**
     * Creates part of the password.
     *
     * @param charset
     * @param length
     * @param uppercase
     *
     * @private
     */
    private static createPart(charset: string[], length: number, uppercase: boolean = false): string {
        let part = '';

        for (let i = 0; i < length; i++) {
            part += charset[Math.ceil(Math.random() * (charset.length - 1))];
        }

        return uppercase ? part.toUpperCase() : part;
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
