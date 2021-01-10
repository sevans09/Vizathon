# Tufts Vizathon: Disrupting Childhood Obesity

Follow progress at: [sevans09.github.io/Vizathon](http://sevans09.github.io/Vizathon)

#### To Do
    * Data cleaning - drop unnecessary columns, add column with FIPS code
    * Use data from covid with state (and get county) populations
    * Click through each year on dataset 3 
    * On the chloropleth map - make transluscent bubbles (maybe size by # of datapoints)
    * Color chloropleth map by childhood obesity rate
    * Include list ordered by ranks in health outcomes
    * Bar chart when click on point that includes dropdown to sort by different topics 
    from Dataset 2 (fruits and vegetables, TV watching, etc.)
    * Convert Lat/Long to FIPS code to show country when click and census breakdown 
    of county so user has context
    * If possible, add columns for population and demographic breakdown (maybe income/education levels too)
    for FIPS

#### Goals
    * Interactive web application
    * Geographic and time-series data
    * Highlight disparities in health outcomes along socio-demographic segments

#### Data
1.  CDC Nutrition, Physical Activity, and Obesity – Legislation
    * Contains policy data from the 50 US states and DC.  “Policy data” describes legislation surrounding “regulations on nutrition, physical activity, and obesity in settings such as early care and education centers, restaurants, schools, work places, and others.”(“CDC Nutrition”)  
2. Nutrition, Physical Activity, and Obesity - Youth Risk Behavior Surveillance System 
    * Data is from the Youth Risk Behavior Surveillance System, YBRSS, on high school age students in the 50 states and DC. The goal of YBRSS is to determine the presence of health behaviors, assess whether these behaviors increase or decrease over time, and the cooccurrence of health behaviors. Includes data on adolescent diet, physical activity, and weight status.
3. Food Environment Atlas 
    * The Food Environment Atlas is a dataset of the USDA’s Economic Research Service of the US Dept. of Agriculture. Research has demonstrated that food environmental factors such as store and restaurant proximity, food and nutrition assistance programs, and prices impact diet quality and food choices.  The data gives a window into a community’s ability to access healthy food.


#### Ideas 
    * Use income data combined with food environment atlas to examine how far different 
      socioeconomic groups travel for grocery stores (by county)
    * Chloropleth map displaying data with a dropdown to choose to display activity 
      levels, diet, weight, and more (by county)
    * Tracking healthy vs. unhealthy behaviors over several years (using youth risk behavior survey); user could maybe sort by state
