import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { Social } from "../social.entity";

export class SocialsPipe implements PipeTransform<Social> {
  transform(value: Social, metadata: ArgumentMetadata): any {
    if (value.isShow !== null) {
      value.isShow = this.stringToBoolean(value.isShow.toString());
    }
    return value;
  }

  private stringToBoolean(isShow: string): boolean {
    switch (isShow.toLowerCase().trim()) {
      case "true":
      case "yes":
      case "1":
        return true;
      case "false":
      case "no":
      case "0":
      case null:
        return false;
      default:
        return Boolean(isShow);
    }
  }
}
