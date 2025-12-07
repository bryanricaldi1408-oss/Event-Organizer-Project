// Data Dummy untuk Simulasi Multi-Event
const eventData = {
    // Event 1: Dodo Prasetyo - Sweet 17
    'dodo_sweet17': {
        name: 'Dodo Prasetyo - Sweet 17',
        date: 'Sabtu, 3 Januari 2026',
        totalBudget: 106000000,
        // Data Rincian Budget per Jenis Vendor (untuk progress bar)
        categoryBreakdown: [
            { category: 'Dekorasi', total: 50000000, percentage: 47.2 },
            { category: 'Katering', total: 30000000, percentage: 28.3 },
            { category: 'Fotografer', total: 15000000, percentage: 14.2 },
            { category: 'Kue & Dessert', total: 6000000, percentage: 5.7 },
            { category: 'MUA (Makeup Artist)', total: 5000000, percentage: 4.7 }
        ],
        // Data Rincian Budget Detail (untuk tabel)
        vendors: [
            { name: 'Cahaya Dekorasi', type: 'Dekorasi', price: 50000000, percentage: 47.2 },
            { name: 'Rasa Nusantara Catering', type: 'Katering', price: 30000000, percentage: 28.3 },
            { name: 'Lensa Indah Photography', type: 'Fotografer', price: 15000000, percentage: 14.2 },
            { name: 'Wombi Cake & Bakery', type: 'Kue & Dessert', price: 6000000, percentage: 5.7 },
            { name: 'Cantik Selamanya MUA', type: 'MUA (Makeup Artist)', price: 5000000, percentage: 4.7 }
        ]
    },

    // Event 2: Rina & Budi - Wedding
    'rina_wedding': {
        name: 'Rina & Budi - Wedding',
        date: 'Minggu, 2 Februari 2026',
        totalBudget: 200000000,
        categoryBreakdown: [
            { category: 'Katering', total: 100000000, percentage: 50.0 },
            { category: 'Venue', total: 50000000, percentage: 25.0 },
            { category: 'Dekorasi', total: 30000000, percentage: 15.0 },
            { category: 'Fotografer', total: 15000000, percentage: 7.5 },
            { category: 'MUA (Makeup Artist)', total: 5000000, percentage: 2.5 }
        ],
        vendors: [
            { name: 'Rasa Nusantara Catering', type: 'Katering', price: 100000000, percentage: 50.0 },
            { name: 'The Royal Venue', type: 'Venue', price: 50000000, percentage: 25.0 },
            { name: 'Indah Dekorasi Premium', type: 'Dekorasi', price: 30000000, percentage: 15.0 },
            { name: 'Lensa Indah Photography', type: 'Fotografer', price: 15000000, percentage: 7.5 },
            { name: 'MUA Top Indonesia', type: 'MUA (Makeup Artist)', price: 5000000, percentage: 2.5 }
        ]
    }
};

// Helper Fungsi Format Rupiah
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0
    }).format(number).replace("IDR", "Rp").trim();
};

// Fungsi utama untuk me-render data budget
const renderBudget = (eventKey) => {
    const data = eventData[eventKey];

    if (!data) {
        console.error('Data event tidak ditemukan untuk kunci:', eventKey);
        return;
    }

    // --- 1. Update Budget Hero Section ---
    document.querySelector('.hero-sublabel').textContent = data.name;
    document.querySelector('.hero-date').textContent = data.date;
    document.querySelector('.hero-value').textContent = formatRupiah(data.totalBudget);

    // --- 2. Update Budget per Jenis Vendor (Progress List) ---
    const progressList = document.querySelector('.progress-list');
    progressList.innerHTML = '';
    
    data.categoryBreakdown.forEach(item => {
        const progressItem = document.createElement('div');
        progressItem.className = 'progress-item';
        progressItem.innerHTML = `
            <div class="progress-info">
                <span class="p-label">${item.category}</span>
                <span class="p-value">${formatRupiah(item.total)}</span>
            </div>
            <div class="progress-track">
                <div class="progress-fill" style="width: ${item.percentage}%;"></div>
            </div>
            <p class="p-percent">${item.percentage}% dari total budget</p>
        `;
        progressList.appendChild(progressItem);
    });
    
    // --- 3. Update Rincian Budget Detail Table ---
    const tableBody = document.querySelector('.data-table tbody');
    tableBody.innerHTML = '';
    let totalTableAmount = 0;
    
    // Vendor Rows
    data.vendors.forEach((vendor, index) => {
        totalTableAmount += vendor.price;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td class="font-medium">${vendor.name}</td>
            <td><span class="badge badge-purple">${vendor.type}</span></td>
            <td>${formatRupiah(vendor.price)}</td>
            <td>${vendor.percentage}%</td>
        `;
        tableBody.appendChild(row);
    });

    // Total Row
    const totalRow = document.createElement('tr');
    totalRow.className = 'font-bold bg-gray-50';
    totalRow.innerHTML = `
        <td colspan="3">Total</td>
        <td>${formatRupiah(totalTableAmount)}</td>
        <td>100%</td>
    `;
    tableBody.appendChild(totalRow);
};

// Fungsi Logout Standar
function logout() {
    if(confirm('Apakah Anda yakin ingin keluar?')) {
        // Arahkan ke halaman login
        window.location.href = 'index.html'; 
    }
}

// Event Listeners saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    const eventSelect = document.getElementById('eventSelect');

    // 1. Tambahkan event listener untuk perubahan dropdown
    eventSelect.addEventListener('change', (e) => {
        renderBudget(e.target.value);
    });

    // 2. Render data untuk event pertama saat halaman dimuat
    // Memastikan JS dijalankan dengan value default yang benar.
    if (eventSelect.options.length > 0) {
        renderBudget(eventSelect.value);
    }
    
    // 3. Tambahkan event listener untuk tombol logout
    document.querySelector('.btn-logout').addEventListener('click', logout);

});