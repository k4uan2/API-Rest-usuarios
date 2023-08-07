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
}

module.exports = new User();