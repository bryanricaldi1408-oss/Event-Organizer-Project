package com.example.EventOrganizer.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class PageController {

    // =================================================================
    // DUMMY MODELS (DITAMBAHKAN GETTER & SETTER AGAR THYMELEAF BACA)
    // =================================================================

    // Kita butuh class Asisten kosong untuk dashboard pemilik
    public static class Asisten {
        private String nama;
        private String email;
        // Getter Setter
        public String getNama() { return nama; }
        public void setNama(String nama) { this.nama = nama; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }

    public static class Klien {
        private Integer id;
        private String nama;
        private String email;
        private String noTelp;
        private String alamat;
        private String catatan;

        public Klien(Integer id, String nama, String email, String noTelp, String alamat, String catatan) {
            this.id = id;
            this.nama = nama;
            this.email = email;
            this.noTelp = noTelp;
            this.alamat = alamat;
            this.catatan = catatan;
        }
        
        // PENTING UNTUK THYMELEAF: GETTER SETTER
        public Integer getId() { return id; }
        public String getNama() { return nama; }
        public String getEmail() { return email; }
        public String getNoTelp() { return noTelp; }
        public String getAlamat() { return alamat; }
        public String getCatatan() { return catatan; }
    }
    
    public static class Vendor {
        private String nama;
        private String jenis;
        private Long harga;

        public Vendor(String nama, String jenis, Long harga) {
            this.nama = nama;
            this.jenis = jenis;
            this.harga = harga;
        }

        // PENTING UNTUK THYMELEAF: GETTER SETTER
        public String getNama() { return nama; }
        public String getJenis() { return jenis; }
        public Long getHarga() { return harga; }
    }

    public static class Event {
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

        public Event(Integer id, String namaKlien, String jenisEvent, String tanggal, String tanggalSelesai, Integer jumlahUndangan, String lokasi, Long totalBudget, boolean isSelesai, List<Vendor> vendorList) {
            this.id = id;
            this.namaKlien = namaKlien;
            this.jenisEvent = jenisEvent;
            this.tanggal = tanggal;
            this.tanggalSelesai = tanggalSelesai;
            this.jumlahUndangan = jumlahUndangan;
            this.lokasi = lokasi;
            this.totalBudget = totalBudget;
            this.isSelesai = isSelesai;
            this.vendorList = vendorList;
        }

        // PENTING UNTUK THYMELEAF: GETTER SETTER
        public Integer getId() { return id; }
        public String getNamaKlien() { return namaKlien; }
        public String getJenisEvent() { return jenisEvent; }
        public String getTanggal() { return tanggal; }
        public String getTanggalSelesai() { return tanggalSelesai; }
        public Integer getJumlahUndangan() { return jumlahUndangan; }
        public String getLokasi() { return lokasi; }
        public Long getTotalBudget() { return totalBudget; }
        public boolean isSelesai() { return isSelesai; }
        public List<Vendor> getVendorList() { return vendorList; }
    }

    // =================================================================
    // DUMMY DATA GENERATOR
    // =================================================================
    
    private List<Klien> getDummyKlienList() {
        List<Klien> klien = new ArrayList<>();
        klien.add(new Klien(1, "Dodo Prasetyo", "dodo@email.com", "081234560001", "Jl. Gatot Subroto No. 100", "Klien Sweet 17 anak bungsunya"));
        klien.add(new Klien(2, "Ibu Susi Hartono", "susi@email.com", "081234560004", "Jl. Rasuna Said No. 400", "Ulang tahun ke-50"));
        klien.add(new Klien(3, "Keluarga Wijaya", "wijaya@email.com", "081234560005", "Jl. Kuningan No. 500", "Syukuran pernikahan anak"));
        return klien;
    }

    private List<Event> getDummyEventList() {
        List<Event> events = new ArrayList<>();
        
        // Event Aktif (Dodo)
        List<Vendor> vendorDodo = new ArrayList<>();
        vendorDodo.add(new Vendor("Wombi Cake & Bakery", "Kue & Dessert", 6000000L));
        vendorDodo.add(new Vendor("Bintang Dekorasi", "Dekorasi", 50000000L));
        events.add(new Event(
            1, "Dodo Prasetyo", "Sweet 17", "Sabtu, 3 Januari 2026", null, 200, 
            "Grand Ballroom Hotel Santika", 106000000L, false, vendorDodo
        ));

        // Event Selesai (Rina & Budi)
        List<Vendor> vendorRina = new ArrayList<>();
        vendorRina.add(new Vendor("Gedung Pernikahan Megah", "Venue", 80000000L));
        events.add(new Event(
            2, "Rina & Budi", "Wedding", null, "2 Februari 2024", 500, 
            "Jakarta Convention Center", 562000000L, true, vendorRina
        ));
        
        return events;
    }
    
    // =================================================================
    // ENDPOINT
    // =================================================================
    
    @GetMapping("/")
    public String root() {
        return "redirect:/login"; 
    }
    
    @GetMapping("/login")
    public String showLogin() {
        return "login";
    }
    
    @GetMapping("/pemilik/dashboard")
    public String showDashboard(Model model) {
        // PERBAIKAN: Menambahkan object yang dicari oleh dashboard.html
        model.addAttribute("asistenBaru", new Asisten()); 
        model.addAttribute("listAsisten", new ArrayList<Asisten>()); // List kosong dulu agar tidak null
        return "pemilik/dashboard";
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
                .filter(e -> e.getId().equals(eventId)) // Gunakan getter
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
                .filter(e -> !e.isSelesai()) // Gunakan getter
                .collect(Collectors.toList());
        
        List<Event> completedEvents = allEvents.stream()
                .filter(e -> e.isSelesai()) // Gunakan getter
                .collect(Collectors.toList());

        model.addAttribute("listEventAktif", activeEvents);
        model.addAttribute("listEventSelesai", completedEvents);
        model.addAttribute("totalActive", activeEvents.size());
        model.addAttribute("totalCompleted", completedEvents.size());
        model.addAttribute("totalEvents", allEvents.size());
        
        return "asisten/event-saya";
    }
}   