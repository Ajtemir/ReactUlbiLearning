import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import {routes} from "../router";

const AppRouter = () => {
    return (
        <Routes>
            {routes.map(route => <Route element={route.component} path={route.path} exact={route.exact}/>)}
            <Route path="*" element={<Navigate to="/error" />} />
            <Route path="/error" element={<Error />} />
        </Routes>
    );
};

export default AppRouter;