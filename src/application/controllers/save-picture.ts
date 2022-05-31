import { HttpResponse, ok } from '@/application/helpers';
import { ChangeProfilePicture } from '@/domain/use-cases';
import { Controller } from '@/application/controllers';
import { AllowedMimeTypes, MaxFileSize, Required, RequiredBuffer, Validator } from '@/application/validation';

type HttpRequest = { file: { buffer: Buffer, mimeType: string }, userId: string };
type Model = Error | { initials?: string, pictureUrl?: string };

export class SavePictureController extends Controller {
  constructor(private readonly changeProfilePicture: ChangeProfilePicture) {
    super();
  }

  async perform({ file, userId }: HttpRequest): Promise<HttpResponse<Model>> {
    const data = await this.changeProfilePicture({ id: userId, file: file.buffer });
    return ok(data);
  }

  buildValidators({ file }: HttpRequest): Validator[] {
    return [
      new Required(file, 'file'),
      new RequiredBuffer(file.buffer, 'file'),
      new AllowedMimeTypes(['png', 'jpg'], file.mimeType),
      new MaxFileSize(5, file.buffer),
    ];
  }
}
