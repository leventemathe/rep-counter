const AWS = require('aws-sdk');
const middy = require('@middy/core');
const cors = require('@middy/http-cors');
const { v1: uuidv1 } = require('uuid');
const jwt = require('jsonwebtoken');

function getUsername(event) {
  const token = event.headers.Authorization.split(' ')[1];

  const tokenObj = jwt.decode(token);
  return tokenObj['cognito:username'];
}

async function getExercises(event) {
  const scanParams = {
    TableName: process.env.DYNAMO_DB_EXERCISES_TABLE,
    FilterExpression: 'PK = :pk',
    ExpressionAttributeValues: {
      ':pk': getUsername(event),
    },
  };

  let exercises;
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    exercises = await dynamoDb.scan(scanParams).promise();
    return exercises;
  } catch (scanError) {
    console.log('There was a problem getting the exercises: ', scanError);
    return {
      statusCode: 500,
      body: 'There was a problem getting the exercises.',
    };
  }
}

exports.listExercises = middy(async (event) => {
  const exercises = await getExercises(event);
  if (exercises.statusCode) return exercises;

  if (!exercises.Items || !Array.isArray(exercises.Items || exercises.Items.length === 0)) {
    return {
      statusCode: 404,
      body: 'There are no exercises.',
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(exercises.Items.map(exercise => ({
      id: exercise.SK,
      name: exercise.name,
      description: exercise.description,
    }))),
  };
}).use(cors());

exports.getExercise = middy(async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const exerciseGetParams = {
    TableName: process.env.DYNAMO_DB_EXERCISES_TABLE,
    Key: {
      PK: getUsername(event),
      SK: event.pathParameters.id,
    },
  };

  let exercise;
  try {
    exercise = await dynamoDb.get(exerciseGetParams).promise();
  } catch (getError) {
    console.log('There was a problem getting the exercise: ', getError);
    return {
      statusCode: 500,
      body: 'There was a problem getting the exercise',
    };
  }

  if (!exercise || !exercise.Item) {
    return {
      statusCode: 404,
      body: 'Exercise not found',
    };
  }

  const sessionScanParams = {
    TableName: process.env.DYNAMO_DB_EXERCISES_TABLE,
    FilterExpression: 'PK = :pk',
    ExpressionAttributeValues: {
      ':pk': event.pathParameters.id,
    },
  };

  let sessions;
  try {
    sessions = await dynamoDb.scan(sessionScanParams).promise();
  } catch (getError) {
    console.log('There was a problem getting the exercise: ', getError);
    return {
      statusCode: 500,
      body: 'There was a problem getting the exercise',
    };
  }

  if (!sessions.Items || !Array.isArray(sessions.Items || sessions.Items.length === 0)) {
    return {
      statusCode: 404,
      body: 'There are no sessions.',
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      exercise: {
        name: exercise.name,
        description: exercise.description,
        sessions: sessions.Items.map(session => ({
          sets: session.sets,
          timestamp: session.timestamp,
        })),
      },
    }),
  };
}).use(cors());

exports.createExercise = middy(async (event) => {
  const exercise = JSON.parse(event.body);

  const putParams = {
    TableName: process.env.DYNAMO_DB_EXERCISES_TABLE,
    Item: {
      PK: getUsername(event),
      SK: uuidv1(),
      name: exercise.name,
      description: exercise.description,
      categoires: exercise.categoires,
      timestamp: Date.now(),
    },
  };

  let createdExercise;
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    createdExercise = await dynamoDb.put(putParams).promise();
  } catch (putError) {
    console.log('There was a problem creating the exercise: ', putError);
    console.log('putParams: ', putParams);
    return {
      statusCode: 500,
      body: 'There was a problem creating the exercise.',
    };
  }

  return {
    statusCode: 201,
    body: JSON.stringify(createdExercise),
  };
}).use(cors());

exports.editExercise = middy(async (event) => {
  const exercise = JSON.parse(event.body);

  const updateParams = {
    TableName: process.env.DYNAMO_DB_EXERCISES_TABLE,
    Key: {
      PK: getUsername(event),
      SK: event.pathParameters.id,
    },
    UpdateExpression: 'set #name = :name, description = :description, editTimestamp = :editTimestamp, categories = :categories',
    ExpressionAttributeValues: {
      ':name': exercise.name,
      ':description': exercise.description,
      ':categories': exercise.categories,
      ':editTimestamp': Date.now(),
    },
    ExpressionAttributeNames: {
      '#name': 'name',
    },
  };

  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    await dynamoDb.update(updateParams).promise();
  } catch (updateError) {
    console.log('There was a problem updating the exercise: ', updateError);
    return {
      statusCode: 500,
      body: 'There was a problem updating the exercise.',
    };
  }

  return {
    statusCode: 200,
    body: 'Exercise succesfully updated',
  };
}).use(cors());

exports.deleteExercise = middy(async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const scanSessionsParams = {
    TableName: process.env.DYNAMO_DB_EXERCISES_TABLE,
    FilterExpression: 'PK = :pk',
    ExpressionAttributeValues: {
      ':pk': event.pathParameters.id,
    },
  };

  try {
    const sessions = await dynamoDb.scan(scanSessionsParams).promise();
    if (sessions && sessions.Items) {
      await Promise.all(sessions.Items.map(async session => dynamoDb.delete({
        TableName: process.env.DYNAMO_DB_EXERCISES_TABLE,
        Key: {
          PK: session.PK,
          SK: session.SK,
        },
      }).promise()));
    }
  } catch (deleteError) {
    console.log('There was a problem deleting the exercise sessions: ', deleteError);
    return {
      statusCode: 500,
      body: 'There was a problem deleting the exercise sessions.',
    };
  }

  const deleteExerciseParams = {
    TableName: process.env.DYNAMO_DB_EXERCISES_TABLE,
    Key: {
      PK: getUsername(event),
      SK: event.pathParameters.id,
    },
  };

  try {
    await dynamoDb.delete(deleteExerciseParams).promise();
  } catch (deleteError) {
    console.log('There was a problem deleting the exercise: ', deleteError);
    return {
      statusCode: 500,
      body: 'There was a problem deleting the exercise.',
    };
  }

  return {
    statusCode: 200,
    body: 'Successfully deleted exercise with all its sessions.',
  };
}).use(cors());

exports.addSessionToExercise = middy(async (event) => {
  const session = JSON.parse(event.body);

  const createSessionParams = {
    TableName: process.env.DYNAMO_DB_EXERCISES_TABLE,
    Item: {
      PK: event.pathParameters.exerciseId,
      SK: uuidv1(),
      sets: session.sets,
      timestamp: Date.now(),
    },
  };

  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    await dynamoDb.put(createSessionParams).promise();
  } catch (putError) {
    console.log('There was a problem creating the session: ', putError);
    console.log('createSessionParams: ', createSessionParams);
    return {
      statusCode: 500,
      body: 'There was a problem creating the session.',
    };
  }

  return {
    statusCode: 200,
    body: 'Succesfully added session to exercise.',
  };
}).use(cors());

exports.listCategories = middy(async (event) => {
  const exercises = await getExercises(event);
  if (exercises.statusCode) return exercises;

  if (!exercises.Items || !Array.isArray(exercises.Items || exercises.Items.length === 0)) {
    return {
      statusCode: 404,
      body: 'There are no categories, because there are no exercises.',
    };
  }

  const categoires = new Set();
  exercises.Items.forEach(exercise => categoires.add(exercise));

  return {
    statusCode: 200,
    body: JSON.stringify([...categoires]),
  };
}).use(cors());
