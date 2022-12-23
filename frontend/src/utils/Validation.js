export class defaultValidator {

    isValid = true;
    validate(value) {
        return true;
    }

    getErrorText() {
        return '';
    }
}

export class isNotEmpty {
    errorText = ''
    isValid = false

    validate(value) {
        if(typeof value === 'number'){
            this.isValid = value.length !== 0;
        } else if(typeof value === 'string'){
            this.isValid = value.trim() !== '';
        }
        return this.isValid;
    }

    setErrorText(text) {
        this.errorText = text;
        return this
    }

    getErrorText() {
        if (this.isValid) return ""
        return this.errorText
    }
}

export class isUsername {
    errorText = ''
    isValid = false

    validate(value) {
        this.isValid = value.trim() !== '';
        return this.isValid;
    }

    setErrorText(text) {
        this.errorText = text;
        return this
    }

    getErrorText() {
        if (this.isValid) return ""
        return this.errorText
    }
}

// From https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
export class isEmail {
    errorText = "Email is not Valid"
    isValid = false

    validate(value) {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const match = value.match(validRegex)
        this.isValid = match !== null// && new isNotEmpty().validate;
        return this.isValid;
    }

    getErrorText() {
        if (this.isValid) return ""
        return this.errorText
    }
}

// From https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
export class isPassword {
    errorTexts = new Set()
    isValid = false

    validate(value) {
        const letterRegex = /[A-Za-z]/g, numberRegex = /[0-9]/g;
        let letterCase = true, hasNumber = true, hasEnoughLength = true;
        this.errorTexts.clear();
        this.errorTexts.add("Passwort must be have");
        if (!value.match(letterRegex)) {
            this.errorTexts.add("letter");
            letterCase = false;
        }
        if (!value.match(numberRegex)) {
            this.errorTexts.add("number");
            hasNumber = false;
        }
        if (value.length < 6) {
            this.errorTexts.add("more than 6 Characters")
            hasEnoughLength = false;
        }

        this.isValid = letterCase && hasNumber && hasEnoughLength;
        return this.isValid;
    }

    getErrorText() {
        if (this.isValid) return "";
        let errorText = '';
        let arr = Array.from(this.errorTexts);
        let lastIndex = arr.length - 1;
        arr.forEach((text, index) => {
            if(index === 0) return errorText = text
            if (index === lastIndex && lastIndex > 1) errorText += " and " + text
            else errorText += ", " + text;
        });
        return errorText
    }
}

