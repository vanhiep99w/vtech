//package com.haui.vtech.controller;
//
//import com.haui.vtech.io.ProfileRequest;
//import com.haui.vtech.io.ProfileResponse;
//import com.haui.vtech.service.ProfileService;
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/v2/users")
//@RequiredArgsConstructor()
//public class ProfileController extends BaseController {
//
//   private final ProfileService profileService;
//
//   @PostMapping("/register")
//   public ProfileResponse register (@Valid @RequestBody ProfileRequest request) {
//       ProfileResponse response = profileService.createProfile(request);
//       // TODO: Send welcome email
//       return response;
//   }
//}
