package ma.emsi.utfconverterback.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class FileService {

    public byte[] convertAndZipFiles(MultipartFile[] files) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ZipOutputStream zipOut = new ZipOutputStream(baos);

        for (MultipartFile file : files) {
            String fileName = file.getOriginalFilename();
            File convertedFile = convertToUTF8(file);

            ZipEntry zipEntry = new ZipEntry(fileName);
            zipOut.putNextEntry(zipEntry);
            Files.copy(convertedFile.toPath(), zipOut);
            zipOut.closeEntry();

            convertedFile.delete();
        }

        zipOut.finish();
        zipOut.close();

        return baos.toByteArray();
    }

    private File convertToUTF8(MultipartFile inputFile) throws IOException {
        Charset inputCharset = Charset.forName("windows-1256");
        Charset outputCharset = StandardCharsets.UTF_8;

        File tempFile = File.createTempFile("converted-", ".srt");
        byte[] fileBytes = inputFile.getBytes();
        String content = new String(fileBytes, inputCharset);

        try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(tempFile), outputCharset))) {
            writer.write(content);
        }

        return tempFile;
    }
}
