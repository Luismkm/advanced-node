import { makeChangeProfilePicture } from '@/main/factories/use-cases';
import { Controller, SavePictureController } from '@/application/controllers';
import { makePgTransactionController } from '@/main/factories/application/decorators';

export const makeSavePictureController = (): Controller => {
  const controller = new SavePictureController(makeChangeProfilePicture());
  return makePgTransactionController(controller);
};
