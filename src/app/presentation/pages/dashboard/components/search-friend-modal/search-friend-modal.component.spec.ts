import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFriendModalComponent } from './search-friend-modal.component';

describe('SearchFriendModalComponent', () => {
  let component: SearchFriendModalComponent;
  let fixture: ComponentFixture<SearchFriendModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFriendModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFriendModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
