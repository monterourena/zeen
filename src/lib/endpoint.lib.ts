import { Utils } from '../utils.js'

export class EndpointLib {
  private utils: Utils

  constructor() {
    this.utils = new Utils()
  }
  createEndpoint = async (endpointName: string) => {
    
    const templates = [
      Utils.templates.controller,
      Utils.templates.type,
      Utils.templates.model,
      Utils.templates.router,
      Utils.templates.service
    ]

    const replacements = { 
      Template: endpointName.charAt(0).toUpperCase() + endpointName.slice(1).toLowerCase(),  
      template: endpointName.toLowerCase()
    }
    
    const { endpointsPath } = await this.utils.prompt([
      {
        type: 'input',
        name: 'endpointsPath',
        message: 'Enter the relative path where you want to create the endpoints:',
        default: './src/api'
      }
    ])

    console.log(`--> Creating '${endpointName}' endpoint at '${endpointsPath}/${endpointName}'.`)

    templates.forEach((templateFilename) => {
      let content = this.utils.getContentFromTemplate(templateFilename)
      content = this.utils.replaceContent(content, replacements)
      const filename = this.utils.getFilename(endpointName,templateFilename)
      this.utils.createFileFromTemplate(endpointsPath, filename, content)
    })
  }
}
