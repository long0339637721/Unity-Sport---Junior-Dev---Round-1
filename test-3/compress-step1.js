const fs = require("fs");
const key =
  "select * from sport_events se where se.start_timestamp >= 1729875600 and se.start_timestamp <= 1729962000";

// sport_event_status: {
//   status_id: 8,
//   away_score: {
//     corners: 0,
//     red_card: 0,
//     yellow_card: 0,
//     penalty_score: 0,
//     regular_score: 2,
//     overTime_score: 0,
//     half_time_score: 0
//   },
//   home_score: {
//     corners: 0,
//     red_card: 0,
//     yellow_card: 0,
//     penalty_score: 0,
//     regular_score: 2,
//     overTime_score: 0,
//     half_time_score: 0
//   }
// }
const mapEventStatusToArray = (input) => {
  if (!input) {
    return [1];
  }
  const data = JSON.parse(input);
  return [
    data.status_id,
    data.away_score.corners,
    data.away_score.red_card,
    data.away_score.yellow_card,
    data.away_score.penalty_score,
    data.away_score.regular_score,
    data.away_score.overTime_score,
    data.away_score.half_time_score,
    data.home_score.corners,
    data.home_score.red_card,
    data.home_score.yellow_card,
    data.home_score.penalty_score,
    data.home_score.regular_score,
    data.home_score.overTime_score,
    data.home_score.half_time_score,
  ];
};

function compressJSON(inputFilePath, outputFilePath) {
  fs.readFile(inputFilePath, "utf8", (err, dataRaw) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    try {
      // Lấy dữ liệu dạng object từ file JSON
      const data = JSON.parse(dataRaw)[key];
      const arr = {
        id: [],
        season_id: [],
        stage_id: [],
        group_num: [],
        round_num: [],
        start_timestamp: [],
        sport_event_status: [],
        status_id: [],
        updated_at: [],
        record_updated_at: [],
        home_team_id: [],
        away_team_id: [],
        competition_id: [],
        venue_id: [],
        referee_id: [],
        related_id: [],
        agg_score: [],
      };

      for (let i = 0; i < data.length; i++) {
        // Xóa key không cần thiết
        delete data[i].start_time;
        delete data[i].lineup;

        // Đổi json -> array cho sport_event_status
        data[i].sport_event_status = mapEventStatusToArray(
          data[i].sport_event_status
        );

        // Thêm dữ liệu vào mảng
        arr.id.push(data[i].id);
        arr.season_id.push(data[i].season_id);
        arr.stage_id.push(data[i].stage_id);
        arr.group_num.push(data[i].group_num);
        arr.round_num.push(data[i].round_num);
        arr.start_timestamp.push(data[i].start_timestamp);
        arr.sport_event_status.push(data[i].sport_event_status);
        arr.status_id.push(data[i].status_id);
        arr.updated_at.push(data[i].updated_at);
        arr.record_updated_at.push(data[i].record_updated_at);
        arr.home_team_id.push(data[i].home_team_id);
        arr.away_team_id.push(data[i].away_team_id);
        arr.competition_id.push(data[i].competition_id);
        arr.venue_id.push(data[i].venue_id);
        arr.referee_id.push(data[i].referee_id);
        arr.related_id.push(data[i].related_id);
        arr.agg_score.push(data[i].agg_score);
      }

      const compressedData = JSON.stringify(arr, null, 0);
      fs.writeFileSync(outputFilePath, compressedData); // Data json sau khi chuyển qua dạng array
    } catch (parseErr) {
      console.error("Error parsing JSON data:", parseErr);
    }
  });
}

compressJSON("data.json", "test-3/data/data-compressed-1.json");
