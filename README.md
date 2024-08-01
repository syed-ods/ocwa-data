
The Next-CRUD application was created for interview assessments. 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting started

Clone the application from [GitHub](https://github.com/syed-ods/ocwa-data.git):
```bash
git clone https://github.com/syed-ods/next-crud-app.git
```

Request access:
If you cannot access the application, please request access from: [syed.hassan@ontario.ca](mailto:syed.hassan@ontario.ca)

### Setting up the environment variables
Make sure to request access to the secure environment variables. If you already have the variables, make sure to save them in a local `.env.development.local` file within the root directory of the project.


#### Run the application locally:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Application structure
The NEXT-CRUD application is a full-stack application powered by Next.js with both static and server-side functionality. The application database is powered by SQL, a PostgreSQL database. Both the application and the database are hosted at [Vercel](https://ocwa-data.vercel.app).

The application includes back-end logic: data fetching from the database using `route.js` files, and the front-end logic to render the application pages using `page.js` files.

**Back-end logic**: `/app/api` within all the `route.js` files.
**Front-end logic**: `/app` within all the `page.js` files.

#### Folder structure
- 📂 app
    - 📂 api
        -   📂 auth
            - 📂 login
                - *route.js*
            - 📂 register
                - *route.js*
            - authController.js
        - 📂 tables
            - *route.js*
            - 📂 [table] (dynamic table template)
                - *route.js*
                - 📂 [id] (dynamic table routes with unique identifiers for edit and delete functionality)
                    - *route.js*
                    - 📂 delete (Delete records)
                        - *route.js*
                    - 📂 update (Update records)
                        - *route.js*
                - 📂 add (Add records)
                    - *route.js*
    - 📂 components
        - DataCard.js
        - Form.js
    - 📂 login
        - *page.js* (login page template)
    - 📂 register
        - *page.js* (register page template)
    - 📂 middleware
        - *authMiddleware.js*
    - 📂 models
        - *users.js*
    - 📂 tables (A page that lists all the tables in the database)
        - *page.js* 
        - 📂 [table] (For dynamic table pages that include each record)
            - *page.js*
            - 📂 [id] (For unique records to update and delete)
            - *page.js*
                - 📂 update (Edit page temlplate to update and delete records)
                    - *page.js*
        - 📂 add (Add page template)
            - *page.js*

The application is developed creating scale in mind – the same logic can be used to enchance the size of this application and its features.
The code is reproducible and can be tested. You might require access variables to fetch data from the database. Please contact [Syed Hassan](mailto:syed.hassan@ontario.ca) to acquire the passwords and environment variables.

## Application features

### Current features (MVP+)
- Basic login and register,
- Browse/read data,
- Create/add data,
- Update/edit data,
- Delete data,
- Route to nested pages and directories,
- Dynamic Routing and site navigation,
- Form validation (server side),
- Error handling (within each file),
- Server-side rendering,
- Secure database and access variables,
- [Ontario Design System](https://designsystem.ontario.ca) integraion.
- Notification data table,
- Filter data from last 30 days,
- View count by product category.

### Up next
The application despite its smooth core functionality requires more features and checks. Here are some projected updates:
- Working notification system.
- Testing: unit, integraion, and end to end tests.
- Security: more input checks to avoid SQL injections and prevent other attacks.
- Dynamic table creation and Form validation. .


##### End of documentation
by: **Syed Hassan**
