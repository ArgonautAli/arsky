# ArSky

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/arsky.svg)](https://badge.fury.io/js/arsky)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.5%2B-blue)](https://www.typescriptlang.org/)

ArSky is a powerful and easy-to-use Node.js CLI tool for generating or fetching ASCII art. With ArSky, you can either retrieve ASCII art for any word or create your own from an image file.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [Changelog](#changelog)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- Fetch ASCII art for given words or phrases
- Generate ASCII art from image files
- TypeScript support for enhanced type safety and developer experience
- Comprehensive test suite using Jest
- Consistent code style with ESLint and Prettier
- Cross-platform compatibility (Windows, macOS, Linux)

## Installation

Install ArSky globally using npm:

```sh
npm install -g arsky
```

For local development:

```sh
git clone https://github.com/ArgonautAli/arsky
cd arsky
npm install
```

## Usage

ArSky can be used with the following options:

### CLI Options

- `-g, --get <text>`: Input text to get ASCII art
- `-c, --create <path>`: Input path to an image file to create ASCII art
- `-s, --search <text>`: Input text to create ASCII art from Google image search results
- `-v, --version`: Display the current version of ArSky
- `-h, --help`: Display help information

### Examples

Fetch ASCII art for a word from archives:

```sh
arsky -g coffee
```

Create ASCII art from an image:

```sh
arsky -c path/to/your/image.png
```

Create ASCII art from a random image using Google image search:

```sh
arsky -s "michael scott"
```

For more options and detailed usage instructions:

```sh
arsky --help
```

## Development

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Available Scripts

- `npm run build`: Compile TypeScript to JavaScript
- `npm start`: Run the compiled app
- `npm run dev`: Run the app in development mode with ts-node
- `npm test`: Run the test suite
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Run ESLint with auto-fix
- `npm run format`: Format code with Prettier
- `npm run format:check`: Check code formatting without making changes

### Testing

We use Jest for unit testing. Run the test suite with:

```sh
npm test
```

### Linting and Formatting

This project uses ESLint for linting and Prettier for code formatting.

To run the linter:

```sh
npm run lint
```

To automatically fix linting issues:

```sh
npm run lint:fix
```

To format code with Prettier:

```sh
npm run format
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code adheres to the existing style by using the provided ESLint and Prettier configurations.

### Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## Troubleshooting

If you encounter any issues, please check the [FAQ](FAQ.md) or open an issue in the GitHub repository.

## Changelog

For a detailed list of changes and version history, please refer to the [CHANGELOG](CHANGELOG.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [ASCII Art Archive](https://www.asciiart.eu/) for providing a vast collection of ASCII art
- [Sharp](https://sharp.pixelplumbing.com/) for high-performance image processing
- [Commander.js](https://github.com/tj/commander.js/) for command-line interface support
- All the contributors who have helped shape ArSky
