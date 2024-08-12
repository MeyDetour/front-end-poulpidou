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

import HomePage from './routes/homePage';
import Projects from './routes/projects';
import Chats from './routes/chats';
import Settings from './routes/settings';
import Clients from './routes/clients';

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
		path: "/projects/:id",
		element: <Projects />,
	}, {
		path: "/projects/:id/:subpage",
		element: <Projects />,
	}, {
		path: "/chats/",
		element: <Chats />,
	}, {
		path: "/chats/:id",
		element: <Chats />,
	}, {
		path: "/clients",
		element: <Clients />,
	}, {
		path: "/clients/:id",
		element: <Clients />,
	}, {
		path: "/clients/:id/:subpage",
		element: <Clients />,
	}, {
		path: "/settings/:subpage",
		element: <Settings />,
	}],
}, {
	path: "*",
	element: <ErrorPage />,
}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
		<RouterProvider router={router} />
	// </React.StrictMode>
);

// reportWebVitals();
