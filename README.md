# Slingr Documentation README

Welcome to the Slingr documentation repository! This README provides instructions on how to edit the documentation content and set up a local development environment with all the necessary components.

But first, lets dive in the technology used to develop the documentation: [HUGO]({#hugo})

## **HUGO**

Hugo is an open-source static site generator designed to help developers build fast and efficient websites. It is written in the Go programming language and is known for its speed and simplicity.

### Key features and functions

- **Static site generator**: Hugo generates static HTML files as output, resulting in faster website loading times and enhanced security.

- **Speed**: Hugo is exceptionally fast, thanks to its efficient use of Go's concurrency and minimal dependencies.

- **Markdown Support**: Hugo primarily uses Markdown for content authoring, making it accessible to a wide range of users.

- **Themes**: It supports themes, allowing users to easily change the look and feel of their websites.

- **Content organization**: Hugo uses a flexible content organization system, providing a clear separation of content from presentation.

- **Extensible**: Developers can extend Hugo's functionality through templates, shortcodes, and custom output formats.

- **Multilingual support**: Hugo has built-in support for creating multilingual websites.

- **Command-Line interface (CLI)**: Hugo is operated via the command line, offering fine-grained control over site generation and customization.

- **Cross-platform**: It is cross-platform and runs on Linux, macOS, and Windows.

Overall, Hugo is a powerful tool for creating websites, blogs, documentation, and more. Its speed, simplicity, and flexibility make it a favored choice among web developers and content creators who prioritize performance and ease of use in their projects.

### Theme selected

The theme we selected for the project is called Doks and you can find it documentation [here.](https://getdoks.org/)

---

## Editing documentation content

### Content criteria

1. **New content**: as the whole content of the documentation has been corrected with AI to improve wording we need to follow this criteria with new documentation generated. Ask ChatGPT to improve wording of the doc you generated through a prompt like this one:  **`Chat, Im working on the Slingr documentation project. In this conversation I will send you text from the page I'm modifying/created and I want you to review wording and spelling.`**
2. **Title styling**: Titles "Are Not Wrote Like This" we "Write titles like this"
3. **H2/##**: H2 markdown titles are higlighted and written ## **Like this**
4. **Highlights**: we prefer **`higlighted code snippets`** for some words we need to higlight.

### Make changes

1. **Clone the repository**: If you haven't already, clone this repository to your local machine using Git.
    ```shell
    git clone https://github.com/slingr-stack/slingr-docs
    cd slingr-docs
    ```
2. **Install hugo**: Ensure that Hugo is installed on your local machine. You can download it from the [Hugo website](https://gohugo.io/getting-started/installing/) and follow the installation instructions. [Know more about HUGO]({#hugo})

3. **Install Node.js dependencies**: Run the following command to install Node.js dependencies:
    ```shell
    npm install
    ```

4. **Edit content**: Use your preferred text editor to modify the documentation content. The content is located in the `content.en` directory. You can make changes to Markdown files (`*.md`) to update the documentation text and the styles will be automatically applied.

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
    ``