import { createUserTable } from "../models/userTable.js"
import { createOrdersTable } from "../models/ordersTable.js"
import { createOrderItemTable } from "../models/orderItemsTable.js"
import { createPaymentsTable } from "../models/paymentsTable.js"
import { createProductsTable } from "../models/productTable.js"
import { createProductReviewsTable } from "../models/productReviewsTable.js"
import { createShippingInfoTable } from "../models/shippinginfoTable.js"

export const createTables = async () => {
    try {

        // 1. Tables with no dependencies
        await createUserTable();
        await createProductsTable();

        // 2. Tables depending on users/products
        await createOrdersTable();       // depends on users
        await createOrderItemTable();    // depends on orders + products

        // 3. Tables depending on orders
        await createPaymentsTable();     // depends on orders
        await createShippingInfoTable(); // depends on orders

        // 4. Tables depending on products + users
        await createProductReviewsTable(); // depends on products + users

        console.log("All tables created successfully!");
    } catch (error) {
        console.error("Error creating tables,", error);
    }
}
