/**
 * kelola-event.js
 * * Fungsi-fungsi dasar untuk halaman Kelola Event
 * 1. Logout: Mengarahkan pengguna kembali ke halaman login.
 * 2. Tambah Event: Simulasi aksi tombol "Tambah Event".
 * 3. Edit Event: Simulasi aksi tombol "Edit".
 * 4. Hapus Event: Menghapus card event dari daftar (simulasi).
 * 5. Kelola Vendor: Simulasi aksi tombol "Kelola Vendor".
 */

// 1. Fungsi Logout
function logout() {
    // Konfirmasi sebelum logout (opsional)
    if(confirm('Apakah Anda yakin ingin keluar?')) {
        // Arahkan ke halaman login
        window.location.href = 'index.html'; 
    }
}

// 2. Fungsi Tambah Event (Simulasi)
function tambahEvent() {
    alert('Fitur "Tambah Event" akan menampilkan modal atau form untuk input data event baru.');
}

// 3. Fungsi Edit Event (Simulasi)
function editEvent(button) {
    // Cari elemen card terdekat
    const card = button.closest('.card');
    // Ambil nama event dari h3 dalam card
    const eventName = card.querySelector('.event-name').textContent.trim();
    alert(`Fitur "Edit Event" untuk klien: ${eventName} akan menampilkan form pengubahan data.`);
}

// 4. Fungsi Hapus Event (Simulasi)
function hapusEvent(button) {
    const card = button.closest('.card');
    const eventName = card.querySelector('.event-name').textContent.trim();

    if(confirm(`Yakin ingin menghapus event ${eventName}? Data ini tidak bisa dikembalikan!`)) {
        // Efek visual sebelum menghapus
        card.style.transition = "opacity 0.5s, transform 0.5s";
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";

        setTimeout(() => {
            // Hapus elemen card dari DOM
            card.remove();
            alert(`Event ${eventName} berhasil dihapus (simulasi).`);
        }, 500);
    }
}

// 5. Fungsi Kelola Vendor (Simulasi)
function kelolaVendor(button) {
    const card = button.closest('.card');
    const eventName = card.querySelector('.event-name').textContent.trim();
    alert(`Membuka halaman/modal untuk mengelola vendor khusus event: ${eventName}.`);
    // Di aplikasi nyata, ini bisa berupa redirect ke halaman detail vendor: 
    // window.location.href = 'kelola-vendor-detail.html?event_id=123';
}


// Event Listeners: Memasang fungsi ke elemen di DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // a. Tombol Logout
    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // b. Tombol Tambah Event
    const addEventBtn = document.querySelector('.btn-primary'); 
    if (addEventBtn) {
        addEventBtn.addEventListener('click', tambahEvent);
    }

    // c. Tombol Edit
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', () => editEvent(button));
    });

    // d. Tombol Delete
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', () => hapusEvent(button));
    });

    // e. Tombol Kelola Vendor
    document.querySelectorAll('.vendor-section .btn-green').forEach(button => {
        button.addEventListener('click', () => kelolaVendor(button));
    });

});

/**
 * kelola-event.js (Full Client-Side Logic)
 */

// --- GLOBAL VARIABLES ---
let currentCard = null; // Menyimpan referensi kartu event yang sedang diedit/ditambah vendor

// --- HELPER FUNCTIONS ---

// Format angka ke Rupiah (Contoh: 1000000 -> Rp 1.000.000,00)
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
}

// Parse string Rupiah balik ke angka (Rp 1.000.000,00 -> 1000000)
function parseRupiahToInt(rupiahString) {
    // Hapus karakter non-digit dan koma desimal
    // Contoh sederhana: Hapus "Rp", titik, dan ",00"
    let cleanString = rupiahString.replace(/[^0-9,-]+/g,"");
    cleanString = cleanString.split(',')[0]; // Ambil bagian depan koma
    return parseInt(cleanString) || 0;
}

// --- MODAL CONTROL ---

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    setTimeout(() => {
        modal.classList.add('hidden');
        // Reset form jika ada
        const form = modal.querySelector('form');
        if(form) form.reset();
        currentCard = null;
    }, 300);
}

// --- 1. TAMBAH EVENT BARU ---

function tambahEvent() {
    openModal('modalAddEvent');
}

function saveNewEvent() {
    // Ambil value
    const nama = document.getElementById('addClientName').value;
    const tipe = document.getElementById('addEventType').value;
    const tanggal = document.getElementById('addDate').value;
    const pax = document.getElementById('addPax').value;
    const lokasi = document.getElementById('addLocation').value;

    // Template HTML untuk Card Baru
    const eventList = document.querySelector('.event-list');
    
    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.innerHTML = `
        <div class="card-header-row">
            <div class="event-title-group">
                <h3 class="event-name">${nama}</h3>
                <span class="badge badge-blue">${tipe}</span>
            </div>
            <div class="event-actions">
                <button class="btn-icon btn-edit"><i class="fa-regular fa-pen-to-square"></i></button>
                <button class="btn-icon btn-delete"><i class="fa-regular fa-trash-can"></i></button>
            </div>
        </div>

        <div class="event-details-grid">
            <div class="detail-item"><label>Tanggal:</label><p>${tanggal}</p></div>
            <div class="detail-item"><label>Undangan:</label><p>${pax} orang</p></div>
            <div class="detail-item"><label>Lokasi:</label><p>${lokasi}</p></div>
            <div class="detail-item">
                <label>Total Budget:</label>
                <p class="font-bold budget-display">Rp 0,00</p>
            </div>
        </div>

        <div class="vendor-section">
            <div class="vendor-header">
                <h4>Vendor yang Digunakan</h4>
                <button class="btn btn-sm btn-green btn-manage-vendor">
                    <i class="fa-solid fa-store"></i> Kelola Vendor
                </button>
            </div>
            <div class="vendor-grid">
                </div>
        </div>
    `;

    // Masukkan ke DOM (Animasi fade in)
    newCard.style.opacity = 0;
    eventList.prepend(newCard); // Taruh paling atas
    setTimeout(() => newCard.style.opacity = 1, 100);

    // Pasang Event Listener untuk tombol baru
    attachEventsToCard(newCard);

    closeModal('modalAddEvent');
    alert(`Event untuk ${nama} berhasil dibuat!`);
}

// --- 2. EDIT EVENT ---

function editEvent(button) {
    currentCard = button.closest('.card');
    
    // Ambil data dari tampilan Card
    const name = currentCard.querySelector('.event-name').textContent;
    const type = currentCard.querySelector('.badge').textContent;
    // Mengambil data detail (sedikit trik dengan index)
    const details = currentCard.querySelectorAll('.detail-item p');
    const date = details[0].textContent;
    const pax = details[1].textContent.replace(' orang', '');
    const location = details[2].textContent;

    // Isi Form
    document.getElementById('editClientName').value = name;
    document.getElementById('editEventType').value = type;
    document.getElementById('editDate').value = date;
    document.getElementById('editPax').value = pax;
    document.getElementById('editLocation').value = location;

    openModal('modalEditEvent');
}

function saveEditEvent() {
    if(!currentCard) return;

    // Update Tampilan Card
    currentCard.querySelector('.event-name').textContent = document.getElementById('editClientName').value;
    currentCard.querySelector('.badge').textContent = document.getElementById('editEventType').value;
    
    const details = currentCard.querySelectorAll('.detail-item p');
    details[0].textContent = document.getElementById('editDate').value;
    details[1].textContent = document.getElementById('editPax').value + ' orang';
    details[2].textContent = document.getElementById('editLocation').value;

    // Efek visual
    currentCard.style.backgroundColor = '#f0f9ff';
    setTimeout(() => currentCard.style.backgroundColor = 'white', 500);

    closeModal('modalEditEvent');
}

// --- 3. HAPUS EVENT ---

function hapusEvent(button) {
    const card = button.closest('.card');
    const name = card.querySelector('.event-name').textContent;

    if(confirm(`Yakin ingin menghapus event ${name}?`)) {
        card.style.transition = "all 0.5s";
        card.style.opacity = "0";
        card.style.transform = "translateX(50px)";
        setTimeout(() => card.remove(), 500);
    }
}

// --- 4. KELOLA VENDOR (TAMBAH VENDOR KE EVENT) ---

function kelolaVendor(button) {
    currentCard = button.closest('.card');
    const eventName = currentCard.querySelector('.event-name').textContent;
    
    // Set judul di modal biar user tau lagi nambahin buat siapa
    document.getElementById('targetEventName').textContent = eventName;
    
    openModal('modalAddVendor');
}

function saveNewVendor() {
    if(!currentCard) return;

    const vName = document.getElementById('vendorName').value;
    const vType = document.getElementById('vendorType').value;
    const vPrice = parseInt(document.getElementById('vendorPrice').value);

    // 1. Buat Elemen Vendor Card Kecil
    const vendorGrid = currentCard.querySelector('.vendor-grid');
    const newVendorCard = document.createElement('div');
    newVendorCard.className = 'vendor-card';
    newVendorCard.innerHTML = `
        <div class="vendor-top">
            <span class="vendor-name">${vName}</span>
            <span class="badge badge-purple">${vType}</span>
        </div>
        <p class="vendor-price">${formatRupiah(vPrice)}</p>
    `;
    
    vendorGrid.appendChild(newVendorCard);

    // 2. Update Total Budget Event (LOGIKA OTOMATIS)
    const budgetDisplay = currentCard.querySelector('.budget-display, .detail-item p.font-bold'); 
    // ^ Selector ganda untuk jaga-jaga kalau class font-bold ada di item lain, tapi biasanya aman
    
    if(budgetDisplay) {
        const currentBudget = parseRupiahToInt(budgetDisplay.textContent);
        const newBudget = currentBudget + vPrice;
        budgetDisplay.textContent = formatRupiah(newBudget);
        
        // Highlight Budget berubah
        budgetDisplay.style.color = '#16a34a';
        setTimeout(() => budgetDisplay.style.color = '#111827', 1000);
    }

    closeModal('modalAddVendor');
    // alert(`Vendor ${vName} berhasil ditambahkan!`);
}

// --- INITIALIZATION & EVENT DELEGATION ---

// Fungsi helper untuk pasang listener ke elemen baru (karena JS tidak otomatis pasang ke elemen yg dibuat dinamis)
function attachEventsToCard(card) {
    // Edit Button
    const editBtn = card.querySelector('.btn-edit');
    if(editBtn) editBtn.addEventListener('click', () => editEvent(editBtn));

    // Delete Button
    const delBtn = card.querySelector('.btn-delete');
    if(delBtn) delBtn.addEventListener('click', () => hapusEvent(delBtn));

    // Kelola Vendor Button
    // Perhatikan: selector bisa .btn-green atau class khusus .btn-manage-vendor
    const vendorBtn = card.querySelector('.btn-green, .btn-manage-vendor'); 
    if(vendorBtn) vendorBtn.addEventListener('click', () => kelolaVendor(vendorBtn));
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Pasang listener untuk Tombol "Logout"
    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) logoutBtn.addEventListener('click', () => {
        if(confirm('Keluar?')) window.location.href = 'index.html';
    });

    // 2. Pasang listener untuk Tombol Utama "Tambah Event"
    const addEventBtn = document.querySelector('.page-header .btn-primary');
    if(addEventBtn) addEventBtn.addEventListener('click', tambahEvent);

    // 3. Pasang listener untuk kartu-kartu yang SUDAH ADA dari HTML (Server Side Rendered)
    document.querySelectorAll('.card').forEach(card => {
        attachEventsToCard(card);
    });
    
    // 4. Close modal jika klik luar
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            document.querySelectorAll('.modal-overlay').forEach(m => {
                if(m.classList.contains('show')) closeModal(m.id);
            });
        }
    });
});