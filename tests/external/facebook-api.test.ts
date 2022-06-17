import { env } from '@/main/config/env';
import { FacebookApi, AxiosHttpClient } from '@/infra/gateways';

describe('Facebook Api Integration Tests', () => {
  let axiosClient: AxiosHttpClient;
  let sut: FacebookApi;

  beforeEach(() => {
    axiosClient = new AxiosHttpClient();
    sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret);
  });
  it('should return a Facebook User if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: env.facebookApi.accessToken });
    expect(fbUser).toEqual({
      facebookId: '102417545816196',
      name: 'Luis Teste',
      email: 'luis_pysigay_teste@tfbnw.net',
    });
  });

  it('should return undefined token is valid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid' });
    expect(fbUser).toBeUndefined();
  });
});
