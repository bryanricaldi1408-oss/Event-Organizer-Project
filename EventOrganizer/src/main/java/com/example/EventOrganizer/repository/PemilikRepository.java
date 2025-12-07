package com.example.EventOrganizer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EventOrganizer.model.Pemilik;

import java.util.Optional;

public interface PemilikRepository extends JpaRepository<Pemilik, Integer> {
    Optional<Pemilik> findByUsername(String username);
}