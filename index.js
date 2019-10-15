const express = require('express');
const server = express();

server.use(express.json()); //libera o uso de json

const tools = [
    {
        id: 1, // ou qualquer outro identificador
        title: "Notion",
        link: "https://notion.so",
        description: "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
        tags: [
            "organization",
            "planning",
            "collaboration",
            "writing",
            "calendar"
        ]
    },
    {
        id: 2,
        title: "json-server",
        link: "https://github.com/typicode/json-server",
        description: "Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.",
        tags: [
            "api",
            "json",
            "schema",
            "node",
            "github",
            "rest"
        ]
    },
    {
        id: 3,
        title: "fastify",
        link: "https://www.fastify.io/",
        description: "Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.",
        tags: [
            "web",
            "framework",
            "node",
            "http2",
            "https",
            "localhost"
        ]
    }
];

function verificaProjectId(req, res, next){
    const { id } = req.params;
    const tool = tools.find(p => p.id == id);

    if (!tool) {
        return res.status(400).json({
            error: 'Tool not found'
        });
    }

    return next();
}

server.get('/tools', (req, res) => {
    return res.json(tools);
});

server.get('/tools/:tag', (req, res) => {
    const { tag } = req.params;
    const toolTag =[];

    const tool = tools.find((tool) => {
        tool.tags.find((tags) => {
            if (tags === tag) {
                toolTag.push(tool);
            }
        });
    }); 

    return res.json(toolTag);
});

server.post('/tools', (req, res) => {
    const { title, link, description, tags} = req.body;

    const maxIdTool = [];

    const toolId = tools.find((p =>{
        maxIdTool.push(p.id);
    }));

    const id = (Math.max(...maxIdTool) + 1);

    tool = {
        id: id,
        title : title,
        link: link,
        description: description,
        tags: tags
    };
    
    tools.push(tool);

   return res.status(201).json(tool);
});

server.delete('/tools/:id', verificaProjectId, (req, res) => {

    const { id } = req.params;

    const tool = tools.find(p => p.id == id);
    
    const index = tools.indexOf(tool); //verica se tem o id dentro do array de projects

    tools.splice(index,1); //remove project do array

    return res.status(204).send();
});



server.listen(3000)