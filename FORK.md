# xterm.js fork

this is a fork of [xtermjs/xterm.js](https://github.com/xtermjs/xterm.js) maintained for [relay-ide](https://github.com/donovan-yohan/relay-ide).

## why this fork exists

relay-ide is a remote terminal interface that runs on phones, tablets, and desktops. the official xterm.js package doesn't include the experimental WebGPU renderer, and we occasionally need to patch terminal behavior for our specific use case (escape sequence handling, mobile rendering, etc).

this fork stays as close to upstream as possible. the goal is to carry minimal patches and rebase onto upstream releases regularly.

## what's different from upstream

compare the full diff: [xtermjs/xterm.js...donovan-yohan:xterm.js:master](https://github.com/xtermjs/xterm.js/compare/master...donovan-yohan:xterm.js:master)

current changes:
- merged `webgpu2` branch from [Tyriar/xterm.js](https://github.com/Tyriar/xterm.js/tree/webgpu2) (WebGPU renderer, upstream PR [#5666](https://github.com/xtermjs/xterm.js/pull/5666))
- committed pre-built `lib/` artifacts so the package can be installed from git without a build step
- updated `.gitignore` and `.npmignore` to include built files and the WebGPU addon

## verifying the build

the `lib/` directory contains pre-built artifacts. to verify they match the source:

```bash
git clone https://github.com/donovan-yohan/xterm.js.git
cd xterm.js
npm install
npm run build
npm run package
git diff lib/
```

if the diff is empty, the committed artifacts match what the source produces. if it's not empty, something has changed and the artifacts should be rebuilt.

## updating this fork

when upstream xterm.js releases a new version or when making local changes:

```bash
cd xterm.js
git fetch upstream
git merge upstream/master  # or rebase
npm install
npm run build
npm run package
git add lib/ addons/*/lib/
git commit -m "chore: rebuild after upstream merge"
git push
```

then tag and push the new version:

```bash
git tag v6.0.0-relay.<next>
git push origin v6.0.0-relay.<next>
```

tags follow the pattern `v<upstream-version>-relay.<patch>` (e.g. `v6.0.0-relay.1`, `v6.0.0-relay.2`). bump the relay patch number for local changes; bump the upstream version when rebasing onto a new upstream release.

then in relay-ide, update the pinned tag in `package.json`:

```bash
rm -rf node_modules/@xterm/xterm
npm install @xterm/xterm@github:donovan-yohan/xterm.js#v6.0.0-relay.<next>
```
