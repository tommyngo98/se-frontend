import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsTileComponent } from './friends-tile.component';

describe('FriendsTileComponent', () => {
  let component: FriendsTileComponent;
  let fixture: ComponentFixture<FriendsTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendsTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
