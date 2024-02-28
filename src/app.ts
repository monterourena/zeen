import { Command } from 'commander'
import { EndpointLib } from './lib/endpoint.lib.js'
import { BaseLib } from './lib/base.lib.js'

const endpointLib = new EndpointLib()
const baseLib = new BaseLib()

const program = new Command()

program.command('endpoint <name>').description('Create a new endpoint').action(endpointLib.createEndpoint)
program.command('base').description('Create a new base files').action(baseLib.createBaseFiles)

program.parse(process.argv)
