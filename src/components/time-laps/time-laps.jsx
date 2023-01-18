import React from 'react';

import './time-laps.scss';

import DigitalWatch from '../digital-watch/digital-watch';

function TimeLaps({ laps }) {
	console.log({ laps });
	return (
		<div>
			{laps.map((val, i) => (
				<DigitalWatch
					hours={val.hours}
					minutes={val.minutes}
					seconds={val.seconds}
					key={i}
				/>
			))}
		</div>
	);
}

export default TimeLaps;
