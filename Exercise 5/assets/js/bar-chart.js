d3.csv("assets/data/Data_exercise_5.1.csv").then(data => {
    data.forEach(d => {
        d.Energy_Consumption =
            +d["Mean(Labelled energy consumption (kWh/year))"];
    });

    data.sort((a, b) => a.Energy_Consumption - b.Energy_Consumption);
    console.log(data);
    drawBarChart(data);
});