export const forgot = (app, nodeMailer, adminModel) => {
     app.post('/forgot', (req, res) => {
        adminModel.find({"Data.Email": req.body.Email}, {"Data.Password": 1, _id: 0}).then(user => {

            if(user.length != 0){
                const transport = nodeMailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'mytechstudio081@gmail.com',
                        pass: 'gcpx hbqx cvtc zakp'
                    }
                });
    
                const mailOptions = {
                    from: 'TechStudio',
                    to: req.body.Email,
                    subject: 'User Password',
                    html: `
                            <div style="background-color:white; padding: 10px; text-align:center">
                            <img src='cid:fpog_logo.png@gmail.com' width="200px" height="200px">
                            <p style="color: darkblue; margin-top:50px">Your password is: ${user[0].Data.Password}</p>
                            </div>
                          `,
                    attachments: {
                        filename: 'fpog_logo.png',
                        path: 'static/images/fpog_logo.png',
                        cid: 'fpog_logo.png@gmail.com',
                        contentType: 'image/png',
                        contentDisposition: 'inline'
                    }
                };
    
                transport.sendMail(mailOptions, (err, info) => {
                    if(err){
                        console.log(err)
                    } else{
                        console.log(`Email sent: ${info}`);
                        res.render('admin-login', {error: ''});
                    }
                });
    
            } else{
                res.render('forgot', {error: 'Invalid email address!'});
            }
           

        });



     });
}