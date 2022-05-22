import { JwtPayload, sign, verify } from 'jsonwebtoken';

import { TokenGenerator, TokenValidator } from '@/domain/contracts/gateways';

export class JwtTokenHandler implements TokenGenerator, TokenValidator {
  constructor(private readonly secret: string) {}

  async generate({ expirationInMs, key }: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    const expirationInSeconds = expirationInMs / 1000;
    return sign({ key }, this.secret, { expiresIn: expirationInSeconds });
  }

  async validate({ token }: TokenValidator.Params): Promise<TokenValidator.Result> {
    const payload = verify(token, this.secret) as JwtPayload;
    return payload.key;
  }
}
