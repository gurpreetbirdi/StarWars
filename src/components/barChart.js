import React from 'react';
import * as d3 from 'd3'
import '../styles/chart.css';
import PropTypes from 'prop-types';

export default class BarChartComponent extends React.Component {


componentDidMount(){
  // calls graph plotter once dom has loaded
  this.graphPlotter();
}

graphVariableInitalizer(){

  const   margin = {top: (parseInt(d3.select('.graphDiv').style('height'), 10)/20), right: (parseInt(d3.select('.graphDiv').style('width'), 10)/20), bottom: (parseInt(d3.select('.graphDiv').style('height'), 10)/20), left: (parseInt(d3.select('.graphDiv').style('width'), 10)/5)},
          width = parseInt(d3.select('.graphDiv').style('width'), 10) - margin.left - margin.right,
          height = parseInt(d3.select('.graphDiv').style('height'), 10) - margin.top - margin.bottom;

  const div = d3.select(".graphDiv").append("div").attr("class", "toolTip");

  const formatValue = d3.format(".2s");

  const y = d3.scale.ordinal()
          .rangeRoundBands([height, 0], .2, 0.5);

  const x = d3.scale.linear()
          .range([0, width]);

  const xAxis = d3.svg.axis()
          .scale(x)
          .tickSize(-height)
          .tickFormat(formatValue)
          .orient("bottom");

  const yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");


  const svg = d3.select(".graphDiv").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  let initialObject = {
    width,
    height,
    y,
    x,
    svg,
    div,
    xAxis,
    yAxis,
  };
  return initialObject
}

graphPlotter(){
    const { y, x, svg, div, xAxis, yAxis, width, height} = this.graphVariableInitalizer();
    const self = this;
    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

    y.domain(self.props.data.map(function(d) { return d[self.props.nameLabel]; }));
    x.domain([0, d3.max(self.props.data, function(d) { return d.value; })]);

    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("y", 20)
            .style("text-anchor", "start")
            .text(self.props.yLabel);

    svg.select(".y.axis").remove();
    svg.select(".x.axis").remove();

    svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(0)")
            .attr("x", 50)
            .attr("dx", ".1em")
            .style("text-anchor", "end")
            .text(self.props.searchCriteria);


    const bar = svg.selectAll(".bar")
            .data(self.props.data, function(d) { return d[self.props.nameLabel]; });

    // makes bars for stack chart
    bar.enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.value); })
            .attr("y", function(d) { return y(d[self.props.nameLabel]); })
            .attr("width", function(d) { return width-x(d.value); })
            .attr("height", y.rangeBand());

    // adds tooltip to the bars
    bar.on("mousemove", function(d){
        div.style("left", d3.event.pageX+"px");
        div.style("top", d3.event.pageY-220+"px");
        div.style("display", "inline-block");
        div.html((d[self.props.nameLabel])+"<br>"+d.value);
    });

    bar.on("mouseout", function(d){
        div.style("display", "none");
    });

    // add transition to graph
    bar.transition()
            .duration(750)
            .attr("x", function(d) { return 0; })
            .attr("y", function(d) { return y(d[self.props.nameLabel]); })
            .attr("width", function(d) { return x(d.value); })
            .attr("height", y.rangeBand());
}

render(){
      return (<div className = "graphDiv"></div>)
  }
}


BarChartComponent.PropTypes = {
  data: PropTypes.array,
  searchCriteria: PropTypes.string,
  yLabel: PropTypes.string
};
