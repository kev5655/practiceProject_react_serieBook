import React, {useEffect} from 'react'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import SeriePanel from "./pages/SeriePanel";
import AuthenticationPanel from "./pages/AuthenticationPanel";
import {loadAuth} from "./store/authenticate-action";
import AuthRoute from "./components/Router/AuthRoute";
import BlurLayout from "./components/layout/BlurLayout";


function App() {
    const isAuth = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAuth())
    }, [dispatch])

    return (
        <BlurLayout>
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
                            <AuthRoute redirectPath="/series" isAllowed={!isAuth}>
                                <AuthenticationPanel/>
                            </AuthRoute>
                        }
                    />
                    {/* localhost:3000/series */}
                    <Route
                        path="series"
                        element={
                            <AuthRoute redirectPath="/login" isAllowed={isAuth}>
                                <SeriePanel/>
                            </AuthRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </BlurLayout>
    );
}

export default App;
