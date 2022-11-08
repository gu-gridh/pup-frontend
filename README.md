# pup-frontend

Vue-based web frontend for the Publication Platform of the Centre for Digital Humanities at the University of Gothenburg.

Uses [pup-admin](https://github.com/CDH-DevTeam/pup-admin) as backend.

### Requirements

- Node 16

### Development

```sh
yarn run serve
```

### Deployment

```sh
yarn run build
```

### Recommended VS Code settings

- Install the extension [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true,
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```
