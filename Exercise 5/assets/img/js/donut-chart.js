d3.csv("assets/data/Data_exercise_5.3.csv").then(data => {
    data.forEach(d => {
        d.screensizeCategory = d["Screensize_Category"]
        d.count = +d["Count"]
    })

    console.log(data);
    drawDonutChart(data);
})

const drawDonutChart = data => {
    
    // Set up chart dimensions
    const width = 1000;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 20;

    // Chart code

    // Create color scale
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.screensizeCategory))
        .range(d3.schemeSet2);

    const pie = d3.pie()
        .value(d => d.count)
        .sort(null);

    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius * 1)
        .padAngle(0.02)
        .cornerRadius(6);
    
    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0, 0, ${width}, ${height}`)
        .style("border", "1px solid black");

    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${width/2}, ${height/2})`);
    
    innerChart
        .selectAll("path")
        .data(pie(data))
        .join("path")
            .attr("d", arcGenerator)
            .attr("fill", d => color(d.data.screensizeCategory))
            .attr("stroke", "white")
            .attr("stroke-width", 2);

    innerChart
        .selectAll(".slice-label")
        .data(pie(data))
        .join("text")
            .attr("class", "slice-label")
            .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
            .attr("text-anchor", "middle")
            .text(d => d.data.screensizeCategory);
};   