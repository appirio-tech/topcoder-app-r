# Topcoder-App-R

This repository houses new topcoder pages, using React, Redux, and Webpack.

## Installation

Install dependencies by running the following in the root of the project:
 - npm install

## NPM Commands
- To run locally:
- To create the build:
- To run the test runner and view specs.html: 

### Testing


### Description of Files and Folders

## Contributing

### Style Guide and Naming Conventions

### Pull Requests

To contribute to the repository, please create a feature branch off of the dev branch. Once you're finished working on the feature, make a pull request to merge it into dev. Then, make sure to delete the branch when it's no longer used. Please make sure that every pull request has passed the build checks, which appear just before the "Merge pull request" button in github.

### Adding New Content

SCSS Files
  - Use SCSS syntax, but do not overly nest
  - Follow the [BEM](https://en.bem.info/method/naming-convention/) naming convention
  - Use variables, mixins, and classes as much as possible from our [style guide](https://github.com/appirio-tech/styles)
  - Reuse our [UI Components](https://github.com/appirio-tech/ng-ui-components)
  - When adding media queries, nest them inside the element, rather than creating a new section
  ```
  .box {
    height: 50px;
    width: 50px;
    @media screen and (min-width: 768px) {
      height: 100px;
      width: 100px;
    }
    
    .inside-box {
      font-size: 14px;
      @media screen and (min-width: 768px) {
        font-size: 18px;
      }
    }
  }
  ```
  - This repository uses flexbox for arranging content. The use of any extra CSS libraries should be discussed with the team

JavaScript
  - See this section on [naming conventions and style guide](https://github.com/appirio-tech/topcoder-app/blob/dev/README.md#style-guide-and-naming-conventions)
