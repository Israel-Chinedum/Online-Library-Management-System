export const qrcode = (app, nodeMailer, QRCODE) => {
    app.post('/qrcode', (req, res) => {
        QRCODE.toBuffer(req.body.id, (err, data) => {

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
                subject: 'Library User ID',
                html: `
                        <div style="background-color:white; padding: 10px; text-align:center">
                        <img src='cid:fpog_logo.png@gmail.com' width="200px" height="200px">
                        <p style="color: darkblue; margin-top:50px">Your library user id is: ${req.body.id}.<br>
                           You can download the qrcode below! </p>
                        </div>
                      `,
                attachments: [
                    {
                        filename: 'fpog_logo.png',
                        path: 'static/images/fpog_logo.png',
                        cid: 'fpog_logo.png@gmail.com',
                        contentType: 'image/png',
                        contentDisposition: 'inline'
                    },

                    {
                        filename: 'qrcode.png',
                        content: data,
                        contentType: 'image/png'
                    }
                ]
            };
    
            transport.sendMail(mailOptions, (err, info) => {
                if(err){
                    console.log(err)
                } else{
                    console.log(`Email sent: ${info}`);
                    res.send(data);
                }
            });


        });

    });
}