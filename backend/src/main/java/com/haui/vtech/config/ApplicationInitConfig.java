//package com.haui.vtech.config;
//
//import com.haui.vtech.entity.RoleEntity;
//import com.haui.vtech.entity.UserEntity;
//import com.haui.vtech.enums.Role;
//import com.haui.vtech.repository.RoleRepository;
//import com.haui.vtech.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.boot.ApplicationRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import java.util.HashSet;
//import java.util.Set;
//
//@Configuration
//@RequiredArgsConstructor
//@Slf4j
//public class ApplicationInitConfig {
//
//    private final PasswordEncoder passwordEncoder;
//    private final RoleRepository roleRepository;
//
//    @Bean
//    ApplicationRunner applicationRunner(UserRepository userRepository) {
//        return args -> {
//            RoleEntity adminRole = roleRepository.findByName("ADMIN")
//                    .orElseGet(() -> roleRepository.save(
//                            RoleEntity.builder()
//                                    .name("ADMIN")
//                                    .build()
//                    ));
//
//            RoleEntity userRole = roleRepository.findByName("USER")
//                    .orElseGet(() -> roleRepository.save(
//                            RoleEntity.builder()
//                                    .name("USER")
//                                    .build()
//                    ));
//
//            if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {
//                Set<RoleEntity> roles = new HashSet<>();
//                roles.add(adminRole);
//                roles.add(userRole);
//
//                UserEntity admin = UserEntity.builder()
//                        .username("admin")
//                        .email("admin@gmail.com")
//                        .password(passwordEncoder.encode("admin"))
//                        .roles(roles) // Gán Set<RoleEntity> chứ không phải Set<String>
//                        .build();
//
//                userRepository.save(admin);
//                log.info("Admin has been created with default password: admin. Please change it");
//            }
//        };
//    }
//}
