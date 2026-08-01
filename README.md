# Geospatial Data Analysis

**Author:** Naziru Halilu

A hands-on course/project package covering vector and raster GIS, optical and radar
(Sentinel-1/2) remote sensing, and unsupervised/supervised land-cover classification
in Python and Google Earth Engine.

## Contents

- `01_Vector_data.ipynb` — Class 1: vector data manipulation (agricultural plots).
- `02_Raster_data.ipynb` — Class 2: raster data manipulation; digital elevation model,
  slope map generation, orthophotos.
- `04_Optical_data_manipulation.ipynb` — working with a downloaded Sentinel-2 image:
  NDVI, time-series generation from CSV, plot/crop comparison.
- `05_Unsupervised_classification.ipynb` — unsupervised classification with a single
  Planet image and a 3-date time series (April, August, November).
- `T6_SupervisedClassification.ipynb` — Topic 6: supervised classification in Python.
- `T7_Sentinel1_download-processing_TimeSeries-analysis.ipynb` — Topic 7: Sentinel-1
  download, processing, and time-series analysis.
- `Code_GEE.js` — Class 3: Google Earth Engine script (filters, cloud masking,
  image collection handling).
- `Class_3.7z`, `Data.7z`, `Plots_Clas1.7z` — compressed GIS datasets (shapefiles,
  soil/hydrology polygons, agricultural plot registers, classification plot outputs).
  Kept compressed to stay under GitHub's per-file size limit; extract with 7-Zip.
- `S2_2017.tif` — Sentinel-2 2017 raster composite.
- `stats_PAC_Sentinel2.csv`, `stats_PAC_Sentinel2_MA.csv` — Sentinel-2 zonal
  statistics per agricultural plot (raw and moving-average).

## Notes

- The `Logos.jpeg` institutional-logo image originally embedded in two notebooks
  (`T6`, `T7`) has been edited to remove the SustAgri logo, per request; only the
  UPNA and EU co-funding logos remain.
