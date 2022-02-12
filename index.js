const yargs = require('yargs')
const utils = require('./utils.js')

yargs.version('1.1.0')


yargs.command({
    command: 'unpause',
    describe: 'Unpause a paused Atlas cluster',
    builder: {
        project: {
            describe: 'Atlas Project ID',
            demandOption: true,
            type: 'string'
        },
        cluster: {
            describe: 'Name of Atlas cluster',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        utils.modifyCluster(argv.project, argv.cluster, "unpause")
    }
})


yargs.command({
    command: 'pause',
    describe: 'Pause an Atlas cluster',
    builder: {
        project: {
            describe: 'Atlas Project ID',
            demandOption: true,
            type: 'string'
        },
        cluster: {
            describe: 'Name of Atlas cluster',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        utils.modifyCluster(argv.project, argv.cluster, "pause")
    }
})


yargs.command({
    command: 'list-projects',
    describe: 'List all projects you have access to',
    handler() {
        utils.listProjects()
    }
})

yargs.command({
    command: 'list-clusters',
    describe: 'List all clusters in a specified project',
    builder: {
        project: {
            describe: 'Atlas Project ID',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        utils.listClusters(argv.project)
    }
})

yargs.parse()
