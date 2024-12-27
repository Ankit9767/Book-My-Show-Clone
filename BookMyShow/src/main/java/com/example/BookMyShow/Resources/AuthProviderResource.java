package com.example.BookMyShow.Resources;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.BookMyShow.DTO.JwtResponseDto;
import com.example.BookMyShow.DTO.LoginRequestDto;
import com.example.BookMyShow.DTO.RegisterRequestDto;
import com.example.BookMyShow.Domain.OrgUser;
import com.example.BookMyShow.Domain.Enumeration.UserRole;
import com.example.BookMyShow.Service.OrgUserService;
import com.example.BookMyShow.ServiceJwtProvider.JwtTokenProvider;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthProviderResource {
    private final Logger log = LoggerFactory.getLogger(AuthProviderResource.class);
    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private OrgUserService orgUserService;
    

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequestDto) {
        Optional<OrgUser> user = orgUserService.getUserByUserName(loginRequestDto.getUserName());
        
        if (user.isPresent() && passwordEncoder.matches(loginRequestDto.getPassword(), user.get().getPassword())) {
            String token = tokenProvider.generateToken(user.get().getUserName());
            return ResponseEntity.ok(new JwtResponseDto(token));
        }

        return ResponseEntity.status(401).body("Invalid username or password");
    }
    
    	
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDto registerRequestDto) {

        if (orgUserService.getUserByUserName(registerRequestDto.getUserName()).isPresent()) {
            return ResponseEntity.status(400).body("Username already exists.");
        }
        if (orgUserService.getUserByEmail(registerRequestDto.getEmail()).isPresent()) {
            return ResponseEntity.status(400).body("Email already registered.");
        }
        
        if (registerRequestDto.getRole() == null) {
            registerRequestDto.setRole(UserRole.USER); 
        }	
        
        String encodedPassword = passwordEncoder.encode(registerRequestDto.getPassword());

        OrgUser newUser = new OrgUser(
            null,
            registerRequestDto.getFirstName(),
            registerRequestDto.getLastName(),
            registerRequestDto.getEmail(),
            registerRequestDto.getPhoneNumber(),
            registerRequestDto.getRole(),
            registerRequestDto.getUserName(),
            registerRequestDto.getIsActive(), 
            registerRequestDto.getPassword()
        );

        orgUserService.saveUser(newUser);

        return ResponseEntity.ok("User registered successfully.");
    }
    
}

