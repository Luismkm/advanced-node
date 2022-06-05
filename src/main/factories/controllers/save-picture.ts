import { makeChangeProfilePicture } from '@/main/factories/use-cases';
import { SavePictureController } from '@/application/controllers';

export const makeSavePictureController = (): SavePictureController => {
  return new SavePictureController(makeChangeProfilePicture());
};
