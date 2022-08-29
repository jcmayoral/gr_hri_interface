import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TeleopPage } from './teleop.page';

describe('TeleopPage', () => {
  let component: TeleopPage;
  let fixture: ComponentFixture<TeleopPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TeleopPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TeleopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
