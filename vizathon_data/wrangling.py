import os
import pandas as pd
import openpyxl

years = [str(num) for num in range(2011, 2021, 1)]
orig_df = pd.DataFrame()
for year in years:
    for root, _, files in os.walk("./" + year):
        for file in files:
            fpath = os.path.join(root, file)
            if fpath[-4:] != ".xls" and fpath[-5:] != ".xlsx":
                print(fpath)
                continue
            else:
                df = pd.read_excel(fpath, sheet_name="Ranked Measure Data")

                # use second row as column names
                # https://www.codegrepper.com/code-examples/elixir/make+second+row+header+in+pandas
                df.rename(columns=df.iloc[0])
                new_header = df.iloc[0]
                df = df[1:] 
                df.columns = new_header 
                
                df.drop(df.columns.difference(['FIPS', 'County', '% Adults with Obesity']), 1, inplace=True)
                orig_df = pd.concat([orig_df, df], ignore_index=True)
        orig_df.to_json("./../jsons/data_" + year + ".json", orient='index')