import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { JwtStrategy } from '@auth/jwt.strategy';
import { jwtConstants } from '@common/jwt.constant';
import { UserModule } from '@user/user.module';

@Module({
  imports: [UserModule, PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: jwtConstants.signOptions
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
