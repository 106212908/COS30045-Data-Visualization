const drawHistogram = (data) => {

    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
    
    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const bins = binGenerator(data);
    console.log(bins);

    const minEng = bins[0].x0; // lower boundary of first bin
    const maxEng = bins[bins.length - 1].x1; // upper boundary of last bin

    const binsMaxLength = d3.max(bins, d => d.length);
    console.log("minEng:", minEng, "maxEng:", maxEng, "binsMaxLength:", binsMaxLength);

    // Set up domain and range for the  x and y scales
    xScale
        .domain([minEng, maxEng])
        .range([0, innerWidth]);
    
    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice(); // round y-axis value to human readable format

    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
            .attr("x", d => xScale(d.x0))
            .attr("y", d => yScale(d.length))
            .attr("width", d => xScale(d.x1) - xScale(d.x0))
            .attr("height", d => innerHeight - yScale(d.length))
            .attr("fill", barColor)
            .attr("stroke", bodyBackgroundColor)
            .attr("stroke-width", 2);

    innerChart
        .append("g")
        .attr("transform", `translate(0 ,${innerHeight})`)
        .call(bottomAxis);
    
    innerChart
        .append("g")
        .call(leftAxis);
    
    innerChart
        .append("text")
        .text("Frequency")
        .attr("x", -margin.left + 20)
        .attr("y", -20)
        .attr("text-anchor", "start")
    
    innerChart.append("text")
            .text("Labelled Energy Consumption (kWh/year)")
            .attr("x", innerWidth - 120)
            .attr("y", innerHeight + 40)
            .attr("text-anchor", "middle")
            .style("font-size", "15px")
};