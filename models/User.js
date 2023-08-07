let knex = require("../database/connection");
let bcrypt = require("bcrypt");

class User{

    async findAll(){
      try{
        let allUsers = await knex.select("id", "name", "email", "role").table("users")
        return allUsers;
      }catch(err){
        console.log(err)
        return [];
      }
      
    }


    async findById(id){
      try{
        let res = await knex.select("id", "name", "email", "role").where({id: id}).table("users")

        if(res.length > 0){
          return res[0];
        }else{
          return undefined;
        }
      }catch(err){
        console.log(err)
      }
    }


    async new(name, email, password){
      try{
        let hash = await bcrypt.hash(password, 11);
        await knex.insert({name, email, password: hash, role: 0}).table("users");
      }catch(err){
        console.log(err)
      }
    }

  async findEmail(email){
    try{
      let verification = await knex.select("*").from("users").where({email: email})

      if(verification.length > 0){
        return true;
      }else{
        return false
      }
    }catch(err){
      console.log(err)
    }
    
  }


  async update(id, name, email, role){
    let user = await this.findById(id);

    if(user != undefined){
      let editUser = {};

      if(email != undefined){
        if(email != user.email){
          let email_exists = await this.findEmail(email);
          if(!email_exists){
            editUser.email = email;
          }else{
            return {status: false, err: "O e-mail já está cadastrado!"};
          }
        }
      }

      if(name != undefined){
        editUser.name = name;
      }

      if(role != undefined){
        editUser.role = role
      }

      try{
        await knex.update(editUser).where({id: id}).table("users");
        return {status: true}
      }catch(err){
        return {status: false, err: err};
      }

    }else{
      res.status(404);
      return {status: false, err: "Usuário não existe!"};
    }
  };


  async delete(id){
    let user = await this.findById(id);

    if(user != undefined){
      try{
        await knex.delete().where({id: id}).table("users");
        return {status: true};
      }catch(err){
        return {status: false, err: err}
      }
    }else{
      return {status: false, err: "O usuário não existe, portanto não pode ser excluído."}
    }
  }

}

module.exports = new User();