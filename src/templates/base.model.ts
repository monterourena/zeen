import { Model, model, Schema, SchemaOptions, SchemaDefinition, models } from 'mongoose'

export class BaseModel<T> {
  public schema: Schema<T>
  public model: Model<T>
  static schemaTypes = Schema.Types

  /**
   * If the model already exists, it will be used. Otherwise, a new model will be created.
   * 
   * @param name The name of the model
   * @param schema The schema definition
   * @param options The schema options
   */
  
  constructor(name: string, schema: SchemaDefinition<T>, options: SchemaOptions<any> = { timestamps: true }) {
    this.schema = new Schema<T>(schema, options)
    this.model = models[name] || model<T>(name, this.schema)
  }
}
