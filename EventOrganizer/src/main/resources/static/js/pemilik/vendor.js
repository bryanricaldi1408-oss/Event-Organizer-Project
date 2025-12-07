function logout() {
    if(confirm('Apakah Anda yakin ingin keluar?')) {
        // PERUBAHAN: Mengarahkan ke endpoint /login (yang akan menampilkan halaman login.html)
        // Sebelumnya: 'index.html'
        window.location.href = '/login'; 
    }
}

function deleteRow(button) {
    if(confirm('Yakin ingin menghapus data vendor ini?')) {
        // SIMULASI DELETE: Menghapus baris dari tampilan
        button.closest('tr').remove();
        alert('Data Vendor telah dihapus dari tampilan (simulasi).'); // Tambahkan feedback
    }
}

function tambahVendor() {
    // Simulasi membuka form input vendor baru
    alert('Membuka form tambah vendor (Form Modal akan muncul di sini)...');
}

function filterTable() {
    const filterValue = document.getElementById('vendorFilter').value.toLowerCase();
    const rows = document.querySelectorAll('#vendorTable tbody tr');

    rows.forEach(row => {
        // Mencari badge untuk filter
        const badgeElement = row.querySelector('.badge-type');
        
        // Pastikan badgeElement ditemukan sebelum mencoba mengakses innerText
        if (badgeElement) {
            const badge = badgeElement.innerText.toLowerCase();
            if (filterValue === 'all' || badge.includes(filterValue)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        } else {
            // Jika tidak ada badge-type, tetap tampilkan
            row.style.display = '';
        }
    });
}