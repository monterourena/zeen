import { Model } from 'mongoose'
import { BaseModel } from './base.model'

export abstract class BaseService<T extends BaseModel<any>, U> {
  model: Model<any>

  constructor(Model: new () => T) {
    this.model = new Model().model
  }

  get repository() {
    const create = (entity: U) => {
      return this.model.create(entity)
    }
    const getById = (id: string) => {
      return this.model.findById(id)
    }
    const updateById = (id: string, entity: Partial<U>) => {
      return this.model.findByIdAndUpdate(id, entity, { new: true })
    }
    const deleteById = (id: string) => {
      return this.model.findByIdAndDelete(id)
    }
    const getBy = (query: Partial<U>) => {
      return this.model.find(query)
    }
    return {
      getById,
      getBy,
      create,
      updateById,
      deleteById
    }
  }
}