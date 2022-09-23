import Product from "@modules/products/typeorm/entities/Product";
import { ProductRepository } from "@modules/products/typeorm/repositories/ProductsRepository";
import { getCustomRepository } from "typeorm";


class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);
    
    const products = productsRepository.find();

    return products;
  }
}

export default ListProductService;