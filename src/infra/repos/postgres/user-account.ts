import { PgUser } from '@/infra/repos/postgres/entities';
import { PgRepository } from '@/infra/repos/postgres/repository';
import { LoadUserAccount, SaveFacebookAccount } from '@/domain/contracts/repos';

type LoadParams = LoadUserAccount.Params;
type LoadResult = LoadUserAccount.Result;
type SaveParams = SaveFacebookAccount.Params;
type SaveResult = SaveFacebookAccount.Result;

export class PgUserAccountRepository extends PgRepository implements LoadUserAccount, SaveFacebookAccount {
  async load({ email }: LoadParams): Promise<LoadResult> {
    const pgUserRepo = this.getRepository(PgUser);
    const pgUser = await pgUserRepo.findOne({ email });
    if (pgUser) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined,
      };
    }
  }

  async saveWithFacebook({ id, name, email, facebookId }: SaveParams): Promise<SaveResult> {
    let resultId: string;
    const pgUserRepo = this.getRepository(PgUser);
    if (id === undefined) {
      const pgUser = await pgUserRepo.save({ email, name, facebookId });
      resultId = pgUser.id.toString();
    } else {
      resultId = id;
      await pgUserRepo.update({ id: parseInt(id) }, { name, facebookId });
    }
    return { id: resultId };
  }
}
