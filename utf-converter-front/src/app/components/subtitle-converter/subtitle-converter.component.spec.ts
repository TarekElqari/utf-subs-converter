import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtitleConverterComponent } from './subtitle-converter.component';

describe('SubtitleConverterComponent', () => {
  let component: SubtitleConverterComponent;
  let fixture: ComponentFixture<SubtitleConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtitleConverterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubtitleConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
