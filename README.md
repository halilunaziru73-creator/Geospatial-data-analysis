# Geospatial Data Analysis

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE) ![Python](https://img.shields.io/badge/Python-3.10%2B-blue)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.21760031.svg)](https://doi.org/10.5281/zenodo.21760031)

**Author:** Naziru Halilu

A hands-on course/project package covering vector and raster GIS, optical and
radar (Sentinel-1/2) remote sensing, and unsupervised/supervised land-cover
classification in Python and Google Earth Engine.

## Contents

- `01_Vector_Data_Analysis.ipynb` — vector data manipulation (agricultural plots).
- `02_Raster_Data_Analysis.ipynb` — raster data manipulation; digital elevation
  model, slope map generation, orthophotos.
- `03_Optical_Data_Sentinel2_NDVI.ipynb` — working with a downloaded Sentinel-2
  image: NDVI, time-series generation from CSV, plot/crop comparison.
- `04_Unsupervised_Classification.ipynb` — unsupervised classification with a
  single Planet image and a 3-date time series (April, August, November).
- `05_Supervised_Classification.ipynb` — supervised classification in Python.
- `06_Sentinel1_Download_Processing_TimeSeries.ipynb` — Sentinel-1 download,
  processing, and time-series analysis.
- `GoogleEarthEngine_Class3_CloudMasking.js` — Google Earth Engine script
  (filters, cloud masking, image collection handling).
- `GIS_Vector_Layers_Soil_Hydrology_AgriculturalPlots.7z` — compressed shapefiles:
  soil polygons (`EDAFOL_Pol_Suelos25m`), main-river hydrology polygons
  (`HIDROG_Pol_RioPrincipal`), and the 2017 agricultural plot register
  (`PAC_2017`).
- `Class3_Intersection_Plots.7z` — compressed shapefile of plot intersections
  used in the Google Earth Engine exercise.
- `Unsupervised_Classification_PlotResults.7z` — compressed CSV of per-plot
  unsupervised classification results.
- `Sentinel2_Composite_2017.tif` — Sentinel-2 2017 raster composite.
- `Sentinel2_PlotStatistics_Raw.csv` — Sentinel-2 zonal statistics per
  agricultural plot (raw).
- `Sentinel2_PlotStatistics_MovingAverage.csv` — same, smoothed with a moving
  average.

All `.7z` archives are kept compressed because several of the underlying
shapefiles individually exceed 100 MB uncompressed. Extract them locally with
7-Zip or `p7zip` before use.

## How to Run the Code

### 1. Clone the repository

```bash
git clone https://github.com/halilunaziru73-creator/Geospatial-data-analysis.git
cd Geospatial-data-analysis
```

### 2. Install dependencies

This is a Jupyter notebook-based package. At minimum you'll need:

```bash
pip install jupyter numpy pandas matplotlib geopandas rasterio scikit-learn earthengine-api
```

(Some notebooks may need additional packages depending on which cells you run —
install any missing package as prompted.)

### 3. Extract the compressed data archives

Several shapefiles/results are kept as `.7z` archives because they exceed
100 MB uncompressed. Extract them first:

```bash
7z x GIS_Vector_Layers_Soil_Hydrology_AgriculturalPlots.7z
7z x Class3_Intersection_Plots.7z
7z x Unsupervised_Classification_PlotResults.7z
```

(Install `p7zip-full` / `p7zip` first if `7z` isn't available on your system.)

### 4. Launch and run the notebooks in order

```bash
jupyter notebook
```

Then open and run, in this order (each is self-contained but file names/paths
are aligned across notebooks):

1. `01_Vector_Data_Analysis.ipynb`
2. `02_Raster_Data_Analysis.ipynb`
3. `03_Optical_Data_Sentinel2_NDVI.ipynb`
4. `04_Unsupervised_Classification.ipynb`
5. `05_Supervised_Classification.ipynb`
6. `06_Sentinel1_Download_Processing_TimeSeries.ipynb`

### 5. Google Earth Engine script

`GoogleEarthEngine_Class3_CloudMasking.js` runs separately in the
[Google Earth Engine Code Editor](https://code.earthengine.google.com/) — sign
in with a GEE-enabled Google account, paste the script, and click **Run**.

## Notes

- Institutional logos embedded in the notebooks reflect only the funding
  partners relevant to this package (UPNA and EU co-funding).
- File names follow a consistent numbering scheme, and all in-notebook data
  references are aligned with these file names so the notebooks run correctly
  end to end.

## License

Released under the [MIT License](./LICENSE).

## Citation

If you use this repository, please cite it using the metadata in
[`CITATION.cff`](./CITATION.cff) (GitHub renders a "Cite this repository"
button on the repo's main page, in the top-right "About" panel).

## Related work

Part of a broader body of research on GIS, remote sensing, and machine
learning for agronomic and environmental applications:

- [Digital Twin for Gully Biocontrol](https://github.com/halilunaziru73-creator/Digital-Twin-for-the-Evaluation-of-Experimental-Gully-Biocontrol-Using-Morning-Glory-Ipomoea-spp)
- [Geometry-Agnostic Contrastive Learning (GACL)](https://github.com/halilunaziru73-creator/Geometry-Agnostic-Contrastive-Learning-GACL)
- [Real-Time RGB Proxy Vegetation Indexing (N_GACL)](https://github.com/halilunaziru73-creator/Real-Time-RGB-Proxy-Vegetation-Indexing-and-Texture-Analysis-for-UAV-and-Handheld-Crop-Imagery)
- [GIS-Based Delineation for Livestock Slurry Application](https://github.com/halilunaziru73-creator/GIS-based_delineation_of_areas_suitable_for_livestock_slurry_application)
- [Hybrid CNN-BiLSTM-Attention for Sediment Transport](https://github.com/halilunaziru73-creator/Hybrid-CNN-BiLSTM-Attention-Sediment-Transport-Agricultural-Gully-System)
- [Operationalizing GIS and ML across Cropping Systems](https://github.com/halilunaziru73-creator/Operationalizing-GIS-and-Machine-Learning-across-Contrasting-Cropping-Systems)
