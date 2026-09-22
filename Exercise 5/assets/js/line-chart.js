d3.csv("assets/data/ARE_Spot_Prices.csv").then(data => {
    data.forEach(d => {
        d.year = +d["Year"]
        d.averagePrice = +d["Average Price (notTas-Snowy)"]
    })

    console.log(data);
    drawLineChart(data);
})

const drawLineChart = data => {
    const margin = { top: 45, right: 40, bottom: 50, left: 40 };
    const width = 1000;
    const height = 500;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.averagePrice)])
        .range([innerHeight, 0]);

    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice));

    innerChart.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

    innerChart.append("g")
        .call(d3.axisLeft(yScale));
    
    innerChart
        .selectAll(".dot")
        .data(data)
        .join("circle")
            .attr("class", "dot")
            .attr("r", 4)
            .attr("cx", d => xScale(d.year))
            .attr("cy", d => yScale(d.averagePrice))
            .attr("fill", "steelblue")
    
    innerChart.append("path")
        .attr("d", lineGenerator(data))
        .attr("fill", "none")
        .attr("stroke", "green")

}