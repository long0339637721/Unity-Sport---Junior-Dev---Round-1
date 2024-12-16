# TEST 3

## Structure

- priority-queue: hàng đợi ưu tiên để tạo cây huffman
- compress-step1: nén bước 1
- compress-step1: nén bước 2
- decode-step1: giải nén bước 1
- decode-step1: giải nén bước 2
- data:
  - data: dữ liệu ban đầu (1538KB)
  - data-compressed-1: dữ liệu sau khi qua nén bước 1
  - data-compressed-2: dữ liệu sau khi qua nén bước 2 (229KB)
  - huffman-tree: lưu cây huffman (5KB)
  - data-decode-1: dữ liệu sau khi qua giải nén bước 1
  - data-decode-2: dữ liệu sau khi qua giải nén bước 2. Giống data ban đầu

## Thuật toán huffman

### Ý tưởng

Mã hóa mỗi ký tự thành 1 chuỗi nhị phân, các ký tự thường xuyên xuất hiện sẽ mã
hóa bằng chuỗi ngắn hơn

### Các bước

- Tính tần xuất xuất hiện của các ký tự
- Tạo mã nhị phân ứng với mỗi ký tự ưu tiên theo tần xuất
- Mã hóa dữ liệu thành dạng nhị phân
- Dùng lại cây Huffman đó để giải mã dữ liệu
