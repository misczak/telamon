const request = require('postman-request')

const modifyCluster = (projectID, clusterName, action) => {
    console.log(action)
}


const listProjects = () => {
    console.log("List Projects")
}

const listClusters = (projectID) => {
    console.log("List Clusters")
}

module.exports = {
    modifyCluster: modifyCluster,
    listProjects: listProjects,
    listClusters: listClusters
}