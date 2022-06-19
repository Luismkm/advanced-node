import { set, reset } from 'mockdate';

import { UniqueId } from '@/infra/gateways/unique-id';

describe('UniqueId', () => {
  let sut = new UniqueId();

  beforeAll(() => {
    set(new Date(2021, 9, 3, 10, 10, 10));
    sut = new UniqueId();
  });

  afterAll(() => {
    reset();
  });
  it('should create a unique id', () => {
    const uuid = sut.uuid({ key: 'any_key' });
    expect(uuid).toBe('any_key_20211003101010');
  });
});
