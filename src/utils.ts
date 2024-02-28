import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import inquirer, { Answers, QuestionCollection } from 'inquirer'

export class Utils {
  static templates = {
    baseController: 'base.controller.ts',
    baseModel: 'base.model.ts',
    baseRouter: 'base.router.ts',
    baseRoutes: 'base.routes.ts',
    baseService: 'base.service.ts',
    controller: 'controller.ts',
    type: 'd.ts',
    model: 'model.ts',
    router: 'router.ts',
    service: 'service.ts',
  }


  public getRelativePath = (relativeRoutes: string[]) => {
    return path.join(...relativeRoutes)
  }

  public getFilename = (filename: string, extension: string) => {
    return `${filename}.${extension}`
  }

  /**
   *
   * @param relativeRoutes Single or array of relative routes to join with the main path
   * @param usePackageDirectory If true, it will use the dist directory of the package as the main path. Otherwise, it will use the current working directory.
   * @returns The resultant absolute path
   */
  private getAbsolutePath = (relativeRoutes: string | string[], usePackageDirectory: boolean = false) => {
    // Get the directory of the dist folder of the package
    const __filename = fileURLToPath(import.meta.url)
    const __dist = dirname(dirname(__filename))

    // Join all the relative routs with the main path, which could be the package directory or the current working directory
    const routes = Array.isArray(relativeRoutes) ? relativeRoutes : [relativeRoutes]
    const mainPath = usePackageDirectory ? __dist : process.cwd()
    return path.join(mainPath, ...routes)
  }

  /**
   * Create a folder at the specified path. If the folder already exists, it will just return the absolute path.
   * By default, it will create the folder in the current working directory.
   * If parent folders don't exist, it will create them as well.
   * @param relativePath - The relative path of the folder to create
   * @returns The absolute path of the created directory
   */
  public createOutputDirectory = (relativePath: string) => {
    const absolutePath = this.getAbsolutePath(relativePath)
    if (!fs.existsSync(absolutePath)) {
      fs.mkdirSync(absolutePath, { recursive: true })
    }
    return absolutePath
  }

  /**
   * Get the content of a file from the templates folder
   * @param templateName - The name of the template file to read. It should be a file in the templates folder
   * @returns The content of the file as a string. If the file doesn't exist, it will twrow an error.
   */
  public getContentFromTemplate = (templateName: string) => {
    const TEMPLATES_RELATIVE_PATH = './src/templates'

    const absolutePath = this.getAbsolutePath([TEMPLATES_RELATIVE_PATH, templateName], true)

    try {
      return fs.readFileSync(absolutePath, 'utf8')
    } catch (err) {
      throw new Error(`Error reading template file: ${err}`)
    }
  }

  /**
   * Create a file at the specified path with the specified content.
   * If the file already exists, it will be overwritten.
   * If parent folders don't exist, it will create them as well.
   * @param relativeOutputPath - The relative path of the folder where the file will be created
   * @param outputFilename - The name of the file to create. It should include the file extension.
   * @param content - A string of content to write to the file.
   */
  public createFileFromTemplate = (
    relativeOutputPath: string,
    outputFilename: string,
    content: string | undefined
  ) => {
    if (!content) {
      throw new Error(`Error retrieving content from template`)
    }

    const outputDirectoryPath = this.createOutputDirectory(relativeOutputPath)
    const outputPathWithFilename = path.join(outputDirectoryPath, outputFilename)

    try {
      fs.writeFileSync(outputPathWithFilename, content)
      console.log(`--> ${outputFilename} created`)
    } catch (err) {
      throw new Error(`Error writing ${outputFilename}: ${err}`)
    }
  }

  prompt = async (prompts: QuestionCollection<Answers>) => {
    return inquirer.prompt(prompts)
  }

  replaceContent = (content: string, replacements: Record<string, string>) => {
    let newContent = content
    Object.entries(replacements).forEach(([key, value]) => {
      const regex = new RegExp(key, 'g')
      newContent = newContent.replace(regex, value)
    })
    return newContent
  }
}
