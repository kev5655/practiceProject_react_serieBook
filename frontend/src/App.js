import React, {useEffect} from 'react'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import Panel from "./components/app/Panel";
import {useDispatch, useSelector} from "react-redux";
import SeriePanel from "./components/app/seriePanel/SeriePanel";
import AuthenticationPanel from "./components/app/loggin/AuthenticationPanel";
import {loadAuth} from "./store/authenticate-action";
import ManageSeriePanel from "./components/app/manageSerie/ManageSeriePanel";
import AuthRoute from "./components/Router/AuthRoute";


function App() {
    const isAuth = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAuth())
    }, [dispatch])
    // ToDo Fix bug https://www.robinwieruch.de/react-router-private-routes/
    return (
        <BrowserRouter>
            <Routes>
                {/* localhost:3000 */}
                <Route path='*'
                       element={
                           isAuth
                               ? (<Navigate to='/series' replace={true}/>)
                               : (<Navigate to='/login' replace={true}/>)
                       }/>
                {/* localhost:3000/login */}
                <Route
                    path="login"
                    element={
                        <AuthRoute redirectPath="/series" isAllowed={ !isAuth }>
                            <AuthenticationPanel/>
                        </AuthRoute>
                    }
                />
                {/* localhost:3000/series */}
                <Route
                    path="series"
                    element={
                        <AuthRoute redirectPath="/login" isAllowed={ isAuth }>
                            <SeriePanel/>
                        </AuthRoute>
                    }
                />


            </Routes>
        </BrowserRouter>

//     <Panel/>
    );
}

export default App;
