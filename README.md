## autoup

## Install
```
yarn add autoup -g
or
npm install autoup -g
```

## Features
* Support `go,c,node` auto reload
* Support customize an overloaded command (configFile usage)


## Example

### command usage
```
autoup -f ./index.js -d ./src/
```
* `-f`  Represents the file that needs to be reload (must require)

* `-d`  Indicates the folder or directory to monitor. If -d is not present, the value of -f is monitored by default (optional)

### configFile usage

1. Frist

You need to run `autoup init` in the working directory to generate a configuration file for autoup

2. Next

you could config `.autoup.json`,through the annotation below

```js
{
  // Represents the file that needs to be reload
  "restartFile": "./index.js",
  // Indicates the folder or directory to monitor
  "notifyCwd": "./",
  // Delay to update
  "restartTime": 1000,
  // You can choose one from [.go .c .js] as the configuration
  "type": ".js",
  // Customize an overloaded command,If you set this, restartFile and type will be invalid
  "custom_restart_cmd": null
}
```

3. Finally

You just run `autoup` to make it reload