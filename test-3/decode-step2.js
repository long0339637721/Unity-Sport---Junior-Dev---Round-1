const fs = require("fs");
const key =
  "select * from sport_events se where se.start_timestamp >= 1729875600 and se.start_timestamp <= 1729962000";

const mapEventStatusToJson = (input) => {
  if (input.length === 1) {
    return null;
  }
  return JSON.stringify({
    status_id: input[0],
    away_score: {
      corners: input[1],
      red_card: input[2],
      yellow_card: input[3],
      penalty_score: input[4],
      regular_score: input[5],
      overTime_score: input[6],
      half_time_score: input[7],
    },
    home_score: {
      corners: input[8],
      red_card: input[9],
      yellow_card: input[10],
      penalty_score: input[11],
      regular_score: input[12],
      overTime_score: input[13],
      half_time_score: input[14],
    },
  });
};

const decodeJSON = (inputFilePath, outputFilePath) => {
  fs.readFile(inputFilePath, "utf8", (err, dataRaw) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    try {
      const data = JSON.parse(dataRaw);
      const arr = [];

      // Chuyển đổi data từ mảng sang json
      for (let i = 0; i < data.id.length; i++) {
        arr.push({
          id: data.id[i],
          season_id: data.season_id[i],
          stage_id: data.stage_id[i],
          group_num: data.group_num[i],
          round_num: data.round_num[i],
          start_time: new Date(data.start_timestamp[i] * 1000)
            .toISOString()
            .slice(0, 10),
          start_timestamp: data.start_timestamp[i],
          sport_event_status: mapEventStatusToJson(data.sport_event_status[i]),
          status_id: data.status_id[i],
          updated_at: data.updated_at[i],
          record_updated_at: data.record_updated_at[i],
          home_team_id: data.home_team_id[i],
          away_team_id: data.away_team_id[i],
          competition_id: data.competition_id[i],
          lineup: 1,
          venue_id: data.venue_id[i],
          referee_id: data.referee_id[i],
          related_id: data.related_id[i],
          agg_score: data.agg_score[i],
        });
      }

      const decodeData = {
        [key]: arr,
      };

      fs.writeFileSync(outputFilePath, JSON.stringify(decodeData, null, 2)); // Data đã giải mã ra file
    } catch (parseErr) {
      console.error("Error parsing JSON data:", parseErr);
    }
  });
};

decodeJSON("test-3/data/data-decode-1.json", "test-3/data/data-decode-2.json");
