/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import React from 'react';
import moment from 'moment';
import {shouldPureComponentUpdate} from 'react-pure-render';
import { connect } from 'react-redux';
import Message from '../components/atoms/Message';
import Link from '../components/atoms/LanguageLink';
import { loadDevices } from '../actions/deviceActions';
import { convertValueByType } from '../utils/converter';

const {
    func,
    } = React.PropTypes;

class Dashboard extends React.Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        loadDevices: func
    };

    componentWillMount() {
        this.props.loadDevices();
    }

    _renderSensors(sensors) {
        if (!sensors) {
            return null;
        }
        return (
            <ul>
                {sensors
                    .map(sensor => (
                            <li key={sensor.id}>
                                {sensor.name || sensor.title}: {convertValueByType(sensor.valueType, sensor.lastValue.value)} {sensor.scale} ({moment(sensor.lastValue.updated).fromNow()})
                            </li>
                        )
                    )}
            </ul>
        );
    }

    _renderActuators(actuators) {
        if (!actuators) {
            return null;
        }
        return (
            <ul>
                {actuators
                    .map(actuator => (
                            <li key={actuator.id}>
                                {actuator.name || actuator.title}: {convertValueByType(actuator.valueType, actuator.lastValue.value)} {actuator.scale} ({moment(actuator.lastValue.updated).fromNow()})
                            </li>
                        )
                    )}
            </ul>
        );
    }

    _renderDevices(devices) {
        if (!devices) {
            return null;
        }
        return (
            <ul>
                {devices.filter(device => device.brand || device.product).map((device) => {
                    return (<li key={device.id}>
                        <h2>{device.brand} {device.product}</h2>
                        {device.deviceType}<br />
                        {device.vendor}<br />
                        {device.batteryType ? (
                            <span>Battery: {device.batteryCount}x {device.batteryType} {device.batteryLevel.value}%</span>
                        ) : null}<br />
                        {device.description ? device.description.en : ''}
                        {device.sensors && device.sensors.length > 0 ? <h3>Sensors</h3> : null}
                        {this._renderSensors(device.sensors)}
                        {device.actuators && device.actuators.length > 0 ? <h3>Actuators</h3> : null}
                        {this._renderActuators(device.actuators)}
                    </li>);
                })}
            </ul>
        );
    }

    render() {
        return (
            <div>
                Registered devices:
                {this._renderDevices(this.props.devices)}
            </div>
        );
    }
}

const actions = {
    loadDevices,
};

function select(state) {
    return {
        devices: state.devices,
    };
}

export default connect(select, actions)(Dashboard);
