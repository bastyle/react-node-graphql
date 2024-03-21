# comp308-group-project

## server side (backend)
server folder contains nodeJS code for the backend
```sh
cd server/
npm start
```

## client side (frontend)
client folder contains reactJS code for the frontend application

```sh
cd client/
npm start
```

# Deployments (Render)

## api deployed


must return {"msg":"OK"}

## website deployed



## Environment Variables:
Create a .env file in the root directory and configure the necessary environment variables, including MongoDB connection details, and other required parameters.

Example .env file:

```sh
MONGODB_URL=<your_mongodb_url>
JWT_SECRET=<your_secret>
PORT=<your_server_port>
```

### Features
1. Health Check Endpoint
    - Endpoint: /api/health
    - Method: GET
    - Description: Used for basic health checking. Responds with a JSON message "OK" when the server is running.

2. Secured Health Check Endpoint
    - Endpoint: /api/secured-health
    - Method: GET
    - Description: Similar to the health check endpoint, but requires authentication. Responds with a JSON message "OK" when the server is running and the user is authenticated.

3. User CRUD Operations
    - Endpoint: /api/users
    - Methods: GET, POST, PUT, DELETE
    - Description: Allows creating, reading, updating, and deleting user records.

4. User Login
    - Endpoint: /api/users/login
    - Method: POST
    - Description: Allows users to authenticate and obtain a JWT token for accessing secured endpoints.


### Health Check:
Access the health check endpoint at http://localhost:<your_port>/api/health to ensure the server is running.

###
##

## Postman Collection
To import the Postman collection and environment file, follow these steps:

1. Open Postman.
2. Click on the "Import" button located at the top left corner of the application.
3. In the opened dialog, select the "Upload Files" option.
4. Navigate to the `./server/postman/` directory in your project.
5. Select both `comp308-group-project.postman_collection.json` and `comp308-group-project-local.postman_environment.json` files and click on the "Open" button.

After importing, you should see the collection in the "Collections" tab on the left side of the Postman interface. The environment file should be available in the "Environment" dropdown at the top right corner of the Postman interface.

To use the imported environment, select it from the "Environment" dropdown. Now, when you send requests from the imported collection, the variables defined in the environment file will be used.