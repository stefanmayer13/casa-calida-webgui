/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import React from 'react';
import {findDOMNode} from 'react-dom';
import {shouldPureComponentUpdate} from 'react-pure-render';
import d3Chart from './d3Chart';

class Chart extends React.Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        data: React.PropTypes.array.isRequired,
        domain: React.PropTypes.object.isRequired,
    };

    componentDidMount() {
        var el = findDOMNode(this);
        d3Chart.create(el, {
            width: '500px',
            height: '300px'
        }, this.getChartState());
    }

    componentDidUpdate() {
        var el = findDOMNode(this);
        d3Chart.update(el, this.getChartState());
    }

    getChartState() {
        return {
            data: this.props.data,
            domain: this.props.domain
        };
    }

    componentWillUnmount() {
        var el = findDOMNode(this);
        d3Chart.destroy(el);
    }

    render() {
        return <div className="Chart"></div>;
    }
}

export default Chart;
