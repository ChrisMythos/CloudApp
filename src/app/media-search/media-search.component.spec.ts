import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaSearchComponent } from './media-search.component';

describe('MediaSearchComponent', () => {
  let component: MediaSearchComponent;
  let fixture: ComponentFixture<MediaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
