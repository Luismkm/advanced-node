import jwt from 'jsonwebtoken';
import { JwtTokenHandler } from '@/infra/crypto';

jest.mock('jsonwebtoken');

describe('JwtTokenHandler', () => {
  let sut: JwtTokenHandler;
  let fakeJwt: jest.Mocked<typeof jwt>;
  let secret: string;

  beforeAll(() => {
    secret = 'any_secret';
    fakeJwt = jwt as jest.Mocked<typeof jwt>;
  });

  beforeEach(() => {
    sut = new JwtTokenHandler(secret);
  });

  describe('generate', () => {
    let key: string;
    let expirationInMs: number;
    let token: string;

    beforeAll(() => {
      key = 'any_key';
      expirationInMs = 1000;
      token = 'any_token';
      fakeJwt.sign.mockImplementation(() => token);
    });

    it('should call sign with correct params', async () => {
      await sut.generate({ key, expirationInMs });
      expect(fakeJwt.sign).toHaveBeenCalledWith({ key }, secret, { expiresIn: 1 });
      expect(fakeJwt.sign).toHaveBeenCalledTimes(1);
    });

    it('should return a token', async () => {
      const generate = await sut.generate({ key, expirationInMs });
      expect(generate).toBe(token);
    });

    it('Should rethrow if sign throws', async () => {
      fakeJwt.sign.mockImplementationOnce(() => { throw new Error('token_error'); });
      const promise = sut.generate({ key, expirationInMs });
      await expect(promise).rejects.toThrow(new Error('token_error'));
    });
  });

  describe('validate', () => {
    let token: string;
    let key: string;

    beforeAll(() => {
      token = 'any_token';
      key = 'any_key';
      fakeJwt.verify.mockImplementation(() => ({ key }));
    });

    it('should call sign with correct params', async () => {
      await sut.validate({ token });
      expect(fakeJwt.verify).toHaveBeenCalledWith(token, secret);
      expect(fakeJwt.verify).toHaveBeenCalledTimes(1);
    });

    it('should return the key used to sign', async () => {
      const generateKey = await sut.validate({ token });
      expect(generateKey).toBe(key);
    });

    it('Should rethrow if verify throws', async () => {
      fakeJwt.verify.mockImplementationOnce(() => { throw new Error('key_error'); });
      const promise = sut.validate({ token });
      await expect(promise).rejects.toThrow(new Error('key_error'));
    });

    it('Should throw if verify returns null', async () => {
      fakeJwt.verify.mockImplementationOnce(() => null);
      const promise = sut.validate({ token });
      await expect(promise).rejects.toThrow();
    });
  });
});
