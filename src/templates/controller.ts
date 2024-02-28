// Controller template
import { Request, Response } from 'express'
import { BaseController } from './path/to/BaseController'

export class TemplateController extends BaseController {
  getTemplateById = async (req: Request, res: Response) => {
    const data = await this.service.getTemplateById(req.query.id)
  }
}
