function authorization(router) {
    router.use((req, res, next) => {
        if(req.session && req.session.username){
            next();
        }else{
            res.redirect('/');
        }
	});
  }
  
  module.exports = authorization;