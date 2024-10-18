import React, {Component} from "react";
import * as d3 from "d3";

class Child2 extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {}
    }

    getAverageTip(day)
    {
        const tipsForDay = this.props.data.filter(item => item.day === day);
        const totalTips = tipsForDay.reduce((sum, item) => sum + item.tip, 0);
        return tipsForDay.length ? totalTips / tipsForDay.length : 0;
    }

    renderBoxPlot = (tipsAndDays) =>
    {
        const margin = {
            left: 50,
            right: 15,
            top: 10,
            bottom: 50
        };

        const w = 770 - margin.left - margin.right;
        const h = 350 - margin.top - margin.bottom;

        const boxPlot = d3.select(".box-plot")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .style("border", "1px solid #a3a3a3")
            .style("margin-left", "50px")
            .style("margin-right", "50px")
            .style("margin-top", "50px")
            .style("margin-bottom", "10px");

        // Scaling and axes
        const days = Array.from(new Set(tipsAndDays.map(entry => entry.day)));
        const averageTips = days.map(day => this.getAverageTip(day));
        const maxAverageTip = d3.max(averageTips);

        const xScale = d3.scaleBand()
            .domain(days)
            .range([0, w])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, maxAverageTip])
            .range([h, 0]);

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        // axes
        boxPlot.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(${margin.left}, ${h + margin.top})`)
            .call(xAxis);

        boxPlot.append("g")
            .attr("class", "y-axis")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);

        // labels
        boxPlot.append("text")
            .attr("class", "x-axis-label")
            .attr("x", w / 2)
            .attr("y", h + 50)
            .attr("text-anchor", "middle")
            .text("Day");

        boxPlot.append("text")
            .attr("class", "y-axis-label")
            .attr("transform", `translate(${margin.left - 32}, ${h / 2 + margin.top}) rotate(-90)`)
            .attr("text-anchor", "middle")
            .text("Average Tip");

        // plot data
        boxPlot.selectAll(".bar")
            .data(averageTips)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => xScale(days[i]) + margin.left)
            .attr("y", d => yScale(d) + margin.top)
            .attr("width", xScale.bandwidth())
            .attr("height", d => h - yScale(d))
            .attr("fill", "#69b3a2");
    }

    componentDidUpdate()
    {
        this.renderBoxPlot(this.props.data);
    }

    render()
    {

        return (
            <svg className="box-plot"></svg>

        );
    }
}

export default Child2;