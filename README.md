# material-editable-table
A materialized, editable table react component to display JSON data

Usage and other development details will be updated later

A simple workaround:

* index.html

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Main Window</title>
    </head>
    <body>
        <div id="Table">
        </div>
        <script src="main.entry.js"></script>
    </body>
</html>

```

* main.js

```javascript
import React from 'react'
import {render} from 'react-dom';
import JsonMaterialTable from 'material-editable-table';

var column = [
   {tooltip: "id", readonly: true, name: "id"},
   {tooltip: "name", readonly: false, name: "name"}
];

var row = [
    {id: 1, name: "The first line"},
    {id: 2, name: "The second line"}
];


render(<JsonMaterialTable columns={column} items={row} showToggle={true} editable={true} editing={true} hoverable={true} />, document.getElementById("Table"));

```
