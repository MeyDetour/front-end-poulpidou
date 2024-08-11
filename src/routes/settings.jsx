import { useParams, Link } from 'react-router-dom';

import '../css/settings.css';

import Configuration from '../components/subpages/settings/configuration';
import Logs from '../components/subpages/settings/logs';

const Settings = () => {
	const { subpage } = useParams();

	return (
		<>
			<div className="flex-col">
				<nav className="flex-row">
					<Link to={`/settings/configuration`}>
						<h4 className={subpage === "configuration" ? "selected" : null}>Configurations</h4>
					</Link>
					<Link to={`/settings/logs`}>
						<h4 className={subpage === "logs" ? "selected" : null}>Logs</h4>
					</Link>
				</nav>
				<div className="horizontal-line"></div>
			</div>
			{
				subpage === "configuration"
				? <Configuration />
				: subpage === "logs"
				? <Logs />
				: null
			}
		</>
	);
}

export default Settings;