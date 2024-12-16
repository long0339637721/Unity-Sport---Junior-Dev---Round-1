# Test round 1

## Test 1

Kiểm tra tuyến tính chuỗi đầu vào

## Test 2

- Sử dụng map để lưu các mảng index theo từng giá trị trong mảng
- Kiểm tra tuyến tính mảng số và đánh dấu những index đã sử dụng

## Test 3

### Nén file

- Step 1
  - Dùng python để kiểm tra đặc điểm dữ liệu (check-data.py)
  - Xóa 2 thuộc tính không cần thiết: lineup(toàn bộ = 1) và start_time(có thể
    lấy từ start_timestamp)
  - Chuyển đổi sport_event_status thành 1 mảng 15 số tự nhiên tương ứng các
    thuộc tính trong sport_event_status
  - Chuyển toàn bộ dữ liệu JSON thành từng mảng theo từng thuộc tính
    (data/data-compressed-1)
- Step 2
  - Dùng thuật toán Huffman để chuyển data thành chuỗi nhị phân
  - Lưu lại cây Huffman dùng để giải nén sau
  - Lưu chuỗi nhị phân và độ dài byte cuối thành file nén

### Giải nén

- Step 1
  - Đọc cây Huffman và file nén
  - Kiểm tra độ dài byte cuối để cắt bỏ phần dư
  - Chuyển từ dữ liệu nhị phân về ban đầu
- Step 2
  - Đổi dữ liệu dạng mảng về JSON ban đầu
  - Thêm các thuộc tính đã xóa
  - Chuyển sport_event_status về lại JSON
