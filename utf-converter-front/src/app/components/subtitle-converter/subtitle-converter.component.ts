// subtitle-converter.component.ts

import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subtitle-converter',
  standalone: true,
  templateUrl: './subtitle-converter.component.html',
  styleUrls: ['./subtitle-converter.component.css'],
  imports: [CommonModule]
})
export class SubtitleConverterComponent {
  selectedFiles: File[] = [];
  uploadProgress: number = 0;
  isUploading: boolean = false;
  downloadUrl: string = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  uploadFiles(): void {
    if (this.selectedFiles.length > 0) {
      const formData = new FormData();
      this.selectedFiles.forEach(file => formData.append('files', file));

      this.isUploading = true;
      this.uploadProgress = 0;

      // POST request to upload and convert files
      this.http.post('http://localhost:8080/api/files/upload', formData, {
        reportProgress: true,
        responseType: 'blob',
        observe: 'events'
      }).subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.isUploading = false;
          const blob = new Blob([event.body], { type: 'application/octet-stream' });
          this.downloadUrl = window.URL.createObjectURL(blob);
        }
      }, error => {
        this.isUploading = false;
        console.error('Upload error: ', error);
      });
    }
  }

  downloadConvertedFile(): void {
    if (this.downloadUrl) {
      const a = document.createElement('a');
      a.href = this.downloadUrl;
      a.download = 'converted-subtitles.zip';
      a.click();
    }
  }
}
