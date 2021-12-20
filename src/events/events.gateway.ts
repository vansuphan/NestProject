import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ViewsService } from '../api/views/views.service';

@WebSocketGateway(3002)
export class EventsGateway {
  constructor(private readonly viewService: ViewsService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  async findAll(@MessageBody() data: any): Promise<void> {
    try {
      this.server.use((socket, fn) => {
        if (socket.connected) {
          console.log('connected');
          // this.viewService.createViews(data["views"]);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
