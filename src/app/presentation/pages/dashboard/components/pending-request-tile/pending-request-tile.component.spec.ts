import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRequestTileComponent } from './pending-request-tile.component';

describe('PendingRequestTileComponent', () => {
  let component: PendingRequestTileComponent;
  let fixture: ComponentFixture<PendingRequestTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingRequestTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingRequestTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
