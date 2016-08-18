import React from 'react';
import {
   Table,
   TableBody,
   TableHeader,
   TableHeaderColumn,
   TableRow,
   TableRowColumn,
   TableFooter
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Toggle from 'material-ui/Toggle';
import {teal600, orange500} from 'material-ui/styles/colors';

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

class JsonMaterialTable extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         editing        : (props.editing && props.editable),
         editedTextField: {},
         currentValue   : undefined,
         currentClick   : "-1"
      };
      this.renderHeader = this.renderHeader.bind(this);
      this.renderRow = this.renderRow.bind(this);

      // UI Method
      this.onToggleChanged = this.onToggleChanged.bind(this);
      this.onCellClick = this.onCellClick.bind(this);
      this.onTextFieldBlur = this.onTextFieldBlur.bind(this);

      this.colNum = (this.props.columns) ? this.props.columns.length : 0;
   };

   /////////////////// Render Methods ////////////////////////

   renderRow(row, index){
      var func = this.renderRowColumn.bind(this, row, index);
      return (<TableRow key={index}>{this.props.columns.map(func)}</TableRow>);

   };

   renderHeader(){
      if(!this.props.columns || this.props.columns.length == 0){
         console.error("JsonMaterialTable needs columns be specified.");
         return (<TableHeader displaySelectAll={false} adjustForCheckbox={false}><TableRow>
            <TableRowColumn style={{textAlign: 'center'}}>
               No data to be displayed.
            </TableRowColumn>
         </TableRow></TableHeader>);
      }else{
         return (<TableHeader displaySelectAll={false} adjustForCheckbox={false}><TableRow>
            {this.props.columns.map(this.renderHeaderColumn)}
         </TableRow></TableHeader>);

      }
   };

   renderRowColumn(row, rowIdx, col, idx){
      if(!this.state.editing || col.readonly || !this.props.editable)
         return <TableRowColumn key={idx}>{row[col.name]}</TableRowColumn>;

      var x = (rowIdx * this.colNum + idx).toString();

      if(x == this.state.currentClick){
         return <TableRowColumn key={idx}>
            <TextField autoFocus
                       onBlur={this.onTextFieldBlur.bind(this, rowIdx, idx)}
                       defaultValue={this.state.currentValue}
                       floatingLabelText={row[col.name]}
                       floatingLabelStyle={{color: teal600}}
                       floatingLabelFocusStyle={{color: orange500}}/>
         </TableRowColumn>;
      }else{
         if(this.state.editedTextField[x]){
            return <TableRowColumn key={idx}>
               <TextField onBlur={this.onTextFieldBlur.bind(this, rowIdx, idx)}
                          defaultValue={this.state.editedTextField[x]}
                          floatingLabelText={row[col.name]}
                          floatingLabelStyle={{color: teal600}}
                          floatingLabelFocusStyle={{color: orange500}}/>
            </TableRowColumn>;
         }else{
            return <TableRowColumn key={idx}>{row[col.name]}</TableRowColumn>;
         }
      }

   };

   renderHeaderColumn(col, idx){
      return <TableHeaderColumn key={idx} tooltip={col.tooltip || col.name}>
         {col.name}
      </TableHeaderColumn>;
   };

   renderToggle(){
      return (this.props.showToggle && this.props.editable) ?
         <Toggle style={{maxWidth: 250}} onToggle={this.onToggleChanged} toggled={this.state.editing}/> : null;
   }

   render(){
      var toggle, header, rows;

      toggle = this.renderToggle();

      header = this.renderHeader();

      if(!this.props.items){
         rows = <TableRow><TableRowColumn>
            No data to be displayed.
         </TableRowColumn></TableRow>;
      }else{
         rows = this.props.items.map(this.renderRow);
      }

      return (<div className="table-container">
         {toggle}
         <Table {...this.props} selectable={false} onCellClick={this.onCellClick}>
            {header}
            <TableBody displayRowCheckbox={false}>
               {rows}
            </TableBody>
         </Table>
      </div>);


   };

   getChildContext(){
      return {muiTheme: getMuiTheme(baseTheme)};
   };

   /////////////////// UI Methods ////////////////////////

   onToggleChanged(event, toggled){
      this.setState({
         editing: toggled
      });
   };

   onCellClick(a, b){
      var x = (a * this.colNum + b - 1).toString();
      var copy = Object.assign({}, this.state);
      copy.currentClick = x;
      copy.currentValue = copy.editedTextField[x] || this.props.items[a][this.props.columns[b-1].name];
      delete copy.editedTextField[x];
      this.setState(copy);
   }


   onTextFieldBlur(a, b, e){
      var x = (a * this.colNum + b).toString();
      var copy = Object.assign({}, this.state);
      if(e.target.value === this.props.items[a][this.props.columns[b].name]){
         delete copy.editedTextField[x];
      }else{
         copy.editedTextField[x] = e.target.value;
      }
      copy.currentValue = undefined;
      copy.currentClick = "-1";
      this.setState(copy);
   };
}

JsonMaterialTable.propTypes = {
   columns   : React.PropTypes.array.isRequired,
   items     : React.PropTypes.array,
   editable  : React.PropTypes.bool,
   editing   : React.PropTypes.bool,
   showToggle: React.PropTypes.bool,
};

JsonMaterialTable.defaultProps = {
   columns   : [],
   items     : [],
   editable  : false,
   editing   : false,
   showToggle: false,
};

JsonMaterialTable.childContextTypes = {
   muiTheme: React.PropTypes.object.isRequired
};

export default JsonMaterialTable;
