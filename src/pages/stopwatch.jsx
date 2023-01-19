import React, { useEffect, useState } from 'react';

import DigitalWatch from '../components/digital-watch/digital-watch';
import TimeLaps from '../components/time-laps/time-laps';

import { Button, Container } from 'semantic-ui-react'
import './stopwatch.scss';



//session storage key
const TIME_LAPS_KEY = 'laps';

//for handling setInterval
let interval;

function Stopwatch() {
	//setting initial watch time
	const [seconds, setSeconds] = useState(() => 0);
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
		setLaps([]);
		sessionStorage.removeItem(TIME_LAPS_KEY);
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

	//for storing laps in session storage
	useEffect(() => {
		sessionStorage.setItem(TIME_LAPS_KEY, JSON.stringify(laps));
	}, [laps]);

	return (
		<Container textAlign='center'>
			<DigitalWatch hours={hours} minutes={minutes} seconds={seconds} />
			<div className='btn-container'>
				<Button disabled={!start} inverted primary onClick={addLaps}>Lap</Button>
				<Button inverted color='green' onClick={() => setStart(true)}>Start</Button>
				<Button disabled={!start} inverted color='red' onClick={() => setStart(false)}>Stop</Button>
				<Button inverted color='orange' onClick={resetTimer}>Reset</Button>
			</div>
			<TimeLaps laps={laps} />
		</Container>
	);
}

export default Stopwatch;
