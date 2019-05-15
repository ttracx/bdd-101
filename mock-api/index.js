/* Author Franz Sittampalam
  Contino Workshops
*/

const express = require("express"),
  app = express(),
  fs = require("fs"),
  path = require("path"),
  spectacle = require("spectacle-docs"),
  swaggerUi = require("swagger-ui-express"),
  { OpenApiValidator } = require("express-openapi-validate"),
  SwaggerParser = require("swagger-parser"),
  Converter = require("api-spec-converter"),
  parser = new SwaggerParser(),
  port = process.env.PORT || 5000,
  jsf = require("json-schema-faker"),
  faker = require("faker"),
  Promise = require("bluebird"),
  bodyParser = require("body-parser"),
  morgan = require("morgan");

app.use(bodyParser.json());
app.use(morgan("combined"));

jsf.extend("chance", function() {
  var Chance = require("chance");
  var chance = new Chance();
  return chance;
});

jsf.extend("faker", function() {
  faker.locale = "en"; // or any other language
  return faker;
});

const setupRoutes = api =>
  new Promise((resolve, rej) => {
    if (!api) return Promise.reject("no api provided to setup routes");
    const Validator = new OpenApiValidator(api);
    const routes = Object.keys(api.paths);
    app.get("/routes", (req, res) => res.send(Object.keys(api.paths)));

    routes.map(route =>
      ["get", "post"].map(method => {
        if (api.paths[route][method]) {
          console.log("setting up", route, method);
          app[method](
            "" +
              (/{(.*?)}/.test(route)
                ? route.replace("{", ":").replace("}", "")
                : route),
            Validator.validate(method, route),
            (req, res) => {
              console.log("request", method, route);
              jsf
                .resolve(parser.parse("swagger2.json"))
                .then(schemaObj => {
                  Validator.validateResponse(method, route);
                  res
                    .status(200)
                    .send(
                      schemaObj.paths[route][method].responses["200"].schema
                    );
                })
                .then(() => resolve(api))
                .catch(e => rej(e));
            }
          );
          resolve(api);
        }
      })
    );
    app.use(function(req, res, next) {
      res.status(404).send(Object.keys(api.paths));
    });

    resolve(api);
  });

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

/* dereference given file into single file */
const deref = () =>
  parser.dereference("openapi.yaml", {
    json: false
  });

const convert = api =>
  Converter.convert({
    from: "openapi_3",
    to: "swagger_2",
    source: "./swagger3.json"
  })
    .then(converted => {
      console.log("converted");
      converted.fillMissing();
      converted.validate().then(result => {
        if (result.errors)
          return console.error(JSON.stringify(result.errors, null, 2));
        if (result.warnings)
          console.error(JSON.stringify(result.warnings, null, 2));
      });
      return converted.stringify();
    })
    .then(api => {
      return api;
    })
    .catch(e => console.error(e.message));

const write = (file, contents) =>
  new Promise((res, rej) => {
    fs.writeFileSync(path.join(__dirname, file), contents);
    res(contents);
  });

const generateDocs = () =>
  spectacle({
    specFile: "./swagger2.json",
    logoFile: "./logo.jpg",
    targetDir: "docs",
    quiet: true
  });
const validate = api =>
  new Promise((res, rej) =>
    parser
      .validate(api)
      .then(s => {
        console.log("validated version", s.info.version);
        res(s);
      })
      .catch(rej)
  );

const writeJSON = contents =>
  new Promise((res, rej) =>
    write("swagger3.json", contents)
      .then(convert)
      .then(s => write("swagger2.json", s))
      .then(s => res(contents))
      .catch(rej)
  );

deref()
  .then(validate)
  .then(output => JSON.stringify(output, null, " "))
  .then(writeJSON)
  .then(() => deref())
  .then(api => {
    app.use("/api", swaggerUi.serve, swaggerUi.setup(api));
    return api;
  })
  .then(setupRoutes)
  .then(() => generateDocs())
  .catch(e => console.error(e.message, "error"));

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "docs")));
