d3.csv("assets/data/Data_exercise_5.1.csv").then(data => {
    data.forEach(d => {
        d.Energy_Consumption =
            +d["Mean(Labelled energy consumption (kWh/year))"];
    });

    data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);
    console.log(data);
    drawBarChart(data);
});

const drawBarChart = data => {

    const margin = { top: 45, right: 40, bottom: 50, left: 40};
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select("#bar-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("border", "1px solid black")

    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)

    // Create Scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Screen_Tech))
        .range([0, innerWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Energy_Consumption) * 1.12])
        .range([innerHeight, 0]);

    const bottomAxis = d3.axisBottom(xScale)

    const leftAxis = d3.axisLeft(yScale);

    // Add axes
    innerChart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis)

    innerChart
        .append("g")
        .call(leftAxis);

    innerChart
        .append("text")
        .text("Energy Consumption (kWh)")
        .attr("x", -margin.left)
        .attr("y", -10)
        .attr("text-anchor", "start")

    innerChart
        .selectAll(".bar")
        .data(data)
        .join("rect")
            .attr("class", "bar")
            .attr("width", xScale.bandwidth())
            .attr("height", d => innerHeight - yScale(d.Energy_Consumption))
            .attr("x", d => xScale(d.Screen_Tech))
            .attr("y", d => yScale(d.Energy_Consumption))
            .attr("fill", "green");

    innerChart.selectAll(".value-label")
        .data(data)
        .join("text")
            .attr("class", "value-label")
            .attr("x", d => xScale(d.Screen_Tech) + xScale.bandwidth() / 2)
            .attr("y", d => yScale(d.Energy_Consumption) - 6)
            .attr("text-anchor", "middle")
            .text(d => `${Math.round(d.Energy_Consumption)} kWh`);
};
