# 🤝 Contributing

Thanks for your interest in contributing to **mostir**!  
We welcome bug reports, feature requests, and pull requests.

---

## Getting Started

1. Fork the repository and clone your fork.
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Build the project:
   ```bash
   pnpm build
   ```
4. Run the CLI locally:
   ```bash
   pnpm dev
   ```

---

## Development Guidelines

- **Code style**: use TypeScript (strict mode), async/await for async code, and keep functions small and focused.  
- **Commit messages**: follow [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat:` new features
  - `fix:` bug fixes
  - `docs:` documentation changes
  - `refactor:` code refactoring
  - `chore:` build/test/tooling changes

---

## Pull Requests

1. Create a feature branch from `main`.
2. Ensure code builds:
   ```bash
   pnpm build
   ```
3. Update docs if your change affects CLI or config.
4. Open a PR and describe your changes clearly.

---

## Issues

- Use **Bug report** when something doesn’t work as expected.  
- Use **Feature request** when suggesting new functionality.  
- Check existing issues before opening a new one.

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](../LICENSE).
