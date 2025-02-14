## Why

This project exists as an attempt to (almost) completely create an app using Cursor and other AI tools.

See it working at https://tracker.stackhouse.be

## Git Hooks

This project uses git hooks for automated version management. The hooks are stored in the `.hooks` directory and are automatically configured when you clone the repository.

The pre-commit hook automatically updates the `src/version.txt` file with a version number based on the commit count and current timestamp.

If the hooks aren't working after cloning, run:

```bash
git config core.hooksPath .hooks
chmod +x .hooks/pre-commit
```
