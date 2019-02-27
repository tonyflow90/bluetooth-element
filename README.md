# \<bluetooth-element\>

## DEMO

[LIVE DEMO](https://tonyflow90.github.io/bluetooth-element)

## Usage

### Installation
```
npm install --save @
```

### In an html file
```html
<html>
    <head>
        <script type="module">
            import "./bluetooth-element/bluetooth-element.js"
        </script>
      </head>
    <body>
        <button id="button" onclick="connectToDevice()">connect to device</button>
        <bluetooth-element id="element"></bluetooth-element>
        <script>
            function connectToDevice() {
                document.querySelector('#element').connect()
            }
        </script>
    </body>
</html>
```

### Installation
```sh
git clone https://github.com/tonyflow90/bluetooth-element
cd bluetooth-element
npm install
```

### Running the demo locally
```sh
$ npm run dev
```

### Running the tests
```sh
```