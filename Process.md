# The Run Raleigh Project

## Part 1 - Getting the Data
This is how I made the Run Raleigh Project. It started with finding out which roads are in Raleigh. But that started with finding out where Raleigh is. I used a shapefile of [NCDOT city boundaries](https://www.nconemap.gov/datasets/NCDOT::ncdot-city-boundaries/explore?location=35.886828%2C-78.667705%2C13.00) from NC OneMap and brought it into QGIS:

![NC City Boundaries](/Images/CityBounds.png)

Then, I could select Raleigh city limits only and create a new layer:

![Raleigh Selected](/Images/RaleighSelect.png)

I got [street centerlines](https://data.raleighnc.gov/datasets/Wake::streets-in-wake-county-nc/explore?location=35.797245%2C-78.628677%2C16.00) in Wake County NC from Raleigh Open Data:

![Wake Country Streets](/Images/WakeStreets.png)

Haven't the default colors just been stunning?! ... I clipped these two layers to yield only streets in Raleigh:

![Raleigh Selected Streets](/Images/RaleighStreets.png)

Immaculate. Raleigh Open Data also had a [Greenway Trails](https://data-ral.opendata.arcgis.com/datasets/23836bb9145943d485252d9665020ff1_0/explore?location=35.852163%2C-78.361685%2C9.79) data set that I added.

![Streets and Greenways](/Images/StreetsAndGreenway.png)

From QGIS, I exported the newly trimmed shapefiles as .csv files and added them into RStudio. I used RStudio because it was already installed on my computer when I started this project. I wanted to use PyCharm since that is what I used more of in school, but it turns out that costs money for not-students?

Looking at the two data sets I got, the streets looked extremely messy. The Greenway file was interesting - it had different surface types listed for different segments of greenway, e.g. concrete, asphalt, decking, etc. That gave me a neat milestone idea: run across every wood bridge.

Back on topic, the reason I brought these into RStudio was to get all the individual road names greenway names. For the greenways I used `unique(RalGreenways$TRAIL_NAME)` on my newly created `RalGreenways.csv` to determine there are 26 greenways in Raleigh. However, it was time to start thinking about how to bring my runs into this process.

### 1.1 Getting My Runs into QGIS
I use a Garmin Forerunner 35 to get GPS information for my runs, and log about everything on Strava. From Strava there is an option to export the run GPX, and with this I could add the run into QGIS. Here's an example below with the run track shown in blue:

![Run Track](/Images/RunTrack.png)

My solution to see if which roads or greenways the run covered was to make a small buffer around the run track, then perform a clip against the greenway and/or road shapefiles. I had trouble with the buffer geometry because the Strava GPX was not in the same projection as Raleigh's data sets. I changed everything into EPSG:2246 that has better accuracy for North Carolina. I still had to change the buffer distance to be .0001 feet, so I'm not convinced I solved all the projection problems, but that was good enough.

![Run Track](/Images/RunBuffered.png)

To measure progress, I can take the intersected greenway sections, get the total distance with the convenient `MAP_MILES` column using `sum(ExampleRun$MAP_MILES,na.rm=TRUE)`, and get a percent completion against the total miles in the greenway and against the total miles in all greenways. Just checking against this arbitrary run, the total miles from the clipped greenway vectors were much greater than the distance of the run. I think this means some of the segments overlap and some distances get counted several times. To me this means I cannot trust this QGIS geoprocessing to get me the absolute miles covered, but I believe the relative completion yielded from geoprocessing should still be accurate.

It's time to work on displaying the data in a neat way.


# Part 2 - Online Display

It's time to learn to use [Leaflet](https://leafletjs.com/), the leading open-source JavaScript library for mobile-friendly interactive maps. Weighing just about 42 KB of JS, it has all the mapping features most developers ever need.
