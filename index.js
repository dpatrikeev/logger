const app = require('./server/server');

app.listen(3005, (err) => {
    if (err) return;
    global.console.log('Listening at http://localhost:3005');
});
