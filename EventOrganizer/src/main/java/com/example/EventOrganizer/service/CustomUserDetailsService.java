package com.example.EventOrganizer.service;

import com.example.EventOrganizer.model.Pemilik;
import com.example.EventOrganizer.model.Asisten;
import com.example.EventOrganizer.repository.PemilikRepository;
import com.example.EventOrganizer.repository.AsistenRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User; 
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;
import java.util.Set;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private PemilikRepository pemilikRepository; 

    @Autowired
    private AsistenRepository asistenRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        Optional<Pemilik> pemilik = pemilikRepository.findByUsername(username);

        if (pemilik.isPresent()) {
            Pemilik p = pemilik.get();
            Set<GrantedAuthority> authorities = Collections.singleton(
                new SimpleGrantedAuthority("ROLE_OWNER") 
            );
            return new User(p.getUsername(), p.getPassword(), authorities); 
        }

        Optional<Asisten> asisten = asistenRepository.findByUsername(username);

        if (asisten.isPresent()) {
            Asisten a = asisten.get();
            Set<GrantedAuthority> authorities = Collections.singleton(
                new SimpleGrantedAuthority("ROLE_ASSISTANT")
            );
            return new User(a.getUsername(), a.getPassword(), authorities);
        }

        throw new UsernameNotFoundException("User tidak ditemukan: " + username);
    }
}