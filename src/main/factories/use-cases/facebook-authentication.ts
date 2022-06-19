import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/use-cases';
import { makeFacebookApi, makeJwtTokenHandler } from '@/main/factories/gateways';
import { makePgUserAccountRepo } from '@/main/factories/repos/postgres';

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  return setupFacebookAuthentication(
    makeFacebookApi(),
    makePgUserAccountRepo(),
    makeJwtTokenHandler(),
  );
};
