import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { ViewsModule } from '../api/views/views.module';

@Module({
  imports: [ViewsModule],
  providers: [EventsGateway],
})
export class EventsModule {}
