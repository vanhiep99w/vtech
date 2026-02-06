package com.haui.vtech.controller;

import com.haui.vtech.enums.ImageFolder;
import com.haui.vtech.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v2/upload")
@RequiredArgsConstructor
public class UploadController {

    private final S3Service s3Service;

    @PostMapping("/product")
    public ResponseEntity<?> uploadProduct(@RequestParam MultipartFile file) throws Exception {
        return ResponseEntity.ok(
                s3Service.uploadImage(file, ImageFolder.PRODUCT)
        );
    }

    @PostMapping("/category")
    public ResponseEntity<?> uploadCategory(@RequestParam MultipartFile file) throws Exception {
        return ResponseEntity.ok(
                s3Service.uploadImage(file, ImageFolder.CATEGORY)
        );
    }

    @PostMapping("/user")
    public ResponseEntity<?> uploadUser(@RequestParam MultipartFile file) throws Exception {
        return ResponseEntity.ok(
                s3Service.uploadImage(file, ImageFolder.USER)
        );
    }
}
