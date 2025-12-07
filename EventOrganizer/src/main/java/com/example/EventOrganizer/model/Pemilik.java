package com.example.EventOrganizer.model;

import jakarta.persistence.*;

@Entity
@Table(name = "pemilik")
public class Pemilik {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPemilik;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;
    
    private String nama; 
    // Tambahkan field lain jika Anda butuh: private String email; private String noTelp; 
    
    // Wajib ada: Constructor default
    public Pemilik() {}

    // Wajib ada: Getter dan Setter
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.setPassword(password); }

    public String getNama() { return nama; }
    public void setNama(String nama) { this.nama = nama; }
}