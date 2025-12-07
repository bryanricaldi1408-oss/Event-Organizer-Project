// Fungsi Buka Modal Tambah
function openAddModal() {
    // Reset Form
    document.getElementById('inputId').value = '';
    document.getElementById('inputNama').value = '';
    document.getElementById('inputEmail').value = '';
    document.getElementById('inputTelp').value = '';
    document.getElementById('inputAlamat').value = '';
    document.getElementById('inputUsername').value = '';
    document.getElementById('inputPassword').value = '';
    
    // Ubah Judul
    document.getElementById('modalTitle').innerText = 'Tambah Asisten';
    
    // Tampilkan Modal
    document.getElementById('formModal').style.display = 'flex';
}

// Fungsi Buka Modal Edit (Diisi data dari tabel)
function openEditModal(id, nama, email, telp, alamat, username, password) {
    // Isi Form dengan data lama
    document.getElementById('inputId').value = id;
    document.getElementById('inputNama').value = nama;
    document.getElementById('inputEmail').value = email;
    document.getElementById('inputTelp').value = telp;
    document.getElementById('inputAlamat').value = alamat;
    document.getElementById('inputUsername').value = username;
    document.getElementById('inputPassword').value = password; // Tampilkan password (hati-hati di production)
    
    // Ubah Judul
    document.getElementById('modalTitle').innerText = 'Edit Asisten';
    
    // Tampilkan Modal
    document.getElementById('formModal').style.display = 'flex';
}

// Fungsi Buka Modal Delete
function openDeleteModal(id) {
    // Set Link Hapus sesuai ID
    var deleteBtn = document.getElementById('confirmDeleteBtn');
    deleteBtn.href = '/pemilik/asisten/delete/' + id;
    
    // Tampilkan Modal
    document.getElementById('deleteModal').style.display = 'flex';
}

// Fungsi Tutup Modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Tutup modal jika klik di luar kotak (Overlay)
window.onclick = function(event) {
    if (event.target.className === 'modal-overlay') {
        event.target.style.display = "none";
    }
}