import { DataSource } from "typeorm";

import Product from "@modules/products/infra/typeorm/entities/Product";
import User from "@modules/users/infra/typeorm/entities/User";
import UserToken from "@modules/users/infra/typeorm/entities/user_token";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import Order from "@modules/orders/infra/typeorm/entities/Order";
import OrdersProducts from "@modules/orders/infra/typeorm/entities/OrdersProducts";

import { CreateProducts1723429432471 } from "./migrations/1723429432471-CreateProducts";
import { CreateUsers1723916463309 } from "./migrations/1723916463309-CreateUsers";
import { CreateUserTokens1724245742887 } from "./migrations/1724697462742-CreateUserTokens";
import { CreateOrders1727549911431 } from "./migrations/1727549911431-CreateOrders";
import { CreateOrdersProducts1727551918474 } from "./migrations/1727551918474-CreateOrdersProducts";
import { AddOrderIdToOrdersProducts1727552284179 } from "./migrations/1727552284179-AddOrderIdToOrdersProducts";
import { AddProductIdToOrdersProducts1727553513733 } from "./migrations/1727553513733-AddProductIdToOrdersProducts";
import { CreateCustomers1731118783562 } from "./migrations/1731118783562-CreateCustomers";
import { AddCustomerIdToOrders1731118906015 } from "./migrations/1731118906015-AddCustomerIdToOrders";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "apivendas",
    entities: [Product, User, UserToken, Customer, Order, OrdersProducts],
    migrations: [
        CreateProducts1723429432471,
        CreateUsers1723916463309,
        CreateUserTokens1724245742887,
        CreateOrders1727549911431 ,
        CreateOrdersProducts1727551918474,
        AddOrderIdToOrdersProducts1727552284179,
        AddProductIdToOrdersProducts1727553513733,
        CreateCustomers1731118783562,
        AddCustomerIdToOrders1731118906015
    ]
})