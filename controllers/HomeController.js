class HomeController{

    async index(req, res){
        res.send("BEM VINDO! (A)");
    }

}

module.exports = new HomeController();