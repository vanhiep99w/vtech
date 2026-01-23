//package com.haui.vtech.service;
//
//import com.haui.vtech.entity.UserEntity;
//import com.haui.vtech.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//
//@Service
//@RequiredArgsConstructor
//public class AppUserDetailsService implements UserDetailsService {
//
//    private final UserRepository userRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        UserEntity existingUserEntity =  userRepository.findByEmail(email)
//                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy email: " + email));
//        return new User(existingUserEntity.getEmail(), existingUserEntity.getPassword(), new ArrayList<>());
//    }
//}
