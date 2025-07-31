document.addEventListener("DOMContentLoaded", function() {
    // 1. Lấy dữ liệu từ URL
    const params = new URLSearchParams(window.location.search);
    
    // 2. Điền dữ liệu vào các vị trí trong HTML
    document.getElementById('chuHui').textContent = params.get('chuHui') || '';
    document.getElementById('sdt').textContent = params.get('sdt') || '';
    document.getElementById('bankInfo').textContent = params.get('bankInfo') || '';
    document.getElementById('ngay').textContent = params.get('ngay') || '';
    document.getElementById('tenHuiVien').textContent = params.get('tenHuiVien') || '';
    document.getElementById('tenHuiVienFooter').textContent = params.get('tenHuiVien') || '';
    
    // Xử lý mã QR
    const qrData = params.get('maQR');
    if (qrData) {
        document.getElementById('qrImage').src = qrData;
    }

    // Xử lý bảng chi tiết - Dữ liệu được truyền dưới dạng JSON
    const detailData = JSON.parse(params.get('details') || '[]');
    const detailTable = document.getElementById('detailTable');
    // Tạo header cho bảng
    let headerHtml = '<thead><tr><th>DÂY</th><th>KỲ</th><th>SỐNG</th><th>CHẾT</th><th>TIỀN ĐÓNG</th></tr></thead><tbody>';
    detailTable.innerHTML = headerHtml;
    // Tạo các dòng dữ liệu
    let bodyHtml = '';
    detailData.forEach(row => {
        bodyHtml += `<tr>
            <td>${row.tenDay || ''}</td>
            <td>${row.ky || ''}</td>
            <td>${row.song || 0}</td>
            <td>${row.chet || 0}</td>
            <td>${Number(row.tienDong || 0).toLocaleString('vi-VN')}</td>
        </tr>`;
    });
    detailTable.innerHTML += bodyHtml + '</tbody>';

    // Điền bảng tổng kết
    document.getElementById('tongTienDong').textContent = Number(params.get('tongDong') || 0).toLocaleString('vi-VN');
    document.getElementById('tongTienHot').textContent = Number(params.get('tongHot') || 0).toLocaleString('vi-VN');
    const phaiDong = (params.get('tongDong') || 0) - (params.get('tongHot') || 0);
    document.getElementById('phaiDong').textContent = phaiDong.toLocaleString('vi-VN');

    // 3. Gán chức năng cho nút Copy
    document.getElementById('copyButton').addEventListener('click', function() {
        alert('Chuẩn bị copy ảnh, vui lòng chờ...');
        html2canvas(document.getElementById('bill-container')).then(function(canvas) {
            canvas.toBlob(function(blob) {
                try {
                    navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blob })
                    ]);
                    alert('Đã copy ảnh vào bộ nhớ tạm! Bạn có thể dán (paste) vào Zalo.');
                } catch (error) {
                    console.error('Lỗi khi copy: ', error);
                    alert('Copy thất bại. Trình duyệt của bạn có thể không hỗ trợ chức năng này.');
                }
            });
        });
    });
});