# xterm.js (relay-ide fork)

fork of [xtermjs/xterm.js](https://github.com/xtermjs/xterm.js) maintained for [relay-ide](https://github.com/donovan-yohan/relay-ide). see [FORK.md](FORK.md) for full context on why this fork exists and what's different from upstream.

## quick reference

| action | command |
|--------|---------|
| install | `npm install` |
| build (tsc) | `npm run build` |
| package (webpack) | `npm run package` |
| full rebuild | `npm install && npm run build && npm run package` |

## key rules

- **always rebuild after changes**: `npm run build && npm run package` — the `lib/` directory contains pre-built artifacts that must be committed
- **commit built files**: `git add lib/ addons/*/lib/` after every rebuild
- **tag releases**: use `v<upstream-version>-relay.<patch>` pattern (e.g. `v6.0.0-relay.1`)
- **keep the diff small**: minimize changes from upstream to make rebasing easy and audits simple
- **update FORK.md**: when adding new patches, document them in the "what's different from upstream" section

## build output

- `lib/xterm.js` + `lib/xterm.mjs` — core terminal (bundled by webpack)
- `lib/browser/`, `lib/common/`, `lib/headless/` — tsc output (module files)
- `addons/addon-webgpu/lib/` — WebGPU renderer addon

## tagging convention

```
v6.0.0-relay.1  — first relay-ide patch on xterm 6.0.0
v6.0.0-relay.2  — second patch
v6.1.0-relay.1  — first patch after rebasing onto upstream 6.1.0
```

bump the relay patch number for local changes. bump the upstream version when rebasing onto a new upstream release. always push tags: `git push origin <tag>`.

## upstream sync

```bash
git remote add upstream https://github.com/xtermjs/xterm.js.git  # once
git fetch upstream
git merge upstream/master
npm install && npm run build && npm run package
git add lib/ addons/*/lib/
git commit -m "chore: rebuild after upstream merge"
git tag v<new-version>-relay.1
git push && git push origin v<new-version>-relay.1
```
