d3.csv("data/TVData_WithStar.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption,
    star: +d.star

})).then(data => {

    // Log the proccesed data into console
    console.log(data);

    // Call function after data has been loaded
    drawHistogram(data);
    populateFilters(data);

    drawScatterplot(data);
    createTooltip(data);
    handleMouseEvents();

}).catch(error => {
    console.error("Error loading the CSV file:", error)
});