package ma.emsi.utfconverterback.controller;

// FileController.java

import ma.emsi.utfconverterback.service.FileService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/files")
public class FileController {

    private final FileService fileService;

    @Autowired
    public FileController(FileService fileService) {
        this.fileService = fileService;
    }
    @PostMapping("/upload")
    public ResponseEntity<byte[]> uploadAndConvertFiles(@RequestParam("files") MultipartFile[] files) throws IOException {
        byte[] zipFile = fileService.convertAndZipFiles(files);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "converted-subtitles.zip");

        return new ResponseEntity<>(zipFile, headers, HttpStatus.OK);
    }
}

