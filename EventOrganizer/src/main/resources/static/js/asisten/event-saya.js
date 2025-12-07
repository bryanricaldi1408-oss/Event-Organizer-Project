/**
 * event-saya.js
 * * Fungsi-fungsi dasar untuk halaman Event Saya (My Events)
 * 1. Logout: Mengarahkan pengguna kembali ke halaman login.
 * 2. Toggle Events: Mengubah tampilan daftar event (Sedang Ditangani vs Selesai).
 */

// 1. Fungsi Logout
function logout() {
    // Konfirmasi sebelum logout (opsional)
    if(confirm('Apakah Anda yakin ingin keluar?')) {
        // Arahkan ke halaman login
        window.location.href = 'index.html'; 
    }
}

/**
 * 2. Fungsi Toggle Event
 * Menampilkan/Menyembunyikan daftar event berdasarkan status yang dipilih
 */
function toggleEvents(buttonId) {
    const activeBtn = document.getElementById('toggleActive');
    const completedBtn = document.getElementById('toggleCompleted');
    const activeSection = document.getElementById('activeEvents');
    const completedSection = document.getElementById('completedEvents');

    // Reset Active Class untuk tombol
    activeBtn.classList.remove('active');
    completedBtn.classList.remove('active');
    
    // Tampilkan/Sembunyikan konten dan set tombol aktif
    if (buttonId === 'toggleActive') {
        activeBtn.classList.add('active');
        activeSection.style.display = 'block';
        completedSection.style.display = 'none';
    } else { // buttonId === 'toggleCompleted'
        completedBtn.classList.add('active');
        activeSection.style.display = 'none';
        completedSection.style.display = 'block';
    }
}


// Event Listeners: Memasang fungsi ke elemen di DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // a. Tombol Logout
    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // b. Tombol Toggle "Sedang Ditangani"
    const toggleActiveBtn = document.getElementById('toggleActive');
    if (toggleActiveBtn) {
        toggleActiveBtn.addEventListener('click', () => toggleEvents('toggleActive'));
    }

    // c. Tombol Toggle "Selesai"
    const toggleCompletedBtn = document.getElementById('toggleCompleted');
    if (toggleCompletedBtn) {
        toggleCompletedBtn.addEventListener('click', () => toggleEvents('toggleCompleted'));
    }
});