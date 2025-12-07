package com.example.EventOrganizer.model;

import jakarta.persistence.*;

@Entity
@Table(name = "asisten") 

public class Asisten {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // PERBAIKAN: Mengubah idAsisten menjadi id untuk sinkronisasi View

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String nama; 

    @Column
    private String email;
    
    @Column
    private String noTelp;

    @Column
    private String alamat;
    
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    
    // --- CONSTRUCTOR ---
    public Asisten() {
    }
    
    // --- GETTERS ---
    public Integer getId() {
        return id;
    }
    public String getUsername() {
        return username;
    }
    public String getPassword() {
        return password;
    }
    public String getNama() {
        return nama;
    }
    public String getEmail() {
        return email;
    }
    public String getNoTelp() {
        return noTelp;
    }
    public String getAlamat() {
        return alamat;
    }
    public Boolean getIsDeleted() {
        return isDeleted;
    }

    // --- SETTERS ---
    public void setId(Integer id) {
        this.id = id;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setNama(String nama) {
        this.nama = nama;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setNoTelp(String noTelp) {
        this.noTelp = noTelp;
    }
    public void setAlamat(String alamat) {
        this.alamat = alamat;
    }
    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}
