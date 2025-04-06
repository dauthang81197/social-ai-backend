import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserGroupEnum } from 'src/common/enum';
import { LogExecutionTime } from 'src/decorators/log-execution-time.decorator';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';

@Controller('admin/auth')
@ApiTags('admin-auth')
@ApiBearerAuth()
@LogExecutionTime()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Admin login successfully',
  })
  @ApiBadRequestResponse({
    description: 'Username or password incorrect',
  })
  login(@Body() loginDto: LoginDto, @Req() req) {
    const headers = req.headers;
    return this.authService.login(loginDto, headers, UserGroupEnum.SYSTEM);
  }
}
