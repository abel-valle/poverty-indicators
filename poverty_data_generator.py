import pandas as pd

df = pd.read_csv('input/pobreza_lat_long_2015_es.csv', encoding='latin', thousands=',', na_values='n.d')
df.to_json('input/pobreza-lat-lng-2015.json', orient='records')
