
///////////////////////////////////////////////////////////////////////////////////////
//                          Class 3 Google Earth Engine    			                //
/////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////
//                          1- Filters                     			                //
/////////////////////////////////////////////////////////////////////////////////////


// Filter 
var geometry = table.filter(ee.Filter.eq("NAME_MUNIC", 'Miranda de Arga'));
print(geometry);
// Add the plots to the map
Map.addLayer(geometry,{color:'red'},'Agricultural plots');
Map.centerObject(geometry,14); // Center the view


// Filter a Image Collection

var Collection = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                  .filter(ee.Filter.date('2017-05-1', '2017-09-06'))
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',10))
                  .filterBounds(geometry);
				  
// Print the collection 
print('Images collection', Collection);

// Add a particular image
var image_selec = ee.Image("COPERNICUS/S2_SR_HARMONIZED/20170618T105621_20170618T110415_T30TWN");


// Add the selected image to the map
Map.addLayer(image_selec, {'bands': ['B4', 'B3', 'B2'], 'min': 0.0, 'max': 4000},'Chosen image');

///////////////////////////////////////////////////////////////////////////////////////
//                          2- Apply a cloud mask                                   //
/////////////////////////////////////////////////////////////////////////////////////

// Function to mask cloud. Using the SCL band

function maskclouds_scl(image) {
  // Use the SCL band to select only the soil and vegetation pixels.
  var scl = image.select('SCL');
  var veg = 4;
  var soil = 5;
  // Create the  mask
  var scl_mask = scl.eq(veg).or(scl.eq(soil));
  // REFLECTANCE MASK (Avoid values ​​<= 0)
  var optical_bands = image.select('B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8','B8A', 'B11', 'B12');
  var valid_reflectance_mask = optical_bands.gt(0).reduce('and');
  // Combine all masks
  var combined_mask = scl_mask.and(valid_reflectance_mask);
  
  // Apply the combined mask
  var masked_image = image.updateMask(combined_mask);
  
  // Scales only the reflectance bands to a range of [0, 1]
  var scaled_bands = masked_image.select('B.*').divide(10000);
  
  // Replaces the original bands with the scaled ones, preserving the properties of the original image.
  var final_image = masked_image.addBands({
    srcImg: scaled_bands,
    overwrite: true 
  });
  // Return final image
  return ee.Image(final_image.copyProperties(image, image.propertyNames()));
}


// Mask one image
var image_mask = maskclouds_scl(image_selec);



print(image_mask);

// View cloud mask
Map.addLayer(image_mask, {'bands': ['B4', 'B3', 'B2'], 'min': 0.0, 'max': 0.4}, 'Chosen image with cloud mask');


///////////////////////////////////////////////////////////////////////////////////////
//                           4-   Create mosaic                                     //
/////////////////////////////////////////////////////////////////////////////////////

// Apply the cloud mask to all images
var dataset = Collection.map(maskclouds_scl);

// Create a average image
var mean = dataset.reduce(ee.Reducer.mean());

// Visualization parameters
var vis_rgb_mean = {'bands': ['B4_mean', 'B3_mean', 'B2_mean'], 'min': 0.0, 'max': 0.4};


// Show
Map.addLayer(mean,vis_rgb_mean, 'Mean Image');



///////////////////////////////////////////////////////////////////////////////////////
//                           3-   Vegetation index                                  //
/////////////////////////////////////////////////////////////////////////////////////

// Create your vegetation index

function addindices(image) {
  var ndvi = image.normalizedDifference(['B8','B4']).rename('NDVI');

  var evi = image.expression(                          
    '2.5*((B8-B4)/(1+B8+(6*B4)-(7.5*B2)))',{
      'B8': image.select('B8'),
      'B4': image.select('B4'),
      'B2': image.select('B2')
    }).rename('EVI');
  var image_IV=image.addBands([ndvi,evi]);
  return image_IV;
}

//    Visualization                       
// Example of website to extract color's code
// https://coolors.co/palettes/trending

var NDVI=addindices(image_selec);

var vis_ndvi = {palette: ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'], 'min': -1, 'max': 1};

Map.addLayer(NDVI.select('NDVI'),vis_ndvi,'NDVI');



/////////////////////////////////////////////////////////
//               4-  Time Series                      //
///////////////////////////////////////////////////////

var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                  .filter(ee.Filter.date('2017-01-01', '2017-12-31'))
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .filterBounds(geometry)
                  .map(maskclouds_scl)
                  .map(addindices);



// Establish the band/index to use
var band = 'NDVI';

// Filter maize plots 
var maize = geometry.filter(ee.Filter.eq("ClasEsp", 'MAÍZ'));
// Show on the console all corn plots
print(maize);

// Select only one maize plot
var filtered=maize.filter(ee.Filter.and(ee.Filter.eq("PARCELA", 323)));

// Define the chart type and display parameters.
print(ui.Chart.image.series(dataset.select(band), filtered)
.setOptions({title: 'Time Series'}));

// Show the selected plot
Map.addLayer(filtered,{color:'blue'},'Chosen plot');




//////////////////////////////////////////////////////
//              5- Spectral Signature              //
////////////////////////////////////////////////////


var old_name=['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B11', 'B12'];
var new_name= ['1_Blue', '2_Green', '3_Red', '4_RE1', '5_RE2', '6_RE3', '7_NIR', '8_SWIR1', '9_SWIR2'];

var image_ss = image_mask.select(old_name).rename(new_name);

var spectral_signature = ui.Chart.image.regions(
    image_ss.select('1_Blue', '2_Green', '3_Red', '7_NIR', '8_SWIR1', '9_SWIR2'), filtered, ee.Reducer.mean(), 10, 'CLASIF_SC1');

    

// Graphic configuration
spectral_signature.setOptions({
  title: 'Spectral Signature',
  hAxis: {title: 'Band'},
  vAxis: {title: 'Reflectance'},
  lineWidth: 1,
  pointSize: 4,

});

print(spectral_signature);


//////////////////////////////////////////////////////
//                  6- Export                      //
////////////////////////////////////////////////////

// Vector data

var area=geometry;

var stats = dataset.map(function(image) {
  return area.map(function(f){
    var mean = image.reduceRegion({reducer: ee.Reducer.mean(),geometry: f.geometry(),scale: 10});
    return f.set({
      'date': image.date().format(),
      // Mean
      'Blue': mean.get('B2'),
      'Green': mean.get('B3'),
      'Red': mean.get('B4'),
      'RE1': mean.get('B5'),
      'RE2': mean.get('B6'),
      'RE3': mean.get('B7'),
      'NIR': mean.get('B8'),
      'RE4': mean.get('B8A'),
      'SWIR1': mean.get('B11'),
      'SWIR2': mean.get('B12'),
 
    });
});
}).flatten()
.filter(ee.Filter.neq('Blue', null))
.filter(ee.Filter.neq('Green', null))
.filter(ee.Filter.neq('Red', null))
.filter(ee.Filter.neq('RE1', null))
.filter(ee.Filter.neq('RE2', null))
.filter(ee.Filter.neq('RE3', null))
.filter(ee.Filter.neq('NIR', null))
.filter(ee.Filter.neq('RE4', null))
.filter(ee.Filter.neq('SWIR1', null))
.filter(ee.Filter.neq('SWIR2', null));


Export.table.toDrive({
  collection: stats,
  description: 'stats_PAC_Sentinel2',
  fileFormat: 'CSV',
  folder: 'Class4'
});  


// Raster data


Map.addLayer(image_mask,{'bands': ['B4', 'B3', 'B2'], 'min': 0.0, 'max': 1}, 'Export')

Export.image.toDrive({
  image: image_mask.toFloat(), 
  description: 'S2_2017',
  crs: 'EPSG:25830',
  scale: 10,
  folder: 'Class4',
  maxPixels: 1e10,
  region: geometry
});
