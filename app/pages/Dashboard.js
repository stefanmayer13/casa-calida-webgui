/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import React from 'react';
import {shouldPureComponentUpdate} from 'react-pure-render';
import { connect } from 'react-redux';
import Message from '../components/atoms/Message';
import Link from '../components/atoms/LanguageLink';
import { loadDevices } from '../actions/deviceActions';

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
                {device.sensors
                    .map(sensor => typeof (sensor.value) !== 'undefined' ? (
                            <li key={device._id + sensor.commandClass + sensor.key}>
                                {sensor.name}: {sensor.valueType === 'bool' ? sensor.value.toString() : sensor.value} {sensor.scale} ({moment.unix(sensor.lastUpdate).fromNow()})
                            </li>
                        ) : null
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
                {devices.map((device) => {
                    const { battery } = device;
                    return (<li key={device.id}>
                        <h2>{device.name || device.deviceType}</h2>
                        {device.deviceType}<br />
                        {device.vendor}<br />
                        {battery && battery.type ? (
                            <span>Battery: {battery.count}x {battery.type} {battery.value}%</span>
                        ) : null}<br />
                        {device.description ? device.description.en : ''}
                        {device.sensors && device.sensors.length > 0 ? <h3>Sensors</h3> : null}
                        {this._renderSensors(device.sensors)}
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
