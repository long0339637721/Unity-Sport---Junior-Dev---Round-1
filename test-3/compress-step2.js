const fs = require("fs");
const PriorityQueue = require("./priority-queue").PriorityQueue;

// Node trong cây Huffman
class HuffmanNode {
  constructor(char, freq) {
    this.char = char;
    this.freq = freq;
    this.left = null;
    this.right = null;
  }
}

// Xây dựng cây Huffman
const buildHuffmanTree = (text) => {
  console.log("Tính tần suất xuất hiện của các ký tự...");
  const frequency = {};
  for (const char of text) {
    frequency[char] = (frequency[char] || 0) + 1;
  }

  console.log("Xây dựng Priority Queue...");
  // Em sử dụng Priority Queue được khai báo trong file priority-queue.js
  const pq = new PriorityQueue({
    comparator: (a, b) => a.freq - b.freq, // Ưu tiên tần suất thấp hơn
  });

  console.log("Thêm các node vào Priority Queue...");
  for (const char in frequency) {
    pq.push(new HuffmanNode(char, frequency[char]), frequency[char]);
  }

  console.log("Xây dựng cây Huffman...");
  while (pq.length() > 1) {
    const left = pq.pop();
    const right = pq.pop();

    // Node mới là tổng tần suất của 2 node con
    const newNode = new HuffmanNode(null, left.freq + right.freq);
    newNode.left = left;
    newNode.right = right;

    pq.push(newNode, newNode.freq);
  }

  return pq.pop(); // Root của cây Huffman
};

// Tạo mã Huffman từ cây
const buildHuffmanCodes = (root) => {
  const codes = {};

  const createCodeForNode = (node, currentCode) => {
    if (!node) return;
    if (node.char !== null) {
      codes[node.char] = currentCode;
    }
    createCodeForNode(node.left, currentCode + "0");
    createCodeForNode(node.right, currentCode + "1");
  };

  createCodeForNode(root, "");
  return codes;
};

// Mã hóa văn bản
const huffmanEncode = (text, codes) => {
  let encodedText = "";
  for (const char of text) {
    encodedText += codes[char];
  }
  return encodedText;
};

// Chuyển cây Huffman thành JSON
const serializeTree = (node) => {
  if (!node) return null;
  return {
    char: node.char,
    freq: node.freq,
    left: serializeTree(node.left),
    right: serializeTree(node.right),
  };
};

const compressJSON = (inputFilePath, outputFilePath, treeFilePath) => {
  fs.readFile(inputFilePath, "utf8", (err, dataRaw) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    try {
      const root = buildHuffmanTree(dataRaw);
      const codes = buildHuffmanCodes(root);
      const encodedText = huffmanEncode(dataRaw, codes); // Mã hóa qua dạng nhị phân

      const serializedTree = serializeTree(root);
      fs.writeFileSync(treeFilePath, JSON.stringify(serializedTree)); // Lưu cây Huffman

      const byteArray = [];

      for (let i = 0; i < encodedText.length; i += 8) {
        const byteString = encodedText.slice(i, i + 8).padEnd(8, "0"); // Thêm 0 nếu thiếu bit
        byteArray.push(parseInt(byteString, 2)); // Chuyển sang số thập phân
      }
      byteArray.unshift(encodedText.length % 8); // Lưu số bit ở byte cuối cùng
      const buffer = Buffer.from(byteArray); // Chuyển sang buffer
      fs.writeFileSync(outputFilePath, buffer); // Lưu data đã mã hóa
    } catch (parseErr) {
      console.error("Error parsing JSON data:", parseErr);
    }
  });
};

compressJSON(
  "test-3/data/data-compressed-1.json",
  "test-3/data/data-compressed-2.bin",
  "test-3/data/huffman-tree.json"
);
