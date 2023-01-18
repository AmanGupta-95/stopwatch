import React, { useEffect, useState } from 'react';

import './stopwatch.scss';

import DigitalWatch from '../components/digital-watch/digital-watch';
import TimeLaps from '../components/time-laps/time-laps';

//session storage key
const TIME_LAPS_KEY = 'laps';

//for handling setInterval
let interval;

function Stopwatch() {
	//setting initial watch time
	const [seconds, setSeconds] = useState(() => 55);
	const [minutes, setMinutes] = useState(() => 0);
	const [hours, setHours] = useState(() => 0);

	//for checking whether timer started
	const [start, setStart] = useState(() => false);

	//setting initial laps time
	const [laps, setLaps] = useState(() => {
		const savedLaps = sessionStorage.getItem(TIME_LAPS_KEY);
		if (savedLaps) return JSON.parse(savedLaps);
		else return [];
	});

	// to start the timer
	function startTimer() {
		interval = setInterval(() => {
			setSeconds((prev) => prev + 1);
		}, 1000);
	}

	// to stop the timer
	function stopTimer() {
		clearInterval(interval);
	}

	//to add laps
	function addLaps() {
		setLaps((prev) => {
			return [...prev, { hours, minutes, seconds }];
		});
	}

	// reset the timer
	function resetTimer() {
		setStart(false);
		setSeconds(0);
		setMinutes(0);
		setHours(0);
	}

	// timer useEffects
	useEffect(() => {
		if (seconds >= 60) {
			setSeconds(0);
			setMinutes((prev) => prev + 1);
		}
	}, [seconds]);

	useEffect(() => {
		if (minutes >= 60) {
			setMinutes(0);
			setHours((prev) => prev + 1);
		}
	}, [minutes]);

	useEffect(() => {
		if (hours >= 99) {
			setStart(false);
			setSeconds(60);
			setMinutes(60);
		}
	}, [hours]);

	// handling start and stop timer
	useEffect(() => {
		if (start) startTimer();
		else stopTimer();
	}, [start]);

	return (
		<div>
			<DigitalWatch hours={hours} minutes={minutes} seconds={seconds} />
			<div>
				<button onClick={addLaps}>Lap</button>
				<button onClick={() => setStart(true)}>Start</button>
				<button onClick={() => setStart(false)}>Stop</button>
				<button onClick={resetTimer}>Reset</button>
			</div>
			<TimeLaps laps={laps}/>
		</div>
	);
}

export default Stopwatch;
