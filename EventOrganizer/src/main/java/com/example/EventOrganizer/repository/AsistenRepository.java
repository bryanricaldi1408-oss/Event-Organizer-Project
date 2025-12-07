package com.example.EventOrganizer.repository;

import com.example.EventOrganizer.model.Asisten;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// Menggunakan tipe data Integer untuk Primary Key (idAsisten)
public interface AsistenRepository extends JpaRepository<Asisten, Integer> {
    
    // Metode ini digunakan CustomUserDetailsService untuk mencari user
    Optional<Asisten> findByUsername(String username);

}