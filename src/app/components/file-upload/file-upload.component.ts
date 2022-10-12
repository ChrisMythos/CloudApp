import { Component, Input, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Image } from "../../models/getImagesModel"
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';


  fileInfos?: Observable<Image[]>;

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
    console.log(this.fileInfos);

    let rawdata = "137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,1,81,0,0,0,67,8,6,0,0,0,37,31,54,102,0,0,0,1,115,82,71,66,0,174,206,28,233,0,0,0,4,103,65,77,65,0,0,177,143,11,252,97,5,0,0,0,9,112,72,89,115,0,0,14,195,0,0,14,195,1,199,111,168,100,0,0,23,31,73,68,65,84,120,94,237,157,77,108,21,87,150,199,79,63,236,23,252,129,49,225,177,192,27,24,123,8,150,24,43,44,28,103,136,210,227,88,153,145,34,8,67,186,55,51,22,98,34,69,94,160,244,194,10,100,53,131,133,80,152,94,117,104,89,173,32,22,86,164,12,178,232,217,116,130,152,160,145,50,17,97,130,96,112,123,65,139,32,57,65,88,246,34,70,26,158,131,219,216,134,60,59,158,57,231,126,84,221,123,235,214,199,123,207,198,144,156,159,244,192,85,245,170,234,214,253,56,247,156,83,85,255,247,179,237,127,241,151,255,7,12,195,48,76,69,228,212,255,12,195,48,76,5,176,17,101,24,134,169,130,167,38,156,207,13,156,129,205,237,183,97,122,8,96,195,145,29,80,58,117,24,30,94,82,27,31,23,125,39,97,203,129,109,242,239,217,27,48,125,240,125,88,166,191,205,245,132,185,141,232,57,10,27,143,236,134,60,253,173,183,209,186,62,128,7,230,247,12,196,245,118,53,0,140,95,132,123,253,231,212,218,39,164,30,24,134,9,120,186,60,209,226,148,215,224,60,30,246,64,93,15,192,204,254,67,112,111,255,105,152,131,221,176,97,96,143,218,134,144,177,19,219,240,19,49,160,155,96,193,183,45,134,218,193,179,176,1,62,130,233,145,121,181,198,97,77,235,129,97,24,147,140,70,180,27,90,78,92,128,159,255,86,125,250,223,18,107,215,31,60,135,203,131,208,214,175,183,157,131,150,157,184,225,213,193,240,111,129,218,95,237,71,252,243,191,95,135,255,249,175,15,224,160,90,206,204,165,41,88,130,34,44,5,222,23,26,183,225,179,176,229,130,250,12,246,170,245,132,189,173,1,61,191,144,94,104,208,251,24,219,200,211,107,24,64,195,167,183,5,199,187,6,15,15,30,131,69,245,247,247,99,49,6,206,161,246,141,221,176,116,94,239,23,135,42,139,58,215,98,255,33,248,243,123,215,196,223,177,68,234,129,97,152,181,32,131,17,37,3,248,46,180,193,40,252,241,157,253,240,37,125,6,63,84,219,136,86,104,44,254,6,215,255,6,238,204,54,66,219,107,104,40,63,255,19,76,65,35,108,233,236,150,95,217,249,10,108,105,154,131,59,255,105,238,87,30,203,239,29,86,97,237,57,152,223,111,24,165,190,125,120,126,195,11,52,66,223,218,193,183,33,119,73,173,223,127,17,224,192,25,225,77,74,227,186,23,224,188,222,118,8,230,49,60,214,212,119,105,207,17,61,206,194,94,199,248,18,123,224,153,246,6,88,186,107,24,186,214,189,30,99,189,7,106,10,243,176,188,21,195,125,181,109,163,233,189,10,100,89,106,70,78,91,101,143,35,182,30,24,134,89,19,210,141,168,48,128,0,83,255,125,2,30,169,85,54,227,48,57,124,25,255,191,12,83,199,181,129,253,16,190,29,157,131,166,231,94,129,245,184,180,190,179,29,154,102,199,224,187,175,233,251,146,95,255,195,139,240,215,127,251,43,24,86,203,21,115,231,62,148,200,128,13,31,117,46,166,23,242,173,104,16,15,40,143,242,194,94,168,87,91,160,231,37,200,195,13,120,104,24,78,147,210,200,167,150,199,89,179,213,54,124,100,156,201,112,7,134,119,232,88,96,140,239,157,186,1,53,129,177,222,14,185,166,6,104,44,220,82,219,47,194,82,215,155,106,27,210,180,27,54,95,120,27,242,99,167,211,61,79,134,97,158,72,86,45,39,250,104,116,12,102,155,218,225,217,157,221,240,236,115,141,48,251,205,23,49,70,184,74,46,189,15,127,38,3,69,55,90,200,88,90,198,116,82,229,48,245,167,252,155,48,235,10,13,234,47,9,229,43,155,11,55,96,58,206,107,188,116,21,74,179,234,111,152,128,229,217,121,152,251,68,127,247,28,148,198,27,32,215,166,22,103,111,192,220,56,64,190,176,93,173,96,24,230,105,35,221,136,126,253,5,220,67,163,208,242,55,199,133,87,153,153,175,79,192,228,4,134,244,175,253,18,61,89,237,173,134,84,156,19,141,67,24,211,139,176,208,180,9,214,137,21,100,176,182,65,125,36,124,70,40,159,136,94,96,93,36,76,119,33,111,118,30,74,87,164,151,72,249,82,97,64,147,110,14,81,122,161,73,231,42,175,193,82,177,1,242,47,235,50,200,227,45,223,81,139,200,247,253,135,96,6,208,147,182,114,185,12,195,60,45,100,124,196,233,45,104,251,237,47,160,69,45,193,196,199,34,108,167,27,75,47,116,254,47,220,124,167,31,13,129,7,186,193,244,58,198,212,234,251,38,100,68,255,126,243,40,252,174,202,144,62,120,20,72,81,26,49,67,99,186,97,99,132,241,230,163,71,230,99,71,200,194,121,153,23,117,143,167,215,187,223,151,144,167,123,12,126,176,246,145,235,194,92,37,229,60,49,252,111,146,75,214,241,208,136,203,71,156,212,119,64,150,15,156,50,16,193,126,12,195,60,81,240,107,159,14,100,68,233,241,34,206,81,50,12,147,133,85,203,137,50,12,195,252,20,96,79,148,97,24,166,10,216,19,101,24,134,169,2,54,162,12,195,48,85,192,70,148,97,24,166,10,216,136,50,12,195,84,1,27,81,134,97,152,42,72,191,59,191,243,56,60,127,184,19,230,254,99,63,220,249,92,173,51,72,125,224,126,133,16,15,193,251,116,52,93,45,79,231,97,119,251,225,249,121,152,83,251,137,215,55,225,34,220,187,185,11,247,39,137,59,22,243,96,24,166,124,158,46,79,52,78,71,211,212,242,140,24,208,162,241,254,188,253,238,124,169,56,161,254,98,24,134,169,140,50,141,40,189,254,73,186,161,131,208,76,30,42,254,253,66,103,35,174,111,133,14,165,53,218,246,42,46,62,86,61,209,56,164,92,221,66,154,150,39,169,64,205,222,135,31,212,34,195,48,76,57,148,101,68,155,251,233,253,249,113,25,186,127,125,2,254,244,206,126,248,227,232,28,110,161,117,82,107,84,132,252,174,158,232,171,191,132,182,213,210,19,37,12,45,207,45,23,78,66,173,88,73,50,116,147,80,138,121,223,60,16,62,38,225,146,12,106,243,12,195,48,62,50,27,209,150,215,47,64,199,118,52,132,103,178,228,62,109,61,209,230,191,106,5,88,45,61,81,194,23,206,247,180,64,141,216,200,48,12,179,122,100,54,162,83,19,227,248,175,225,93,166,16,234,137,190,5,155,183,39,137,58,175,18,34,236,47,64,141,22,64,102,24,134,89,5,178,135,243,95,245,195,205,9,128,166,206,195,70,174,51,1,165,39,218,118,248,23,208,50,59,10,223,58,119,246,87,92,79,52,130,20,64,110,236,115,21,239,25,134,97,86,142,178,236,203,204,160,250,29,165,195,225,77,163,71,195,159,193,148,123,99,73,49,243,21,121,175,24,201,175,150,170,189,198,155,19,149,121,207,153,34,253,4,135,222,166,127,182,131,97,24,102,101,88,85,21,167,199,245,12,41,195,48,204,90,177,58,70,84,43,218,235,59,249,114,45,195,48,204,143,14,214,19,101,24,134,169,2,190,231,194,48,12,83,5,108,68,25,134,97,170,128,141,40,195,48,76,21,176,17,101,24,134,169,2,54,162,177,208,111,214,159,133,141,3,123,212,242,211,142,188,158,134,62,181,200,48,204,138,176,38,119,231,99,181,60,93,109,208,217,27,48,157,36,14,66,223,239,185,111,127,167,231,40,108,60,178,9,22,146,244,65,197,119,118,67,94,45,138,119,239,133,184,137,9,25,157,189,80,51,114,58,195,111,208,239,129,186,225,183,161,177,73,46,149,140,125,108,61,83,128,133,243,135,96,126,136,190,255,38,192,144,41,205,231,91,231,67,150,171,222,208,70,21,56,117,39,207,163,22,4,114,63,48,214,203,178,65,120,28,170,23,52,178,15,84,125,210,246,232,111,240,211,113,118,65,41,169,126,189,232,114,43,188,117,238,64,215,212,113,203,255,189,184,235,117,251,80,160,47,235,156,223,89,111,214,139,44,107,55,44,155,245,187,150,196,214,67,220,53,37,225,238,67,132,125,201,234,175,65,27,201,125,130,177,160,198,207,82,80,103,250,152,102,159,140,246,231,160,63,221,221,135,109,84,112,206,73,146,149,73,101,79,42,55,109,139,235,147,246,216,140,27,23,242,184,149,233,13,175,153,39,26,171,229,105,138,137,164,169,43,13,221,130,133,166,29,240,140,241,22,82,238,229,29,144,31,191,149,210,145,16,50,208,226,60,23,97,161,117,175,199,67,35,181,40,165,244,148,66,237,32,54,82,81,151,251,34,44,117,189,29,28,79,168,79,169,235,153,145,47,112,37,144,34,241,71,157,87,116,22,44,179,90,21,48,116,44,56,207,189,83,55,160,230,64,248,230,150,68,94,143,221,129,176,29,102,1,242,47,175,182,183,77,29,89,26,170,160,140,105,6,52,9,170,7,209,177,195,227,89,215,229,19,164,17,144,145,81,235,207,3,52,139,183,219,176,94,206,79,66,61,30,83,15,134,220,64,55,212,143,95,14,6,255,147,77,120,77,211,35,5,104,30,236,85,235,227,144,253,32,172,31,234,75,186,223,245,66,29,9,159,235,245,230,184,152,157,7,40,108,23,127,230,94,222,4,75,227,184,76,36,245,201,4,168,223,229,218,232,175,61,240,76,161,8,11,184,156,76,82,185,227,161,177,153,31,59,29,236,3,206,184,160,182,166,201,65,110,15,13,62,145,85,111,56,213,136,210,91,71,230,235,156,205,253,244,122,167,169,21,250,47,240,251,235,215,225,179,15,42,120,11,62,163,150,39,205,84,27,7,79,98,99,157,133,45,131,71,113,64,234,215,59,229,251,241,161,17,80,26,162,55,113,128,138,198,181,43,140,102,23,159,177,44,161,113,171,217,42,143,65,231,10,95,33,53,195,121,154,177,140,227,145,119,32,58,108,47,228,91,113,6,251,68,27,133,115,240,112,100,30,234,59,146,58,243,53,88,42,54,168,78,228,131,140,78,88,6,241,161,115,145,108,95,170,167,129,180,109,130,188,81,175" +
      ",230,53,69,174,127,236,50,148,218,247,89,245,36,235,238,172,240,72,242,56,33,200,125,125,175,204,170,114,14,147,1,162,250,177,191,35,218,45,53,29,226,92,171,56,214,99,96,232,83,152,155,221,6,121,170,15,156,128,232,245,224,13,162,172,104,72,200,43,10,140,60,93,87,88,62,171,254,84,61,5,101,215,6,204,89,111,215,129,125,189,242,120,180,206,173,95,223,186,116,194,129,111,159,39,174,29,164,17,249,84,245,41,52,84,129,227,34,199,133,64,40,162,221,134,18,236,194,126,66,70,15,199,109,81,141,153,172,125,210,32,183,181,128,253,238,54,0,141,145,158,151,32,87,188,133,231,84,98,65,84,119,193,24,167,143,61,134,53,118,185,37,53,65,63,215,245,182,7,106,10,243,80,186,162,29,33,186,38,213,230,138,117,133,6,88,186,155,224,40,101,176,81,169,253,245,209,112,175,16,30,105,121,93,10,49,111,19,114,120,189,48,101,200,218,149,75,162,150,167,241,30,188,217,97,243,173,232,138,163,135,85,106,221,13,185,75,167,113,0,200,74,95,188,57,9,249,118,108,8,250,18,54,72,94,107,136,226,177,23,172,10,35,99,231,211,23,149,70,80,87,180,233,57,78,163,49,76,69,116,48,123,70,92,190,139,61,172,208,146,205,24,4,198,152,244,79,229,170,220,192,155,161,103,75,215,76,222,70,6,207,45,48,150,20,42,13,133,245,170,175,201,239,9,79,192,247,99,5,171,99,201,129,33,175,159,82,19,190,89,154,8,60,112,209,134,52,121,152,94,45,77,104,56,168,69,189,94,195,125,209,219,59,224,27,20,184,237,160,172,111,81,231,99,59,148,49,75,64,181,109,51,93,171,207,243,138,209,82,176,161,137,44,156,60,23,63,185,1,208,181,15,234,172,193,73,134,200,244,160,201,147,209,3,20,141,235,17,250,153,26,181,13,189,217,0,85,127,114,159,211,56,73,189,25,24,67,170,179,220,37,189,77,31,79,150,69,96,245,135,44,226,227,170,30,240,67,63,159,243,64,69,78,182,7,70,101,8,163,163,16,57,97,44,120,163,45,57,46,150,239,168,197,226,20,60,188,137,237,59,64,70,239,42,44,82,31,175,130,165,187,239,11,163,92,135,94,237,242,149,115,225,245,19,98,140,203,58,154,193,118,174,143,244,7,95,185,183,65,99,225,178,216,103,26,251,97,227,27,186,95,24,206,10,26,232,122,122,145,18,209,99,165,25,151,101,191,180,251,82,57,122,195,153,198,185,20,30,105,133,142,195,157,0,163,103,28,3,250,175,240,143,47,190,8,127,247,171,21,80,6,141,132,164,225,76,92,210,29,27,195,240,135,166,33,52,67,122,242,192,140,80,158,12,108,224,17,246,237,194,16,205,8,243,155,180,48,9,13,146,168,129,120,92,212,118,224,228,32,102,120,164,74,133,253,96,2,56,117,27,242,71,178,123,49,203,239,93,22,29,44,187,7,40,7,174,200,25,25,198,125,249,10,122,23,230,132,134,222,203,247,186,94,117,219,138,48,218,238,176,20,33,104,163,103,230,143,147,160,78,78,199,155,1,105,48,45,3,17,27,206,39,160,12,115,163,53,56,93,97,111,25,249,136,65,41,250,83,92,200,111,122,175,97,62,78,26,38,99,208,6,185,56,66,30,183,182,163,128,198,69,77,192,153,250,131,17,206,227,4,180,89,212,171,235,129,93,195,137,114,62,152,48,52,50,109,225,75,125,201,201,163,102,228,35,251,250,112,172,65,215,14,108,103,159,209,45,159,69,52,202,141,237,247,195,62,162,49,198,248,15,197,168,35,227,47,119,232,104,8,39,70,128,19,244,16,217,17,85,223,216,71,180,119,109,58,22,148,39,21,125,165,194,20,83,198,113,211,6,117,65,71,120,76,92,186,42,242,38,233,132,29,187,182,99,155,12,229,53,20,178,21,164,129,162,206,25,134,220,136,202,137,146,183,85,31,201,31,150,129,71,183,84,132,43,113,191,7,165,160,206,81,179,181,23,106,48,148,121,72,30,145,177,191,232,4,218,155,18,9,252,242,194,37,89,119,73,233,2,23,172,195,34,78,68,153,191,63,9,115,228,165,187,222,54,25,34,58,14,94,11,229,166,151,112,57,82,7,194,152,82,190,173,91,26,121,244,188,154,49,66,8,243,122,25,188,127,3,97,76,157,156,102,54,200,208,144,71,20,26,4,154,116,33,75,62,61,133,218,65,52,142,129,33,167,168,73,109,16,132,215,42,63,114,2,15,250,3,78,60,11,197,77,240,76,31,70,56,41,125,200,133,38,177,82,214,8,72,120,115,96,143,9,1,25,80,25,97,68,239,7,80,94,50,116,56,242,42,71,90,49,212,23,2,47,47,107,127,141,43,119,12,102,84,112,240,42,246,89,195,187,94,33,50,213,183,248,89,144,137,143,225,203,51,163,0,157,239,90,114,119,85,229,68,147,232,219,135,51,120,150,112,70,123,156,39,61,225,58,205,192,20,170,162,7,80,48,188,34,3,242,194,22,208,179,138,134,12,62,180,177,68,79,35,184,3,44,141,120,24,62,80,35,171,188,44,82,59,160,7,183,28,180,22,104,224,115,24,78,47,95,185,143,70,167,37,48,188,98,50,48,110,194,184,55,131,82,49,211,26,25,89,252,228,54,228,58,54,169,165,144,184,129,178,132,51,185,240,124,156,28,230,226,205,34,134,244,189,24,202,23,227,207,239,254,234,64,224,113,201,186,43,23,49,105,149,137,72,153,128,19,213,68,192,182,209,121,83,66,132,131,106,16,82,174,172,85,69,16,86,127,144,4,185,73,209,143,229,159,178,175,248,251,26,77,156,121,236,15,32,66,101,172,247,158,29,225,211,35,25,17,55,85,69,31,146,57,247,48,181,34,235,213,156,48,164,55,23,245,164,131,20,141,233,149,81,132,167,254,204,142,175,12,50,189,67,121,200,74,137,43,119,22,100,154,108,229,111,24,166,26,81,186,145,36,126,22,132,126,31,73,8,45,203,159,10,177,13,233,202,96,221,212,41,231,103,140,41,164,111,197,206,233,241,34,104,118,174,57,128,161,201,216,213,152,89,93,222,157,13,242,170,177,200,156,95,227,17,42,95,55,44,143,132,57,176,197,126,121,39,83,135,104,230,227,50,139,87,0,54,136,245,50,71,165,215,139,65,211,90,144,161,17,122,142,203,237,187,131,208,78,76,10,65,200,39,63,50,92,213,97,34,133,129,104,184,169,44,202,136,89,117,231,60,226,165,195,229,48,255,227,9,245,169,12,5,52,24,106,145,16,19,76,112,93,209,125,40,36,146,122,173,134,39,143,109,177,212,181,23,59,171,217,22,102,120,139,31,225,93,43,143,134,162,5,208,169,149,93,88,175,142,39,106,229,55,85,25,40,111,24,172,163,20,64,17,102,204,188,85,108,78,212,206,31,38,62,62,39,112,194,65,179,220,42,252,151,199,115,250,131,200,175,170,27,114,29,247,45,79,148,250,10,61,189,17,148,79,79,66,194,40,111,131,28,25,58,170,195,166,6,251,238,176,175,30,4,206,53,41,227,103,159,71,62,158,20,78,198,49,222,156,136,10,240,127,243,92,169,55,250,226,251,100,180,12,78,122,160,108,98,202,157,132,209,87,54,83,206,180,194,144,61,9,86,113,74,128,140,79,254,102,118,79,176,220,239,251,161,112,42,250,124,221,106,117,0,102,133,160,193,26,247,76,43,243,163,134,141,168,133,202,7,233,240,43,120,216,56,43,52,43,235,155,5,148,251,42,51,151,169,16,70,211,12,107,211,94,58,96,214,30,54,162,63,89,216,136,50,12,195,84,65,114,186,131,97,24,134,73,132,141,40,195,48,76,21,176,17,101,24,134,169,2,54,162,12,195,48,85,192,70,148,97,152,85,132,158,120,249,49,233,242,70,121,178,244,68,9,122,84,36,162,19,233,60,122,132,152,154,157,137,144,42,140,214,14,85,143,10,193,128,163,147,73,223,233,35,29,205,41,168,11,30,81,10,201,124,46,15,169,143,43,153,229,51,30,139,162,253,162,90,158,4,61,70,21,213,78,180,191,47,31,181,210,15,253,199,149,97,29,181,131,18,100,8,168,250,113,42,245,152,151,243,120,88,185,207,208,138,50,59,15,196,139,117,226,121,217,9,127,127,32,157,202,88,125,217,91,144,183,218,214,121,4,205,106,7,68,148,31,140,71,214,52,166,134,101,194,241,16,171,222,117,125,196,60,10,37,198,68,108,91,56,231,50,143,229,188,41,21,236,19,217,166,203,23,109,159,172,109,227,253,94,228,122,232,248,102,255,148,99,151,94,52,41,123,188,18,78,63,242,227,158,211,197,172,63,179,30,226,247,73,180,81,14,107,230,137,122,181,250,68,195,147,88,171,239,149,71,234,188,225,250,236,13,66,3,72,237,151,106,28,180,102,161,124,223,89,191,122,89,169,1,213,132,74,72,209,50,212,190,33,197,109,229,246,248,134,42,7,122,119,219,22,25,246,151,65,139,120,136,247,213,169,179,122,202,87,54,125,187,160,102,228,98,160,89,80,41,203,239,125,36,222,100,170,11,132,69,220,183,85,60,253,193,20,163,81,216,250,178,52,128,212,62,129,158,40,162,6,110,216,14,248,17,3,55,77,195,50,60,94,84,203,147,202,75,66,195,106,223,20,67,16,223,22,100,132,76,37,41,227,88,166,96,15,125,72,73,202,124,223,94,31,71,124,204,190,53,15,165,42,219,39,59,82,165,171,172,49,68,19,129,40,179,124,19,48,170,62,85,14,100,44,73,96,219,87,15,201,172,152,158,168,208,15,61,113,28,214,171,101,216,121,28,158,55,244,69,87,82,79,148,222,25,47,149,253,106,152,12,23,244,171,93,102,216,32,13,212,202,24,38,1,25,121,117,158,240,117,66,106,164,147,208,128,51,151,120,29,111,64,126,39,91,248,34,213,118,44,65,4,26,208,184,63,121,48,174,150,39,205,142,242,245,186,240,85,191,136,20,28,150,145,102,208,172,30,95,60,118,189,218,231,73,168,115,82,33,18,210,102,182,110,163,96,171,188,54,119,31,242,216,130,243,4,175,25,234,87,46,101,61,75,253,200,180,190,33,117,12,188,250,178,46,134,158,168,52,180,233,117,38,203,96,107,88,154,88,131,142,244,1,170,84,229,42,15,108,147,30,71,100,39,150,34,44,96,61,250,36,230,168,47,215,25,237,33,12,152,234,247,150,108,156,245,58,109,12,198,120,177,199,3,157,71,31,199,183,93,67,237,169,229,10,229,62,193,247,212,56,49,13,108,84,79,52,189,223,248,246,177,88,9,61,209,153,175,240,42,154,218,225,89,37,194,220,252,90,39,52,205,142,194,183,159,203,229,74,240,107,245,185,242,93,46,234,189,92,113,193,97,229,197,235,38,42,3,181,53,174,33,203,132,26,205,84,83,39,79,38,24,240,219,160,166,120,26,102,72,136,164,29,195,73,122,23,223,16,238,8,141,33,126,212,62,210,32,82,72,26,94,151,40,159,82,157,241,105,121,74,111,133,188,33,195,163,178,60,156,151,160,129,194,89,143,215,99,149,193,53,188,62,72,56,163,104,120,50,198,49,237,58,55,189,140,80,232,197,146,33,84,212,119,169,168,224,148,212,238,20,131,16,7,154,8,219,213,177,66,57,55,68,189,159,94,63,112,84,120,117,182,126,164,221,31,116,219,210,121,189,250,178,17,180,158,232,63,25,134,214,152,28,34,117,36,61,75,87,195,210,124,111,93,106,121,42,3,65,33,105,32,183,24,51,64,51,129,147,73,172,22,171,129,104,47,71,92,35,233,29,120,122,63,223,171,23,65,250,9,31,201,182,37,57,74,236,247,57,229,241,90,178,113,89,60,58,181,95,84,153,203,244,240,177,63,163,231,169,117,80,109,76,173,95,218,135,222,197,151,253,70,71,112,225,196,231,215,19,21,162,203,56,46,2,145,108,171,93,141,107,61,95,132,198,190,176,142,252,54,202,79,180,14,93,62,255,3,220,153,109,132,45,157,221,184,240,22,108,70,219,48,251,205,23,240,72,110,69,86,74,79,52,20,37,246,99,135,111,178,242,92,195,107,234,38,210,241,112,160,21,110,169,125,168,1,66,113,220,178,113,180,74,101,232,184,9,214,137,133,201,96,112,45,96,165,187,21,30,31,74,83," +
      "218,32,188,174,178,66,30,15,249,174,80,196,196,197,42,67,74,104,41,16,130,24,56,8,221,193,39,58,118,120,189,22,164,177,169,195,73,170,159,64,229,72,178,160,163,2,33,31,40,33,5,166,146,33,14,227,202,185,73,49,143,221,30,15,48,38,189,99,134,244,110,155,165,34,67,79,75,96,89,33,213,131,220,99,25,225,124,96,252,149,129,32,49,237,32,44,13,117,16,42,66,135,237,30,45,86,9,121,161,142,12,36,97,134,243,17,67,112,14,30,98,153,195,116,137,198,104,219,12,6,164,58,104,210,218,5,37,247,28,177,90,191,88,183,170,14,162,209,22,182,133,234,215,161,158,168,84,78,171,111,7,120,32,234,1,199,91,193,76,15,24,215,106,141,231,242,72,55,162,112,25,190,251,102,14,154,158,123,5,214,191,250,60,180,192,56,76,14,95,86,219,86,18,146,29,43,71,3,51,13,58,30,14,180,32,188,145,161,222,202,29,255,201,131,12,165,229,201,85,131,242,136,239,97,71,21,42,84,17,99,26,133,210,49,161,247,35,211,14,145,144,190,92,132,54,106,82,132,226,18,182,115,68,95,214,66,14,176,165,187,255,166,60,210,164,40,37,93,61,168,60,45,207,10,17,198,148,242,132,74,139,85,67,94,104,170,172,95,20,161,112,150,248,51,54,171,11,73,211,229,46,121,60,90,53,249,144,7,235,211,250,45,141,99,116,161,254,78,70,70,27,161,99,227,23,167,22,84,145,126,201,212,230,143,134,63,131,169,166,78,120,225,245,86,152,29,253,3,204,168,245,146,149,210,19,149,23,88,158,64,114,146,110,98,116,155,254,185,3,33,67,103,132,50,20,26,64,172,84,158,194,210,143,84,158,201,42,231,188,226,69,111,109,17,104,19,113,67,6,103,219,170,82,23,38,194,152,226,192,13,102,105,169,177,233,203,167,145,135,26,164,25,212,32,72,54,78,254,182,144,154,152,149,19,175,47,27,98,234,137,74,111,55,62,74,145,94,104,178,14,101,168,229,185,202,184,90,172,218,11,245,68,64,169,224,62,244,171,10,166,252,97,26,145,246,244,141,139,44,222,127,207,81,216,128,225,119,82,30,58,162,245,171,82,106,11,253,199,112,125,182,62,78,98,215,97,90,73,230,200,125,191,169,84,77,251,101,156,56,63,132,105,145,51,159,131,123,163,171,225,133,74,72,159,82,220,229,20,158,140,252,152,137,99,31,73,186,137,139,253,50,71,170,183,5,161,1,206,232,82,7,83,158,163,185,16,151,147,49,192,14,247,192,40,91,68,195,50,1,95,78,52,141,120,45,79,83,215,20,63,17,175,147,66,82,89,39,213,24,82,235,102,143,168,87,29,78,135,199,215,219,197,121,40,148,119,38,21,242,116,130,159,11,137,195,211,22,190,156,110,20,127,78,84,32,82,9,62,125,217,24,61,81,154,40,40,39,166,143,103,61,26,148,228,133,250,181,60,83,49,115,149,169,249,82,231,38,140,120,138,192,8,113,43,244,66,53,244,19,29,250,119,135,210,176,116,82,117,126,214,55,46,84,61,232,62,100,222,36,213,247,43,234,250,112,178,76,202,217,10,40,124,215,57,110,172,7,113,237,210,115,213,227,62,173,143,11,205,91,245,19,50,174,166,111,197,237,231,144,241,57,209,110,104,57,241,46,180,125,247,49,124,57,248,161,90,199,48,12,195,164,26,81,169,108,143,127,208,207,131,176,1,101,24,134,177,96,61,81,134,97,152,42,200,152,19,101,24,134,97,124,176,17,101,24,134,169,2,54,162,12,195,48,85,192,70,148,97,24,166,10,216,136,254,148,232,253,0,62,187,126,29,126,63,160,150,25,134,169,18,128,255,7,191,38,194,32,121,139,104,30,0,0,0,0,73,69,78,68,174,66,96,130"



  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(imageName: string, imageDescr: string): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {

        this.currentFile = file;
        console.log(file);

        // push data to express endpoint
        this.uploadService.upload(file, imageName, imageDescr).subscribe({
          next: (event: any) => {
            // get upload progess
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          },
        });
      }

      this.selectedFiles = undefined;
    }
  }
}
