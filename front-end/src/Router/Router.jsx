import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AuthRoute from "./AuthRoute";
import AuthenticationPanel from "../pages/AuthenticationPanel";
import SeriePanel from "../pages/SeriePanel";
import ManageSeriePanel from "../pages/ManageSeriePanel";
import Settings from "../pages/Settings";
import BlurLayout from "../components/layout/BlurLayout";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadAuth} from "../store/authenticate-action";
import {fetchSeries} from "../store/series-action";

const Router = () => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Load Auth");
        dispatch(loadAuth())
    }, [dispatch])

    useEffect(() => {
        if(isAuth) {
            dispatch(fetchSeries())
        }
    }, [dispatch, isAuth])

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
                    <Route
                        path="series/add"
                        element={
                            <AuthRoute redirectPath="/login" isAllowed={isAuth}>
                                <ManageSeriePanel/>
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="series/edit"
                        element={
                            <AuthRoute redirectPath="/login" isAllowed={isAuth}>
                                <ManageSeriePanel/>
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="settings"
                        element={
                            <AuthRoute redirectPath="/login" isAllowed={isAuth}>
                                <Settings/>
                            </AuthRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </BlurLayout>
    )
}

export default Router;