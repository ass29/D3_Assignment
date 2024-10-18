import React, {Component} from "react";
import * as d3 from "d3";

class Child1 extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
    }

    renderScatterPlot = (billsAndTips) =>
    {
        const margin = {
            left: 50,
            right: 15,
            top: 10,
            bottom: 50
        };

        const w = 770 - margin.left - margin.right;
        const h = 350 - margin.top - margin.bottom;

        const scatterPlot = d3.select(".scatter-plot")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .style("border", "1px solid #a3a3a3")
            .style("margin-left", "50px")
            .style("margin-right", "50px")
            .style("margin-top", "50px")
            .style("margin-bottom", "10px");

        // Scaling and axes
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(billsAndTips, d => d.total_bill)])
            .range([0, w]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(billsAndTips, d => d.tip)])
            .range([h, 0]);

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        // axes
        scatterPlot.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(${margin.left}, ${h + margin.top})`)
            .call(xAxis);

        scatterPlot.append("g")
            .attr("class", "y-axis")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);

        // labels
        scatterPlot.append("text")
            .attr("class", "x-axis-label")
            .attr("x", w / 2)
            .attr("y", h + 50)
            .attr("text-anchor", "middle")
            .text("Total Bill");

        scatterPlot.append("text")
            .attr("class", "y-axis-label")
            .attr("transform", `translate(${margin.left - 30}, ${h / 2 + margin.top}) rotate(-90)`)
            .attr("text-anchor", "middle")
            .text("Tip");

        // plot data
        scatterPlot.selectAll("circle")
            .data(billsAndTips)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.total_bill) + margin.left)
            .attr("cy", d => yScale(d.tip) + margin.top)
            .attr("r", 4)
            .attr("fill", "#69b3a2");
    };

    componentDidUpdate()
    {
        this.renderScatterPlot(this.props.data);
    }

    render()
    {
        return (
            <svg className="scatter-plot"></svg>
        );
    }
}

export default Child1;
