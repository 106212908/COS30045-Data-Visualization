d3.csv("assets/data/ARE_Spot_Prices.csv").then(data => {
    data.forEach(d => {
        d.year = +d["Year"]
        d.averageprice = +d["Average Price (notTas-Snowy)"]
    })

    console.log(data);
    drawLineChart(data);
})
