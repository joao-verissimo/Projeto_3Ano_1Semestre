import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SingleFileUploadComponent } from './single-file-upload.component';

describe('SingleFileUploadComponent', () => {
  let component: SingleFileUploadComponent;
  let fixture: ComponentFixture<SingleFileUploadComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SingleFileUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleFileUploadComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial state', () => {
    expect(component.status).toEqual('initial');
    expect(component.file).toBeNull();
  });

  it('should update file on file change', () => {
    const mockFile = new File([''], 'test-file.jpg');
    const event = { target: { files: [mockFile] } };
    component.onChange(event);

    expect(component.file).toEqual(mockFile);
    expect(component.status).toEqual('initial');
  });

  it('should handle file upload', () => {
    const mockFile = new File([''], 'test-file.jpg');
    component.file = mockFile;
    const spy = spyOn(component.uploadSuccess, 'emit');

    component.onUpload();
    
    const req = httpMock.expectOne('http://localhost:4000/api/floor/uploadmap');
    expect(req.request.method).toBe('PATCH');
    req.flush('test-file.jpg');
    
    expect(component.status).toEqual('success');
    expect(spy).toHaveBeenCalledWith('test-file.jpg');
  });

  it('should handle upload error', () => {
    const mockFile = new File([''], 'test-file.jpg');
    component.file = mockFile;

    component.onUpload();

    const req = httpMock.expectOne('http://localhost:4000/api/floor/uploadmap');
    req.error(new ProgressEvent('error'), { status: 400 });
    
    expect(component.status).toEqual('fail');
  });

  it('should emit uploadSuccess on successful upload', () => {
    const spy = spyOn(component.uploadSuccess, 'emit');
    const mockFile = new File([''], 'test-file.jpg');
    component.file = mockFile;

    component.onUpload();

    const req = httpMock.expectOne('http://localhost:4000/api/floor/uploadmap');
    req.flush('test-file.jpg');

    expect(spy).toHaveBeenCalledWith('test-file.jpg');
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests.
  });
});
