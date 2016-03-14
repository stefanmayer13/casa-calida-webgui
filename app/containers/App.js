/**
 * @author <a href="mailto:stefanmayer13@gmail.com">Stefan Mayer</a>
 */

import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadDevices, resetErrorMessage } from '../actions';
import { isLoggedIn } from '../actions/auth';

class App extends Component {
    constructor(props) {
        super(props);
        this.handleDismissClick = this.handleDismissClick.bind(this);
    }

    componentWillMount() {
        this.props.loadDevices();
        this.props.checkLogin();
    }

    handleDismissClick(e) {
        this.props.resetErrorMessage();
        e.preventDefault();
    }

    renderErrorMessage() {
        const { errorMessage } = this.props;
        if (!errorMessage) {
            return null;
        }

        return (
            <p style={{ backgroundColor: '#e99', padding: 10 }}>
                <b>{errorMessage}</b>
                {' '}
                (<a href="#" onClick={this.handleDismissClick}>
                    Dismiss
                </a>)
            </p>
        );
    }

    render() {
        const { devices } = this.props;
        return (
            <div>
                Loggedin: {this.props.loggedIn ? 'yes': 'no'}<br/>
                Registered devices:
                <ul>
                {devices.map((device) => {
                    const { battery } = device;
                    return (<li key={device._id}>
                        <h2>{device.name || device.deviceType}</h2>
                        {device.deviceType}<br/>
                        {device.vendor}<br/>
                        {battery.type ? (
                            <span>Battery: {battery.count}x {battery.type} {battery.value}%</span>
                        ) : null}<br/>
                        Description: {device.description ? device.description.en : ''}
                        {device.sensors.length > 0 ? <h3>Sensors</h3> : null}
                        <ul>
                            {device.sensors
                                .map((sensor) => typeof(sensor.value) !== 'undefined' ? (
                                        <li key={device._id + sensor.commandClass + sensor.key}>
                                            {sensor.name}: {sensor.valueType === 'bool' ? sensor.value.toString() : sensor.value} {sensor.scale} ({moment.unix(sensor.lastUpdate).fromNow()})
                                        </li>
                                    ) : null
                            )}
                        </ul>
                    </li>);
                })}
                </ul>
                {this.renderErrorMessage()}
            </div>
        );
    }
}

App.propTypes = {
    checkLogin: PropTypes.func.isRequired,
    devices: PropTypes.array.isRequired,
    loadDevices: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        devices: state.devices,
        loggedIn: state.auth.loggedIn,
        errorMessage: state.errorMessage,
    };
}

export default connect(mapStateToProps, {
    checkLogin: isLoggedIn,
    loadDevices,
    resetErrorMessage,
})(App);
