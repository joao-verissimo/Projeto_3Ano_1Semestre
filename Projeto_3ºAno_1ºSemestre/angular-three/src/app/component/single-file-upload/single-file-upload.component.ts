import { Component, EventEmitter, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError, timer } from "rxjs";
interface UploadResponse {
  filename: string;
}

@Component({
  selector: "app-single-file-upload",
  templateUrl: "./single-file-upload.component.html",
  styleUrls: ["./single-file-upload.component.css"],
})
export class SingleFileUploadComponent {
  status: "initial" | "uploading" | "success" | "fail" = "initial";
  file: File | null = null;
  @Output() uploadSuccess = new EventEmitter<string>(); // Emitting a string


  constructor(private http: HttpClient) {}

  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.status = "initial";
      this.file = file;
    }
  }

  onUpload() {
    if (this.file) {
      const formData = new FormData();
      formData.append("file", this.file, this.file.name);
  
      // Update the URL to match your server endpoint
      const upload$ = this.http.patch<string>("http://localhost:4000/api/floor/uploadmap", formData, {
        responseType: 'text' as 'json'
      });
        
      this.status = "uploading";
      upload$.subscribe({
        next: (response) => {  // Include the response parameter here
          this.uploadSuccess.emit(response); // Access the filename property
          this.status = "success";
        },
        error: (error: any) => {
          if (error.status === 200) {
            // This is not an error, the upload was successful.
            this.status = "success";
          } else {
            this.status = "fail";
            console.error(error); // Log the actual error for debugging.
          }
        },
      });
    }
  }
  
}
