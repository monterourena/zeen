import { Utils } from '../utils.js'

export class BaseLib {
  private utils: Utils

  constructor() {
    this.utils = new Utils()
  }

  createBaseFiles = async () => {

    const templates = [
      Utils.templates.baseController,
      Utils.templates.baseModel,
      Utils.templates.baseRouter,
      Utils.templates.baseRoutes,
      Utils.templates.baseService
    ]

    const { basePath } = await this.utils.prompt([
      {
        type: 'input',
        name: 'basePath',
        message: 'Enter the relative path where you want to create the base files:',
        default: './src/config/base'
      }
    ])


    console.log(`--> Creating Base files creates at '${basePath}'.`)

    templates.forEach((templateFilename) => {
      const content = this.utils.getContentFromTemplate(templateFilename)
      this.utils.createFileFromTemplate(basePath, templateFilename, content)
    })
  }
}
