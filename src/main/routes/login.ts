import { Router } from 'express';
import { makeFacebookLoginController } from '@/main/factories/controllers';
import { ExpressRouter } from '@/infra/http';

export default (router: Router): void => {
  const adapter = new ExpressRouter(makeFacebookLoginController());
  router.post('./api/login/facebook', adapter.adapt);
};
