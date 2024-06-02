import { Body, Controller, Get, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

import { AuthService } from '@auth/auth.service';
import { LocalAuthGuard } from '@auth/local-auth.guard';
import { Public } from '@common/public.annotation';
import { ResponseDto } from '@common/response/response.format';
import { LoginDto } from '@user/dto/user-login.dto';

@Controller('auth')
export class AuthController {
    constructor(readonly authService: AuthService) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @UsePipes(ValidationPipe)
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<ResponseDto<any>> {
        return new ResponseDto(await this.authService.login(loginDto));
    }

    @Get('profile')
    getProfile(@Request() req): Promise<any> {
        return req.user;
    }
}
