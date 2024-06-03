import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { jwtConstants } from '@common/jwt.constant';
import { ErrorType } from '@common/response/error.response';
import { UserService } from '@user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    let user = await this.userService.findByEmail(payload.email);

    if(!user)
      throw ErrorType.USER_NOT_FOUND();

    return { email: payload.email };
  }
}