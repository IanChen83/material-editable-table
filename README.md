# material-editable-table
A materialized, editable table react component to display JSON data
Inspired by [react-json-table](https://github.com/arqex/react-json-table) and [material-ui-table-edit](https://github.com/emkay/material-ui-table-edit).

This table component provides an ituitive way to view data and edit them.

## Installation
`npm install --save material-editable-table`

## Available Props
* column
    An array containing column definitions
    ```javascript
        {
            tooltip     : "id",     // The value to be displayed when column header is hovered
            readonly    : true,     // If set to true, this column won't be editable even if the editing props of the table is set
            name        : "id"      // The value displayed on the column header
        }
    ```

* items
    An array containing data in json format
    ```javascript
        {id: 1, name: "The first line"}
    ```

* showToggle
    A boolean value to decide if the editing toggle is shown. Note that this value doesn't affect `editing` or `editable`

* editing
    A boolean value to decide if the table can be edited initially

* editable
    Set this to `true` to enable editing feature

* [Other Props]
    Other props not discussed above will be propegated to Table component from [material-ui#Table](www.material-ui.com/#/components/table). You can affect table appearance and behaviors there.

## Simple Demostration

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
        <script src="main.entry.js"></script>   <!-- This file is generated using webpack -->
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


render(<JsonMaterialTable columns={column} items={row} showToggle={true} editable={true} editing={true} />, document.getElementById("Table"));

```

## TODO
This component just fits my needs. To make it more generally useful, there are much more to do, including:
* The name in column object is used to reference for the key in each item as well as to represent the header. It should be seperated.
* The items to be shown is currently static (i.e. CANNOT be changed from parent components), or the editing feature will break.
* More editing type. Currently it's only plain TextField. Auto completing may be a sweet.
* Right now this component can be seen as a wrapper component for Table. Create EditableTable and EditableCell components and integrate them into [material-ui](www.material-ui.com) may increase rendering performance when the table size is huge.

## Licence
MIT
