import { container } from "tsyringe";

import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersReporitory";
import CustomersRepository from "@modules/customers/infra/typeorm/repositories/CustomersRepository";
import { IOrdersRepository } from "@modules/orders/domain/repositories/IOrdersRepository";
import { OrdersRepository } from "@modules/orders/infra/typeorm/repositories/OrdersRepository";
import { IProductsRepository } from "@modules/products/domain/repositories/IProductsRepository";
import { ProductRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import { IUserRepository } from "@modules/users/domain/repositories/IUsersRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import UserTokensRepository from "@modules/users/infra/typeorm/repositories/UserTokensRepository";
import { IUsersTokenRepositorie } from "@modules/users/domain/repositories/IUserTokenRepository";

import '@modules/users/providers';

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository);
container.registerSingleton<IOrdersRepository>('OrdersRepository', OrdersRepository);
container.registerSingleton<IProductsRepository>('ProductRepository', ProductRepository);
container.registerSingleton<IUserRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IUsersTokenRepositorie>('UserTokensRepository', UserTokensRepository)