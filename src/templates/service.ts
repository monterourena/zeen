import { ITemplateModel } from './template'
import { TemplateModel } from './template.model'
import { BaseService } from './route/to/base/service'

export class TemplateService extends BaseService<TemplateModel, ITemplateModel> {
  constructor() {
    super(TemplateModel)
  }

  createTemplate(template: ITemplateModel) {
    return this.repository.create(template)
  }

  getTemplateById(templateId: string) {
    return this.repository.getById(templateId)
  }
}
