import React from 'react';

import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom';

import './style.css';
import './widgets.css';

import Root from './routes/root';
import ErrorPage from './ErrorPage';

import HomePage from './routes/homePage';
import Projects from './routes/projects';
import Chats from './routes/chats';

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
		path: "/chats",
		element: <Chats />,
	}, {
		path: "/chats/:id",
		element: <Chats />,
	}],
}, {
	path: "*",
	element: <ErrorPage />,
}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

// reportWebVitals();
