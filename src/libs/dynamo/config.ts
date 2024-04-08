import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"

const client: DynamoDBClient = new DynamoDBClient()

export const dynamoDbClient: DynamoDBDocumentClient = DynamoDBDocumentClient.from(client)