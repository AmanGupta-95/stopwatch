import React from 'react';

import './digital-watch.scss';

function DigitalWatch({ hours, minutes, seconds }) {
	return (
		<div>
			{hours > 9 ? hours : '0' + hours}
			<sub>H</sub>:{minutes > 9 ? minutes : '0' + minutes}
			<sub>M</sub>:{seconds > 9 ? seconds : '0' + seconds}
			<sub>S</sub>
		</div>
	);
}

export default DigitalWatch;
