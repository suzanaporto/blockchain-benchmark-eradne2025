const Docker = require('dockerode');
const os = require('os');
const URL = require('url');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });
console.log(os.cpus().length);
docker.listContainers((err, containers) => {
    if (err) {
        console.error('Dockerode error:', err);
    } else {
        console.log('Containers:', containers);
    }
});
