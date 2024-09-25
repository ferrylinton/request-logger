import { createBrowserRouter } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { DetailPage } from '../pages/DetailPage';
import { AddFormPage } from '../pages/AddFormPage';
import Layout from './Layout';
import ErrorPage from "../pages/ErrorPage";


export const router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/detail/:id",
                element: <DetailPage />
            },
            {
                path: "/add",
                element: <AddFormPage />
            },
        ],
    },
]);
