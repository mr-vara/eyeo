# Case study - Node.JS Automation Engineer

 The following case study is meant to show the technical understanding and tangible workflow of a new Filter/Automation Engineer..


## Getting Started

### Installation

To install all dependencies, run:

```bash
npm install
```

### Running Project

To start the project, run:

```bash
npm run
```

### Running Unit Tests

To start the project, run:

```bash
npm test
```

## Project structure

### Directory Structure

 Top-leve directory layout of the project

    .
    ├── doc                     # Documentation files
    ├── lib                     # Library files
    ├── out                     # Output files
    ├── test                    # Unit test files
    ├── app.js                  # Main program
    ├── package.json
    └── README.md

 Directory layout of `lib` which contains common functions used by the project like delay, files, log etc.,

    .
    ├── ...
    ├── lib                     # Library files
    │   ├── abp_chrome          # AdBlockPlus chrome extension
    │   ├── common.js           # Common functions
    │   └── extra.js            # Extra features needed
    └── ...

 Directory layout of `out` which contains output files like screenshot, bounding rectangles data etc.,

    .
    ├── ...
    ├── out                                # Output files
    │   ├── bounding_rects.json            # Bounding rectangles
    │   ├── marked_screenshot.png          # Entire page screenshot with marked rectangles
    │   └── screenshot.png                 # Entire page screenshot
    └── ...

See `/doc` for more information.


### Dependencies

- [canvas](https://ghub.io/canvas): Canvas is used to draw bounding rectangles on screenshot.
- [fs](https://ghub.io/fs): 'fs' is a file system package used to read/write files.
- [puppeteer](https://ghub.io/puppeteer): A high-level API to control headless Chrome over the DevTools Protocol.

### Dev Dependencies

- [chai](https://ghub.io/chai): BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
- [chai-fs](https://ghub.io/chai-fs): Chai assertions for Node.js filesystem.
- [jsdoc](https://ghub.io/jsdoc): An API documentation generator for JavaScript.
- [mocha](https://ghub.io/mocha): Simple, flexible, fun test framework.

