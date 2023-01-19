import React from 'react';
import { Table } from 'semantic-ui-react';

import './time-laps.scss';

function TimeLaps({ laps }) {
	console.log({ laps });
	return (
		<div className="table-container">
			<Table singleLine>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Laps</Table.HeaderCell>
						<Table.HeaderCell>Time</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{laps.map((val, i) => (
						<Table.Row key={i}>
							<Table.Cell>{i + 1}</Table.Cell>
							<Table.Cell>
								{val.hours > 9 ? val.hours : '0' + val.hours}:
								{val.minutes > 9 ? val.minutes : '0' + val.minutes}:
								{val.seconds > 9 ? val.seconds : '0' + val.seconds}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
	);
}

export default TimeLaps;
