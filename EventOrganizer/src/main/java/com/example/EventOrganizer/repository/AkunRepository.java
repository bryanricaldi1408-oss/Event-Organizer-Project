package com.example.EventOrganizer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EventOrganizer.model.Akun;

import java.util.Optional;

public interface AkunRepository extends JpaRepository<Akun, Long> {
    
    // Spring akan mengimplementasikan ini secara otomatis:
    // Mencari akun berdasarkan username yang unik.
    Optional<Akun> findByUsername(String username);

}
