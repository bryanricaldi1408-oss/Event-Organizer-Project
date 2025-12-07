/**
 * kelola-klien.js (Updated)
 */

// 1. Fungsi Logout (Tetap sama)
function logout() {
    if(confirm('Apakah Anda yakin ingin keluar?')) {
        window.location.href = 'index.html'; 
    }
}

// 2. LOGIKA MODAL (Baru)
const modal = document.getElementById('modalTambah');

// Ganti fungsi tambahKlien yang lama dengan yang ini
function tambahKlien() {
    // Hapus class hidden dan tambahkan class show untuk animasi
    modal.classList.remove('hidden');
    // Sedikit delay agar transisi CSS 'show' berjalan mulus
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}
function tutupModal() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.classList.add('hidden');
        // Reset form saat ditutup
        document.getElementById('formTambahKlien').reset();
    }, 300); // Sesuaikan dengan durasi transisi CSS
}
// 3. Fungsi Simpan Klien Baru (Pure JS DOM Manipulation)
function simpanKlienBaru() {
    // Ambil value dari input
    const nama = document.getElementById('inputNama').value;
    const email = document.getElementById('inputEmail').value;
    const telp = document.getElementById('inputTelp').value;
    const alamat = document.getElementById('inputAlamat').value;
    const catatan = document.getElementById('inputCatatan').value;

    // Ambil referensi ke body tabel
    const tableBody = document.querySelector('.data-table tbody');

    // Buat elemen Baris (TR) baru
    const newRow = document.createElement('tr');

    // Isi HTML baris baru sesuai struktur kolom di HTML kamu
    newRow.innerHTML = `
        <td class="font-medium">${nama}</td>
        <td>${email}</td>
        <td>${telp}</td>
        <td>${alamat}</td>
        <td>${catatan}</td>
        <td class="text-center">
            <button class="btn-icon btn-edit"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="btn-icon btn-delete"><i class="fa-regular fa-trash-can"></i></button>
        </td>
    `;

    // Efek animasi masuk (optional)
    newRow.style.opacity = 0;
    newRow.style.transition = 'opacity 0.5s';
    tableBody.appendChild(newRow); // Masukkan ke tabel

    // Trigger animasi opacity
    setTimeout(() => {
        newRow.style.opacity = 1;
    }, 10);

    // PENTING: Pasang event listener ke tombol Edit & Delete di baris baru ini
    // Karena elemen ini baru dibuat, event listener global di 'DOMContentLoaded' tidak akan nempel otomatis
    const newEditBtn = newRow.querySelector('.btn-edit');
    const newDeleteBtn = newRow.querySelector('.btn-delete');

    newEditBtn.addEventListener('click', () => editKlien(newEditBtn));
    newDeleteBtn.addEventListener('click', () => hapusKlien(newDeleteBtn));

    // Tutup modal dan beri notifikasi
    tutupModal();
    alert(`Berhasil menambahkan klien: ${nama}`);
}

// 4. Fungsi Edit Klien (Tetap sama)
function editKlien(button) {
    const row = button.closest('tr');
    const clientName = row.cells[0].textContent;
    alert(`Fitur "Edit Klien" untuk klien: ${clientName} akan menampilkan modal dengan data yang sudah terisi.`);
}

// 5. Fungsi Hapus Klien (Tetap sama)
function hapusKlien(button) {
    const row = button.closest('tr');
    const clientName = row.cells[0].textContent;

    if(confirm(`Yakin ingin menghapus klien: ${clientName}? Data ini tidak bisa dikembalikan!`)) {
        row.style.transition = "opacity 0.5s, transform 0.5s";
        row.style.opacity = "0";
        row.style.transform = "translateX(50px)";

        setTimeout(() => {
            row.remove();
        }, 500);
    }
}

// Event Listeners Global (Tetap sama)
document.addEventListener('DOMContentLoaded', () => {
    
    // a. Tombol Logout
    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);

    // b. Tombol Tambah Klien (Pastikan HTML menggunakan class btn-primary)
    // Di HTML kamu tombol tambah ada di: <button class="btn btn-primary">
    // Kita cari tombol spesifik yang ada text "Tambah Klien" agar tidak bentrok
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(btn => {
        if(btn.textContent.includes('Tambah Klien')) {
            btn.addEventListener('click', tambahKlien);
        }
    });

    // c. Tombol Edit (Hanya untuk data awal yang dari HTML/Server)
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', () => editKlien(button));
    });

    // d. Tombol Delete (Hanya untuk data awal)
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', () => hapusKlien(button));
    });

    // e. Tutup modal jika klik di luar area modal-container (Overlay)
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            tutupModal();
        }
    });
});

let rowSedangDiedit = null; 
const modalEdit = document.getElementById('modalEdit');

// --- FUNGSI EDIT KLIEN (UPDATE) ---
function editKlien(button) {
    // 1. Identifikasi baris (TR) dari tombol yang diklik
    rowSedangDiedit = button.closest('tr');
    
    // 2. Ambil data dari kolom-kolom (Cells) di baris tersebut
    // Urutan index sesuaikan dengan HTML: 0=Nama, 1=Email, 2=Telp, 3=Alamat, 4=Catatan
    const cells = rowSedangDiedit.cells;
    const currentNama = cells[0].textContent;
    const currentEmail = cells[1].textContent;
    const currentTelp = cells[2].textContent;
    const currentAlamat = cells[3].textContent;
    const currentCatatan = cells[4].textContent;

    // 3. Isi Input di Modal Edit dengan data tersebut
    document.getElementById('editNama').value = currentNama;
    document.getElementById('editEmail').value = currentEmail;
    document.getElementById('editTelp').value = currentTelp;
    document.getElementById('editAlamat').value = currentAlamat;
    document.getElementById('editCatatan').value = currentCatatan;

    // 4. Tampilkan Modal Edit
    modalEdit.classList.remove('hidden');
    setTimeout(() => {
        modalEdit.classList.add('show');
    }, 10);
}

// --- FUNGSI TUTUP MODAL EDIT ---
function tutupModalEdit() {
    modalEdit.classList.remove('show');
    setTimeout(() => {
        modalEdit.classList.add('hidden');
        rowSedangDiedit = null; // Reset variabel global
    }, 300);
}

// --- FUNGSI SIMPAN PERUBAHAN (LOGIC UTAMA) ---
function simpanPerubahanEdit() {
    if (rowSedangDiedit) {
        // 1. Ambil value baru dari form input
        const namaBaru = document.getElementById('editNama').value;
        const emailBaru = document.getElementById('editEmail').value;
        const telpBaru = document.getElementById('editTelp').value;
        const alamatBaru = document.getElementById('editAlamat').value;
        const catatanBaru = document.getElementById('editCatatan').value;

        // 2. Update tampilan tabel (HTML) secara langsung
        const cells = rowSedangDiedit.cells;
        cells[0].textContent = namaBaru;
        cells[1].textContent = emailBaru;
        cells[2].textContent = telpBaru;
        cells[3].textContent = alamatBaru;
        cells[4].textContent = catatanBaru;

        // 3. Beri efek visual bahwa data berubah (opsional)
        rowSedangDiedit.style.backgroundColor = "#e0f2fe"; // Biru muda sekilas
        setTimeout(() => {
            rowSedangDiedit.style.backgroundColor = "";
        }, 1000);

        // 4. Tutup modal
        tutupModalEdit();
        alert(`Data klien ${namaBaru} berhasil diperbarui!`);
    }
}

// --- EVENT LISTENER TAMBAHAN (PENTING) ---
// Tambahkan ini di dalam blok document.addEventListener('DOMContentLoaded', ...) yang sudah ada

// e. Tutup modal edit jika klik di luar (Overlay)
window.addEventListener('click', (e) => {
    // Cek modal tambah (yang lama)
    if (e.target === document.getElementById('modalTambah')) {
        tutupModal();
    }
    // Cek modal edit (yang baru)
    if (e.target === modalEdit) {
        tutupModalEdit();
    }
});