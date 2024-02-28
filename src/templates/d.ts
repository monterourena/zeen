// Types Template
import { Types } from 'mongoose'

export type TMongoObjectId = Types.ObjectId

export type TMongoDefaultFields = {
  _id: TMongoObjectId
  createdAt: Date
  updatedAt: Date
}

export type TTemplate = {}

export interface ITemplateModel extends Omit<TTemplate, 'PropertyToOmit'> {}

export interface ITemplateModelHydrated extends TTemplate, Partial<TMongoDefaultFields> {}
