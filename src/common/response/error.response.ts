import {
  ForbiddenException,
  NotAcceptableException,
  NotFoundException
} from '@nestjs/common';

export class ErrorType {
  public static USER_NOT_FOUND = () => {
    return new NotFoundException('해당 이메일을 가진 유저를 찾을 수 없습니다!');
  };
  public static INCORRECT_PASSWORD = () => {
    return new NotAcceptableException('올바르지 않은 비밀번호입니다!');
  };

  public static EMAIL_DUPLICATE = () => {
    return new NotAcceptableException('해당 이메일을 가진 유저가 존재합니다!');
  };

  public static FORBIDDEN_ACCESS = () => {
    return new ForbiddenException('접근 권한이 없습니다!');
  };
}