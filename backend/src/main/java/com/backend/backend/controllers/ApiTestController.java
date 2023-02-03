package com.backend.backend.controllers;

import com.backend.backend.configs.files.FilesStorageService;
import com.backend.backend.models.FileInfo;
import com.backend.backend.payload.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/test")
public class ApiTestController {

    @Autowired
    FilesStorageService storageService;

    @PostMapping("/upload")
    public ResponseEntity<MessageResponse> uploadFile(@RequestParam("files[]") MultipartFile[] files) {
        StringBuilder message = new StringBuilder();
        for (MultipartFile file:files) {
            try {
                storageService.save(file);
                message.append("Uploaded the file successfully: ").append(file.getOriginalFilename()).append("/n");

            } catch (Exception e) {
                message = new StringBuilder("Could not upload the file: " + file.getOriginalFilename() + ". Error: " + e.getMessage());
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message.toString()));
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message.toString()));
    }

    @GetMapping("/files")
    public ResponseEntity<List<FileInfo>> getListFiles() {
        List<FileInfo> fileInfos = storageService.loadAll().map(path -> {
            String filename = path.getFileName().toString();
            String url = MvcUriComponentsBuilder
                    .fromMethodName(ApiTestController.class, "getFile", path.getFileName().toString()).build().toString();

            return new FileInfo(filename, url);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }

    @GetMapping(value = "/files/{filename:.+}", produces = {MediaType.APPLICATION_OCTET_STREAM_VALUE})
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename) throws IOException {
        Resource file = storageService.load(filename);

//        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(file.getInputStream().readAllBytes());
//
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
    @GetMapping(value = "/fileDelete/{filename:.+}", produces = {MediaType.APPLICATION_OCTET_STREAM_VALUE})
    @ResponseBody
    public ResponseEntity<?> deleteFile(@PathVariable String filename) throws IOException {
        storageService.delete(filename);

//        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(file.getInputStream().readAllBytes());
//
        return ResponseEntity.ok()
                .body("deleted");
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/test1")
    public String test(Authentication authentication){
        System.out.println(authentication.getName());
        return "Hello world";
    }
    @GetMapping("/test2")
    public String test2(Authentication authentication){
        System.out.println(authentication.getName());
        return "Hello world2";
    }
}
