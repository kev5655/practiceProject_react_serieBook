import {useSelector} from "react-redux";

import classes from "./BlurLayout.module.css";

const BlurLayout = (props) => {
    const isBlur = useSelector(state => state.ui.isSerieListBlur)

    return (
        <main className={`${isBlur && classes.blur}`}>{props.children}</main>
    )
}


export default BlurLayout;