import { useParams, Link } from 'react-router-dom';

import '../css/credits.css';

import Configuration from '../components/subpages/settings/configuration';
import Logs from '../components/subpages/settings/logs';
import React from "react";

const Credits = () => {


	return (
		<>
			<div className="dedicationPage">
				<div className="animationContainer">
					<div className="bubbleContainer">

						<figure className=" circle1 grandCircle"><span className="reflet">    </span></figure>
						<figure className=" circle2 grandCircle"><span className="reflet">    </span></figure>
						<figure className=" circle3 grandCircle"><span className="reflet">    </span></figure>
						<figure className=" circle4 petitCircle"><span className="reflet">    </span></figure>
						<figure className=" circle5 petitCircle"><span className="reflet">    </span></figure>
						<figure className=" circle6 petitCircle"><span className="reflet">    </span></figure>
						<figure className=" circle7 petitCircle"><span className="reflet">    </span></figure>
						<figure className=" circle8 grandCircle"><span className="reflet">    </span></figure>
						<figure className=" circle9 petitCircle"><span className="reflet">    </span></figure>
						<figure className=" circle10 grandCircle"><span className="reflet">    </span></figure>
						<figure className=" circle11 petitCircle"><span className="reflet">    </span></figure>
						<figure className=" circle12 miniCircle"><span className="reflet">    </span></figure>
						<figure className=" circle13 miniCircle"><span className="reflet">    </span></figure>
						<figure className=" circle14 miniCircle"><span className="reflet">    </span></figure>
						<div className="corail1"></div>
						<div className="volcan1"></div>
						<div className="corail2"></div>
						<div className="volcan2"></div>
						<div className="corail3"></div>
						<div className="volcan3"></div>
						<div className="corail4"></div>
						<div className="volcan4"></div>
					</div>
				</div>

				<div className="textContainer">
					<h1>Poulpidou</h1>
					<span>Made by Maxence Abrile and Mey Detour</span>
					<p>July 2024. This site was made with love by computer enthusiasts. it is there to serve you and
						meet your
						needs. Do not hesitate to contact us at the following addresses if you have any suggestion for
						improvement or to report a bug: abrilemaxence@gmail.com, meydetour@gmail.com</p>

					<a href="https://github.com/MeyDetour/backend-poulpidou">Github Backend</a>
					<a href="https://github.com/MeyDetour/front-end-poulpidou">Github Front-End</a>
					<img src="pictures/icons/x.svg" alt="x" onClick={() => window.location = '/'}/>
				</div>

			</div>

		</>
	);
}

export default Credits;