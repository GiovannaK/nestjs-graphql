import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { AuthInput } from 'src/user/dto/auth-input';
import { AuthType } from 'src/user/dto/auth.type';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: AuthInput): Promise<AuthType> {
    const user = await this.userService.findUserByEmail(data.email);

    const isPasswordMatch = compareSync(data.password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const token = await this.jwtToken(user);

    return {
      user,
      token,
    };
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = { username: user.name, sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
  }
}
