import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    register(
        @Body() registerDto: RegisterDto,
    ) {
        return this.authService.register(registerDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(
        @Body() loginDto: LoginDto
    ) {
        return this.authService.login(loginDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('profile')
    profile(@Request() req) {
        return req.user;
    }

    @Post('verify_email')
    validateEmail(@Body() verifyEmailDto: VerifyEmailDto) {
        return this.authService.verifyEmail(verifyEmailDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put('update-profile')
    async updateProfile(@Request() req, @Body() updateData: UpdateProfileDto) {
        const userId = req.user.id;
        console.log('ID', userId)
        const updatedUser = await this.authService.updateUserProfile(userId, updateData);
        console.log('UPDATE', updatedUser)

        return { message: 'Perfil actualizado con éxito', user: updatedUser };
    }
}
