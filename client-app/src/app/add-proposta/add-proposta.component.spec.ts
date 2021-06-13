import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropostaComponent } from './add-proposta.component';

describe('AddPropostaComponent', () => {
  let component: AddPropostaComponent;
  let fixture: ComponentFixture<AddPropostaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPropostaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropostaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
