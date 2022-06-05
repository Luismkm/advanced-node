import { Router } from 'express';

import { adaptExpressRoute } from '@/main/adapters';
import { makeSavePictureController } from '@/main/factories/controllers';
import { auth } from '@/main/middlewares';

export default (router: Router): void => {
  router.delete('/users/picture', auth, adaptExpressRoute(makeSavePictureController()));
};
