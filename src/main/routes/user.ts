import { Router } from 'express';

import { makeDeletePictureController } from '@/main/factories/controllers';
import { adaptExpressRoute } from '@/main/adapters';
import { auth } from '@/main/middlewares';

export default (router: Router): void => {
  router.delete('/users/picture', auth, adaptExpressRoute(makeDeletePictureController()));
};
