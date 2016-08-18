'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Table = require('material-ui/Table');

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _lightBaseTheme = require('material-ui/styles/baseThemes/lightBaseTheme');

var _lightBaseTheme2 = _interopRequireDefault(_lightBaseTheme);

var _Toggle = require('material-ui/Toggle');

var _Toggle2 = _interopRequireDefault(_Toggle);

var _colors = require('material-ui/styles/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Column example
 * [
 *    {tooltip: "id", readonly: true, name: "id"},
 *    {tooltip: "name", readonly: false, name: "name"}
 * ]
 *
 * items example
 * [
 *    {id: 1, name: "Patrick Chen I"}
 *    {id: 2, name: "Patrick Chen II"}
 * ]
 */

var JsonMaterialTable = function (_React$Component) {
   _inherits(JsonMaterialTable, _React$Component);

   function JsonMaterialTable(props) {
      _classCallCheck(this, JsonMaterialTable);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(JsonMaterialTable).call(this, props));

      _this.state = {
         editing: props.editing && props.editable,
         editedTextField: {},
         currentValue: undefined,
         currentClick: "-1"
      };
      _this.renderHeader = _this.renderHeader.bind(_this);
      _this.renderRow = _this.renderRow.bind(_this);

      // UI Method
      _this.onToggleChanged = _this.onToggleChanged.bind(_this);
      _this.onCellClick = _this.onCellClick.bind(_this);
      _this.onTextFieldBlur = _this.onTextFieldBlur.bind(_this);

      _this.colNum = _this.props.columns ? _this.props.columns.length : 0;
      return _this;
   }

   _createClass(JsonMaterialTable, [{
      key: 'renderRow',


      /////////////////// Render Methods ////////////////////////

      value: function renderRow(row, index) {
         var func = this.renderRowColumn.bind(this, row, index);
         return _react2.default.createElement(
            _Table.TableRow,
            { key: index },
            this.props.columns.map(func)
         );
      }
   }, {
      key: 'renderHeader',
      value: function renderHeader() {
         if (!this.props.columns || this.props.columns.length == 0) {
            console.error("JsonMaterialTable needs columns be specified.");
            return _react2.default.createElement(
               _Table.TableHeader,
               { displaySelectAll: false, adjustForCheckbox: false },
               _react2.default.createElement(
                  _Table.TableRow,
                  null,
                  _react2.default.createElement(
                     _Table.TableRowColumn,
                     { style: { textAlign: 'center' } },
                     '沒有可以顯示的資料'
                  )
               )
            );
         } else {
            return _react2.default.createElement(
               _Table.TableHeader,
               { displaySelectAll: false, adjustForCheckbox: false },
               _react2.default.createElement(
                  _Table.TableRow,
                  null,
                  this.props.columns.map(this.renderHeaderColumn)
               )
            );
         }
      }
   }, {
      key: 'renderRowColumn',
      value: function renderRowColumn(row, rowIdx, col, idx) {
         if (!this.state.editing || col.readonly || !this.props.editable) return _react2.default.createElement(
            _Table.TableRowColumn,
            { key: idx },
            row[col.name]
         );

         var x = (rowIdx * this.colNum + idx).toString();

         if (x == this.state.currentClick) {
            return _react2.default.createElement(
               _Table.TableRowColumn,
               { key: idx },
               _react2.default.createElement(_TextField2.default, { autoFocus: true,
                  onBlur: this.onTextFieldBlur.bind(this, rowIdx, idx),
                  defaultValue: this.state.currentValue,
                  floatingLabelText: row[col.name],
                  floatingLabelStyle: { color: _colors.teal600 },
                  floatingLabelFocusStyle: { color: _colors.orange500 } })
            );
         } else {
            if (this.state.editedTextField[x]) {
               return _react2.default.createElement(
                  _Table.TableRowColumn,
                  { key: idx },
                  _react2.default.createElement(_TextField2.default, { onBlur: this.onTextFieldBlur.bind(this, rowIdx, idx),
                     defaultValue: this.state.editedTextField[x],
                     floatingLabelText: row[col.name],
                     floatingLabelStyle: { color: _colors.teal600 },
                     floatingLabelFocusStyle: { color: _colors.orange500 } })
               );
            } else {
               return _react2.default.createElement(
                  _Table.TableRowColumn,
                  { key: idx },
                  row[col.name]
               );
            }
         }
      }
   }, {
      key: 'renderHeaderColumn',
      value: function renderHeaderColumn(col, idx) {
         return _react2.default.createElement(
            _Table.TableHeaderColumn,
            { key: idx, tooltip: col.tooltip || col.name },
            col.name
         );
      }
   }, {
      key: 'renderToggle',
      value: function renderToggle() {
         return this.props.showToggle && this.props.editable ? _react2.default.createElement(_Toggle2.default, { style: { maxWidth: 250 }, onToggle: this.onToggleChanged, toggled: this.state.editing }) : null;
      }
   }, {
      key: 'render',
      value: function render() {
         var toggle, header, rows;

         toggle = this.renderToggle();

         header = this.renderHeader();

         if (!this.props.items) {
            rows = _react2.default.createElement(
               _Table.TableRow,
               null,
               _react2.default.createElement(
                  _Table.TableRowColumn,
                  null,
                  '沒有可以顯示的資料'
               )
            );
         } else {
            rows = this.props.items.map(this.renderRow);
         }

         return _react2.default.createElement(
            'div',
            { className: 'table-container' },
            toggle,
            _react2.default.createElement(
               _Table.Table,
               _extends({}, this.props, { selectable: false, onCellClick: this.onCellClick }),
               header,
               _react2.default.createElement(
                  _Table.TableBody,
                  { displayRowCheckbox: false },
                  rows
               )
            )
         );
      }
   }, {
      key: 'getChildContext',
      value: function getChildContext() {
         return { muiTheme: (0, _getMuiTheme2.default)(_lightBaseTheme2.default) };
      }
   }, {
      key: 'onToggleChanged',


      /////////////////// UI Methods ////////////////////////

      value: function onToggleChanged(event, toggled) {
         this.setState({
            editing: toggled
         });
      }
   }, {
      key: 'onCellClick',
      value: function onCellClick(a, b) {
         var x = (a * this.colNum + b - 1).toString();
         var copy = Object.assign({}, this.state);
         copy.currentClick = x;
         copy.currentValue = copy.editedTextField[x] || this.props.items[a][this.props.columns[b - 1].name];
         delete copy.editedTextField[x];
         this.setState(copy);
      }
   }, {
      key: 'onTextFieldBlur',
      value: function onTextFieldBlur(a, b, e) {
         var x = (a * this.colNum + b).toString();
         var copy = Object.assign({}, this.state);
         if (e.target.value === this.props.items[a][this.props.columns[b].name]) {
            delete copy.editedTextField[x];
         } else {
            copy.editedTextField[x] = e.target.value;
         }
         copy.currentValue = undefined;
         copy.currentClick = "-1";
         this.setState(copy);
      }
   }]);

   return JsonMaterialTable;
}(_react2.default.Component);

JsonMaterialTable.propTypes = {
   columns: _react2.default.PropTypes.array.isRequired,
   items: _react2.default.PropTypes.array,
   editable: _react2.default.PropTypes.bool,
   editing: _react2.default.PropTypes.bool,
   showToggle: _react2.default.PropTypes.bool
};

JsonMaterialTable.defaultProps = {
   columns: [],
   items: [],
   editable: false,
   editing: false,
   showToggle: false
};

JsonMaterialTable.childContextTypes = {
   muiTheme: _react2.default.PropTypes.object.isRequired
};

module.exports = JsonMaterialTable;
