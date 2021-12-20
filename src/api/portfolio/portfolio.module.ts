import { Module } from "@nestjs/common";
import { PortfolioController } from "./portfolio.controller";
import { PortfolioService } from "./portfolio.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { Portfolio } from "./portfolio.entity";

@Module({
  controllers: [PortfolioController],
  imports: [TypeOrmModule.forFeature([Portfolio]), AuthModule],
  providers: [PortfolioService]
})
export class PortfolioModule {
}
