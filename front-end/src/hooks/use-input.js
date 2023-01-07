import {useEffect, useReducer} from 'react';
import {useDispatch, useSelector} from "react-redux";

const ACTION = {
    INPUT: 0,
    BLUR: 1,
    FOCUS: 2,
    RESET: 3
}

const initialInputState = {
    value: '',
    isTouched: false,
    isFocus: false
};

const inputStateReducer = (state, action) => {
    if (action.type === ACTION.INPUT) {
        return { value: action.value, isTouched: state.isTouched, isFocus: false, };
    }
    if (action.type === ACTION.BLUR) {
        return { isTouched: true, isFocus: false, value: state.value };
    }
    if(action.type === ACTION.FOCUS){
        return { isTouched: true, isFocus: true, value: state.value}
    }
    if (action.type === ACTION.RESET) {
        return { isTouched: false, isFocus: false, value: '' };
    }
    return inputStateReducer;
};

const useInput = ({initValue, validateObj, backendValidator, onChange, onFocus, onBlur}) => {
    const [inputState, dispatch] = useReducer(
        inputStateReducer,
        initialInputState
    );
    initialInputState.value = initValue;
    let dispatchValidator = useDispatch();
    let backendSaysIsAllowed = useSelector(state => state.auth.isUserAvailable)


    useEffect(() => {
        if(backendValidator !== undefined){
            const identifier = setTimeout(async () => {
                dispatchValidator(backendValidator({username: inputState.value}))
            }, 500);

            return () => {
                clearTimeout(identifier);
            }
        }
    }, [inputState.value, dispatchValidator, backendValidator])


    let valueIsValid = validateObj.validate(inputState.value);
    if(backendValidator !== undefined){
        valueIsValid = valueIsValid && backendSaysIsAllowed;
        validateObj.isValid = valueIsValid;
    }
    const hasError = !valueIsValid && inputState.isTouched && !inputState.isFocus;

    const valueChangeHandler = (event) => {
        onChange(event.target.value);
        dispatch({ type: ACTION.INPUT, value: event.target.value });
    };

    const inputBlurHandler = () => {
        onBlur();
        dispatch({ type: ACTION.BLUR });
    };

    const inputFocusHandler = () => {
        onFocus();
        dispatch({ type: ACTION.FOCUS })
    };

    const resetHandler = () => {
        dispatch({ type: ACTION.RESET });
    };

    return {
        value: inputState.value,
        validator: validateObj,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        inputFocusHandler,
        resetHandler,
    };
};

export default useInput;
