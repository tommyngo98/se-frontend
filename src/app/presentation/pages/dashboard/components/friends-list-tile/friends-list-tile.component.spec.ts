import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsListTileComponent } from './friends-list-tile.component';

describe('FriendsListTileComponent', () => {
  let component: FriendsListTileComponent;
  let fixture: ComponentFixture<FriendsListTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendsListTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsListTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
