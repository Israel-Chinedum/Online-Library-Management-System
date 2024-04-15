class GetRequest{
    get(app){
        app.get('', (req, res)=>{
            res.render('home');
        });
    }
} export default new GetRequest();