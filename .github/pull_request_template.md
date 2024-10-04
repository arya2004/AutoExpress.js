---
name: Pull Request 207
about: Submit a Pull Request to contribute to the project
title: "[PR] --flat option added"
labels: ""
assignees: ""
---

**What does this PR do?**
This pull request introduces a new --flat option to the CLI generator, allowing users to generate files directly in the root directory without creating additional subdirectories. The --flat option ensures that the files for controllers, models, routes, etc., are created in the specified directory rather than within separate folders (like /controllers, /models, etc.). Additionally, this PR ensures the proper generation of files for both MVC and non-MVC structures, along with support for various rendering engines (EJS, PUG, Handlebars) in MVC setups.

**Related issues**
This PR addresses the issue related to implementing a --flat option for file generation, improving flexibility in file structure management.

**Checklist**
Please ensure the following before submitting:

- [✓] Code is linted and follows the project's style guidelines
- [✓] All tests pass successfully
- [✓] Relevant documentation is updated (if applicable)
- [✓] You have tested the changes locally

**Additional context**
