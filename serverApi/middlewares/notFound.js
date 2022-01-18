const notFound = (req, res) =>
  res.status(404).send(`
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description"
        content="Web site created using create-react-app" />
    <title>Water Management</title>
</head>
<body>
    
    <div id="not_found" style="width: 100vw; height: 100vh;background-color: rgba(100, 0, 255, 0.8); color: white; text-align: center; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 2rem">
      <h1>404.</h1>
      <h3>Route does not exist.</h3>
    </div>
</body>
</html>
  `);

module.exports = notFound;
