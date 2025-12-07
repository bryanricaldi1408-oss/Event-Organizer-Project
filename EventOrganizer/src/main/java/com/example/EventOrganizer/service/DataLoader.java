package com.example.EventOrganizer.service; // Sesuaikan dengan package Anda

import com.example.EventOrganizer.model.Akun;
import com.example.EventOrganizer.repository.AkunRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private AkunRepository akunRepository; // Repository untuk menyimpan Akun
    
    @Autowired
    private PasswordEncoder passwordEncoder; // BCryptPasswordEncoder dari SecurityConfig

    @Override
    public void run(String... args) throws Exception {
        
        // Cek apakah user sudah ada di database untuk mencegah duplikasi
        if (akunRepository.findByUsername("kapi").isEmpty()) {
            
            // 1. User Pemilik Usaha (Owner)
            Akun owner = new Akun();
            owner.setUsername("kapi");
            // PASSWORD ASLI: 12345 (akan di-hash oleh encoder)
            owner.setPassword(passwordEncoder.encode("12345")); 
            owner.setRole("OWNER");
            akunRepository.save(owner);
            System.out.println("User 'kapi' (OWNER) berhasil dibuat.");
        }

        if (akunRepository.findByUsername("dina").isEmpty()) {
            
            // 2. User Asisten
            Akun asisten = new Akun();
            asisten.setUsername("dina");
            // PASSWORD ASLI: 12345 (akan di-hash oleh encoder)
            asisten.setPassword(passwordEncoder.encode("12345")); 
            asisten.setRole("ASSISTANT");
            akunRepository.save(asisten);
            System.out.println("User 'dina' (ASSISTANT) berhasil dibuat.");
        }
    }
}