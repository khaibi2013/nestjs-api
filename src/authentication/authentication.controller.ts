
import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, Get, UseInterceptors, ClassSerializerInterceptor, SerializeOptions } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import { Response } from 'express';
import JwtAuthenticationGuard from './jwt-authentication.guard';
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
    strategy: 'excludeAll'
  })
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {}
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
 
 @Post('register')
async register(@Body() registrationData: RegisterDto) {
  return this.authenticationService.register(registrationData);
}
 
@HttpCode(200)
@UseGuards(LocalAuthenticationGuard)
@Post('log-in')
async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
  const {user} = request;
  const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
  response.setHeader('Set-Cookie', cookie);
  user.password = undefined;
  return response.send(user);
}

// @HttpCode(200)
// @UseGuards(LocalAuthenticationGuard)
// @Post('log-in')
// async logIn(@Req() request: RequestWithUser) {
//   const {user} = request;
//   const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
//   request.res.setHeader('Set-Cookie', cookie);
//   return user;
// }
@UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
    return response.sendStatus(200);
  }
}