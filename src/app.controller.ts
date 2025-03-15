import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly healthCheck: HealthCheckService,
    private readonly typeOrmHealthIndicator: TypeOrmHealthIndicator,
    private readonly m: MemoryHealthIndicator,
    private readonly d: DiskHealthIndicator,
  ) {}
  @Get()
  @HealthCheck()
  getHello() {
    return this.healthCheck.check([
      () => this.typeOrmHealthIndicator.pingCheck('database'),
      () => this.m.checkHeap('memory heap', 300 * 1024 * 1024),
      () => this.m.checkRSS('memory rss', 300 * 1024 * 1024),
      () =>
        this.d.checkStorage('disk health', {
          thresholdPercent: 0.5,
          path: '/',
        }),
    ]);
  }
}
