const fs = require("fs");

const readData = (dataPath) => {
  const dataRaw = fs.readFileSync(dataPath, "utf8");
  const data = dataRaw.split(" ");
  const target = parseInt(data[0]);
  const nums = data.slice(1).map((num) => parseInt(num));
  return { target, nums };
};

const main = () => {
  const { target, nums } = readData("test-2/input.txt");

  let result = []; // Chứa kết quả
  const usedIndex = new Set(); // Lưu index đã sử dụng
  const valueMap = new Map(); // Lưu index theo Map của giá trị

  // Tạo Map lưu index của từng giá trị
  for (let i = 0; i < nums.length; i++) {
    if (!valueMap.has(nums[i])) {
      valueMap.set(nums[i], [i]);
    } else {
      valueMap.get(nums[i]).push(i);
    }
  }

  // Tìm cặp index thỏa mãn
  for (let i = 0; i < nums.length; i++) {
    if (usedIndex.has(i)) {
      continue;
    }
    if (valueMap.has(target - nums[i])) {
      const targetIndex = valueMap.get(target - nums[i]);
      const j = targetIndex.find((j) => j > i);
      if (j) {
        result.push([i, j]);
        usedIndex.add(i);
        usedIndex.add(j);
        targetIndex.splice(targetIndex.indexOf(j), 1);
      }
    }
  }

  console.log(result);
};

main();
