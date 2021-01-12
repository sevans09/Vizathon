import os
import pandas as pd


def prepend_line(file_name, line):
    """ Insert given string as a new line at the beginning of a file """
    # define name of temporary dummy file
    dummy_file = file_name + '.bak'
    # open original file in read mode and dummy file in write mode
    with open(file_name, 'r') as read_obj, open(dummy_file, 'w') as write_obj:
        # Write given line to the dummy file
        write_obj.write(line)
        # Read lines from original file one by one and append them to the dummy file
        for line in read_obj:
            write_obj.write(line)
    # remove original file
    os.remove(file_name)
    # Rename dummy file as the original file
    os.rename(dummy_file, file_name)


years = [str(num) for num in range(2011, 2021, 1)]

for year in years:
    print("getting", year, "data...")
    orig_df = pd.DataFrame()
    for root, _, files in os.walk("./" + year):
        for file in files:
            fpath = os.path.join(root, file)
            if fpath[-4:] != ".xls" and fpath[-5:] != ".xlsx":
                continue
            df = pd.read_excel(fpath, sheet_name="Ranked Measure Data")

            # use second row as column names
            # https://www.codegrepper.com/code-examples/elixir/make+second+row+header+in+pandas
            df.rename(columns=df.iloc[0])
            new_header = df.iloc[0]
            df = df[1:] 
            df.columns = new_header 
            df.drop(df.columns.difference(['FIPS', 'County', 'State', '% Obese', '% Smokers', '% unemployed', '% Children in Poverty', '% Healthy Food']), 1, inplace=True)
            orig_df = pd.concat([orig_df, df], ignore_index=True)

        orig_df.rename(columns={'% Obese': 'obesity_rate', '% Smokers': 'smoking_rate', '% unemployed': 'unemployment_rate', '% Children in Poverty': 'childhood_poverty_rate', '% Healthy Food': 'healthy_food_rate'}, inplace=True)
        orig_df.drop_duplicates(subset=['FIPS'], keep='last', inplace=True)
        orig_df.reset_index(drop=True, inplace=True)

        # print(orig_df.head())
        # print(list(orig_df.columns))
        orig_df.to_json("./../jsons/data_" + year + ".json", orient='records')
        prepend_line("./../jsons/data_" + year + ".json", "data_" + year + " = ")
        # break
    # break
        