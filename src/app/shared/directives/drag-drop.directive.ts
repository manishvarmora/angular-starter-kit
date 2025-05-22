import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output
} from '@angular/core';

@Directive({
  selector: '[appDragDrop]',
  standalone: false // or true for standalone
})
export class DragDropDirective {
  @Output() filesDropped = new EventEmitter<FileList>();
  @Output() dragOver = new EventEmitter<void>();
  @Output() dragLeave = new EventEmitter<void>();

  @HostBinding('class.dragover') isDragging = false;

  constructor() {}

  @HostListener('dragover', ['$event'])
  onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.isDragging = true;
    this.dragOver.emit();
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.isDragging = false;
    this.dragLeave.emit();
  }

  @HostListener('drop', ['$event'])
  onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.isDragging = false;

    if (evt.dataTransfer?.files?.length > 0) {
      this.filesDropped.emit(evt.dataTransfer.files);
      evt.dataTransfer.clearData();
    }
  }
}



// file.component.html
// -------------------
// <div
//   appDragDrop
//   (filesDropped)="handleFiles($event)"
//   (dragOver)="onDragOver()"
//   (dragLeave)="onDragLeave()"
//   class="drop-zone">
//   Drop your files here
// </div>

// CSS
// ------------------
// .drop-zone {
//   border: 2px dashed #aaa;
//   padding: 2rem;
//   text-align: center;
//   transition: background-color 0.3s;
// }
// .drop-zone.dragover {
//   background-color: #f0f8ff;
// }




// file.component.ts
// -------------------
// handleFiles(files: FileList) {
//   console.log('Dropped files:', files);
// }

