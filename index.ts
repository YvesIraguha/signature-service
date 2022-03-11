import app from './app';
const port = process.env.PORT || 3000;
const runningMessage = `App Listening on port ${port}`;
app.listen(port, () => {
  console.log(runningMessage);
});
