import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';

import { UsersModule } from './users/users.module';

import { AuthenticationModule } from './authentication/authentication.module';
import { CategoriesModule } from './categories/categories.module';
import { SubscribersModule } from './subcribers/subcribers.module';
import { ChatModule } from './chat/chat.module';

import { EmailModule } from './email/email.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailSchedulingModule } from './emailScheduling/emailScheduling.module';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { SmsModule } from './sms/sms.module';
// import { GoogleAuthenticationModule } from './google-authentication/google-authentication.module';







 
@Module({
  imports: [
    DatabaseModule,
    PostsModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({

        // GOOGLE_AUTH_CLIENT_ID: Joi.string().required(),
        // GOOGLE_AUTH_CLIENT_SECRET: Joi.string().required(),

        TWILIO_ACCOUNT_SID: Joi.string().required(),
        TWILIO_AUTH_TOKEN: Joi.string().required(),
        TWILIO_VERIFICATION_SERVICE_SID: Joi.string().required(),

        EMAIL_SERVICE: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
        
        JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        EMAIL_CONFIRMATION_URL: Joi.string().required(),

        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),

        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),

        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        
        
        
      })
    }),
    UsersModule,
    AuthenticationModule,
    CategoriesModule,
    SubscribersModule,
    ChatModule,
    EmailModule,
    EmailSchedulingModule,
    ScheduleModule.forRoot(),
    EmailConfirmationModule,
    SmsModule,
    // GoogleAuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}