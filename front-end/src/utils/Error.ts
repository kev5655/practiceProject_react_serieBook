const BACKEND_ERRORS = {
    UNAUTHORIZED: "401 UNAUTHORIZED",
    TOKEN_EXPIRED: 'The Token has expired on',
    CONNECTION_REFUSED: "Failed to fetch"
};

export class TokenError extends Error {
    static backendErrors = [BACKEND_ERRORS.TOKEN_EXPIRED];

    constructor(message: string) {
        if (message.match(BACKEND_ERRORS.TOKEN_EXPIRED)) {
            super("You are not longer Logged");
        } else {
            super(message);
        }
        this.name = "Token Error";
    }
}

export class UnauthorizedError extends Error {
    static backendErrors = [BACKEND_ERRORS.UNAUTHORIZED];

    constructor(message: string) {
        if (message.match(BACKEND_ERRORS.UNAUTHORIZED)) {
            super("You are not Authorized");
        } else {
            super(message);
        }
        this.name = "Unauthorized Error";
    }
}

export class ConnectionRefusedError extends Error {
    static backendErrors = [BACKEND_ERRORS.CONNECTION_REFUSED];

    constructor(message: string) {
        if (message.match(BACKEND_ERRORS.CONNECTION_REFUSED)) {
            super("Server is down, pleas try later");
        } else {
            super(message);
        }
        this.name = "Connection Refused";
    }
}
