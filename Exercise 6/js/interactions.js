const populateFilters = (data) => {

    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
            .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
            .text(d => d.label)

            .on("click", (e, d) => {
                console.log("Clicked filter:", e);
                console.log("Clicked filter data:", d);

                // If the clicked filter is not active, update the active state of the filters
                if (!d.isActive) {
                
                    // Make sure button clicked is not already active
                    filters_screen.forEach(filter => {
                        filter.isActive = d.id === filter.id ? true : false;
                    });
                            
                    // Update the buttons based on which one was clicked
                    d3.selectAll("#filters_screen .filter")
                        .classed("active", filter => filter.id === d.id ? true : false);
                }   
            });       
}

const updateHistogram = (filterId, data) => {
    
    const updateData = filterId === "all"
        ? data
        : data.filter(tv => tv.screenTech === filterId);

    const updatedBins = binGenerator(updateData);

    d3.selectAll("#histogram rect")
        .data(updatedBins)
        .transition()
            .duration(500)
            .ease(d3.easeCubicInOut)
            .attr("y", d => yScale(d.length))
            .attr("height", d => innerHeight - yScale(d.length));
}

const createTooltip = (data) => {
    
    const tooltip = innerChartS
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 0);

    tooltip
        .append("rect")
            .attr("width", tooltipWidth)
            .attr("height", tooltipHeight)
            .attr("rx", 3)
            .attr("ry", 3)
            .attr("fill-color", barColor)
            .attr("fill-opacity", 0.75);

    tooltip
        .append("text")
            .text("NA")
            .attr("x", tooltipWidth /2)
            .attr("y", tooltipHeight/2 + 2)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("fill", "white")
            .style("font-weight", 900);
}
