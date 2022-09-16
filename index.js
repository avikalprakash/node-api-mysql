const express = require("express");
const con = require("./config");
const app = express();

app.use(express.json());

app.get("/getUserList", (req, resp) => {
  con.query("select * from users", (err, result) => {
    if (err) { resp.send("error in api") }
    else { resp.send(result) }
  })
});


app.post("/insertUserList", (req, resp) => {
  const data = req.body;
  con.query("INSERT INTO users SET?", data, (error, results, fields) => {
    if (error) throw error;
    resp.send(results)
  })
});

app.put("/updateUserList/:id",(req,resp)=>{
  const data= [req.body.name,req.body.password,req.body.user_type,req.params.id];
  con.query("UPDATE users SET name = ?, password = ?, user_type = ? WHERE id = ?",
  data,(error,results,fields)=>{
    if(error) throw error;
    resp.send(results)
  })
});

app.delete("/deleteUserList/:id", (req, resp)=>{
  con.query("DELETE FROM users WHERE id ="+ req.params.id, (error, result)=>{
    if(error) throw error
    resp.send(result)
  })
});

app.listen("5000")