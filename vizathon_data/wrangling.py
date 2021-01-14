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


def convert_fips(x):
    try:
        return str(int(x))
    except:
        return x

years = [str(num) for num in range(2011, 2021, 1)]
cols_og = ['FIPS', 'County', 'State', '% Obese', '% Smokers', '% unemployed', '% Children in Poverty', '% With Access', '% Excessive Drinking']
cols_2020 = ['FIPS', 'County', 'State', '% Adults with Obesity', '% Smokers', '% Unemployed', '% Children in Poverty', '% With Access to Exercise Opportunities', '% Excessive Drinking']
og_dict = {'% Obese': 'obesity_rate', '% Adults with Obesity': 'obesity_rate', '% Smokers': 'smoking_rate', '% unemployed': 'unemployment_rate', '% Unemployed': 'unemployment_rate', '% Children in Poverty': 'childhood_poverty_rate', '% With Access': 'exercise', '% With Access to Exercise Opportunities': 'exercise', '% Excessive Drinking': 'drinking'}

min_drinking = 100
max_drinking = 0

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
            cols = cols_2020 if year == "2020" else cols_og            
            df.drop(df.columns.difference(cols), 1, inplace=True)
            try:
                orig_df = pd.concat([orig_df, df], ignore_index=True)
            except:
                print(df.columns, fpath)
                break

        # post-processing
        orig_df['FIPS'] = orig_df['FIPS'].apply(lambda x: convert_fips(x))
        orig_df.rename(columns=og_dict, inplace=True)
        if year == "2020":
            if max(orig_df['drinking']) > max_drinking:
                max_drinking = max(orig_df['drinking']) 
            if min(orig_df['drinking']) < min_drinking:
                min_drinking = min(orig_df['drinking'])
        # print(list(orig_df['obesity_rate']))
        orig_df.drop_duplicates(subset=['FIPS'], keep='last', inplace=True)
        orig_df.reset_index(drop=True, inplace=True)

        # print(orig_df.head())
        # print(list(orig_df.columns))
        # orig_df.to_json("./../jsons/data_" + year + ".json", orient='records')
        # prepend_line("./../jsons/data_" + year + ".json", "data_" + year + " = ")
        # break
    # break
print(min_drinking, max_drinking)
        