
The OCWA-Data application was created as an inteview assessment assignment for Ontario Clean Water Agency.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Clone the application from [GitHub](https://github.com/syed-ods/ocwa-data.git):
```bash
git clone https://github.com/syed-ods/ocwa-data.git
```
Request access:
If you cannot access the application, please request access from: [syed.hassan@ontario.ca](mailto:syed.hassan@ontario.ca)


Run the application locally:
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

### Application Structure
The OCWA-data application is a full-stack application powered by Next.js with both static and server-side functionality. The application database is powered by SQL, a PostgreSQL database. Both the application and the database are hosted at [Vercel](https://ocwa-data.vercel.app).

The application includes back-end logic: data fetching from the database using `route.js` files, and the front-end logic to render the application pages using `page.js` files.

**Back-end logic**: `/app/api` within all the `route.js` files.
**Front-end logic**: `/app` within all the `page.js` files.

#### Folder Structure
- 📂 app
    - 📂 api
        - 📂 create-sql-table
                - *route.js*
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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Application Features
### Requested Features
1. Submit some new data and generate a record of submittal into a SQL database. ✅
2. Validate new data submittal against historically observed range with error handling for invalid data. Provide visual cues to guide user to validity issues. ✅
3. Allow user to make edits on the submittal components, e.g. where flagged by validation, and update database & any front-end visualization accordingly. ✅
4. Writing to a SQL database with data edited using the front-end. ✅

### Current Features (MVP+)
- Browse/read data,
- Create/add data,
- Update/edit data,
- Delete data,
- Create Tables using GET requests,
- Route to nested pages and directories,
- Dynamic Routing and site navigation,
- Form validation (HTML),
- Error handling,
- Server-side rendering,
- Secure database and access variables,
- [Ontario Design System](https://designsystem.ontario.ca) integraion.

### Up Next
The application despite its smooth core functionality requires more features and checks. Here are some projected updates:
- Incorporate user authenticaiton (using Express.js or any other framework).
- Testing: unit, integraion, and end to end tests.
- Security: more input checks to avoid SQL injections and prevent other attacks.
- Dynamic table creation and validation. Currently, these two features are limited to specific requests and created for the data of interest only.


##### End of documentation
by: **Syed Hassan**
