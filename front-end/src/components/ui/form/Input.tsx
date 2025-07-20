import React, { useState, useEffect } from 'react';

//@ts-ignore
import classes from "./Input.module.css";
import classError from "../../styles/Error.module.css";
import { AsyncValidator, DefaultValidator, Validator, IsEmail } from "../../../utils/Validation.ts";
import IconBtn from "./IconBtn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// Define interface for the component props
export interface InputProps {
  initValue?: string;
  type: "text" | "password" | "number" | "email";
  name?: string;
  maxLength?: number;
  minNumber?: number;
  placeholder?: string;
  isPassword?: boolean;
  validators?: (Validator | AsyncValidator)[];
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  ref?: React.RefObject<InputRef>;
}

// Define interface for the exposed ref methods
export interface InputRef {
  value: string;
  validateInput: () => Promise<boolean>;
  resetInput: () => void;
}

// Define interface for error state
interface DisplayError {
  isError: boolean;
  text: string;
}

// Simplified input component with integrated validation logic
function Input(props: InputProps) {
  const {
    initValue = "",
    type,
    name,
    maxLength = 50,
    minNumber,
    placeholder = '',
    isPassword = false,
    validators: providedValidators = [new DefaultValidator()],
    onChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    ref
  } = props;
  
  // Add email validator automatically when type is email - using useMemo to avoid recreation on every render
  const validators = React.useMemo(() => {
    return type === 'email' 
      ? [new IsEmail(), ...providedValidators.filter(v => !(v instanceof IsEmail))]
      : providedValidators;
  }, [type, providedValidators]);

  const [value, setValue] = useState(initValue);  
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [displayError, setDisplayError] = useState<DisplayError>({isError: false, text: ''});
  const [inputType, setInputType] = useState(type);

  // Determine if value is valid by checking all validators
  const validateAll = React.useCallback(async (): Promise<{ isValid: boolean; errorText: string }> => {
    for (const validator of validators) {
      // Handle both synchronous and asynchronous validation
      const isValid = validator.type === "async" 
        ? await (validator as any).validate(value) 
        : validator.validate(value);
        
      if (!isValid) {
        return { isValid: false, errorText: validator.getErrorText() };
      }
    }
    return { isValid: true, errorText: '' };
  }, [validators, value]);

  // State to track validation result
  const [validationResult, setValidationResult] = useState({ isValid: true, errorText: '' });
  
  // Run validation when value or validators change
  useEffect(() => {
    let isMounted = true;
    const runValidation = async () => {
      const result = await validateAll();
      if (isMounted) {
        setValidationResult(result);
      }
    };
    
    runValidation();
    
    return () => {
      isMounted = false;
    };
  }, [validateAll]);

  // Show error only after field is blurred and not focused
  const hasError = !validationResult.isValid && isTouched && !isFocused;

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  // Handle input blur
  const handleBlur = () => {
    setIsTouched(true);
    setIsFocused(false);
    onBlur();
  };

  // Handle input focus
  const handleFocus = () => {
    setIsFocused(true);
    onFocus();
  };

  // Handle password visibility toggle
  const togglePasswordVisibility = () => {
    setInputType(prevType => prevType === "password" ? "text" : "password");
  };

  // Reset the input - memoize this function to avoid recreating it on every render
  const reset = React.useCallback(() => {
    setValue("");
    setIsTouched(false);
    setIsFocused(false);
    setDisplayError({isError: false, text: ''});
  }, []);

  // Memoize the validate function to avoid unnecessary re-renders
  const validate = React.useCallback(async () => {
    const result = await validateAll();
    setDisplayError({isError: !result.isValid, text: result.isValid ? '' : result.errorText});
    return result.isValid;
  }, [validateAll]);

  // Expose methods to parent component via ref
  useEffect(() => {
    if (ref?.current) {
      const api = {
        value,
        validateInput: validate,
        resetInput: reset
      };

      // Safely update ref.current with the API
      Object.assign(ref.current, api);
    }
  }, [value, ref, validate, reset]);

  return (
    <div className={classes.input_container}>
      <input
        className={`${classes.input} ${hasError && classes.error}`}
        type={inputType === "email" ? "text" : inputType} /* Convert email type to text to disable browser validation */
        name={name}
        value={value}
        maxLength={maxLength}
        min={minNumber}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      
      {/* Password visibility toggle icon */}
      {isPassword && (
        <IconBtn
          icon={inputType === "password" ? VisibilityIcon : VisibilityOffIcon}
          className={classes.icon}
          onClick={togglePasswordVisibility}
        />
      )}
      
      {/* Error display */}
      {displayError.isError && (
        <p className={`${classError.error_message} ${classes.error_text}`}>
          {displayError.text}
        </p>
      )}
    </div>
  );
}

export default Input;