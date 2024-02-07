# vending-machine
simple apis for vending machine scenario

### considerations
1. implement product model with amountAvailable, cost (should be in multiples of 5), productName and sellerId fields
1. implement user model with username, password, deposit and role fields
1. implement an authentication method
1. all of the endpoints should be authenticated unless stated otherwise
1. implement CRUD for users
1. implement CRUD for a product model
1. implement /deposit endpoint so users with a “buyer” role can deposit 
1. implement /buy endpoint
1. implement /reset endpoint
1. list edge cases
1. tests for /deposit, /buy and one CRUD endpoint
1.  /logout/all endpoint