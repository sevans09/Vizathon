import os
import pandas as pd

years = ["2011","2012","2013","2014","2015","2016","2017","2018","2019","2020"]
for subdir in years:
    for root, _, files in os.walk("./" + subdir):
        for file in files:
            fpath = os.path.join(root, file)
            if fpath[-4:] != ".xls" and fpath[-5:] != ".xlsx":
                print(fpath)
                continue
            else:
                df = pd.read_excel(fpath, sheet_name="Ranked Measure Data")
                print(df)
                break
        break
    break