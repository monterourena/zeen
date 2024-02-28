import { BaseRouter } from './route/to/base/router'
import { TemplateController } from './template.controller'

export class TemplateRouter extends BaseRouter<TemplateController> {
  constructor() {
    super(TemplateController)
  }

  routes() {
    this.router.get('/:uid', this.controller.getTemplateById)
  }
}
