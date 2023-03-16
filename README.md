# Rep-Counter

## Frontend

The frontend is React, made with ant design components.  
For now, only mobile view is supported.  

Hosted on netlify, just push to master, and it updates.  

## Backend

The backend is AWS Api Gateway, Lambda, Cognito, and DynamoDB.  
Serverless framework is used as IAC.  

Deploy with sls (see package.json).  

## Authentication

Using AWS Cognito for authentication.  
For now, only login is supported. Create users in the aws dashboard.  
You have to change the password after user creation, you can do it in the terminal: aws cognito-idp admin-set-user-password --user-pool-id eu-central-1_rQJIRknvf --username leviouss@gmail.com --password SomePassword123 --permanent --profile serverless
