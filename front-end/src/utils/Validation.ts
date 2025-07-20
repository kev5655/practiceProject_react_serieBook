// Define a common Validator interface that all validators will implement
export interface Validator {
    isValid: boolean;
    type: "sync"
    validate: (value: string) => boolean;
    getErrorText: () => string;
}

export interface AsyncValidator {
    isValid: boolean;
    type: "async";
    validate: (value: string) => Promise<boolean>;
    getErrorText: () => string;
}

export class DefaultValidator implements Validator {
    isValid = true;
    type: "sync" = "sync";

    validate(value: string): boolean {
        return true;
    }

    getErrorText(): string {
        return '';
    }
}

/*
 * Validates that a string is not empty
 */
export class IsNotEmpty implements Validator {
    isValid = false;
    type: "sync" = "sync";


    constructor(private errorText: string = 'Field cannot be empty') { }

    validate(value: string): boolean {
        return value.trim() !== '';
    }

    getErrorText(): string {
        return this.errorText;
    }
}

/*
 * Validates that a string is a valid email address
 */
export class IsEmail implements Validator {
    errorText = '';
    isValid = false;
    type: "sync" = "sync";


    validate(value: string): boolean {
        // Email regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.isValid = emailPattern.test(value);

        if (!this.isValid) {
            this.errorText = 'Please enter a valid email address.';
        }

        return this.isValid;
    }

    getErrorText(): string {
        return this.errorText;
    }
}

/*
 * Validates that a password meets minimum requirements
 */
export class IsPassword implements Validator {
    errorText = '';
    isValid = false;
    type: "sync" = "sync";


    validate(value: string): boolean {
        // Basic password validation: at least 6 characters, one uppercase, one lowercase, one number
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        this.isValid = passwordPattern.test(value);

        if (!this.isValid) {
            this.errorText = 'Password must contain at least 6 characters, including uppercase, lowercase, and a number.';
        }

        return this.isValid;
    }

    getErrorText(): string {
        return this.errorText;
    }
}

/*
 * Validates that a string matches another string (e.g., for password confirmation)
 */
export class Matches implements Validator {
    errorText = '';
    isValid = false;
    type: "sync" = "sync";


    constructor(private compareValue: string) { }

    validate(value: string): boolean {
        this.isValid = value === this.compareValue;

        if (!this.isValid) {
            this.errorText = 'Values do not match.';
        }

        return this.isValid;
    }

    getErrorText(): string {
        return this.errorText;
    }
}

/*
 * Validates that a value is a number within a range
 */
export class IsNumber implements Validator {
    errorText = '';
    isValid = false;
    type: "sync" = "sync";


    constructor(private min?: number, private max?: number) { }

    validate(value: string): boolean {
        const numberValue = Number(value);

        if (isNaN(numberValue)) {
            this.isValid = false;
            this.errorText = 'Please enter a valid number.';
            return false;
        }

        if (this.min !== undefined && numberValue < this.min) {
            this.isValid = false;
            this.errorText = `Value must be at least ${this.min}.`;
            return false;
        }

        if (this.max !== undefined && numberValue > this.max) {
            this.isValid = false;
            this.errorText = `Value must be no more than ${this.max}.`;
            return false;
        }

        this.isValid = true;
        return true;
    }

    getErrorText(): string {
        return this.errorText;
    }
}

export class IsUserAvailable implements AsyncValidator {
    errorText = '';
    isValid = false;
    type: "async" = "async";
    private lastValue: string = '';
    private debounceTimeout: NodeJS.Timeout | null = null;
    private debounceDelay: number = 300; // milliseconds
    private previousPromise: Promise<boolean> | null = null;

    async validate(value: string): Promise<boolean> {
        // If value is the same as last time and we have a result, return it immediately
        if (value === this.lastValue && this.previousPromise) {
            return this.previousPromise;
        }

        this.lastValue = value;

        // If value is empty, return false immediately
        if (!value) {
            this.errorText = 'Username cannot be empty.';
            return false;
        }

        // Create and store the promise for this validation
        this.previousPromise = new Promise<boolean>((resolve) => {
            // Clear any existing timeout
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
            }

            // Set a new timeout
            this.debounceTimeout = setTimeout(async () => {
                console.log('Debounced check for username availability:', value);

                try {
                    // Import dynamically to avoid circular dependency issues
                    const { checkUsernameAvailability } = await import('../store/auth/auth-actions.ts');
                    const storeModule = await import('../store/store.ts');

                    const resultAction = await storeModule.default.dispatch(checkUsernameAvailability(value));

                    if (checkUsernameAvailability.fulfilled.match(resultAction)) {
                        // For username availability, true means available, false means taken
                        this.isValid = resultAction.payload.isUserAvailable;

                        if (!this.isValid) {
                            this.errorText = 'Username is already taken. Please choose another one.';
                        }

                        resolve(this.isValid);
                    } else {
                        this.errorText = 'Unexpected response when checking username availability.';
                        this.isValid = false;
                        resolve(false);
                    }
                } catch (error) {
                    this.errorText = 'Network or server error while checking username availability.';
                    this.isValid = false;
                    resolve(false);
                }
            }, this.debounceDelay);
        });

        return this.previousPromise;
    }

    getErrorText(): string {
        return this.errorText;
    }
}
