d3.csv("assets/data/Data_exercise_5.1.csv", d => {
    return{
        screenTech: d.Screen_Tech.trim().toUpperCase(), /* Converts screenTech values into Uppercase */
        energyConsumption: +d["Mean(Labelled energy consumption (kWh/year))"]
    };
}).then(data => {
    data.sort((a, b) => 
        b.energyConsumption - a.energyConsumption
    );

    console.log(data);
    drawBarChart(data);
});

const drawBarChart = data => {

    const margin = { top: 70, right: 50, bottom: 30, left: 70};
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select("#bar-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("border", "1px solid black")

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 50)
        .attr("text-anchor", "middle")
        .attr("font-size", "22px")
        .attr("font-weight", "bold")
        .text("Energy Consumption by Screen Type")

    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)

    // Create Scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.screenTech))
        .range([0, innerWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energyConsumption) * 1.12])
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
        .attr("x", -margin.left + 10)
        .attr("y", -10)
        .attr("text-anchor", "start")

    innerChart
        .selectAll(".bar")
        .data(data)
        .join("rect")
            .attr("class", "bar")
            .attr("width", xScale.bandwidth())
            .attr("height", d => innerHeight - yScale(d.energyConsumption))
            .attr("x", d => xScale(d.screenTech))
            .attr("y", d => yScale(d.energyConsumption))
            .attr("fill", "green");

    innerChart.selectAll(".value-label")
        .data(data)
        .join("text")
            .attr("class", "value-label")
            .attr("x", d => xScale(d.screenTech) + xScale.bandwidth() / 2)
            .attr("y", d => yScale(d.energyConsumption) - 6)
            .attr("text-anchor", "middle")
            .text(d => `${Math.round(d.energyConsumption)} kWh`);
};
