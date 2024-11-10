# Development of basic components of an online store using Generic types in TypeScript 

## Repository Overview

Develop basic functions for managing goods in the online store. The system must be able to work with different types of goods (electronics, clothes).

## Steps Completed

1. **Branch Creation**:
    - Created a new branch `feature/pr5/generic` from the main branch.

2. **TypeScript Installation**:
    - Installed TypeScript in the `feature/pr5/generic` branch using the following command:
      ```bash
      npm install typescript
      ```
    - Initialized a `tsconfig.json` file using:
      ```bash
      npx tsc --init
      ```

3. **Creating Product Types**:
    - Defining a base product type, BaseProduct, which includes essential fields such as id, name, and price. Building on this, we created specific product types like Electronics and Clothing, each extending BaseProduct and adding category-specific fields.

4. **Creating Product Search Functions**:
    - Implemented a generic function, findProduct, which takes an array of products and an id to locate a specific product. Also, was developed a filterByPrice function that filters products based on a maximum price, ensuring flexibility across different product types.

5. **Creating a Shopping Cart**:
    - For the shopping cart, there was defined a CartItem type that pairs a product with its quantity. Then i wrote functions such as addToCart to add products to the cart and calculateTotal to compute the total cost of items in the cart, maintaining type safety throughout.

6. **Using the Functions**:
    - I've created test data for various product types and demonstrated the functionality of developed functions. This included finding products, adding them to the cart, and calculating the total cost, showcasing the system's ability to handle different product categories.

7. **Requirements**:
    - Type-Safe Functions:
To ensure type safety, I used TypeScript's powerful type system. By defining specific types like BaseProduct, Electronics, and Clothing, I ensured that each function operates on well-defined data structures. The use of generics, such as in findProduct<T extends BaseProduct>, allows these functions to handle various product types while maintaining strict type constraints. This prevents errors from incorrect data handling and ensures predictable behavior with any valid input.

    - Using Functions Only (No Classes):
I use functions exclusively for all operations, following a functional programming paradigm. This approach simplifies the code by avoiding the complexities of class-based object-oriented programming. Functions like addToCart and calculateTotal are designed to be pure and reusable, focusing on input-output transformations without maintaining internal state.

    - Adding Comments to Functions:
Each function in the project is accompanied by comments explaining its purpose, parameters, and return values. 

    - Validating Input Data: 
    Input validation is a crucial part of the project to ensure data integrity and prevent runtime errors. For example, in addToCart, I check if the product exists before adding it to the cart and validate that the quantity is a positive integer. Similarly, findProduct checks if the provided ID matches any product in the list. These checks are essential to handle edge cases gracefully and provide meaningful feedback in case of invalid input.

8. **Testing**
![Alt text](Screenshot_1.png)

## Repository Link

[GitHub Repository Link](https://github.com/KpoJleBapKa/kpojlebapka.github.io/tree/feature/pr4/modules)