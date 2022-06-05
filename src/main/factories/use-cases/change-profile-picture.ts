import { setupChangeProfilePicture, ChangeProfilePicture } from '@/domain/use-cases';
import { makeAwsS3FileStorage, makeUniqueId } from '../gateways';
import { makePgUserProfileRepo } from '../repos';

export const makeChangeProfilePicture = (): ChangeProfilePicture => {
  return setupChangeProfilePicture(
    makeAwsS3FileStorage(),
    makeUniqueId(),
    makePgUserProfileRepo(),
  );
};
