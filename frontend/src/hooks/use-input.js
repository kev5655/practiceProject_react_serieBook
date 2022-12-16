import { useReducer } from 'react';

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

const useInput = (initValue, validateValue) => {
    const [inputState, dispatch] = useReducer(
        inputStateReducer,
        initialInputState
    );

    initialInputState.value = initValue;

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched && !inputState.isFocus;

    const valueChangeHandler = (event) => {
        dispatch({ type: ACTION.INPUT, value: event.target.value });
    };

    const inputBlurHandler = (event) => {
        dispatch({ type: ACTION.BLUR });
    };

    const inputFocusHandler = () => {
        dispatch({ type: ACTION.FOCUS })
    }

    const reset = () => {
        dispatch({ type: ACTION.RESET });
    };

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        inputFocusHandler,
        reset,
    };
};

export default useInput;
