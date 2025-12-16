# rspack-panic-code-gen-results-repro

Minimal reproduction for a Rspack runtime panic introduced in `@rspack/core >= 1.6.6`, observed during build when **Module Federation** and **SRI** are enabled.

## Summary

When building this project with `@rspack/core` **v1.6.6 or higher**, the build may crash with a runtime panic similar to:

```
Panic occurred at runtime. Please file an issue on GitHub with the backtrace below: https://github.com/web-infra-dev/rspack/issues: panicked at crates/rspack_core/src/artifacts/code_generation_results.rs:255:13:
No unique code generation entry for unspecified runtime for <project_path>/node_modules/mime-types/index.js 
```

## How to reproduce

1. Build the app with `pnpm run build:rsbuild`, and you can find the error occurs.
2. You can see there is no issue after lower `@rspack/core`'s version to `v1.6.5` by update `resolutions` field on `package.json`.
3. Reset all version modification and turn `security.sri.enable` to `false` at `rsbuild.config.ts`, you can see the issue gone.
4. Reset all config modification and comment out `pluginModuleFederation` usage at `rsbuild.config.ts`, you can see the issue gone.

## Suspected trigger

Based on the experiments above, the crash seems to require all of:
- `@rspack/core >= 1.6.6`
- Module Federation enabled (via `@module-federation/rsbuild-plugin`)
- `security.sri.enable: true`

### Behavior matrix

| `@rspack/core` | Module Federation | `security.sri.enable` | Result |
| --- | --- | --- | --- |
| <= 1.6.5 | yes | yes | OK |
| >= 1.6.6 | yes | yes | Panic |
| >= 1.6.6 | yes | no | OK |
| >= 1.6.6 | no | yes | OK |
