import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserSelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      
      console.log(req.user.id)

      if (String(req.user.id) != req.params.id) {
          throw new UnauthorizedException({
              message: 'Ruxsat etilmagan',
            });
        }

      return true;
    } catch (error) {
      throw new HttpException(
          'Ruxsat etilmagan foydalanuvchi',
          HttpStatus.FORBIDDEN
        );
    }
  }
}
