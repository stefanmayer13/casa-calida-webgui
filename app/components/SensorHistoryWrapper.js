/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import React from 'react';
import moment from 'moment';
import {shouldPureComponentUpdate} from 'react-pure-render';
import { connect } from 'react-redux';
import Message from '../components/atoms/Message';
import Link from '../components/atoms/LanguageLink';
import { loadSensorData } from '../actions/deviceActions';
import { convertValueByType } from '../utils/converter';
import Chart from './charts/Chart';

const {
    object,
    func,
    } = React.PropTypes;

class SensorHistoryWrapper extends React.Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        sensorData: object,
        loadDevices: func,
    };

    componentWillMount() {
        this.props.loadSensorData(this.props.sensorId);
    }

    _renderSensorHistory(sensorData) {
        if (!sensorData) {
            return <p>Loading...</p>;
        }
        const startX = moment().subtract(1, 'days');
        const maxY = sensorData.values.reduce((prev, current) => {
            return prev > current.value ? prev : current.value;
        }, 0);
        const chartData = sensorData.values.map((data, index) => {
            const currentX = moment(data.updated);
            return {
                index,
                x: currentX.unix() - startX.unix(),
                y: parseInt(data.value, 10),
            };
        });
        return (
            <ul>
                <Chart
                    data={chartData}
                    domain={{x: [0, 86400], y: [0, maxY]}} />
            </ul>
        );
    }

    render() {
        return (
            <div>
                Sensor-Data:
                {this._renderSensorHistory(this.props.sensorData)}
            </div>
        );
    }
}

const actions = {
    loadSensorData,
};

function select(state, props) {
    return {
        sensorData: state.sensors[props.sensorId],
    };
}

export default connect(select, actions)(SensorHistoryWrapper);
