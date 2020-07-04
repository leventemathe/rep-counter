import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import middy from '@middy/core';
import cors from '@middy/http-cors';

export const listExercises = middy(async (_event, _context, _callback) => {
  let scanParams = {
    TableName: process.env.DYNAMO_DB_EXERCISES_TABLE,
  }

  let scanResult;
  try {
    let dynamoDb = new AWS.DynamoDB.DocumentClient();
    scanResult = await dynamoDb.scan(scanParams).promise();
  } catch (scanError) {
    console.log('There was a problem getting the exercises: ', scanError);
    return {
      statusCode: 500,
      body: 'There was a problem getting the exercises.',
    }
  }

  if (!scanResult.Items || !Array.isArray(scanResult.Items || scanResult.Items.length === 0)) {
    return {
      statusCode: 404,
      body: 'There are no exercises.',
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(scanResult.Items.map(exercise => ({ 
      // name: kitten.name,
      // age: kitten.age
    }))),
  }
}).use(cors());



export const getExercise = middy(async (event, _context, _callback) => {
  let getParams = {
    TableName: process.env.DYNAMO_DB_EXERCISES_TABLE,
    Key: {
      // name: event.pathParameters.name
    }
  }

  let getResult;
  try {
    let dynamoDb = new AWS.DynamoDB.DocumentClient();
    getResult = await dynamoDb.get(getParams).promise();
  } catch (getError) {
    console.log('There was a problem getting the exercise: ', getError);
    return {
      statusCode: 500,
      body: 'There was a problem getting the exercise',
    }
  }

  if (!getResult.Item) {
    return {
      statusCode: 404,
      body: 'No exercise found with this name.',
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      // name: getResult.Item.name,
      // age: getResult.Item.age,
    })
  }
}).use(cors());



export const createExercise = middy(async (event, _context, _callback) => {
  // Manual validation here is no longer necessary, because a schema was passed to this Api Gateway endpoint
  const bodyObj = JSON.parse(event.body);

  const putParams = {
    TableName: process.env.DYNAMO_DB_EXERCISES_TABLE,
    Item: {
      // name: bodyObj.name,
      // age: bodyObj.age,
    }
  }
  
  let putResult = {}
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    putResult = await dynamoDb.put(putParams).promise();
  } catch (putError) {
    console.log('There was a problem creating the exercise: ', putError);
    console.log('putParams: ', putParams);
    return {
      statusCode: 500,
      body: 'There was a problem creating the exercise.',
    }
  }

  return {
    statusCode: 201,
    body: JSON.stringify(putResult),
  }
}).use(cors());




export const deleteExercise = middy(async (event, _context, _callback) => {
  let deleteParams = {
    TableName: process.env.DYNAMO_DB_EXERCISES_TABLE,
    Key: {
      // name: event.pathParameters.name
    }
  }

  try {
    let dynamoDb = new AWS.DynamoDB.DocumentClient();
    await dynamoDb.delete(deleteParams).promise();
  } catch (deleteError) {
    console.log('There was a problem deleting the exercise: ', deleteError);
    return {
      statusCode: 500,
      body: 'There was a problem deleting the exercise.',
    }
  }

  return {
    statusCode: 200,
    body: 'There was a problem deleting the exercise',
  }
}).use(cors());




export const addSessionToExercise = middy(async (event, _context, _callback) => {  
  let bodyObj = JSON.parse(event.body);

  let updateParams = {
    TableName: process.env.DYNAMO_DB_EXERCISES_TABLE,
    Key: {
      // name: event.pathParameters.name
    },
    // UpdateExpression: 'set #age = :age',
    // ExpressionAttributeNames: {
    //   '#age': 'age',
    // },
    // ExpressionAttributeValues: {
    //   ':age': bodyObj.age,
    // },
  }

  try {
    let dynamoDb = new AWS.DynamoDB.DocumentClient();
    await dynamoDb.update(updateParams).promise();
  } catch (updateError) {
    console.log('There was a problem adding a session to the exercise: ', updateError);
    return {
      statusCode: 500,
      body: 'There was a problem adding a session to the exercise.',
    }
  }

  return {
    statusCode: 200,
    body: 'Succesfully added session to exercise.',
  }
}).use(cors());

