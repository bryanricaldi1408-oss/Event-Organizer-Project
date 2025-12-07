package com.example.EventOrganizer.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data // Anotasi Lombok untuk getters, setters, dll.
@NoArgsConstructor
public class Akun {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password; // Password yang sudah di-hash (BCrypt)

    @Column(nullable = false)
    private String role; // Contoh: "OWNER" atau "ASSISTANT"

    // Anda bisa menambahkan atribut lain, seperti nama, email, isDeleted, dsb.
    // Misalnya, untuk menautkan ke entitas Asisten atau Pemilik.

}
