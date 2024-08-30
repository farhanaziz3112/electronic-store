import { TestBed } from '@angular/core/testing';

import { ProductpurchaseService } from './productpurchase.service';

describe('ProductpurchaseService', () => {
  let service: ProductpurchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductpurchaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
