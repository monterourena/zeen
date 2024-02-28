import { ITemplateModel } from './Template'
import { BaseModel } from './path/to/base/model'

export class TemplateModel extends BaseModel<ITemplateModel> {
  static modelName = 'Template'

  constructor() {
    const schema = {
      // Types can be access via TemplateModel.schemaTypes.ObjectId,
      // Models can be referenced as Model.modelName
    }
    super(TemplateModel.modelName, schema)
  }
}
