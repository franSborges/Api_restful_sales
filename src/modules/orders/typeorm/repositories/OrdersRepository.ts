import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';
import Customer from '@modules/customers/typeorm/entities/Customer';


interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}


@EntityRepository(Order)
class OdersRepository extends Repository<Order> {
  public async findByName(name: string): Promise<Order | undefined> {
    const order = await this.findOne({
      where: {
        name,
      },
    });

    return order;
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = await this.findOne({
      where: {
        id,
      },
    });

    return order;
  }

  public async findByEmail(email: string): Promise<Order | undefined> {
    const order = await this.findOne({
      where: {
        email,
      },
    });

    return order;
  }

  public async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  }
}

export default OdersRepository;