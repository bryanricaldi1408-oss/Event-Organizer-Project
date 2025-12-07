// FUNGSI SWITCH TAB
function switchTab(type) {
    // 1. Ambil elemen
    const btnUpcoming = document.getElementById('btnUpcoming');
    const btnPast = document.getElementById('btnPast');
    const sectionUpcoming = document.getElementById('upcomingSection');
    const sectionPast = document.getElementById('pastSection');

    // 2. Reset Active Class
    btnUpcoming.classList.remove('active');
    btnPast.classList.remove('active');
    sectionUpcoming.classList.remove('active');
    sectionPast.classList.remove('active');

    // 3. Set Active berdasarkan parameter
    if (type === 'upcoming') {
        btnUpcoming.classList.add('active');
        sectionUpcoming.classList.add('active');
    } else {
        btnPast.classList.add('active');
        sectionPast.classList.add('active');
    }
}

function logout() {
    if(confirm('Apakah Anda yakin ingin keluar?')) {
        // PERUBAHAN: Mengarahkan ke endpoint /login (yang akan menampilkan halaman login.html)
        // Sebelumnya: 'index.html'
        window.location.href = '/login'; 
    }
}