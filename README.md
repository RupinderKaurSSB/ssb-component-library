# SSB Component Library
The SSB component library is developed mainly for developers at SSB.
Visit the [docs](https://github.com/statisticsnorway/design-system) to see all available components and how to use them.

- [Installing library](#installing-library)
- [Contributing](#contributing)
    - [Run project locally](#run-project-locally)
    - [How to start working on a feature](#how-to-start-working-on-a-feature)
    - [Deploy to site](#deploy-to-site)
    - [Development](#development)
        - [Components](#components)
        - [Storybook](#storybook)
        - [Testing](#testing)
        - [Styling](#styling)
----

## Installing library
If you want to use the component library in your project, simply install it from npm.

``npm install @statisticsnorway/ssb-component-library --save``

## Contributing
### Run project locally
```
... clone repository ...
$ npm install
$ npm start
```

This will open [storybook](#storybook) where you can develop components in an isolated environment. 

### How to start working on a feature
```
$ git checkout master
$ git pull
$ git checkout -b add-feature-x
... do changes ...
$ git commit -a -m "detailed commit message"
$ git status
... verify that correct files are included ...
$ git push -u origin add-feature-x
... create pull-request to master ...
```

### Deploy to site
The project is published with [Github Pages](https://pages.github.com/).
To publish a new build, navigate to master branch and make sure you have the latest updates. 
Build the latest version with `npm run build` and makes sure the build doesn't fail.
When build is done, publish by running `gh-pages -d build`. The branch named `gh-pages` should
update and start the build process. 

## Development

#### Components
Components are written in [React](https://reactjs.org/) using the [JSX](https://reactjs.org/docs/introducing-jsx.html) syntax.
Components should be written as functions, as opposed to classes, and if a local state or event handler is needed you should
take use of the [Hooks API](https://reactjs.org/docs/hooks-intro.html).

As a way to ensure that our components are being used they way we intended, we use [PropTypes](https://www.npmjs.com/package/prop-types)
to check properties being passed to components. _All_ components with props available should have this. 

#### Storybook
[Storybook](https://storybook.js.org/) is an open source tool for developing UI components in an isolated environment.
It is also a useful tool for demoing components by themselves or put together into a user scenario.
To add a component to the storybook build, create a file named like `componentName.story.jsx`.
Import some needed modules, the component you are creating the story for, and add it like this:
```jsx harmony
import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import Button from './index';

storiesOf('Button', module)
  .addDecorator(centered)
  .add('Primary button', () => (
    <div>
      <Button text="Primary" primary />
      <Button text="Disabled" primary disabled />
    </div>
  ))
```
Every new instance of `storiesOf` creates a new menu item in the storybook. When using the `add`, it creates an item in
a sub menu. 

#### Testing
Testing is done with [Jest](https://jestjs.io/en/). Write unit tests for all atoms aim for a 100% test coverage. 
To run the tests, simply run `npm test`. To run tests without using any cache, run `npm run clean-test`.
If you need to replace outdated screenshots, run `npm run clear-tests`.

#### Styling
Styling is done with with the [Sass](https://sass-lang.com/) language, using the 
[SCSS](https://sass-lang.com/documentation/syntax) syntax. Each component should have its own stylesheet, and there are 
a couple of global stylesheets as well. [Variables](./src/style/_variables.scss) stores global variables, like colors 
approved by the style guide. Please refrain from using custom colors. Using variables makes it much easier if they 
change at any point. 

There are media queries for responsive design. They look like this: 
```scss
$mobile: 'screen and (min-width: 768px)';
$tablet: 'screen and (min-width: 992px)';
$desktop: 'screen and (min-width: 1200px)';
```

Use them like this in your components: 
```scss
@media #{$mobile} {
  // mobile style
}
```
Go from smallest to largest to ensure that styles are being overwritten in the correct order. 
