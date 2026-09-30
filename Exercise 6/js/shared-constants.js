// Set up the dimensions and margins
const margin =  {top: 40, right: 30, bottom: 50, left: 70};
const width = 800;
const height = 400;
const innerWidth = width - margin.left- margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Set up the colors
const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

// Set up the scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// Create bin generator
const binGenerator = d3.bin()
    .value(d => d.energyConsumption)