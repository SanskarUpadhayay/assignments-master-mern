const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

  const app = express();
  
  app.use(bodyParser.json());

  app.get("/todos",(req,res) => {
    fs.readFile("./todos.json",'utf8',(err,data) => {
        if(!err){
            res.json(JSON.parse(data));
        }
        else{
            res.status(500).send({"msg":"error fetching the todos"});
        }
    })
  });

  app.get("/todos/:id",(req,res) => {
    const id = parseInt(req.params.id);
    fs.readFile("./todos.json",'utf8',(err,data) => {
        if(!err){
            const todos = JSON.parse(data);
            const todo = todos.find((ele) => ele["id"] == id);
            res.json(todo);
        }
        else{
            res.status(404).send();
        }
    })
  })

  app.post("/todos",(req,res) => {
    const title = req.body.title;
    const description = req.body.description;
    const id = Math.floor(Math.random()* 1000000);
    const newTodo = {"id":id, "title":title,"description":description};
    fs.readFile("./todos.json",'utf8',(err,data) => {
        if(!err){
            const todos = JSON.parse(data);
            todos.push(newTodo);
            fs.writeFile("./todos.json",JSON.stringify(todos),(err) => {
                if(!err){
                    res.status(201).json(newTodo);
                }
            })
        }

    })
  })
  
  app.put("/todos/:id",(req,res) => {
    const id = req.params.id;
    const body = req.body;
    fs.readFile("./todos.json","utf8",(err,data) => {
        if(!err){
            let todos = JSON.parse(data);
            const todoItem = todos.filter((todo) => {
              return todo['id'] == id;
            })
            if(todoItem.length == 0){
              res.status(404).send();
            }
            todos=todos.map((todo) => {
              if(todo["id"] == id){
               const newTodo = {...body,"id":todo["id"]};
               return newTodo;
              }
              return todo;
            })
            fs.writeFile("./todos.json",JSON.stringify(todos),(err) => {
                if(!err){
                    res.json({"msg":"Todo updated successfully"});
                }
            })
        }
    })
  })

  app.delete("/todos/:id",(req,res) => {
    const id = req.params.id;
    fs.readFile("./todos.json","utf8",(err,data) => {
        if(!err){
            let todos = JSON.parse(data);
            const prevLength = todos.length;
            todos = todos.filter((todo) => {
              return todo['id']!=id;
            });
            const newLength = todos.length;
            if(prevLength == newLength){
              res.status(404).send();
            }
            else{
                fs.writeFile("./todos.json",JSON.stringify(todos),(err) => {
                    if(!err){
                        res.json({"msg":"Entry deleted successfully"});
                    }
                })
            }
        }
    })
  })


  module.exports = app;