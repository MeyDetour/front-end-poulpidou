import React from 'react';

import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom';
import { pdfjs } from 'react-pdf'; 

import './style.css';
import './components/widgets/widgets.css';

import Root from './routes/root';
import ErrorPage from './ErrorPage';

import LogIn from './routes/logIn';
import LogUp from './routes/logUp';

import HomePage from './routes/homePage';
import Project from './routes/project';
import Projects from './routes/projects';
import Chats from './routes/chats';
import Settings from './routes/settings';
import Clients from './routes/clients';
import Credits from "./routes/credits";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// import reportWebVitals from './reportWebVitals';
const router = createBrowserRouter([
{
	path: "/",
	element: <Root />,
	errorElement: <ErrorPage />,
	children: [{
		path: "/",
		element: <HomePage />,
	}, {
		path: "/home",
		element: <HomePage />,
	}, {
		path: "/projects",
		element: <Projects />,
	}, {
		path: "/project/:id",
		element: <Project />,
	}, {
		path: "/project/:id/:subpage",
		element: <Project />,
	}, {
		path: "/chats/",
		element: <Chats />,
	}, {
		path: "/chat/:id",
		element: <Chats />,
	}, {
		path: "/clients",
		element: <Clients />,
	}, {
		path: "/client/:id",
		element: <Clients />,
	}, {
		path: "/client/:id/:subpage",
		element: <Clients />,
	}, {
		path: "/settings/:subpage",
		element: <Settings />,
	}],
}, {
	path: "/login",
	element: <LogIn />,
}, {
	path: "/logup",
	element: <LogUp />,
}, {
	path: "*",
	element: <ErrorPage />,
}, {
		path: "/credits",
		element: <Credits />,
	}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
		<RouterProvider router={router} />
	// </React.StrictMode>
);

// reportWebVitals();
