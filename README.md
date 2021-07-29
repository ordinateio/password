# Password

Generates strong passwords.

## Installation

```sh
npm install --save-dev @ordinateio/password
```

## Usage

```javascript
import {Password} from "@ordinateio/password";

const password = new Password({
    characters: true,
});

console.log(password.create());
```
