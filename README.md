# Slingr documentation README

Welcome to the Slingr documentation repository! This README provides instructions on how to edit the documentation content and set up a local development environment with all the necessary components.

Before diving into the details, let's take a look at the technology used to develop this documentation:

## Hugo - the static site generator

[Hugo](https://gohugo.io/) is an open-source static site generator designed to help developers create fast and efficient websites. Written in the Go programming language, Hugo is acclaimed for its speed and simplicity.

### Key features and functions

- **Static site generation**: Hugo generates static HTML files as output, resulting in faster website loading times and enhanced security.

- **Speed**: Hugo is exceptionally fast, thanks to its efficient use of Go's concurrency and minimal dependencies.

- **Markdown support**: Hugo primarily uses Markdown for content authoring, making it accessible to a wide range of users.

- **Themes**: It supports themes, enabling users to easily customize the appearance of their websites.

- **Content organization**: Hugo employs a flexible content organization system, ensuring a clear separation of content from presentation.

- **Extensibility**: Developers can extend Hugo's functionality through templates, shortcodes, and custom output formats.

- **Multilingual support**: Hugo includes built-in support for creating multilingual websites.

- **Command-Line interface (CLI)**: Hugo is operated via the command line, providing fine-grained control over site generation and customization.

- **Cross-platform**: It is cross-platform and runs on Linux, macOS, and Windows.

Hugo proves to be a powerful tool for creating websites, blogs, documentation, and more. Its speed, simplicity, and flexibility make it a top choice for web developers and content creators who value performance and ease of use in their projects.

### Selected theme

For this project, we have chosen the "Doks" theme. You can find its documentation [here](https://getdoks.org/).

---

## Editing documentation content

### Content guidelines

To maintain consistency and quality, please follow these content guidelines when editing the documentation:

1. **New content**: As we've utilized AI to enhance the wording throughout the documentation, it's important to maintain this improved wording. Use a prompt like the following to request AI assistance: **`Chat, I'm working on the Slingr documentation project. In this conversation, I will send you text from the page I'm modifying/creating, and I want you to review the wording and spelling.`**

2. **Title styling**: Titles should be written in sentence case, not title case. For example, "Write titles like this."

3. **Header 2/##**: Use highlighted H2 Markdown titles with double hashtags (##) for better visual hierarchy, like this: ## **Like this**

4. **Highlights**: Utilize **`highlighted code snippets`** to emphasize certain words or phrases.

### Making changes

1. **Clone the repository**: If you haven't already, clone this repository to your local machine using Git.
    ```shell
    git clone https://github.com/slingr-stack/slingr-docs
    cd slingr-docs
    ```

2. **Install Hugo**: Ensure that Hugo is installed on your local machine. You can download it from the [Hugo website](https://gohugo.io/getting-started/installing/) and follow the installation instructions. For more information about Hugo, refer to the [Hugo section](#hugo) above.

3. **Install Node.js dependencies**: Run the following command to install Node.js dependencies:
    ```shell
    npm install
    ```

4. **Edit content**: Use your preferred text editor to modify the documentation content. The content is located in the `content.en` directory. You can make changes to Markdown files (`*.md`), and the styles will be automatically applied.

5. **Preview changes**: To preview your changes locally, run Hugo's development server:
    ```shell
    hugo server
    ```
   This command starts a local server, and you can access the documentation at [http://localhost:1313/](http://localhost:1313/) in your web browser.

6. **Commit and push**: Once you are satisfied with your changes, commit them using Git and push them to the repository:
    ```shell
    git add .
    git commit -m "Updated documentation"
    git push
    ```

We appreciate your efforts in improving the Slingr documentation!
