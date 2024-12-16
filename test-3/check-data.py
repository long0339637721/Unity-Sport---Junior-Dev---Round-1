import json
import pandas as pd

key = "select * from sport_events se where se.start_timestamp >= 1729875600 and se.start_timestamp <= 1729962000"

def read_data_from_json(file_path):
  with open(file_path, 'r') as file:
    data = json.load(file)
  return data

if __name__ == "__main__":
  file_path = 'data.json'
  data = read_data_from_json(file_path)[key]
  # print(data[0])
  df = pd.DataFrame(data)

  print(df.value_counts('season_id'))       # null
  print(df.value_counts('stage_id'))        # null
  print(df.value_counts('group_num'))       # 7 group, not null
  print(df.value_counts('round_num'))       # 
  print(df.value_counts('status_id'))       # 5 status, status = 1 -> sport_event_status = null / 8 / 9...
  print(df.value_counts('home_team_id'))    # 
  print(df.value_counts('away_team_id'))    #
  print(df.value_counts('competition_id'))  #
  print(df.value_counts('lineup'))          # Toàn bộ value = 1
  print(df.value_counts('venue_id'))        # null
  print(df.value_counts('referee_id'))      # ""
  print(df.value_counts('related_id'))      # null
  print(df.value_counts('agg_score'))       # null

  df['sport_event_status'] = df['sport_event_status'].apply(lambda x: json.loads(x) if x is not None else {})
  status_df = pd.json_normalize(df['sport_event_status'])
  print(status_df.value_counts('status_id'))