import { getRepository } from 'typeorm';

import { LoadUserProfile, SaveUserPicture } from '@/domain/contracts/repos';
import { PgUser } from '@/infra/repos/postgres/entities';

export class PgUserProfileRepository implements SaveUserPicture {
  async savePicture({ id, pictureUrl, initials }: SaveUserPicture.Input): Promise<void> {
    const pgUserRepo = getRepository(PgUser);
    await pgUserRepo.update({ id: parseInt(id) }, { pictureUrl, initials });
  }

  async load({ id }: LoadUserProfile.Input): Promise<LoadUserProfile.Output> {
    const pgUserRepo = getRepository(PgUser);
    const pgUser = await pgUserRepo.findOne({ id: parseInt(id) });
    if (pgUser !== undefined) return { name: pgUser.name };
  }
}
