import { Router } from 'express';

import { adaptExpressRoute, adaptMulter } from '@/main/adapters';
import { makeSavePictureController } from '@/main/factories/application/controllers';
import { auth } from '@/main/middlewares';

export default (router: Router): void => {
  router.delete('/users/picture', auth, adaptExpressRoute(makeSavePictureController()));
  router.put('/users/picture', auth, adaptMulter, adaptExpressRoute(makeSavePictureController()));
};
