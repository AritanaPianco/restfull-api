import {Request, Response} from 'express';
import CreateCustomerService from '../../../services/CreateCustomerService';
import ShowCustomerService from '../../../services/ShowCustomerService';
import ListCustomersService from '../../../services/ListCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';
import { container } from 'tsyringe';



export default class CustomersController{

      public async index(request: Request, response: Response): Promise<Response> {
               const page = request.query.page ? Number(request.query.page) : 1;
               const limit = request.query.limit ? Number(request.query.limit) : 10; 

               const listCustomers = container.resolve(ListCustomersService);
               const customers = await listCustomers.execute({ page, limit });
               return response.json(customers);
      }

      public async show(request: Request, response: Response): Promise<Response>{
              const customer_id = request.params.id;
              const showCustomer = container.resolve(ShowCustomerService);
              const customer = await showCustomer.execute({customer_id});

              return response.json(customer);
      }

      public async create(request: Request, response: Response): Promise<Response>{
               const {name, email} = request.body;

               const createCustomer =  container.resolve(CreateCustomerService);
               const customer = await createCustomer.execute({name, email});

               return response.json(customer);
      }

      public async update(request: Request, response: Response): Promise<Response>{
             const customer_id = request.params.id;
             const {name, email} = request.body;
             const updateCustomer = container.resolve(UpdateCustomerService);
             const customer = await updateCustomer.execute({customer_id,name, email});

             return response.json(customer);
      }

      public async delete(request: Request, response: Response): Promise<void>{
            const customer_id = request.params.id;
            const deleteCustomer = container.resolve(DeleteCustomerService);
            await deleteCustomer.execute({customer_id});
      }


}
