var express = require('express');
var router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

var ClientRouter = require('./client/index')
var PublicRouter = require('./public/index')

var ClientValidator = require('../components/middleware/validation/ClientValidator')


//Client
router.use('/client',ClientValidator,ClientRouter);
router.use('/public',PublicRouter);



// swagger definition
var swaggerDefinition = {
    info: {
      title: 'Node Swagger API',
      version: '1.0.0',
      description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:3000',
    basePath: '/',
  };
  // options for the swagger docs
  var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./public/User.js'],// pass all in array 
    };
const swaggerSpec = swaggerJSDoc(options);
const swaggerDocument = require('../../swagger.json');

router.get('/swagger.json', function(req, res) {   res.setHeader('Content-Type', 'application/json');   res.send(swaggerSpec); });


router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));





/* GET 404 page. */
router.get('*', function(req, res, next) {
    res.json({apiName:"Looking For Mage",version:"v0.0.1",code:"404",message:"Route not found"});
});


module.exports = router;
