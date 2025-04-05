import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HealthCheckerModule } from './health-checker/health-checker.module';

export const BASE_PLATFORM_IMPORTS = [HealthCheckerModule];
@Module({
  imports: [...BASE_PLATFORM_IMPORTS],
  controllers: [],
  providers: [
    //   {
    //     provide: APP_INTERCEPTOR,
    //     useClass: ActivityLogInterceptor,
    //   },
  ],
})
export class BaseModule {}
