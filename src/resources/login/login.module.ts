// import { forwardRef, Module } from '@nestjs/common';
// import { LoginService } from './login.service';
// import { LoginController } from './login.controller';
// import { UsersModule } from '../users/users.module';
// import { JwtModule } from '@nestjs/jwt';

// @Module({
//   imports: [
//     forwardRef(() => UsersModule),
//     JwtModule.register({
//       secret: process.env.JWT_SECRET_KEY || 'SECRET',
//       signOptions: {
//         expiresIn: '24h'
//       }
//     })
//   ],
//   providers: [LoginService],
//   controllers: [LoginController],
//   exports: [
//     LoginService,
//     JwtModule
//   ]
// })
// export class LoginModule {}