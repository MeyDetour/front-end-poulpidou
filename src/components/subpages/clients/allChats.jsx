import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AllChats = () => {
	const [chats, setChats] = useState([{

	}]);

	return (
		<>
			<div className="scroll-container" style={{height: "100%"}}>
				<div className="flex-col">
					{
						chats.length !== 0 ?
						chats.map((chat) => {
							return (
								<Link>
									
								</Link>
							)
						}) : null
					}
				</div>
			</div>
		</>
	);
}

export default AllChats;