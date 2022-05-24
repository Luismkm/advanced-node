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
    const fbUser = await sut.loadUser({ token: 'EAAWscmE1BUgBABOwHAKvRP7CFFkiJn6VzkqeFxUKFtAZBlZAPheoZAvsFP7UJondJUjoCSxs7s6I4ZCDCZBtiYIEuXjZAtd2i2pK5GzOL4b6iVtxl0sJUBB2SCRFAup0aDMCaHb4RX88b3fntCb3NRmMTVWErNOy5P4tEkcx7DryqCpTMBS1d8r7OjE7JPC7PvftgfUdSWT8ojZALobZBnuH' });
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
