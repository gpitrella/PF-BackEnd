# PF-BackEnd

BackEnd: Technology Market Final Project
<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Tech Market

## Introduction

This is a student group project, in which all the technologies learned in the SoyHenry bootcamp come together. The project is a fully functional e-commerce of technology products on the user side, as well as on the side of the administrator or owner of the e-commerce.

## Project Objetives

- Build a JavaScript App from scratch
- Afirm and conect all the learned concepts in the Carreer 
- Learn and practice GIT workflow / team work
- Use Scrum agile methodology

## Stack of Technologies

### Front End:
HTML, CSS, Javascript, React, React-Bootstrap, Redux, SendGrid, Google and Mercado Pago Integration, Material UI, SASS

### Back End:
Node.js, Express, Passport, Sequelize

### Database:
PostgreSQL

## **Starting Instructions** 

__IMPORTANT:__ Necesary version of node and NPM 

 * __Node__: 12.18.3 or higher
 * __NPM__: 6.14.16 or higher

 
## BoilerPlate

The boilerPlate has two folders: `api` and `client`.
You can find the first folder 'client' in this repo and the second folder like 'PF-BackEnd' in this same github.

Inside `api` you must have to create a file called: `.env` 
that has the following form: 

```
DB_USER=postgress
DB_PASSWORD=12345
DB_HOST=localhost:5432
PORT=3001
DB_KEY=techmarket
ACCESS_TOKEN=*****

# Auth Config
AUTH_SECRET=****
AUTH_EXPIRES=1d
AUTH_ROUNDS=10
CLIENT_URL=http://localhost:3000
GOOGLE_CLIENT_ID=*****
GOOGLE_CLIENT_SECRET=*****
SENDGRID_API_KEY=*****
```

You have to replace `DB_USER` and `DB_PASSWORD` with your own credentials to connect to postgres database. This file will be ignored by github, as it contains sensitive information (the credentials).

The `DB_KEY` is a random security keyword, you can change or keep it. 
The `ACCESS_TOKEN` is a security keyword to Mercado Pago, you can create one in this platform and make a success buy. In this link https://www.mercadopago.com.ar/developers/es/docs/checkout-api/integration-test/test-cards you can get all information to check a success buy in TechMarket.

In Auth Config you must generated your own Google and SendGrid credential to use this functionalities.

## Next 
### _Connect the data base_

 - Go to your postgres database manager and create a new  database called `techmarket`, this is the name of the database to which we will connect.

### _Install the necesary package to run it_

- Open the project console
    + Inside `api` folder, run the command line, `npm install`
    + Inside `client` folder, run the command line, `npm install` 

### _Run the project_

- Open the project console
    + Inside `api` folder, run the command line, `npm start`
    + Inside `api` folder, run the command line, `node Api-Store.js` and `node Api-Users.js` to create standard products and users.
        
    + Inside `client` folder, run the command line, `npm start` (go to http://localhost:3000/) 

# For testing

- You can find in `api/index.js`
    + `conn.sync({ force: false })`, switch it between " true " ( if you want reset database in each loaded ) or " false "( if you dont want reset database in each loaded ) 

- You can use a testing admin user with login credentials, look inside Api-Users.js to find admin users and a standard user.

# Deploy Project 

Live Proyect TechMarket: https://techmarketfront.vercel.app/
- You can create a standard user to see all funcionality or use this user like admin to see admin funcionality:
    + email: juan@gmail.com
    + password: 123456

# Developers

- Bettina Gamboa: 
    + Linkedin: https://www.linkedin.com/in/bettinagamboa/
    + Github: https://github.com/BeGamboa
    + email: bettinaigamboa@gmail.com

- Federico Faraz
    + Linkedin: www.linkedin.com/in/federicofaraz-fullstack
    + Github: https://github.com/cosm1co
    + email: federicofaraz@gmail.com

- Federico Romero
    + Linkedin: https://www.linkedin.com/in/federico-romero-fullstack
    + Github: https://github.com/RomeroFederico
    + email: romerof14@gmail.com

- Nicolas Burgos
    + Linkedin: https://www.linkedin.com/in/nicolas-exequiel-burgos-fullstackdeveloper/
    + Github: https://github.com/NicoPR22
    + email: nicolasexeburgos@gmail.com

- Enzo Sanchez
    + Linkedin: https://www.linkedin.com/in/enzo-sanchez-733b85165/
    + Github: https://github.com/Enzos97
    + email: enz997.ing.ind@gmail.com

- Lucas Battaglia
    + Linkedin: https://www.linkedin.com/in/battaglialucas/
    + Github: https://github.com/battaglialucas
    + email: lucassebastianbattaglia@gmail.com     

- Horacio Abitu
    + Linkedin: https://www.linkedin.com/in/horacioabitu/
    + Github: https://github.com/dev-back55
    + email: ahabitu@gmail.com

- Gabriel Pitrella
    + Linkedin: https://www.linkedin.com/in/gabrielpitrella
    + Github: https://github.com/gpitrella
    + email: gabrielpitrella@gmail.com

# Project Screens 

- Landing-Page
![LandingTechMarket](https://user-images.githubusercontent.com/71048358/179772764-d54866ec-1910-4a76-a9e3-0dfd1b4d6263.jpg)

- Home Page when we go in
![HomePageTechMarket](https://user-images.githubusercontent.com/71048358/179773853-9624e93e-224d-4953-bb38-0cc91b6b4bdb.jpg)

- Register, we can do it using the ecommerce platform (by form) or authenticate with github.
![LoginUsers](https://user-images.githubusercontent.com/71048358/179776679-cd9fe376-0dfa-4e1d-be92-c5a2dda6c0d0.jpg)

 - Store products
![StoreTechMarket](https://user-images.githubusercontent.com/71048358/179776365-f81b1888-ca14-4f45-8f1e-f11ab2c97903.jpg)

 - Products in detail
![ProductDetailsTechMarket](https://user-images.githubusercontent.com/71048358/179791201-eabf8df5-00b4-4872-9750-5422ccad75a8.jpg)

- User Profile
![UserProfileTechMarket](https://user-images.githubusercontent.com/71048358/179780809-b1d61ead-5763-47cc-ac21-1152199c551a.jpg)
    + We can add reviews to the products that we had purchase
![MyReviews](https://user-images.githubusercontent.com/71048358/179792905-e5463929-7b0d-4ebf-a28c-c2b6380e02b4.jpg)
    + Order Details
![OrderDetails](https://user-images.githubusercontent.com/71048358/179792968-e2740f5f-358d-47ca-9418-ba5102998b4e.jpg)

- Cart
![ProductCart](https://user-images.githubusercontent.com/71048358/179792632-ca441602-61fa-4acd-9723-48816aa2a996.jpg)

- Whish List
![WishList](https://user-images.githubusercontent.com/71048358/179792750-76d6291f-6faa-4bc2-bc39-1fc474751200.jpg)

- Checkout. You can pay using paypal or with a debit/credit card
![CheckOut](https://user-images.githubusercontent.com/71048358/179793148-1475c534-ef78-4513-a50c-7dab30d556ee.jpg)

- There is an admin section where we have a CRUD of products, categories, orders and users.
![AdminPanel](https://user-images.githubusercontent.com/71048358/179793341-17d492c1-8615-474c-a11b-28ad6177f291.jpg)
    + Admin Panel view all products and admin can edit each product.
![AdminPanel1](https://user-images.githubusercontent.com/71048358/179793395-0a7f9c60-4d09-4592-a590-7b3eb63783b5.jpg)
    + Admin can view all orders and update each order.
![AdminPanel2](https://user-images.githubusercontent.com/71048358/179793745-914cab7a-d4c3-48ee-a284-739e046300cb.jpg)
    + Admin can edit each categories and brand or create and detele this.
![AdminPanel3](https://user-images.githubusercontent.com/71048358/179793915-8ad09e6e-3b8c-42f5-9e53-c5b3261efdba.jpg)
