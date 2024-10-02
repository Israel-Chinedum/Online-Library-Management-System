export const myAdmin = (app, adminModel) => {
    app.post('/myAdmin', (req, res) => {
        console.log(req.body);
        adminModel.find({"Data.UserName": req.body.userName}).then(adminUser => {
            res.json(adminUser);
        });

    });
}