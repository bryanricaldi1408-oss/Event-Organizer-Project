package com.example.EventOrganizer.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class PageController {

    // ==========================================================================
    // DUMMY DATA STORAGE & ID COUNTER (Static for in-memory persistence)
    // ==========================================================================

    private static List<Asisten> ALL_ASISTEN = new ArrayList<>();
    private static int ASISTEN_ID_COUNTER = 104; 
    
    // Inisialisasi data dummy Asisten saat class dimuat
    static {
        ALL_ASISTEN.add(new Asisten(101, "Dina Kusuma", "dina@eo.com", "081211112222", "Jl. Kebon Jeruk No. 5", "dina"));
        ALL_ASISTEN.add(new Asisten(102, "Rizky Firmansyah", "rizky@eo.com", "081233334444", "Jl. Sudirman Kav. 12", "rizky"));
        ALL_ASISTEN.add(new Asisten(103, "Sari Dewi", "sari@eo.com", "081255556666", "Jl. Thamrin Raya No. 1", "sari"));
    }

    // ==========================================================================
    // DUMMY MODELS (Updated to use Getters/Setters)
    // ==========================================================================

    public static class Klien {
        // ... (Klien body tidak berubah) ...
        private Integer id;
        private String nama;
        private String email;
        private String noTelp;
        private String alamat;
        private String catatan;
        public Klien() {}
        public Klien(Integer id, String nama, String email, String noTelp, String alamat, String catatan) {
            this.id = id; this.nama = nama; this.email = email; this.noTelp = noTelp; this.alamat = alamat; this.catatan = catatan;
        }
        public Integer getId() { return id; }
        public void setId(Integer id) { this.id = id; }
        public String getNama() { return nama; }
        public void setNama(String nama) { this.nama = nama; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getNoTelp() { return noTelp; }
        public void setNoTelp(String noTelp) { this.noTelp = noTelp; }
        public String getAlamat() { return alamat; }
        public void setAlamat(String alamat) { this.alamat = alamat; }
        public String getCatatan() { return catatan; }
        public void setCatatan(String catatan) { this.catatan = catatan; }
    }
    
    public static class Vendor {
        // ... (Vendor body tidak berubah) ...
        private String nama;
        private String jenis;
        private Long harga;
        public Vendor() {}
        public Vendor(String nama, String jenis, Long harga) {
            this.nama = nama; this.jenis = jenis; this.harga = harga;
        }
        public String getNama() { return nama; }
        public void setNama(String nama) { this.nama = nama; }
        public String getJenis() { return jenis; }
        public void setJenis(String jenis) { this.jenis = jenis; }
        public Long getHarga() { return harga; }
        public void setHarga(Long harga) { this.harga = harga; }
    }

    public static class Event {
        // ... (Event body tidak berubah) ...
        private Integer id;
        private String namaKlien;
        private String jenisEvent;
        private String tanggal;
        private String tanggalSelesai;
        private Integer jumlahUndangan;
        private String lokasi;
        private Long totalBudget;
        private boolean isSelesai;
        private List<Vendor> vendorList;
        public Event() {}
        public Event(Integer id, String namaKlien, String jenisEvent, String tanggal, String tanggalSelesai, Integer jumlahUndangan, String lokasi, Long totalBudget, boolean isSelesai, List<Vendor> vendorList) {
            this.id = id; this.namaKlien = namaKlien; this.jenisEvent = jenisEvent; this.tanggal = tanggal; this.tanggalSelesai = tanggalSelesai; this.jumlahUndangan = jumlahUndangan; this.lokasi = lokasi; this.totalBudget = totalBudget; this.isSelesai = isSelesai; this.vendorList = vendorList;
        }
        public Integer getId() { return id; }
        public void setId(Integer id) { this.id = id; }
        public String getNamaKlien() { return namaKlien; }
        public void setNamaKlien(String namaKlien) { this.namaKlien = namaKlien; }
        public String getJenisEvent() { return jenisEvent; }
        public void setJenisEvent(String jenisEvent) { this.jenisEvent = jenisEvent; }
        public String getTanggal() { return tanggal; }
        public void setTanggal(String tanggal) { this.tanggal = tanggal; }
        public String getTanggalSelesai() { return tanggalSelesai; }
        public void setTanggalSelesai(String tanggalSelesai) { this.tanggalSelesai = tanggalSelesai; }
        public Integer getJumlahUndangan() { return jumlahUndangan; }
        public void setJumlahUndangan(Integer jumlahUndangan) { this.jumlahUndangan = jumlahUndangan; }
        public String getLokasi() { return lokasi; }
        public void setLokasi(String lokasi) { this.lokasi = lokasi; }
        public Long getTotalBudget() { return totalBudget; }
        public void setTotalBudget(Long totalBudget) { this.totalBudget = totalBudget; }
        public boolean isSelesai() { return isSelesai; }
        public void setSelesai(boolean isSelesai) { this.isSelesai = isSelesai; }
        public List<Vendor> getVendorList() { return vendorList; }
        public void setVendorList(List<Vendor> vendorList) { this.vendorList = vendorList; }
    }
    
    public static class Asisten {
        // ... (Asisten body tidak berubah) ...
        private Integer id;
        private String nama;
        private String email;
        private String noTelp;
        private String alamat;
        private String username;
        private String password;
        public Asisten() {} 
        public Asisten(Integer id, String nama, String email, String noTelp, String alamat, String username) {
            this.id = id; this.nama = nama; this.email = email; this.noTelp = noTelp; this.alamat = alamat; this.username = username; this.password = "password123"; 
        }
        public Integer getId() { return id; }
        public void setId(Integer id) { this.id = id; }
        public String getNama() { return nama; }
        public void setNama(String nama) { this.nama = nama; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getNoTelp() { return noTelp; }
        public void setNoTelp(String noTelp) { this.noTelp = noTelp; }
        public String getAlamat() { return alamat; }
        public void setAlamat(String alamat) { this.alamat = alamat; }
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    // =================================================================
    // DUMMY DATA GENERATOR (Menggunakan List Event & Klien lama)
    // =================================================================
    
    private List<Klien> getDummyKlienList() {
        // ... (list klien tidak berubah) ...
        List<Klien> klien = new ArrayList<>();
        klien.add(new Klien(1, "Dodo Prasetyo", "dodo@email.com", "081234560001", "Jl. Gatot Subroto No. 100", "Klien Sweet 17 anak bungsunya"));
        klien.add(new Klien(2, "Ibu Susi Hartono", "susi@email.com", "081234560004", "Jl. Rasuna Said No. 400", "Ulang tahun ke-50"));
        klien.add(new Klien(3, "Keluarga Wijaya", "wijaya@email.com", "081234560005", "Jl. Kuningan No. 500", "Syukuran pernikahan anak"));
        return klien;
    }

    private List<Event> getDummyEventList() {
        // ... (list event tidak berubah) ...
        List<Event> events = new ArrayList<>();
        
        List<Vendor> vendorDodo = new ArrayList<>();
        vendorDodo.add(new Vendor("Wombi Cake & Bakery", "Kue & Dessert", 6000000L));
        vendorDodo.add(new Vendor("Bintang Dekorasi", "Dekorasi", 50000000L));
        vendorDodo.add(new Vendor("Rasa Nusantara Catering", "Katering", 30000000L));
        vendorDodo.add(new Vendor("Lensa Indah Photography", "Fotografer", 15000000L));
        vendorDodo.add(new Vendor("Cinema Wedding Video", "Videografer", 5000000L));
        events.add(new Event(
            1, "Dodo Prasetyo", "Sweet 17", "Sabtu, 3 Januari 2026", null, 200, 
            "Grand Ballroom Hotel Santika", 106000000L, false, vendorDodo
        ));

        List<Vendor> vendorRina = new ArrayList<>();
        vendorRina.add(new Vendor("Gedung Pernikahan Megah", "Venue", 80000000L));
        vendorRina.add(new Vendor("Bunga Indah", "Bunga", 25000000L));
        vendorRina.add(new Vendor("Mega Dekorasi", "Dekorasi", 120000000L));
        vendorRina.add(new Vendor("Katering Favorit", "Katering", 150000000L));
        vendorRina.add(new Vendor("Foto Cepat", "Fotografer", 30000000L));
        vendorRina.add(new Vendor("Video Bagus", "Videografer", 35000000L));
        events.add(new Event(
            2, "Rina & Budi", "Wedding", null, "2 Februari 2024", 500, 
            "Jakarta Convention Center", 562000000L, true, vendorRina
        ));
        
        return events;
    }
    
    // =================================================================
    // ENDPOINT UMUM & PEMILIK (ROLE_OWNER)
    // =================================================================
    
    @GetMapping("/")
    public String root() {
        return "redirect:/login"; 
    }
    
    @GetMapping("/login")
    public String showLogin() {
        return "login";
    }

    @GetMapping("/pemilik")
    public String pemilikRoot() {
        // Mengarahkan ke dashboard yang sudah berfungsi
        return "redirect:/pemilik/dashboard"; 
    }
    
    @GetMapping("/pemilik/dashboard")
    public String showDashboard(Model model) {
        // Menggunakan static list ALL_ASISTEN
        model.addAttribute("listAsisten", ALL_ASISTEN); 
        model.addAttribute("asistenBaru", new Asisten());
        return "pemilik/dashboard";
    }

    // ENDPOINT UNTUK PROSES FORM TAMBAH/EDIT ASISTEN
    @PostMapping("/pemilik/asisten/save")
    public String saveAsisten(@ModelAttribute Asisten asisten) {
        // Logic Edit (Jika ID sudah ada)
        if (asisten.getId() != null && asisten.getId() > 0) {
            ALL_ASISTEN.removeIf(a -> a.getId().equals(asisten.getId()));
            ALL_ASISTEN.add(asisten);
            System.out.println("Asisten Diperbarui: " + asisten.getNama());
        } 
        // Logic Tambah (Jika ID belum ada)
        else {
            asisten.setId(ASISTEN_ID_COUNTER++);
            ALL_ASISTEN.add(asisten);
            System.out.println("Asisten Baru Disimpan: " + asisten.getNama());
        }
        
        // Redirect ke GET endpoint dashboard
        return "redirect:/pemilik/dashboard";
    }

    // ENDPOINT UNTUK PROSES HAPUS ASISTEN (PERBAIKAN: Menambahkan endpoint ini)
    @GetMapping("/pemilik/asisten/delete/{id}")
    public String deleteAsisten(@PathVariable Integer id) {
        // Hapus asisten dari list berdasarkan ID
        boolean removed = ALL_ASISTEN.removeIf(a -> a.getId().equals(id));
        if (removed) {
            System.out.println("Asisten dengan ID " + id + " berhasil dihapus.");
        } else {
             System.out.println("Asisten dengan ID " + id + " tidak ditemukan.");
        }
        
        // Redirect kembali ke GET endpoint dashboard
        return "redirect:/pemilik/dashboard";
    }
    
    // ENDPOINTS PEMILIK LAINNYA
    @GetMapping("/pemilik/vendor")
    public String showPemilikKelolaVendor() {
        return "pemilik/vendor"; 
    }

    @GetMapping("/pemilik/jenis-vendor")
    public String showPemilikKelolaJenisVendor() {
        return "pemilik/jenis-vendor";
    }

    @GetMapping("/pemilik/laporan-vendor")
    public String showPemilikLaporanVendor() {
        return "pemilik/laporan-vendor";
    }

    @GetMapping("/pemilik/laporan-event")
    public String showPemilikLaporanEvent() {
        return "pemilik/laporan-event";
    }
    
    // =================================================================
    // ENDPOINT ASISTEN (ROLE_ASSISTANT)
    // =================================================================
    
    // ENDPOINT UNTUK REDIRECT SUCCESS LOGIN ASISTEN
    @GetMapping("/asisten")
    public String asistenRoot() {
        return "redirect:/asisten/event-saya"; 
    }
    
    @GetMapping("/asisten/dashboard")
    public String asistenDashboardRedirect() {
        return "redirect:/asisten/event-saya"; 
    }

    @GetMapping("/asisten/kelola-klien")
    public String showAsistenKelolaKlien(Model model) {
        model.addAttribute("listKlien", getDummyKlienList());
        return "asisten/kelola-klien";
    }

    @GetMapping("/asisten/kelola-event")
    public String showAsistenKelolaEvent(Model model) {
        model.addAttribute("listEvent", getDummyEventList());
        return "asisten/kelola-event"; 
    }

    @GetMapping("/asisten/laporan-budget")
    public String showAsistenLaporanBudget(@RequestParam(required = false) Integer eventId, Model model) {
        List<Event> allEvents = getDummyEventList();
        
        Event selectedEvent = allEvents.stream()
                .filter(e -> e.getId().equals(eventId))
                .findFirst()
                .orElse(allEvents.get(0));

        model.addAttribute("listAllEvents", allEvents);
        model.addAttribute("selectedEvent", selectedEvent);
        return "asisten/laporan-budget";
    }

    @GetMapping("/asisten/event-saya")
    public String showAsistenEventSaya(Model model) {
        List<Event> allEvents = getDummyEventList();
        
        List<Event> activeEvents = allEvents.stream()
                .filter(e -> !e.isSelesai())
                .collect(Collectors.toList());
        
        List<Event> completedEvents = allEvents.stream()
                .filter(Event::isSelesai)
                .collect(Collectors.toList());

        model.addAttribute("listEventAktif", activeEvents);
        model.addAttribute("listEventSelesai", completedEvents);
        model.addAttribute("totalActive", activeEvents.size());
        model.addAttribute("totalCompleted", completedEvents.size());
        model.addAttribute("totalEvents", allEvents.size());
        
        return "asisten/event-saya";
    }
}