import * as uuid from 'uuid'
import boom from '@hapi/boom'

import { PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb"

import { config } from '../../config/config'
import { dynamoDbClient } from '../../libs/dynamo/config'
import { HttpResponse } from '../../bases/responses/http.response'

class TaskService {
  // Get tasks list
  async getAllTasks(): Promise<HttpResponse.getSuccessful> {
    try {
      const params = {
        TableName: config.tableName,
      }

      const { Items } = await dynamoDbClient.send(new ScanCommand(params))
      return new HttpResponse.getSuccessful(Items)
    } catch (error) {
      throw boom.badRequest(error)
    }
  }

  // Get a task
  async getOneTask(id: string): Promise<HttpResponse.getSuccessful> {
    try {
      const params = {
        TableName: config.tableName,
        Key: { id },
      }

      const { Item } = await dynamoDbClient.send(new GetCommand(params))

      if (!Item) throw boom.notFound('Task not found')

      return new HttpResponse.getSuccessful(Item)
    } catch (error) {
      throw boom.badRequest(error)
    }
  }

  // Create a task
  async createTask(body: any): Promise<HttpResponse.postSuccessful> {
    try {
      const { title, description } = body

      if (!title || !description || typeof title !== "string" || typeof description !== "string") {
        throw boom.badRequest('title and description must be valid text strings')
      }

      const params = {
        TableName: config.tableName,
        Item: {
          id: uuid.v1(),
          title,
          description,
          createdAt: new Date().toISOString()
        },
      }

      await dynamoDbClient.send(new PutCommand(params))

      return new HttpResponse.postSuccessful(params)
    } catch (error) {
      throw boom.badRequest(error)
    }
  }

  // Update task
  async updateTask(body: any, id: string): Promise<HttpResponse.putSuccessful> {
    try {
      await this.getOneTask(id)

      const { title, description } = body

      const params: UpdateCommandInput = {
        TableName: config.tableName,
        Key: {
          id,
        },
        UpdateExpression: "set",
        ExpressionAttributeNames: {},
        ExpressionAttributeValues: {},
        ReturnValues: "ALL_NEW",
      };

      if (title) {
        params.UpdateExpression += " #t = :title,"
        params.ExpressionAttributeNames["#t"] = "title"
        params.ExpressionAttributeValues[":title"] = title
      }

      if (description) {
        params.UpdateExpression += " #d = :description,"
        params.ExpressionAttributeNames["#d"] = "description"
        params.ExpressionAttributeValues[":description"] = description
      }

      params.UpdateExpression = params.UpdateExpression.slice(0, -1)

      const { Attributes } = await dynamoDbClient.send(new UpdateCommand(params))
      return new HttpResponse.putSuccessful(Attributes)
    } catch (error) {
      throw boom.badRequest(error)
    }
  }

  // Delete task
  async deleteTask(id: string): Promise<HttpResponse.deleteSuccessful> {
    try {
      const params = {
        TableName: config.tableName,
        Key: {
          id,
        },
      }

      await dynamoDbClient.send(new DeleteCommand(params))
      return new HttpResponse.deleteSuccessful()
    } catch (error) {
      throw boom.badRequest(error)
    }
  }
}

export default new TaskService()