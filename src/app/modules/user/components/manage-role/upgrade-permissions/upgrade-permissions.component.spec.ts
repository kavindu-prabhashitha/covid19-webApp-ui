import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradePermissionsComponent } from './upgrade-permissions.component';

describe('UpgradePermissionsComponent', () => {
  let component: UpgradePermissionsComponent;
  let fixture: ComponentFixture<UpgradePermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpgradePermissionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpgradePermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
