const fs = require("fs");

class HuffmanNode {
  constructor(char, freq) {
    this.char = char;
    this.freq = freq;
    this.left = null;
    this.right = null;
  }
}

const huffmanDecode = (encodedText, root) => {
  let decodedText = "";
  let currentNode = root;
  for (const bit of encodedText) {
    currentNode = bit === "0" ? currentNode.left : currentNode.right;
    if (currentNode.char !== null) {
      decodedText += currentNode.char;
      currentNode = root;
    }
  }
  return decodedText;
};

const loadTree = (filePath) => {
  const serializedTree = fs.readFileSync(filePath, "utf8");
  return deserializeTree(JSON.parse(serializedTree));
};

const deserializeTree = (data) => {
  if (!data) return null;
  const node = new HuffmanNode(data.char, data.freq);
  node.left = deserializeTree(data.left);
  node.right = deserializeTree(data.right);
  return node;
};

const decodeJSON = (inputFilePath, outputFilePath, treeFilePath) => {
  const loadedRoot = loadTree(treeFilePath); // Load cây Huffman từ file
  const buffer = fs.readFileSync(inputFilePath); // Đọc dữ liệu từ file
  const remainderBits = buffer[0]; // Lấy số bit dư ở byte đầu tiên
  const data = buffer.subarray(1); // Lấy dữ liệu từ byte thứ 2 đến byte cuối cùng

  console.log("số bit dư:", remainderBits);

  const encodedRaw = Array.from(data)
    .map((byte) => byte.toString(2).padStart(8, "0"))
    .join("");
  const encodedText = encodedRaw.slice(0, remainderBits - 8); // Bỏ bit dư ở cuối
  const decodedText = huffmanDecode(encodedText, loadedRoot); // Giải mã dữ liệu về json

  fs.writeFileSync(outputFilePath, decodedText);
};

decodeJSON(
  "test-3/data/data-compressed-2.bin",
  "test-3/data/data-decode-1.json",
  "test-3/data/huffman-tree.json"
);
