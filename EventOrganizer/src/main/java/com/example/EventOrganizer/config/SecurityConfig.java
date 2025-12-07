package com.example.EventOrganizer.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService; 
import org.springframework.security.web.authentication.AuthenticationSuccessHandler; 

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserDetailsService userDetailsService; 

    @Bean
    public PasswordEncoder passwordEncoder() {
        // ID default untuk fallback (misalnya BCrypt)
        String idForEncode = "bcrypt"; 
        
        // Daftarkan semua encoder yang Anda dukung
        Map<String, PasswordEncoder> encoders = new HashMap<>();
        
        // PENTING: Mendaftarkan NoOpPasswordEncoder untuk mendukung {noop}
        encoders.put("noop", NoOpPasswordEncoder.getInstance()); 
        
        // Mendaftarkan BCrypt sebagai fallback (Optional, tapi disarankan)
        encoders.put(idForEncode, new BCryptPasswordEncoder());
        
        // DelegatingPasswordEncoder akan membaca prefix {noop} di DB
        return new DelegatingPasswordEncoder(idForEncode, encoders);
    }
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        
        http
            .csrf(csrf -> csrf.disable()) 
            .authorizeHttpRequests(authorize -> authorize
                // Memungkinkan akses ke aset statis dan halaman login
                .requestMatchers("/css/**", "/js/**", "/", "/login", "/logout").permitAll() 
                
                // Pembatasan Akses Berbasis Role
                .requestMatchers("/pemilik/**").hasRole("OWNER") 
                .requestMatchers("/asisten/**").hasRole("ASSISTANT") 
                
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                // PENTING: Login page dipindahkan ke /login
                .loginPage("/login") 
                .loginProcessingUrl("/login") 
                .successHandler(roleBasedSuccessHandler())
                // PENTING: Failure URL sekarang ke /login?error=true
                .failureUrl("/login?error=true") 
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/logout") 
                .logoutSuccessUrl("/login") // DIUBAH: Langsung mengarah ke /login
                .permitAll()
            );
            
        return http.build();
    }

    @Bean
    public AuthenticationSuccessHandler roleBasedSuccessHandler() {
        return (request, response, authentication) -> {
            
            boolean isOwner = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_OWNER"));
            
            if (isOwner) {
                response.sendRedirect(request.getContextPath() + "/pemilik/dashboard");
            } else {
                response.sendRedirect(request.getContextPath() + "/asisten/event-saya");
            }
        };
    }
}