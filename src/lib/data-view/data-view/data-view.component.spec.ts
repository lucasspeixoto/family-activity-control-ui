import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataViewComponent } from './data-view.component';

describe('DataViewComponent', () => {
  let component: DataViewComponent<any>;
  let fixture: ComponentFixture<DataViewComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
