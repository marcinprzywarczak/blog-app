package com.backend.backend.configs.files;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface FilesStorageService {
    public void init();

    public String save(MultipartFile file);

    public Resource load(String filename);

    public void delete(String filename);

    public void deleteAll();

    public Stream<Path> loadAll();

    public String getUniqueFilename(String fileName);
}
