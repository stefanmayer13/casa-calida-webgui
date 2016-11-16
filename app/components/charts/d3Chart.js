/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import {select, line, scaleLinear} from 'd3';

const d3Chart = {
    create(el, props, state) {
        var svg = select(el).append('svg')
            .attr('class', 'd3')
            .attr('width', props.width)
            .attr('height', props.height);

        svg.append('path')
            .attr('class', 'd3-line');

        this.update(el, state);
    },

    update(el, state) {
        this._drawPoints(el, state.data, state.domain);
    },

    destroy(el) {

    },

    _drawPoints(el, data, domain) {
        const x = scaleLinear()
            .domain(domain.x)
            .range([0, 500]);

        const y = scaleLinear()
            .domain(domain.y)
            .range([0, 100]);
        const lineFunction = line()
            .x(d => {
                return x(d.x);
            })
            .y(d => {
                return y(d.y);
            });
        const path = select(el).selectAll('.d3-line')
            .attr("d", lineFunction(data));
    },
};

export default d3Chart;
