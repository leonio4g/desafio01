const express = require('express');

const server = express();
server.use(express.json());

let contador = 0;

const projects = [];

function checkProjectId (req, res, next){
  const {id} = req.params;
  const projectid = projects.find(e => e.id == id);
  if(!projectid){
    return res.status(400).json({error: 'Project id does not exists'})
  }
  return next();
}

function contRequest (req, res, next){
  contador++;

  console.log(`Numero de requisições: ${contador}`);

  return next();
}

server.post('/projects',contRequest,(req, res)=>{
  const {id, title} = req.body;
   const project = {
    id,
    title,
    task:[]
  };
  projects.push(project)
  return res.json(project)
});

server.get('/projects', contRequest,(req, res) => {
  return res.json(projects);
});

server.put('/projects/:id',contRequest, checkProjectId,(req, res) =>{
  const {id} = req.params;
  const {title} = req.body;

  const project = projects.find(e => e.id == id);

  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id',contRequest, checkProjectId,(req, res) => {
  const {id} = req.params;
  const projectid = projects.findIndex( e => e.id == id);

  projects.splice(projectid, 1);

  return res.send();
});

server.post('/projects/:id/task',contRequest,checkProjectId, (req,res) => {
    const {id} = req.params;
    const {title} = req.body;

    const project = projects.find(e => e.id == id);

    project.task.push(title);

    return res.json(projects);


});


server.listen(3232);