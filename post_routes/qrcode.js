export const qrcode = (app, fs, QRCODE) => {
    app.post('/qrcode', (req, res) => {
        QRCODE.toBuffer(req.body.id, (err, data) => {
            res.send(data)
        });
    });
}