import React, {useState} from 'react';


const BlurEffect = React.createContext({
    isBlur: false,
    activateBlur: () => {},
    deactivateBlur: () => {}
})

export const BlurEffectProvider = (props) => {
    const [isBlur, setIsBlur] = useState(false);

    const activeBlurHandler = () => {
        setIsBlur(true)
    }

    const deactivateBlurHandler = () => {
        setIsBlur(false)
    }

    return (
        <BlurEffect.Provider
            value={{
                isBlur: isBlur,
                activateBlur: activeBlurHandler,
                deactivateBlur: deactivateBlurHandler
            }}
        >
            {props.children}
        </BlurEffect.Provider>

    )
}

export default BlurEffect;