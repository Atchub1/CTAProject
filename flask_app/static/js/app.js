// Function that builds the metadata panel
function buildMetadata(station) {

  // Fetch the metadata for the station
    var url = `/metadata/${station}`;


    // Select the panel with id of `#sample-metadata`
    d3.json(url, function(error, station) {
      if (error) return console.warn(error);
      var sampleMetadata = d3.select("#sample-metadata");
  
    // Clear any existing metadata
      sampleMetadata.html("");

    // Add each key and value pair to the panel
      Object.entries(station).forEach(function ([key, value]) {
        var row = sampleMetadata.append("p");
        row.text(`${key}: ${value}`);
      });
    });
}


// Function that builds the station line chart
function buildLineChart(station) {
  //Iterate through all stations
  var url = `/total/${station}`
  
  d3.json(url, function(error, data) {     
    if (error) return console.warn(error);  
      // Build the line chart
      var x= data.year;
      var y= data.ridership;
      var values= data.year;

          var trace1 = {
              x: x,
              y: y,
              text: values,
              mode: 'line'
          };
      var data = [trace1];

      var layout = {
          title: `Total Ridership for: ${station}`,
          heigth: 500,
          width: 827,
          xaxis: { title: "Year"},
          yaxis: { title: "Total Ridership over the years"}
      };
      Plotly.newPlot("line", data, layout, {responsive: true});        
  });
}


// Function that builds the station bar chart
function buildBarChart(station) {
  var url = `/station/${station}`
  
  d3.json(url, function(error, data) {       
    if (error) return console.warn(error);
    var x= data.year; 
    var y_weekday= data.weekday_ridership;
    var y_saturday = data.saturday_ridership;
    var y_sunday = data.sunday_ridership;    
    var values= data.year;

    var trace1 = {
            x: x,
            y: y_weekday,
            text: values,
            type: 'bar',
            name: "Weekday Ridership"
    };
        var trace2 = {
          x: x,
          y: y_saturday,
          text: values,
          type: 'bar',
          name: "Saturday Average Ridership"          
      };

      var trace3 = {
        x: x,
        y: y_sunday,
        text: values,
        type: 'bar',
        name: "Sunday/Holiday Average Ridership"        
    };      
      var data = [trace1, trace2, trace3];

      var layout = {
          title: `Average Day-Type Ridership for: ${station}`,
          height: 500,
          width: 827,
          xaxis: { title: "Year"},
          yaxis: { title: "Average Day-Type Ridership"},
          barmode: 'stack'
      };
      Plotly.newPlot("bar", data, layout);        
    });

}

// Function to build the station selector and initiate the metadata, line, and bar chart functions 
function init() {      
  // Set up the dropdown menu
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of station names to populate the select options
  d3.json("/stations", function(error, data) {
    if (error) return console.warn(error);
    data.forEach((station) => {
      selector
          .append("option")
          .text(station)
          .property("value", station);
      });

  // Use the first station from the list to build the initial plots
  const firstStation = data[0];
  
  buildMetadata(firstStation);
  buildLineChart(firstStation);
  buildBarChart(firstStation);
  });
}

// Function to update the metadata, line, and bar charts with new information each time a station is chosen from the station well
function optionChanged(newStation) {
  // Fetch new data each time a new state is selected
  buildMetadata(newStation);
  buildLineChart(newStation);
  buildBarChart(newStation);
}


// Call the function to build the webpage
init();