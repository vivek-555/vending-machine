import { ValidationError } from "../shared/custom-errors";
import { getChange, isNumber } from "../shared/helper";
import { UserService } from "../user/service";
import { Product } from "./entity";

export class ProductService {
    /**
     * user purchases the product
     * @param productId id of product
     * @param quantityForPurchase number of products
     * @param username of buyer
     * @returns amount spent, product bought and balance in coin denominations
     */
    async purchaseProduct(productId: string, quantityForPurchase: string, username: string) {
        if (!isNumber(quantityForPurchase)) {
            throw new ValidationError('quantity must be a numerical value');
        }

        const quantity = Number(quantityForPurchase);
        const userService = new UserService();
        const buyer = await userService.getUser(username);
        const product = await this.getProduct(productId);

        const fundsAvailable = buyer.deposit;
        const costOfTransaction = quantity * product.cost;

        if (fundsAvailable < costOfTransaction) {
            throw new ValidationError('deposit is not sufficient to purchase the product')
        }

        const blanaceDeposit = fundsAvailable - costOfTransaction;
        userService.updateUser(username, blanaceDeposit);

        return {
            expense: costOfTransaction,
            product: `${product.name} x ${quantity}`,
            balanceDenominations: getChange(blanaceDeposit)
        };
    }

    /**
     * returns product from db
     * @param productId id of product
     * @returns Product entity
     */
    async getProduct(productId: string) {
        const productRepository = Product.getRepository();

        const productFound = await productRepository.findOneBy({ id: productId });
        if (!productFound) {
            throw new ValidationError('product does not exist');    // Should we have different error class?
        }
        return productFound;
    }

    /**
    * returns all products without pagination(for now)
    * @returns Product entities in array
    */
    async getProducts() {
        const productRepository = Product.getRepository();

        const productsFound = await productRepository.find();
        return productsFound;
    }

    async createProduct(name: string, cost: number, quantityAvailable: number, sellerEmail: string) {
        const productRepository = Product.getRepository();

        const productsFound = await productRepository.find();
        return productsFound;
    }
}