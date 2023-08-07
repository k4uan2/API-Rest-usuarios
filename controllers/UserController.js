let User = require("../models/User")

class UserController{
  async index(req, res){
    let users = await User.findAll()
    res.json(users)
  }

  async findUser(req, res){
    let id = req.params.id;

    let user = await User.findById(id)

    if(user == undefined){
      res.status(404);
      res.json({err: "Usuário não encontrado!"})
    }else{
      res.json(user)
    }

  }

  async create(req, res){
    var {name, email, password} = req.body

    if(email == undefined || email == ''){
      res.status(400);
      res.json({err: "Email inválido! Tente novamente..."});
      return;
    }

      let emailExists = await User.findEmail(email)
      if(emailExists){
        res.status(406);
        res.json({err: "E-mail já cadastrado!"});
        return;
      }

      await User.new(name, email, password)
      res.status(200);
      res.send("Usuário cadastrado com sucesso!");


    };
    
  };

module.exports = new UserController();