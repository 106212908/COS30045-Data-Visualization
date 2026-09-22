d3.csv("assets/data/Data_exercise_5.3.csv").then(data => {
    data.forEach(d => {
        d.screensizeCategory = +d["Screensize_Category"]
        d.count = +d["Count"]
    })

    console.log(data)
    drawDonutChart(data)
})