const request = require('postman-request')

const baseURL = 'https://cloud.mongodb.com/api/atlas/v1.0'

const modifyCluster = (projectID, clusterName, action) => {

    let postData = {}

    // Set up the body data depending on the action being taken
    if (action === "pause"){
        postData = {"paused": true}
    } else if (action === "unpause") {
        postData = {"paused": false}
    } else throw new Error("Improper cluster action specified")

    const options = {
        'method': 'PATCH',
        'url': baseURL + '/groups/' + projectID + '/clusters/' + clusterName,
        'auth': {
            'user': process.env.ATLAS_PUBLIC_KEY,
            'pass': process.env.ATLAS_PRIVATE_KEY,
            'sendImmediately': false
        },
        'body': postData,
        'json': true // must be included to show body is JSON 
      };

      request(options, function (error, response) {
          if (error) throw new Error(error)
          
          if (response.statusCode === 200) {
              console.log(clusterName, 'is being modified.')
          } else {
              console.log('Error modifying cluster: ', response.body.error, response.body.reason, response.body.errorCode, response.body.detail)
          }
      })

}


const listProjects = () => {

    const options = {
        'method': 'GET',
        'url': baseURL + '/groups',
        'auth': {
            'user': process.env.ATLAS_PUBLIC_KEY,
            'pass': process.env.ATLAS_PRIVATE_KEY,
            'sendImmediately': false
        }
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
       
        //Parse response body for projects 
        const projects = JSON.parse(response.body).results

        //Change every item in projects array to just show the ID and name 
        const projectList = projects.map(project => 'Project Name: ' + project.name + ' Project ID: ' + project.id)
        
        //Show user the list of projects
        console.log(projectList)
        
      })
}

const listClusters = () => {

    const options = {
        'method': 'GET',
        'url': baseURL + '/clusters',
        'auth': {
            'user': process.env.ATLAS_PUBLIC_KEY,
            'pass': process.env.ATLAS_PRIVATE_KEY,
            'sendImmediately': false
        }
      };

      request(options, function (error, response) {
        if (error) throw new Error(error);
       
        //Parse response body for clusters 
        //console.log(response)
        const results = JSON.parse(response.body).results[0].clusters

        //Change every item in clusters array to just show the ID and name 
        const clusterList = results.map(cluster => 'Cluster Name: ' + cluster.name + ' Cluster ID: ' + cluster.clusterId)
        
        //Show user the list of clusters
        console.log(clusterList)
        
      });
}

module.exports = {
    modifyCluster: modifyCluster,
    listProjects: listProjects,
    listClusters: listClusters
}