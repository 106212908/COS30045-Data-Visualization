// Set up the dimensions and margins
const margin =  {top: 40, right: 30, bottom: 50, left: 70};
const width = 800;
const height = 400;
const innerWidth = width - margin.left- margin.right;
const innerHeight = height - margin.top - margin.bottom;

// inner chart variable for scatterplot
let innerChartS;

// tooltip dimension
const tooltipWidth = 65;
const tooltipHeight = 32;

// Set up the colors
const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

// Set up the scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal()

// Create bin generator
const binGenerator = d3.bin()
    .value(d => d.energyConsumption)

// Create axis 
const bottomAxis = d3.axisBottom(xScale)
const leftAxis = d3.axisLeft(yScale);

// Array of filters
const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false },
];