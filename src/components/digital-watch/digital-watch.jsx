import React from 'react';
import { Header } from 'semantic-ui-react';

import './digital-watch.scss';

function DigitalWatch({ hours, minutes, seconds }) {
	return (
		<div className="watch-face">
			<Header size="huge">
				<span>
					{hours > 9 ? hours : '0' + hours}
					<sub>H</sub>
				</span>{' '}
				:{' '}
				<span>
					{minutes > 9 ? minutes : '0' + minutes}
					<sub>M</sub>
				</span>{' '}
				:{' '}
				<span>
					{seconds > 9 ? seconds : '0' + seconds}
					<sub>S</sub>
				</span>
			</Header>
		</div>
	);
}

export default DigitalWatch;
