# BDD TDD Workshop

## Install

`yarn install`

## Run Application

`yarn start`

## Testing

### Unit Tests

`yarn jest` // runs tests in watch mode

### Cypress

`yarn cy:ide`

* Headless

`yarn cy:ci`

* Smoke only

`yarn cy:ci:smoke`

Run subset of tests using [Cucumber tag expressions](https://github.com/cucumber/cucumber/tree/master/tag-expressions)


## Storybook

`yarn start-storybook`

## Stack

React Bootstrap https://react-bootstrap.github.io

Gherkin https://docs.cucumber.io/gherkin/reference/

Cypress https://docs.cypress.io/examples/examples/recipes.html#Node-Modules


## Applitools

https://github.com/applitools/eyes-cypress

eyes check window
Arguments to cy.eyesCheckWindow

tag (optional): A logical name for this check.

sizeMode (optional): Possible values are:

full-page: This is the default value. It means a screenshot of everything that exists in the DOM at the point of calling eyesCheckWindow will be rendered.
viewport: Only a screenshot the size of the browser will be rendered (the size of the browser can be set in the call to cy.eyesOpen - see Advanced configuration below).
selector: Take a screenshot of the content of the element targeted by css or xpath selector. It's necessary to specify the value of the selector in the selector argument.
region: Take a screenshot of a region of the page, specified by coordinates. It's necessary to specify the value of the region in the region argument.

StoryBook support
https://applitools.com/tutorials/storybook-react.html#customizations


### Static

Lint

Types

### Precommit

```mermaid
graph LR
lint-->jest
jest-->commit
```



### Prepush

```mermaid
graph LR
build-->serve
serve-->wait
wait-->cy
cy-->push
```

### Now Build



```mermaid
graph LR
build-->ci
```

### CI

```mermaid
graph LR
lint
jest
build
visual
```

### Unit Testing

```dot
digraph G {
  label="unit tests"
  subgraph cluster_0{
  node[shape=rect]
  unit[label="write unit"]
  unitpass[label="unit pass" shape="diamond"]
  develop
  unit->develop
  develop->unitpass
  unitpass->unit[label="no"]
  }
}
```

### Acceptance Testing

```dot
digraph G {
  subgraph cluster_1 {
  node[shape=rect]
  gherkin[label="write gherkin"]
  acceptance[label="write acceptance"]
  acpass[label="acceptance pass" shape="diamond"]
  gherkin->acceptance
  gherkin->gherkin[label="validate"]
  acpass->PR[label="yes"]
  code->acpass
  acpass->code[label="no"]
  acceptance->code
  }
}
```

### Combined Unit and Acceptance TDD

```dot
digraph G {
  splines=false
  node[shape=rect color=lightgrey style=filled]

subgraph cluster_1 {
  acceptance->unit
  label="Acceptance Tests"
  gherkin[label="write gherkin"]
  acceptance[label="write acceptance"]
  acpass[label="acceptance pass" shape="diamond" color=green]
  gherkin->acceptance
  gherkin->gherkin[label="validate"]
  acpass->PR[label="yes"]
  code->acpass
  acpass->code[label="no"]
    subgraph cluster_0{
      node[style=filled color=green];
      label="Unit Tests"
      unit[label="write unit tests"]
      unitpass[label="unit pass" shape="diamond"]
      code
      unit->code
      code->unitpass
      unitpass->unit[label="no"]
    }
  }
}
```

### Test Method

```mermaid
graph TD
gherkin[write gherkin]
gherkin-->|validate|gherkin
unit[write unit tests]
accept[write acceptance tests]
accept-->unit
gherkin-->accept
acpass-->|no|unit
acpass{acceptance tests pass}
unitpass{unit tests pass}
unitpass-->|no - refactor|unit
unitpass-->acpass
unit-->|run unit tests|unitpass
acpass-->finish
finish[raise pull request]
```

###  Slack Integration


```dot
digraph {
  code->database[arrowhead=tee]
  database[shape="square"]
}
```