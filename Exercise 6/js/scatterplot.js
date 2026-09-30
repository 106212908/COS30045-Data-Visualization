const drawScatterplot = (data) => {

    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    const innerChartS = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    xScaleS
        .domain([0, d3.max(data, d => d.star)])
        .range([0, innerWidth]);

    yScaleS
        .domain([0, d3.max(data, d => d.energyConsumption)])
        .range([innerHeight, 0]);
    
    innerChartS.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScaleS).tickFormat(d3.format("d")));
    
    innerChartS
        .append("g")
        .call(d3.axisLeft(yScaleS));

    colorScale
        .domain(data.map(d => d.screenTech))
        .range(d3.schemeCategory10);
    
    innerChartS
        .selectAll(".dot")
        .data(data)
        .join("circle")
            .attr("class", "dot")
            .attr("r", 4)
            .attr("cx", d => xScaleS(d.star))
            .attr("cy", d => yScaleS(d.energyConsumption))
            .attr("fill", d => colorScale(d.screenTech))
            .attr("opacity", 0.5);

    innerChartS
        .append("text")
        .text("Labelled Energy Consumption (kWh/year)")
        .attr("x", -margin.left + 10)
        .attr("y", -20)
        .attr("text-anchor", "start")
    
    innerChartS
        .append("text")
        .text("Star Rating")
        .attr("x", innerWidth  - 30)
        .attr("y", innerHeight + 40)
        .attr("text-anchor", "middle")
        .style("font-size", "15px")
    
    const legend = svg
        .append("g")
        .attr("transform", `translate(${width - 100}, ${margin.top})`);
    
    colorScale.domain().forEach((screenTech, i) => {

        const  legendRow = legend
            .append("g")
            .attr("transform", `translate(0, ${i * 20})`);

        legendRow.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", colorScale(screenTech));

        legendRow.append("text")
            .attr("x", 20)
            .attr("y", 10)
            .attr("text-anchor", "start")
            .style("alignment-baseline", "middle")
            .text(screenTech);
    });
}