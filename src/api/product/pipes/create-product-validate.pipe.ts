import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { Product } from '../product.entity';
import { CategoriesProduct } from '../enum-product.category';

export class CreateProductPipe implements PipeTransform<Product> {
  readonly allowedCategory = [
    CategoriesProduct.ROOF_FOLDING,
    CategoriesProduct.EAVES,
    CategoriesProduct.OUTHOUSE,
    CategoriesProduct.OTHER,
  ];

  transform(value: Product, metadata: ArgumentMetadata) {
    if (value.price) {
      const price = parseInt(value.price.toString(), 10);
      if (isNaN(price)) {
        throw new BadRequestException('Giá tiền phải là số');
      } else {
        value.price = price;
      }
    }

    if (value.category) {
      if (!this.isStatusValid(value.category)) {
        throw new BadRequestException(
          `"${value.category}" is an invalid category`,
        );
      }
    }

    if (value.guarantee) {
      const guarantee = parseInt(value.guarantee.toString(), 10);
      if (isNaN(guarantee)) {
        throw new BadRequestException('Thời gian bảo hành phải là số');
      } else {
        value.guarantee = guarantee;
      }
    }
    if (value.sold) {
      const sold = parseInt(value.sold.toString(), 10);
      if (isNaN(sold)) {
        throw new BadRequestException('Số lượng đã bán phải là số');
      } else {
        value.sold = sold;
      }
    }
    if (value.isHotDeal !== null) {
      console.log(value.isHotDeal);
      value.isHotDeal = CreateProductPipe.stringToBoolean(
        value?.isHotDeal?.toString(),
      );
    }

    if (value.views) {
      const views = parseInt(value.views.toString(), 10);
      if (isNaN(views)) {
        throw new BadRequestException('Số lượt xem phải là số');
      } else {
        value.views = views;
      }
    }
    return value;
  }

  private static stringToBoolean(isHotDeal: string): boolean {
    switch (isHotDeal?.toLowerCase()?.trim()) {
      case 'true':
      case 'yes':
      case '1':
        return true;
      case 'false':
      case 'no':
      case '0':
      case null:
        return false;
      default:
        return Boolean(isHotDeal);
    }
  }

  private isStatusValid(status: any) {
    const idx = this.allowedCategory.indexOf(status);
    return idx !== -1;
  }
}
