import {Navigate, Outlet} from "react-router-dom";


const AuthRoute = (props) => {

    const {isAllowed, redirectPath, children} = props;

    if(!isAllowed){
        return <Navigate to={redirectPath} replace={true}/>;
    }

    return children ? children : <Outlet/>;

}

export default AuthRoute;