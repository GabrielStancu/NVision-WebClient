import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatcherAccountComponent } from './watcher-account.component';

describe('WatcherAccountComponent', () => {
  let component: WatcherAccountComponent;
  let fixture: ComponentFixture<WatcherAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatcherAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatcherAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
