/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context, APIGatewayEvent } from 'aws-lambda';
import S3 from 'aws-sdk/clients/s3';
import mysql from 'mysql2';
import axios from 'axios';

const {
  DB_HOST,
  DB_USERNAME,
  DB_DATABASE,
  DB_PASSWORD,
  GOOGLE_KEY,
  AWS_S3_BUCKET_NAME,
} = process.env;

const s3 = new S3();

type Response = {
  body: string;
  statusCode: number;
};

export const databaseRoute = async (
  _event: APIGatewayEvent,
  context: Context,
): Promise<Response> => {
  context.callbackWaitsForEmptyEventLoop = false;

  const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    database: DB_DATABASE,
    password: DB_PASSWORD,
  });

  // simple query
  const list = await new Promise((resolve) => {
    connection.query(
      'SELECT * FROM `circle` WHERE circle_type_id = 1',
      (_err, results) => {
        return resolve(results);
      },
    );
  });

  return {
    statusCode: 200,
    body: JSON.stringify(list),
  };
};

export const requestRoute = async (
  _event: APIGatewayEvent,
  context: Context,
): Promise<Response> => {
  context.callbackWaitsForEmptyEventLoop = false;

  const data = await axios.get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=London&types=(cities)&language=en&key=${GOOGLE_KEY}`,
  );

  return {
    statusCode: 200,
    body: JSON.stringify(data.data.predictions),
  };
};

export const s3Route = async (
  _event: APIGatewayEvent,
  context: Context,
): Promise<Response> => {
  context.callbackWaitsForEmptyEventLoop = false;

  const data = await s3.getSignedUrl('getObject', {
    Bucket: AWS_S3_BUCKET_NAME,
    Expires: 300000,
    Key: 'circles/37/header_1592240944886.jpeg',
  });

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
