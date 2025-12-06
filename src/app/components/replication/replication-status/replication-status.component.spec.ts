import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplicationStatusComponent } from './replication-status.component';

describe('ReplicationStatusComponent', () => {
  let component: ReplicationStatusComponent;
  let fixture: ComponentFixture<ReplicationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplicationStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplicationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
