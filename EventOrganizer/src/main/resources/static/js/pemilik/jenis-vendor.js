// --- LOGIC JS ---
function logout() {
    if(confirm('Apakah Anda yakin ingin keluar?')) {
        window.location.href = 'index.html'; 
    }
}

// Fungsi Menghapus Kartu
function deleteCard(button) {
    if(confirm('Yakin ingin menghapus kategori vendor ini?')) {
        // Mencari elemen kartu (category-card) terdekat dari tombol yang diklik
        var card = button.closest('.category-card');
        
        // Efek visual sebelum menghapus (fade out)
        card.style.transition = "opacity 0.5s";
        card.style.opacity = "0";

        setTimeout(() => {
            card.remove();
        }, 500);
    }
}
function tambahKategori() {
    alert('Fitur tambah kategori vendor akan muncul di sini.');
}