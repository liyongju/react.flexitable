// table data as a list of array.
var rows = [
    ['a01', 'b1', 'c1'],
    ['a02', 'b3', 'c2'],
    ['a03', 'b1', 'c1'],
    ['a04', 'b3', 'c2'],
    ['a05', 'b1', 'c1'],
    ['a06', 'b3', 'c2'],
    ['a07', 'b1', 'c1'],
    ['a08', 'b3', 'c2'],
    ['a09', 'b3', 'c2'],
    ['a10', 'b1', 'c1'],
    ['a11', 'b3', 'c2'],
    ['a12', 'b1', 'c1'],
    ['a13', 'b3', 'c2'],
    ['a14', 'b1', 'c1'],
    ['a15', 'b3', 'c2'],
    ['a16', 'b3', 'c2'],
    ['a17', 'b1', 'c1'],
    ['a18', 'b3', 'c2'],
    ['a19', 'b1', 'c1'],
    ['a20', 'b3', 'c2'],
    ['a21', 'b1', 'c1'],
    ['a22', 'b3', 'c2'],
    ['a23', 'b3', 'c2'],
    ['a24', 'b1', 'c1'],
    ['a25', 'b3', 'c2'],
    ['a26', 'b1', 'c1'],
    ['a27', 'b3', 'c2'],
    ['a28', 'b1', 'c1'],
    ['a29', 'b3', 'c2'],
    ['a30', 'b3', 'c2']
];

var isColumnResizing = false,
    columnWidths = {
        f1: 150,
        f2: 250,
        f3: 200
    },
    FlexibleDataTable = React.createClass({
        displayName: "FlexibleDataTable",
        propTypes: {
            onContentDimensionsChange: React.PropTypes.func,
            left: React.PropTypes.number,
            top: React.PropTypes.number
        },
        _initProps: function() {
            this.props = {tableWidth : 800, tableHeight : 350};
        },
        _getObjectAt: function(rowIndex) {
            return rows[rowIndex];
        },
        _getSize: function() {
            return rows.length;
        },
        _onContentHeightChange: function(e) {
            this.props.onContentDimensionsChange && this.props.onContentDimensionsChange(e, Math.max(600, this.props.tableWidth))
        },
        _onColumnResizeEndCallback: function(width, index) {
            var i = -1;
            for (var k in columnWidths) {
                i++;
                if (i < index) continue;
                if (typeof columnWidths[k] === 'function') break;
                columnWidths[k] = width;
                break;
            }
            isColumnResizing = false;
            this.forceUpdate();
        },
        render: function() {
            this._initProps();
            var e = void 0 !== this.props.left || void 0 !== this.props.top;
            return React.createElement(FlexiTable.Table, {
                rowHeight: 30,
                headerHeight: 50,
                rowGetter: this._getObjectAt,
                rowsCount: this._getSize(),
                width: this.props.tableWidth,
                height: this.props.tableHeight,
                onContentHeightChange: this._onContentHeightChange,
                scrollTop: this.props.top,
                scrollLeft: this.props.left,
                overflowX: e ? "hidden" : "auto",
                overflowY: e ? "hidden" : "auto",
                isColumnResizing: isColumnResizing,
                onColumnResizeEndCallback: this._onColumnResizeEndCallback
            }, React.createElement(FlexiTable.Column, {
                dataKey: 0,// fixed: true, 
                label: "First Name",
                width: columnWidths.f1,
                isResizable: true
            }), React.createElement(FlexiTable.Column, {
                label: "Last Name",
                dataKey: 1,
                width: columnWidths.f2,
                isResizable: true//, minWidth: 70, maxWidth: 170
            }), React.createElement(FlexiTable.Column, {
                label: "Company",
                dataKey: 2,
                width: columnWidths.f3,
                isResizable: true
            }))
        }
    });

React.render(
	<FlexibleDataTable />,
	document.getElementById('tbl-example-1')
);
