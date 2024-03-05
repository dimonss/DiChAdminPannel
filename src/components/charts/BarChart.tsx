import React from 'react';
import Chart from 'react-apexcharts';

type ChartProps = {
	// using `interface` is also ok
	[x: string]: any;
};
type ChartState = {
	chartData: any[];
	chartOptions: any;
};

class ColumnChart extends React.Component<ChartProps, ChartState> {
	constructor(props: { chartData: any[]; chartOptions: any }) {
		super(props);
		this.state = {
			chartData: [],
			chartOptions: {}
		};
	}

	componentDidMount() {
		this.setState({
			// eslint-disable-next-line react/prop-types
			chartData: this.props.chartData,
			// eslint-disable-next-line react/prop-types
			chartOptions: this.props.chartOptions
		});
	}

	render() {
		return (
			<Chart
				options={this.state.chartOptions}
				series={this.state.chartData}
				type='bar'
				width='100%'
				height='100%'
			/>
		);
	}
}

export default ColumnChart;
