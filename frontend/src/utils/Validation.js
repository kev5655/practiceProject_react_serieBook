export class defaultValidator {
    errorText = 'defaultError'
    validate(value) {
        return true;
    }
    setErrorText(text){
        return this
    }
    getErrorText(){
        return this.errorText;
    }
}

export class isNotEmpty {
    errorText = ''
    isValid = false
    validate(value) {
        this.isValid = value.trim() !== '';
        return this.isValid;
    }
    setErrorText(text){
        this.errorText = text;
        return this
    }
    getErrorText(){
        if(this.isValid) return ""
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
    setErrorText(text){
        this.errorText = text;
        return this
    }
    getErrorText(){
        if(this.isValid) return ""
        return this.errorText
    }
}
// From https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
export class isEmail {
    errorText = ''
    isValid = false
    validate(value){
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const match = value.match(validRegex)
        this.isValid = match !== null// && new isNotEmpty().validate;
        return this.isValid;
    }
    setErrorText(text){
        this.errorText = text;
        return this
    }
    getErrorText(){
        if(this.isValid) return ""
        return this.errorText
    }
}
// From https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
export class isPassword {
    errorText = ''
    isValid = false
    validate(value){
        const lowerCaseRegex = /[a-z]/g;
        const upperCaseRegex = /[A-Z]/g;
        const numberRegex = /[0-9]/g;
        const specialChars = /[^A-Za-z0-9]/g;
        this.isValid = value.match(lowerCaseRegex) !== null
            && value.match(upperCaseRegex) !== null
            && value.match(numberRegex) !== null
            && value.length >= 6
            && value.match(specialChars) !== null;
        return this.isValid;
    }
    setErrorText(text){
        this.errorText = text;
        return this
    }
    getErrorText(){
        if(this.isValid) return ""
        return this.errorText
    }
}

