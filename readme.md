# MicroBuy Microservices

This application is a distributed system that was created to implement microservices concepts.

## Application flow

1. At `Home` page user creates a new order based on the products listing.
2. System creates a corresponding coupon based on the order generated from user's products.
3. System list all pendent coupons on `Orders` page and send a email confirmation to user based on the provided email for each pendent coupon.

<img src="https://i.ibb.co/7NTz38J/Screenshot-2024-12-31-at-11-31-03.png"/>

## Screenshots

### Home page
<img src="https://i.ibb.co/0qNLWVR/Screenshot-2024-12-31-at-11-31-50.png"/>

### Orders page
<img src="https://i.ibb.co/wY0TBN7/Screenshot-2024-12-31-at-13-41-43.png"/>

## Technologies used

- PrismaORM.
- PostgreSQL.
- Nest.
- GraphQL.
- RabbitMQ.
- NextJS.
- TailwindCSS.

## How to execute the application

1. Be sure you have Docker installed on your machine.
2. Clone this repository.
3. Provide .env containing all required environment variables according the .env.example of each service.
4. Run docker-compose build. All containers will be initialized.
5. With the containers running, access the coupons-service and orders-service running `docker exec -it coupons-service bash`, and `docker exec -it orders-service bash` and `run npx prisma migrate dev` for each service to initialize migrations and turn database accessible for these services.
6. Restart the containers running `docker-compose down` and  `docker-compose build` again.
