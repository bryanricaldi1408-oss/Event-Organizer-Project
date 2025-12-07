// --- LOGIC JS (Sama seperti sebelumnya) ---

// 1. Data Dummy
const vendorData = [
    { rank: 1, name: "Rasa Nusantara Catering", type: "Katering", count: 5, totalValue: 300000000 },
    { rank: 2, name: "Lensa Indah Photography", type: "Fotografer", count: 5, totalValue: 87000000 },
    { rank: 3, name: "Cahaya Dekorasi", type: "Dekorasi", count: 4, totalValue: 285000000 },
    { rank: 4, name: "Grand Ballroom Hotel Santika", type: "Venue", count: 3, totalValue: 210000000 },
    { rank: 5, name: "Wombi Cake & Bakery", type: "Kue & Dessert", count: 3, totalValue: 39000000 }
];

// 2. Fungsi Logout Standar
function logout() {
    if(confirm('Apakah Anda yakin ingin keluar?')) {
        // PERUBAHAN: Mengarahkan ke endpoint /login (yang akan menampilkan halaman login.html)
        // Sebelumnya: 'index.html'
        window.location.href = '/login'; 
    }
}

// 3. Helper Format Rupiah
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0
    }).format(number).replace("IDR", "Rp").trim();
}

// 4. Helper Rank Class
const getRankClass = (rank) => {
    if (rank === 1) return 'rank-1';
    if (rank === 2) return 'rank-2';
    if (rank === 3) return 'rank-3';
    return '';
}

// 5. Render Tabel
const renderTable = () => {
    const tableBody = document.getElementById('vendorTableBody');
    let htmlContent = '';

    vendorData.forEach(vendor => {
        htmlContent += `
            <tr>
                <td><div class="rank-circle ${getRankClass(vendor.rank)}">${vendor.rank}</div></td>
                <td style="font-weight: 500;">${vendor.name}</td>
                <td><span class="badge-type">${vendor.type}</span></td>
                <td><i class="fa-solid fa-arrow-trend-up trend-icon"></i> ${vendor.count} kali</td>
                <td style="font-weight: 600; color: #111827;">${formatRupiah(vendor.totalValue)}</td>
            </tr>
        `;
    });
    tableBody.innerHTML = htmlContent;
}

document.addEventListener('DOMContentLoaded', renderTable);