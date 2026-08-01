# Geospatial Data Analysis

**Author:** Naziru Halilu

A hands-on course/project package covering vector and raster GIS, optical and radar
(Sentinel-1/2) remote sensing, and unsupervised/supervised land-cover classification
in Python and Google Earth Engine.

## Contents

- `01_Vector_Data_Analysis.ipynb` — vector data manipulation (agricultural plots).
- `02_Raster_Data_Analysis.ipynb` — raster data manipulation; digital elevation model,
  slope map generation, orthophotos.
- `03_Optical_Data_Sentinel2_NDVI.ipynb` — working with a downloaded Sentinel-2 image:
  NDVI, time-series generation from CSV, plot/crop comparison.
- `04_Unsupervised_Classification.ipynb` — unsupervised classification with a single
  Planet image and a 3-date time series (April, August, November).
- `05_Supervised_Classification.ipynb` — supervised classification in Python.
- `06_Sentinel1_Download_Processing_TimeSeries.ipynb` — Sentinel-1 download,
  processing, and time-series analysis.
- `GoogleEarthEngine_Class3_CloudMasking.js` — Google Earth Engine script (filters,
  cloud masking, image collection handling).
- `GIS_Vector_Layers_Soil_Hydrology_AgriculturalPlots.7z` — compressed shapefiles:
  soil polygons (`EDAFOL_Pol_Suelos25m`), main-river hydrology polygons
  (`HIDROG_Pol_RioPrincipal`), and the 2017 agricultural plot register (`PAC_2017`).
- `Class3_Intersection_Plots.7z` — compressed shapefile of plot intersections used
  in the Class 3 (Google Earth Engine) exercise.
- `Unsupervised_Classification_PlotResults.7z` — compressed CSV of per-plot
  unsupervised classification results.
- `Sentinel2_Composite_2017.tif` — Sentinel-2 2017 raster composite.
- `Sentinel2_PlotStatistics_Raw.csv` — Sentinel-2 zonal statistics per agricultural
  plot (raw).
- `Sentinel2_PlotStatistics_MovingAverage.csv` — same, smoothed with a moving average.

All `.7z` archives are kept compressed (rather than extracted) because several of the
underlying shapefiles individually exceed 100MB uncompressed, which is over GitHub's
per-file limit. Extract them locally with 7-Zip or `p7zip` before use.

## Notes

- The `Logos.jpeg` institutional-logo image originally embedded in two notebooks
  (`05_Supervised_Classification.ipynb`, `06_Sentinel1_Download_Processing_TimeSeries.ipynb`)
  has been edited to remove the SustAgri logo, per request; only the UPNA and EU
  co-funding logos remain.
- All files were renamed from their original, inconsistently-numbered names
  (`01_Vector_data.ipynb`, `T6_SupervisedClassification.ipynb`, `Data.7z`,
  `Plots_Clas1.7z`, etc.) to a clearer, consistently numbered scheme. All in-notebook
  code references to renamed data files (`S2_2017.tif`, `stats_PAC_Sentinel2.csv`,
  `stats_PAC_Sentinel2_MA.csv`) were updated to match, so the notebooks still run
  correctly against the new filenames.
