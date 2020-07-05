const AWS = require('aws-sdk');
const middy = require('@middy/core');
const cors = require('@middy/http-cors');
const { v1: uuidv1 } = require('uuid');

exports.listExercises = middy(async (_event, _context, _callback) => {
  let scanParams = {
    TableName: process.env.DYNAMO_DB_EXERCISES_TABLE,
    FilterExpression: 'PK = :pk',
    ExpressionAttributeValues: {
      ':pk': 'userId TODO: get user id from cognito token'
    }
  }

  let exercises;
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    exercises = await dynamoDb.scan(scanParams).promise();
  } catch (scanError) {
    console.log('There was a problem getting the exercises: ', scanError);
    return {
      statusCode: 500,
      body: 'There was a problem getting the exercises.',
    }
  }

  if (!exercises.Items || !Array.isArray(exercises.Items || exercises.Items.length === 0)) {
    return {
      statusCode: 404,
      body: 'There are no exercises.',
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(exercises.Items.map(exercise => ({ 
      name: exercise.SK,
      description: exercise.description,
    }))),
  }
}).use(cors());



exports.getSessionsForExercise = middy(async (event, _context, _callback) => {
  let scanParams = {
    TableName: process.env.DYNAMO_DB_EXERCISES_TABLE,
    FilterExpression: 'PK = :pk',
    ExpressionAttributeValues: {
      ':pk': event.pathParameters.name
    }
  }

  let sessions;
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    sessions = await dynamoDb.scan(scanParams).promise();
  } catch (getError) {
    console.log('There was a problem getting the exercise: ', getError);
    return {
      statusCode: 500,
      body: 'There was a problem getting the exercise',
    }
  }

  if (!sessions.Items || !Array.isArray(sessions.Items || sessions.Items.length === 0)) {
    return {
      statusCode: 404,
      body: 'There are no sessions.',
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(sessions.Items.map(session => ({ 
      sets: session.sets,
      timestamp: session.timestamp,
    }))),
  }
}).use(cors());



exports.createExercise = middy(async (event, _context, _callback) => {
  // Manual validation here is no longer necessary, because a schema was passed to this Api Gateway endpoint
  const exercise = JSON.parse(event.body);

  const putParams = {
    TableName: process.env.DYNAMO_DB_EXERCISES_TABLE,
    Item: {
      PK: 'userId TODO: get user id from cognito token',
      SK: exercise.name,
      description: exercise.description,
      timestamp: Date.now(),
    }
  }
  
  let createdExercise = {}
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    createdExercise = await dynamoDb.put(putParams).promise();
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
    body: JSON.stringify(createdExercise),
  }
}).use(cors());



exports.deleteExercise = middy(async (event, _context, _callback) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  let scanSessionsParams = {
    TableName: process.env.DYNAMO_DB_EXERCISES_TABLE,
    FilterExpression: 'PK = :pk',
    ExpressionAttributeValues: {
      ':pk': event.pathParameters.name
    }
  }

  try {
    const sessions = await dynamoDb.scan(scanSessionsParams).promise();
    if (sessions && sessions.Items && Array.isArray(sessions.Items || sessions.Items.length > 0)) {
      await Promise.all(sessions.Items.map(session => dynamoDb.delete({
        TableName: process.env.DYNAMO_DB_EXERCISES_TABLE,
        Key: {
          PK: session.PK,
          SK: session.SK,
        }
      })));
    }    
  } catch (deleteError) {
    console.log('There was a problem deleting the exercise sessions: ', deleteError);
    return {
      statusCode: 500,
      body: 'There was a problem deleting the exercise sessions.',
    }
  }

  const deleteExerciseParams = {
    TableName: process.env.DYNAMO_DB_EXERCISES_TABLE,
    Key: {
      PK: 'userId TODO: get user id from cognito token',
      SK: event.pathParameters.name,
    }
  }


  try {
    await dynamoDb.delete(deleteExerciseParams).promise();
  } catch (deleteError) {
    console.log('There was a problem deleting the exercise: ', deleteError);
    return {
      statusCode: 500,
      body: 'There was a problem deleting the exercise.',
    }
  }  

  return {
    statusCode: 200,
    body: 'Successfully deleted exercise with all its sessions.',
  }
}).use(cors());



exports.addSessionToExercise = middy(async (event, _context, _callback) => {  
  let session = JSON.parse(event.body);

  const createSessionParams = {
    TableName: process.env.DYNAMO_DB_EXERCISES_TABLE,
    Item: {
      PK: event.pathParameters.exerciseName,
      SK: uuidv1(),
      sets: session.sets,
      timestamp: Date.now(),
    }
  }

  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    await dynamoDb.put(createSessionParams).promise();
  } catch (putError) {
    console.log('There was a problem creating the session: ', putError);
    console.log('createSessionParams: ', putParams);
    return {
      statusCode: 500,
      body: 'There was a problem creating the session.',
    }
  }

  return {
    statusCode: 200,
    body: 'Succesfully added session to exercise.',
  }
}).use(cors());

