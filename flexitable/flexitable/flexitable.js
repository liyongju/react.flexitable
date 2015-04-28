var FlexiTable = (function(modules) {
        // The module cache
        var installedModules = {};

        // The require function
        function __webpack_require__(moduleId) {

            // Check if module is in cache
            if (installedModules[moduleId])
                return installedModules[moduleId].exports;

            // Create a new module (and put it into the cache)
            var module = installedModules[moduleId] = {
                exports: {},
                id: moduleId,
                loaded: false
            };

            // Execute the module function
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

            // Flag the module as loaded
            module.loaded = true;

            // Return the exports of the module
            return module.exports;
        }

        // expose the modules object (__webpack_modules__)
        __webpack_require__.m = modules;

        // expose the module cache
        __webpack_require__.c = installedModules;

        // __webpack_public_path__
        __webpack_require__.p = "";

        // Load entry module and return exports
        return __webpack_require__(0);
    })
    ([
        /* 0 */
        /***/
        function(module, exports, __webpack_require__) {
            __webpack_require__(2);
            __webpack_require__(4);
            __webpack_require__(6);
            __webpack_require__(8);
            __webpack_require__(10);
            __webpack_require__(12);
            module.exports = __webpack_require__(1);
        },
        /* 1 */
        /***/
        function(module, exports, __webpack_require__) {

            "use strict";

            if (false) {
                var ExecutionEnvironment = require('ExecutionEnvironment');
                if (ExecutionEnvironment.canUseDOM && window.top === window.self) {

                    if (!Object.assign) {
                        console.error(
                            'FlexiTable expected an ES6 compatible `Object.assign` polyfill.'
                        );
                    }
                }
            }

            var FlexiTable = __webpack_require__(15);
            var FlexiTableColumn = __webpack_require__(16);
            var FlexiTableColumnGroup = __webpack_require__(17);

            var FlexiTableRoot = {
                Column: FlexiTableColumn,
                ColumnGroup: FlexiTableColumnGroup,
                Table: FlexiTable,
            };

            FlexiTableRoot.version = '0.1.2';

            module.exports = FlexiTableRoot;
        },
        /* 2 */
        /***/
        function(module, exports, __webpack_require__) {

            // removed by extract-text-webpack-plugin
        },
        /* 3 */
        ,
        /* 4 */
        /***/
        function(module, exports, __webpack_require__) {

            // removed by extract-text-webpack-plugin
        },
        /* 5 */
        ,
        /* 6 */
        /***/
        function(module, exports, __webpack_require__) {

            // removed by extract-text-webpack-plugin
        },
        /* 7 */
        ,
        /* 8 */
        /***/
        function(module, exports, __webpack_require__) {

            // removed by extract-text-webpack-plugin
        },
        /* 9 */
        ,
        /* 10 */
        /***/
        function(module, exports, __webpack_require__) {

            // removed by extract-text-webpack-plugin
        },
        /* 11 */
        ,
        /* 12 */
        /***/
        function(module, exports, __webpack_require__) {

            // removed by extract-text-webpack-plugin
        },
        /* 13 */
        ,
        /* 14 */
        ,
        /* 15 */
        /***/
        function(module, exports, __webpack_require__) {

            /* jslint bitwise: true */

            var FlexiTableHelper = __webpack_require__(20);
            var Locale = __webpack_require__(21);
            var React = __webpack_require__(19);
            var ReactComponentWithPureRenderMixin = __webpack_require__(22);
            var ReactWheelHandler = __webpack_require__(23);
            var Scrollbar = __webpack_require__(24);
            var FlexiTableBufferedRows = __webpack_require__(25);
            var FlexiTableColumnResizeHandle = __webpack_require__(26);
            var FlexiTableRow = __webpack_require__(27);
            var FlexiTableScrollHelper = __webpack_require__(28);
            var FlexiTableWidthHelper = __webpack_require__(29);

            var cloneWithProps = __webpack_require__(30);
            var cx = __webpack_require__(31);
            var debounceCore = __webpack_require__(32);
            var emptyFunction = __webpack_require__(33);
            var invariant = __webpack_require__(34);
            var shallowEqual = __webpack_require__(35);
            var translateDOMPositionXY = __webpack_require__(36);

            var PropTypes = React.PropTypes;
            var ReactChildren = React.Children;

            var renderToString = FlexiTableHelper.renderToString;
            var EMPTY_OBJECT = {};
            var COLUMN_SETTING_NAMES = [
                'bodyFixedColumns',
                'bodyScrollableColumns',
                'headFixedColumns',
                'headScrollableColumns',
                'footFixedColumns',
                'footScrollableColumns',
            ];

            var FlexiTable = React.createClass({
                displayName: "FlexiTable",

                propTypes: {
                    width: PropTypes.number.isRequired,
                    height: PropTypes.number,
                    maxHeight: PropTypes.number,
                    ownerHeight: PropTypes.number,
                    overflowX: PropTypes.oneOf(['hidden', 'auto']),
                    overflowY: PropTypes.oneOf(['hidden', 'auto']),
                    rowsCount: PropTypes.number.isRequired,
                    rowHeight: PropTypes.number.isRequired,
                    rowHeightGetter: PropTypes.func,
                    rowGetter: PropTypes.func.isRequired,
                    rowClassNameGetter: PropTypes.func,
                    groupHeaderHeight: PropTypes.number,
                    headerHeight: PropTypes.number.isRequired,
                    headerDataGetter: PropTypes.func,
                    footerHeight: PropTypes.number,
                    footerData: PropTypes.oneOfType([
                        PropTypes.object,
                        PropTypes.array,
                    ]),
                    scrollLeft: PropTypes.number,
                    scrollToColumn: PropTypes.number,
                    scrollTop: PropTypes.number,
                    scrollToRow: PropTypes.number,
                    onScrollEnd: PropTypes.func,
                    onContentHeightChange: PropTypes.func,
                    onRowClick: PropTypes.func,
                    onRowMouseDown: PropTypes.func,
                    onRowMouseEnter: PropTypes.func,
                    onColumnResizeEndCallback: PropTypes.func,
                    isColumnResizing: PropTypes.bool,
                },

                getDefaultProps: function() /*object*/ {
                    return {
                        footerHeight: 0,
                        groupHeaderHeight: 0,
                        headerHeight: 0,
                        scrollLeft: 0,
                        scrollTop: 0,
                    };
                },

                getInitialState: function() /*object*/ {
                    var props = this.props;
                    var viewportHeight = props.height -
                        props.headerHeight -
                        props.footerHeight -
                        props.groupHeaderHeight;
                    this._scrollHelper = new FlexiTableScrollHelper(
                        props.rowsCount,
                        props.rowHeight,
                        viewportHeight,
                        props.rowHeightGetter
                    );
                    if (props.scrollTop) {
                        this._scrollHelper.scrollTo(props.scrollTop);
                    }
                    this._didScrollStop = debounceCore(this._didScrollStop, 160, this);

                    return this._calculateState(this.props);
                },

                componentWillMount: function() {
                    var scrollToRow = this.props.scrollToRow;
                    if (scrollToRow !== undefined && scrollToRow !== null) {
                        this._rowToScrollTo = scrollToRow;
                    }
                    var scrollToColumn = this.props.scrollToColumn;
                    if (scrollToColumn !== undefined && scrollToColumn !== null) {
                        this._columnToScrollTo = scrollToColumn;
                    }
                    this._wheelHandler = new ReactWheelHandler(
                        this._onWheel,
                        this.props.overflowX !== 'hidden', // Should handle horizontal scroll
                        this.props.overflowY !== 'hidden' // Should handle vertical scroll
                    );
                },

                _reportContentHeight: function() {
                    var scrollContentHeight = this.state.scrollContentHeight;
                    var reservedHeight = this.state.reservedHeight;
                    var requiredHeight = scrollContentHeight + reservedHeight;
                    var contentHeight;
                    if (this.state.height > requiredHeight && this.props.ownerHeight) {
                        contentHeight = Math.max(requiredHeight, this.props.ownerHeight);
                    } else {
                        var maxScrollY = scrollContentHeight - this.state.bodyHeight;
                        contentHeight = this.props.height + maxScrollY;
                    }
                    if (contentHeight !== this._contentHeight &&
                        this.props.onContentHeightChange) {
                        this.props.onContentHeightChange(contentHeight);
                    }
                    this._contentHeight = contentHeight;
                },

                componentDidMount: function() {
                    this._reportContentHeight();
                },

                componentWillReceiveProps: function( /*object*/ nextProps) {
                    var scrollToRow = nextProps.scrollToRow;
                    if (scrollToRow !== undefined && scrollToRow !== null) {
                        this._rowToScrollTo = scrollToRow;
                    }
                    var scrollToColumn = nextProps.scrollToColumn;
                    if (scrollToColumn !== undefined && scrollToColumn !== null) {
                        this._columnToScrollTo = scrollToColumn;
                    }

                    var newOverflowX = nextProps.overflowX;
                    var newOverflowY = nextProps.overflowY;
                    if (newOverflowX !== this.props.overflowX ||
                        newOverflowY !== this.props.overflowY) {
                        this._wheelHandler = new ReactWheelHandler(
                            this._onWheel,
                            newOverflowX !== 'hidden', // Should handle horizontal scroll
                            newOverflowY !== 'hidden' // Should handle vertical scroll
                        );
                    }

                    this.setState(this._calculateState(nextProps, this.state));
                },

                componentDidUpdate: function() {
                    this._reportContentHeight();
                },

                render: function() /*object*/ {
                    var state = this.state;
                    var props = this.props;

                    var groupHeader;
                    if (state.useGroupHeader) {
                        groupHeader = (
                            React.createElement(FlexiTableRow, {
                                key: "group_header",
                                className: cx('public/flexiTable/header'),
                                data: state.groupHeaderData,
                                width: state.width,
                                height: state.groupHeaderHeight,
                                index: 0,
                                zIndex: 1,
                                offsetTop: 0,
                                scrollLeft: state.scrollX,
                                fixedColumns: state.groupHeaderFixedColumns,
                                scrollableColumns: state.groupHeaderScrollableColumns
                            })
                        );
                    }

                    var maxScrollY = this.state.scrollContentHeight - this.state.bodyHeight;
                    var showScrollbarX = state.maxScrollX > 0 && state.overflowX !== 'hidden';
                    var showScrollbarY = maxScrollY > 0 && state.overflowY !== 'hidden';
                    var scrollbarXHeight = showScrollbarX ? Scrollbar.SIZE : 0;
                    var scrollbarYHeight = state.height - scrollbarXHeight;

                    var headerOffsetTop = state.useGroupHeader ? state.groupHeaderHeight : 0;
                    var bodyOffsetTop = headerOffsetTop + state.headerHeight;
                    var bottomSectionOffset = 0;
                    var footOffsetTop = bodyOffsetTop + state.bodyHeight;
                    var rowsContainerHeight = footOffsetTop + state.footerHeight;

                    if (props.ownerHeight !== undefined && props.ownerHeight < props.height) {
                        bottomSectionOffset = props.ownerHeight - props.height;
                        footOffsetTop = Math.min(
                            footOffsetTop,
                            scrollbarYHeight + bottomSectionOffset - state.footerHeight
                        );
                        scrollbarYHeight = props.ownerHeight - scrollbarXHeight;
                    }

                    var verticalScrollbar;
                    if (showScrollbarY) {
                        var headerHeight = props.headerHeight;
                        verticalScrollbar = React.createElement(Scrollbar, {
                            size: scrollbarYHeight - headerHeight,
                            contentSize: scrollbarYHeight + maxScrollY - headerHeight,
                            onScroll: this._onVerticalScroll,
                            position: state.scrollY,
                            headerHeight: headerHeight
                        });
                    }

                    var horizontalScrollbar;
                    if (showScrollbarX) {
                        var scrollbarYWidth = showScrollbarY ? Scrollbar.SIZE : 0;
                        var scrollbarXWidth = state.width - scrollbarYWidth;
                        horizontalScrollbar = React.createElement(HorizontalScrollbar, {
                            contentSize: scrollbarXWidth + state.maxScrollX,
                            offset: bottomSectionOffset,
                            onScroll: this._onHorizontalScroll,
                            position: state.scrollX,
                            size: scrollbarXWidth
                        });
                    }

                    var dragKnob =
                        React.createElement(FlexiTableColumnResizeHandle, {
                            height: state.height,
                            initialWidth: state.columnResizingData.width || 0,
                            minWidth: state.columnResizingData.minWidth || 0,
                            maxWidth: state.columnResizingData.maxWidth || Number.MAX_VALUE,
                            visible: !!state.isColumnResizing,
                            leftOffset: state.columnResizingData.left || 0,
                            knobHeight: state.headerHeight,
                            initialEvent: state.columnResizingData.initialEvent,
                            onColumnResizeEnd: props.onColumnResizeEndCallback,
                            columnKey: state.columnResizingData.key
                        });

                    var footer = null;
                    if (state.footerHeight) {
                        footer =
                            React.createElement(FlexiTableRow, {
                                key: "footer",
                                className: cx('public/flexiTable/footer'),
                                data: state.footerData,
                                fixedColumns: state.footFixedColumns,
                                height: state.footerHeight,
                                index: -1,
                                zIndex: 1,
                                offsetTop: footOffsetTop,
                                scrollableColumns: state.footScrollableColumns,
                                scrollLeft: state.scrollX,
                                width: state.width
                            });
                    }

                    var rows = this._renderRows(bodyOffsetTop);

                    var header =
                        React.createElement(FlexiTableRow, {
                            key: "header",
                            className: cx('public/flexiTable/header'),
                            data: state.headData,
                            width: state.width,
                            height: state.headerHeight,
                            index: -1,
                            zIndex: 1,
                            offsetTop: headerOffsetTop,
                            scrollLeft: state.scrollX,
                            fixedColumns: state.headFixedColumns,
                            scrollableColumns: state.headScrollableColumns,
                            onColumnResize: this._onColumnResize
                        });

                    var shadow;
                    if (state.scrollY) {
                        shadow =
                            React.createElement("div", {
                                className: cx('flexiTable/shadow'),
                                style: {
                                    top: bodyOffsetTop
                                }
                            });
                    }

                    return (
                        React.createElement("div", {
                                className: cx('public/flexiTable/main'),
                                onWheel: this._wheelHandler.onWheel,
                                style: {
                                    height: state.height,
                                    width: state.width
                                }
                            },
                            React.createElement("div", {
                                    className: cx('flexiTable/rowsContainer'),
                                    style: {
                                        height: rowsContainerHeight,
                                        width: state.width
                                    }
                                },
                                dragKnob,
                                groupHeader,
                                header,
                                rows,
                                footer,
                                shadow
                            ),
                            verticalScrollbar,
                            horizontalScrollbar
                        )
                    );
                },

                _renderRows: function( /*number*/ offsetTop) /*object*/ {
                    var state = this.state;

                    return (
                        React.createElement(FlexiTableBufferedRows, {
                            defaultRowHeight: state.rowHeight,
                            firstRowIndex: state.firstRowIndex,
                            firstRowOffset: state.firstRowOffset,
                            fixedColumns: state.bodyFixedColumns,
                            height: state.bodyHeight,
                            offsetTop: offsetTop,
                            onRowClick: state.onRowClick,
                            onRowMouseDown: state.onRowMouseDown,
                            onRowMouseEnter: state.onRowMouseEnter,
                            rowClassNameGetter: state.rowClassNameGetter,
                            rowsCount: state.rowsCount,
                            rowGetter: state.rowGetter,
                            rowHeightGetter: state.rowHeightGetter,
                            scrollLeft: state.scrollX,
                            scrollableColumns: state.bodyScrollableColumns,
                            showLastRowBorder: !state.footerHeight,
                            width: state.width
                        })
                    );
                },

                /**
                 * This is called when a cell that is in the header of a column has its
                 * resizer knob clicked on. It displays the resizer and puts in the correct
                 * location on the table.
                 */
                _onColumnResize: function(
                    /*number*/
                    combinedWidth,
                    /*number*/
                    leftOffset,
                    /*number*/
                    cellWidth,
                    /*?number*/
                    cellMinWidth,
                    /*?number*/
                    cellMaxWidth,
                    /*number|string*/
                    columnKey,
                    /*object*/
                    event) {
                    if (Locale.isRTL()) {
                        leftOffset = -leftOffset;
                    }
                    this.setState({
                        isColumnResizing: true,
                        columnResizingData: {
                            left: leftOffset + combinedWidth - cellWidth,
                            width: cellWidth,
                            minWidth: cellMinWidth,
                            maxWidth: cellMaxWidth,
                            initialEvent: {
                                clientX: event.clientX,
                                clientY: event.clientY,
                                preventDefault: emptyFunction
                            },
                            key: columnKey
                        }
                    });
                },

                _populateColumnsAndColumnData: function(
                    /*array*/
                    columns,
                    /*?array*/
                    columnGroups
                ) /*object*/ {
                    var columnInfo = {};
                    var bodyColumnTypes = this._splitColumnTypes(columns);
                    columnInfo.bodyFixedColumns = bodyColumnTypes.fixed;
                    columnInfo.bodyScrollableColumns = bodyColumnTypes.scrollable;

                    columnInfo.headData = this._getHeadData(columns);
                    var headColumnTypes = this._splitColumnTypes(
                        this._createHeadColumns(columns)
                    );
                    columnInfo.headFixedColumns = headColumnTypes.fixed;
                    columnInfo.headScrollableColumns = headColumnTypes.scrollable;

                    var footColumnTypes = this._splitColumnTypes(
                        this._createFootColumns(columns)
                    );
                    columnInfo.footFixedColumns = footColumnTypes.fixed;
                    columnInfo.footScrollableColumns = footColumnTypes.scrollable;

                    if (columnGroups) {
                        columnInfo.groupHeaderData = this._getGroupHeaderData(columnGroups);
                        columnGroups = this._createGroupHeaderColumns(columnGroups);
                        var groupHeaderColumnTypes = this._splitColumnTypes(columnGroups);
                        columnInfo.groupHeaderFixedColumns = groupHeaderColumnTypes.fixed;
                        columnInfo.groupHeaderScrollableColumns =
                            groupHeaderColumnTypes.scrollable;
                    }
                    return columnInfo;
                },

                _calculateState: function( /*object*/ props, /*?object*/ oldState) /*object*/ {
                    invariant(
                        props.height !== undefined || props.maxHeight !== undefined,
                        'You must set either a height or a maxHeight'
                    );

                    var firstRowIndex = (oldState && oldState.firstRowIndex) || 0;
                    var firstRowOffset = (oldState && oldState.firstRowOffset) || 0;
                    var scrollX, scrollY;
                    if (oldState && props.overflowX !== 'hidden') {
                        scrollX = oldState.scrollX;
                    } else {
                        scrollX = props.scrollLeft;
                    }
                    if (oldState && props.overflowY !== 'hidden') {
                        scrollY = oldState.scrollY;
                    } else {
                        scrollState = this._scrollHelper.scrollTo(props.scrollTop);
                        firstRowIndex = scrollState.index;
                        firstRowOffset = scrollState.offset;
                        scrollY = scrollState.position;
                    }

                    if (this._rowToScrollTo !== undefined) {
                        scrollState =
                            this._scrollHelper.scrollRowIntoView(this._rowToScrollTo);
                        firstRowIndex = scrollState.index;
                        firstRowOffset = scrollState.offset;
                        scrollY = scrollState.position;
                        delete this._rowToScrollTo;
                    }

                    if (oldState && props.rowsCount !== oldState.rowsCount) {
                        // Number of rows changed, try to scroll to the row from before the
                        // change
                        var viewportHeight = props.height -
                            props.headerHeight -
                            props.footerHeight -
                            props.groupHeaderHeight;
                        this._scrollHelper = new FlexiTableScrollHelper(
                            props.rowsCount,
                            props.rowHeight,
                            viewportHeight,
                            props.rowHeightGetter
                        );
                        var scrollState =
                            this._scrollHelper.scrollToRow(firstRowIndex, firstRowOffset);
                        firstRowIndex = scrollState.index;
                        firstRowOffset = scrollState.offset;
                        scrollY = scrollState.position;
                    } else if (oldState && props.rowHeightGetter !== oldState.rowHeightGetter) {
                        this._scrollHelper.setRowHeightGetter(props.rowHeightGetter);
                    }

                    var columnResizingData;
                    if (props.isColumnResizing) {
                        columnResizingData = oldState && oldState.columnResizingData;
                    } else {
                        columnResizingData = EMPTY_OBJECT;
                    }

                    var children = [];

                    ReactChildren.forEach(props.children, function(child, index) {
                        if (child == null) {
                            return;
                        }
                        invariant(
                            child.type.__TableColumnGroup__ ||
                            child.type.__TableColumn__,
                            'child type should be <FlexiTableColumn /> or ' +
                            '<FlexiTableColumnGroup />'
                        );
                        children.push(child);
                    });

                    var useGroupHeader = false;
                    if (children.length && children[0].type.__TableColumnGroup__) {
                        useGroupHeader = true;
                    }

                    var columns;
                    var columnGroups;

                    if (useGroupHeader) {
                        var columnGroupSettings =
                            FlexiTableWidthHelper.adjustColumnGroupWidths(
                                children,
                                props.width
                            );
                        columns = columnGroupSettings.columns;
                        columnGroups = columnGroupSettings.columnGroups;
                    } else {
                        columns = FlexiTableWidthHelper.adjustColumnWidths(
                            children,
                            props.width
                        );
                    }

                    var columnInfo = this._populateColumnsAndColumnData(
                        columns,
                        columnGroups
                    );

                    if (oldState) {
                        columnInfo = this._tryReusingColumnSettings(columnInfo, oldState);
                    }

                    if (this._columnToScrollTo !== undefined) {
                        // If selected column is a fixed column, don't scroll
                        var fixedColumnsCount = columnInfo.bodyFixedColumns.length;
                        if (this._columnToScrollTo >= fixedColumnsCount) {
                            var totalFixedColumnsWidth = 0;
                            var i, column;
                            for (i = 0; i < columnInfo.bodyFixedColumns.length; ++i) {
                                column = columnInfo.bodyFixedColumns[i];
                                totalFixedColumnsWidth += column.props.width;
                            }

                            var scrollableColumnIndex = this._columnToScrollTo - fixedColumnsCount;
                            var previousColumnsWidth = 0;
                            for (i = 0; i < scrollableColumnIndex; ++i) {
                                column = columnInfo.bodyScrollableColumns[i];
                                previousColumnsWidth += column.props.width;
                            }

                            var availableScrollWidth = props.width - totalFixedColumnsWidth;
                            var selectedColumnWidth = columnInfo.bodyScrollableColumns[
                                this._columnToScrollTo - fixedColumnsCount
                            ].props.width;
                            var minAcceptableScrollPosition =
                                previousColumnsWidth + selectedColumnWidth - availableScrollWidth;

                            if (scrollX < minAcceptableScrollPosition) {
                                scrollX = minAcceptableScrollPosition;
                            }

                            if (scrollX > previousColumnsWidth) {
                                scrollX = previousColumnsWidth;
                            }
                        }
                        delete this._columnToScrollTo;
                    }

                    var useMaxHeight = props.height === undefined;
                    var height = useMaxHeight ? props.maxHeight : props.height;
                    var totalHeightReserved = props.footerHeight + props.headerHeight +
                        props.groupHeaderHeight;
                    var bodyHeight = height - totalHeightReserved;
                    var scrollContentHeight = this._scrollHelper.getContentHeight();
                    var totalHeightNeeded = scrollContentHeight + totalHeightReserved;
                    var scrollContentWidth =
                        FlexiTableWidthHelper.getTotalWidth(columns);

                    var horizontalScrollbarVisible = scrollContentWidth > props.width &&
                        props.overflowX !== 'hidden';

                    if (horizontalScrollbarVisible) {
                        bodyHeight -= Scrollbar.SIZE;
                        totalHeightNeeded += Scrollbar.SIZE;
                        totalHeightReserved += Scrollbar.SIZE;
                    }

                    var maxScrollX = Math.max(0, scrollContentWidth - props.width);
                    var maxScrollY = Math.max(0, scrollContentHeight - bodyHeight);
                    scrollX = Math.min(scrollX, maxScrollX);
                    scrollY = Math.min(scrollY, maxScrollY);

                    if (!maxScrollY) {
                        // no vertical scrollbar necessary, use the totals we tracked so we
                        // can shrink-to-fit vertically
                        if (useMaxHeight) {
                            height = totalHeightNeeded;
                        }
                        bodyHeight = totalHeightNeeded - totalHeightReserved;
                    }

                    this._scrollHelper.setViewportHeight(bodyHeight);

                    var newState = Object.assign({
                            isColumnResizing: oldState && oldState.isColumnResizing
                        },
                        columnInfo,
                        props,

                        {
                            columnResizingData: columnResizingData,
                            firstRowIndex: firstRowIndex,
                            firstRowOffset: firstRowOffset,
                            horizontalScrollbarVisible: horizontalScrollbarVisible,
                            maxScrollX: maxScrollX,
                            reservedHeight: totalHeightReserved,
                            scrollContentHeight: scrollContentHeight,
                            scrollX: scrollX,
                            scrollY: scrollY,
                            bodyHeight: bodyHeight,
                            height: height,
                            useGroupHeader: useGroupHeader
                        });

                    if (oldState) {
                        if (shallowEqual(oldState.headData, newState.headData)) {
                            newState.headData = oldState.headData;
                        }
                        if (shallowEqual(oldState.groupHeaderData, newState.groupHeaderData)) {
                            newState.groupHeaderData = oldState.groupHeaderData;
                        }
                    }

                    return newState;
                },

                _tryReusingColumnSettings: function(
                    /*object*/
                    columnInfo,
                    /*object*/
                    oldState
                ) /*object*/ {
                    COLUMN_SETTING_NAMES.forEach(function(settingName) {
                        if (columnInfo[settingName].length === oldState[settingName].length) {
                            var canReuse = true;
                            for (var index = 0; index < columnInfo[settingName].length; ++index) {
                                if (!shallowEqual(
                                        columnInfo[settingName][index].props,
                                        oldState[settingName][index].props
                                    )) {
                                    canReuse = false;
                                    break;
                                }
                            }
                            if (canReuse) {
                                columnInfo[settingName] = oldState[settingName];
                            }
                        }
                    });
                    return columnInfo;
                },

                _createGroupHeaderColumns: function( /*array*/ columnGroups) /*array*/ {
                    var newColumnGroups = [];
                    for (var i = 0; i < columnGroups.length; ++i) {
                        newColumnGroups[i] = cloneWithProps(
                            columnGroups[i], {
                                dataKey: i,
                                children: undefined,
                                columnData: columnGroups[i].props.columnGroupData,
                                isHeaderCell: true,
                            }
                        );
                    }
                    return newColumnGroups;
                },

                _createHeadColumns: function( /*array*/ columns) /*array*/ {
                    var headColumns = [];
                    for (var i = 0; i < columns.length; ++i) {
                        var columnProps = columns[i].props;
                        headColumns.push(cloneWithProps(
                            columns[i], {
                                cellRenderer: columnProps.headerRenderer || renderToString,
                                columnData: columnProps.columnData,
                                dataKey: columnProps.dataKey,
                                isHeaderCell: true,
                                label: columnProps.label,
                            }
                        ));
                    }
                    return headColumns;
                },

                _createFootColumns: function( /*array*/ columns) /*array*/ {
                    var footColumns = [];
                    for (var i = 0; i < columns.length; ++i) {
                        var columnProps = columns[i].props;
                        footColumns.push(cloneWithProps(
                            columns[i], {
                                cellRenderer: columnProps.footerRenderer || renderToString,
                                columnData: columnProps.columnData,
                                dataKey: columnProps.dataKey,
                                isFooterCell: true,
                            }
                        ));
                    }
                    return footColumns;
                },

                _getHeadData: function( /*array*/ columns) /*object*/ {
                    var headData = {};
                    for (var i = 0; i < columns.length; ++i) {
                        var columnProps = columns[i].props;
                        if (this.props.headerDataGetter) {
                            headData[columnProps.dataKey] =
                                this.props.headerDataGetter(columnProps.dataKey);
                        } else {
                            headData[columnProps.dataKey] = columnProps.label || '';
                        }
                    }
                    return headData;
                },

                _getGroupHeaderData: function( /*array*/ columnGroups) /*array*/ {
                    var groupHeaderData = [];
                    for (var i = 0; i < columnGroups.length; ++i) {
                        groupHeaderData[i] = columnGroups[i].props.label || '';
                    }
                    return groupHeaderData;
                },

                _splitColumnTypes: function( /*array*/ columns) /*object*/ {
                    var fixedColumns = [];
                    var scrollableColumns = [];
                    for (var i = 0; i < columns.length; ++i) {
                        if (columns[i].props.fixed) {
                            fixedColumns.push(columns[i]);
                        } else {
                            scrollableColumns.push(columns[i]);
                        }
                    }
                    return {
                        fixed: fixedColumns,
                        scrollable: scrollableColumns,
                    };
                },

                _onWheel: function( /*number*/ deltaX, /*number*/ deltaY) {
                    if (this.isMounted()) {
                        var x = this.state.scrollX;
                        if (Math.abs(deltaY) > Math.abs(deltaX) &&
                            this.props.overflowY !== 'hidden') {
                            var scrollState = this._scrollHelper.scrollBy(Math.round(deltaY));
                            this.setState({
                                firstRowIndex: scrollState.index,
                                firstRowOffset: scrollState.offset,
                                scrollY: scrollState.position,
                                scrollContentHeight: scrollState.contentHeight,
                            });
                        } else if (deltaX && this.props.overflowX !== 'hidden') {
                            x += deltaX;
                            x = x < 0 ? 0 : x;
                            x = x > this.state.maxScrollX ? this.state.maxScrollX : x;
                            this.setState({
                                scrollX: x,
                            });
                        }

                        this._didScrollStop();
                    }
                },

                _onHorizontalScroll: function( /*number*/ scrollPos) {
                    if (this.isMounted() && scrollPos !== this.state.scrollX) {
                        this.setState({
                            scrollX: scrollPos,
                        });
                        this._didScrollStop();
                    }
                },

                _onVerticalScroll: function( /*number*/ scrollPos) {
                    if (this.isMounted() && scrollPos !== this.state.scrollY) {
                        var scrollState = this._scrollHelper.scrollTo(Math.round(scrollPos));
                        this.setState({
                            firstRowIndex: scrollState.index,
                            firstRowOffset: scrollState.offset,
                            scrollY: scrollState.position,
                            scrollContentHeight: scrollState.contentHeight,
                        });
                        this._didScrollStop();
                    }
                },

                _didScrollStop: function() {
                    if (this.isMounted()) {
                        if (this.props.onScrollEnd) {
                            this.props.onScrollEnd(this.state.scrollX, this.state.scrollY);
                        }
                    }
                }
            });

            var HorizontalScrollbar = React.createClass({
                displayName: "HorizontalScrollbar",
                mixins: [ReactComponentWithPureRenderMixin],
                propTypes: {
                    contentSize: PropTypes.number.isRequired,
                    offset: PropTypes.number.isRequired,
                    onScroll: PropTypes.func.isRequired,
                    position: PropTypes.number.isRequired,
                    size: PropTypes.number.isRequired,
                },

                render: function() /*object*/ {
                    var outerContainerStyle = {
                        height: Scrollbar.SIZE,
                        width: this.props.size,
                    };
                    var innerContainerStyle = {
                        height: Scrollbar.SIZE,
                        position: 'absolute',
                        width: this.props.size,
                    };
                    translateDOMPositionXY(
                        innerContainerStyle,
                        0,
                        this.props.offset
                    );

                    return (
                        React.createElement("div", {
                                className: cx('flexiTable/horizontalScrollbar'),
                                style: outerContainerStyle
                            },
                            React.createElement("div", {
                                    style: innerContainerStyle
                                },
                                React.createElement(Scrollbar, React.__spread({},
                                    this.props, {
                                        isOpaque: true,
                                        orientation: "horizontal",
                                        offset: undefined
                                    }))
                            )
                        )
                    );
                },
            });

            module.exports = FlexiTable;
        },
        /* 16 */
        /***/
        function(module, exports, __webpack_require__) {

            var React = __webpack_require__(19);

            var PropTypes = React.PropTypes;

            /**
             * Component that defines the attributes of table column.
             */
            var FlexiTableColumn = React.createClass({
                displayName: "FlexiTableColumn",
                statics: {
                    __TableColumn__: true
                },

                propTypes: {
                    align: PropTypes.oneOf(['left', 'center', 'right']),
                    cellClassName: PropTypes.string,
                    cellRenderer: PropTypes.func,
                    cellDataGetter: PropTypes.func,
                    dataKey: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.number,
                    ]).isRequired,
                    headerRenderer: PropTypes.func,
                    footerRenderer: PropTypes.func,
                    columnData: PropTypes.object,
                    label: PropTypes.string,
                    width: PropTypes.number.isRequired,
                    minWidth: PropTypes.number,
                    maxWidth: PropTypes.number,
                    flexGrow: PropTypes.number,
                    isResizable: PropTypes.bool,
                },

                render: function() {
                    console.log(this);
                    if (false) {
                        throw new Error(
                            'Component <FlexiTableColumn /> should never render'
                        );
                    }
                    return null;
                },
            });

            module.exports = FlexiTableColumn;
        },
        /* 17 */
        /***/
        function(module, exports, __webpack_require__) {

            var React = __webpack_require__(19);
            var PropTypes = React.PropTypes;
            var FlexiTableColumnGroup = React.createClass({
                displayName: "FlexiTableColumnGroup",
                statics: {
                    __TableColumnGroup__: true
                },
                propTypes: {
                    align: PropTypes.oneOf(['left', 'center', 'right']),
                    fixed: PropTypes.bool.isRequired,
                    columnGroupData: PropTypes.object,
                    label: PropTypes.string,
                    groupHeaderRenderer: PropTypes.func,
                },

                render: function() {
                    if (false) {
                        throw new Error(
                            'Component <FlexiTableColumnGroup /> should never render'
                        );
                    }
                    return null;
                },
            });

            module.exports = FlexiTableColumnGroup;
        },
        /* 18 */
        ,
        /* 19 */
        /***/
        function(module, exports, __webpack_require__) {
            module.exports = __webpack_require__(37);
        },
        /* 20 */
        /***/
        function(module, exports, __webpack_require__) {

            "use strict";

            var Locale = __webpack_require__(21);
            var React = __webpack_require__(19);
            var FlexiTableColumnGroup = __webpack_require__(17);
            var FlexiTableColumn = __webpack_require__(16);

            var cloneWithProps = __webpack_require__(30);

            var DIR_SIGN = (Locale.isRTL() ? -1 : +1);
            // A cell up to 5px outside of the visible area will still be considered visible
            var CELL_VISIBILITY_TOLERANCE = 5; // used for flyouts

            function renderToString(value) /*string*/ {
                if (value === null || value === undefined) {
                    return '';
                } else {
                    return String(value);
                }
            }

            function forEachColumn(children, callback) {
                React.Children.forEach(children, function(child) {
                    if (child.type === FlexiTableColumnGroup.type) {
                        forEachColumn(child.props.children, callback);
                    } else if (child.type === FlexiTableColumn.type) {
                        callback(child);
                    }
                });
            }

            function mapColumns(children, callback) {
                var newChildren = [];
                React.Children.forEach(children, function(originalChild) {
                    var newChild = originalChild;

                    if (originalChild.type === FlexiTableColumnGroup.type) {
                        var haveColumnsChanged = false;
                        var newColumns = [];

                        forEachColumn(originalChild.props.children, function(originalcolumn) {
                            var newColumn = callback(originalcolumn);
                            if (newColumn !== originalcolumn) {
                                haveColumnsChanged = true;
                            }
                            newColumns.push(newColumn);
                        });

                        if (haveColumnsChanged) {
                            newChild = cloneWithProps(originalChild, {
                                children: newColumns
                            });
                        }
                    } else if (originalChild.type === FlexiTableColumn.type) {
                        newChild = callback(originalChild);
                    }

                    newChildren.push(newChild);
                });

                return newChildren;
            }

            var FlexiTableHelper = {
                DIR_SIGN: DIR_SIGN,
                CELL_VISIBILITY_TOLERANCE: CELL_VISIBILITY_TOLERANCE,
                renderToString: renderToString,
                forEachColumn: forEachColumn,
                mapColumns: mapColumns,
            };

            module.exports = FlexiTableHelper;
        },
        /* 21 */
        /***/
        function(module, exports, __webpack_require__) {

            "use strict";

            // Hard code this for now.
            var Locale = {
                isRTL: function() {
                    return false;
                },
                getDirection: function() {
                    return 'LTR';
                }
            };

            module.exports = Locale;
        },
        /* 22 */
        /***/
        function(module, exports, __webpack_require__) {
            module.exports = __webpack_require__(60);
        },
        /* 23 */
        /***/
        function(module, exports, __webpack_require__) {

            "use strict";

            var normalizeWheel = __webpack_require__(46);
            var requestAnimationFramePolyfill = __webpack_require__(47);

            function ReactWheelHandler(
                onWheel,
                /*boolean*/
                handleScrollX,
                /*boolean*/
                handleScrollY,
                /*?boolean*/
                stopPropagation) {
                this.$ReactWheelHandler_animationFrameID = null;
                this.$ReactWheelHandler_deltaX = 0;
                this.$ReactWheelHandler_deltaY = 0;
                this.$ReactWheelHandler_didWheel = this.$ReactWheelHandler_didWheel.bind(this);
                this.$ReactWheelHandler_handleScrollX = handleScrollX;
                this.$ReactWheelHandler_handleScrollY = handleScrollY;
                this.$ReactWheelHandler_stopPropagation = !!stopPropagation;
                this.$ReactWheelHandler_onWheelCallback = onWheel;
                this.onWheel = this.onWheel.bind(this);
            }

            ReactWheelHandler.prototype.onWheel = function(event) {
                if (this.$ReactWheelHandler_handleScrollX || this.$ReactWheelHandler_handleScrollY) {
                    event.preventDefault();
                }
                var normalizedEvent = normalizeWheel(event);

                this.$ReactWheelHandler_deltaX += this.$ReactWheelHandler_handleScrollX ? normalizedEvent.pixelX : 0;
                this.$ReactWheelHandler_deltaY += this.$ReactWheelHandler_handleScrollY ? normalizedEvent.pixelY : 0;

                var changed;
                if (this.$ReactWheelHandler_deltaX !== 0 || this.$ReactWheelHandler_deltaY !== 0) {
                    if (this.$ReactWheelHandler_stopPropagation) {
                        event.stopPropagation();
                    }
                    changed = true;
                }

                if (changed === true && this.$ReactWheelHandler_animationFrameID === null) {
                    this.$ReactWheelHandler_animationFrameID = requestAnimationFramePolyfill(this.$ReactWheelHandler_didWheel);
                }
            };

            ReactWheelHandler.prototype.$ReactWheelHandler_didWheel = function() {
                this.$ReactWheelHandler_animationFrameID = null;
                this.$ReactWheelHandler_onWheelCallback(this.$ReactWheelHandler_deltaX, this.$ReactWheelHandler_deltaY);
                this.$ReactWheelHandler_deltaX = 0;
                this.$ReactWheelHandler_deltaY = 0;
            };

            module.exports = ReactWheelHandler;
        },
        /* 24 */
        /***/
        function(module, exports, __webpack_require__) {

            var DOMMouseMoveTracker = __webpack_require__(38);
            var Keys = __webpack_require__(39);
            var React = __webpack_require__(19);
            var ReactComponentWithPureRenderMixin = __webpack_require__(22);
            var ReactWheelHandler = __webpack_require__(23);

            var cssVar = __webpack_require__(40);
            var cx = __webpack_require__(31);
            var emptyFunction = __webpack_require__(33);
            var translateDOMPositionXY = __webpack_require__(36);

            var PropTypes = React.PropTypes;

            var UNSCROLLABLE_STATE = {
                position: 0,
                scrollable: false,
            };

            var FACE_MARGIN = parseInt(cssVar('scrollbar-face-margin'), 10);
            var FACE_MARGIN_2 = FACE_MARGIN * 2;
            var FACE_SIZE_MIN = 30;
            var KEYBOARD_SCROLL_AMOUNT = 40;

            var _lastScrolledScrollbar = null;

            var Scrollbar = React.createClass({
                displayName: "Scrollbar",
                mixins: [ReactComponentWithPureRenderMixin],

                propTypes: {
                    contentSize: PropTypes.number.isRequired,
                    defaultPosition: PropTypes.number,
                    isOpaque: PropTypes.bool,
                    orientation: PropTypes.oneOf(['vertical', 'horizontal']),
                    onScroll: PropTypes.func,
                    position: PropTypes.number,
                    size: PropTypes.number.isRequired,
                    trackColor: PropTypes.oneOf(['gray']),
                    zIndex: PropTypes.number,
                },

                getInitialState: function() /*object*/ {
                    var props = this.props;
                    return this._calculateState(
                        props.position || props.defaultPosition || 0,
                        props.size,
                        props.contentSize,
                        props.orientation
                    );
                },

                componentWillReceiveProps: function( /*object*/ nextProps) {
                    var controlledPosition = nextProps.position;
                    if (controlledPosition === undefined) {
                        this._setNextState(
                            this._calculateState(
                                this.state.position,
                                nextProps.size,
                                nextProps.contentSize,
                                nextProps.orientation
                            )
                        );
                    } else {
                        this._setNextState(
                            this._calculateState(
                                controlledPosition,
                                nextProps.size,
                                nextProps.contentSize,
                                nextProps.orientation
                            ),
                            nextProps
                        );
                    }
                },

                getDefaultProps: function() /*object*/ {
                    return {
                        defaultPosition: 0,
                        isOpaque: false,
                        onScroll: emptyFunction,
                        orientation: 'vertical',
                        zIndex: 99
                    };
                },

                render: function() /*?object*/ {
                    if (!this.state.scrollable) {
                        return null;
                    }

                    var size = this.props.size;
                    var mainStyle;
                    var faceStyle;
                    var isHorizontal = this.state.isHorizontal;
                    var isVertical = !isHorizontal;
                    var isActive = this.state.focused || this.state.isDragging;
                    var faceSize = this.state.faceSize;
                    var isOpaque = this.props.isOpaque;

                    var mainClassName = cx({
                        'public/Scrollbar/main': true,
                        'public/Scrollbar/mainHorizontal': isHorizontal,
                        'public/Scrollbar/mainVertical': isVertical,
                        'Scrollbar/mainActive': isActive,
                        'Scrollbar/mainOpaque': isOpaque,
                    });

                    var faceClassName = cx({
                        'Scrollbar/face': true,
                        'Scrollbar/faceHorizontal': isHorizontal,
                        'Scrollbar/faceVertical': isVertical,
                        'Scrollbar/faceActive': isActive,
                    });

                    var position = this.state.position * this.state.scale + FACE_MARGIN;

                    if (isHorizontal) {
                        mainStyle = {
                            width: size,
                        };
                        faceStyle = {
                            width: faceSize - FACE_MARGIN_2
                        };
                        translateDOMPositionXY(faceStyle, position, 0);
                    } else {
                        mainStyle = {
                            height: size,
                        };
                        faceStyle = {
                            height: faceSize - FACE_MARGIN_2,
                        };
                        translateDOMPositionXY(faceStyle, 0, position);
                    }

                    mainStyle.zIndex = this.props.zIndex;

                    if (this.props.trackColor === 'gray') {
                        mainStyle.backgroundColor = cssVar('ads-cf-bg-color-gray');
                    }

                    mainStyle.marginTop = this.props.headerHeight;

                    return (
                        React.createElement("div", {
                                onFocus: this._onFocus,
                                onBlur: this._onBlur,
                                onKeyDown: this._onKeyDown,
                                onMouseDown: this._onMouseDown,
                                onWheel: this._wheelHandler.onWheel,
                                className: mainClassName,
                                style: mainStyle,
                                tabIndex: 0
                            },
                            React.createElement("div", {
                                ref: "face",
                                className: faceClassName,
                                style: faceStyle
                            })
                        )
                    );
                },

                componentWillMount: function() {
                    var isHorizontal = this.props.orientation === 'horizontal';
                    var onWheel = isHorizontal ? this._onWheelX : this._onWheelY;

                    this._wheelHandler = new ReactWheelHandler(
                        onWheel,
                        isHorizontal, // Should hanlde horizontal scroll
                        !isHorizontal // Should handle vertical scroll
                    );
                },

                componentDidMount: function() {
                    this._mouseMoveTracker = new DOMMouseMoveTracker(
                        this._onMouseMove,
                        this._onMouseMoveEnd,
                        document.documentElement
                    );

                    if (this.props.position !== undefined &&
                        this.state.position !== this.props.position) {
                        this._didScroll();
                    }
                },

                componentWillUnmount: function() {
                    this._nextState = null;
                    this._mouseMoveTracker.releaseMouseMoves();
                    if (_lastScrolledScrollbar === this) {
                        _lastScrolledScrollbar = null;
                    }
                    delete this._mouseMoveTracker;
                },

                scrollBy: function( /*number*/ delta) {
                    this._onWheel(delta);
                },

                _calculateState: function(
                    /*?number*/
                    position,
                    /*number*/
                    size,
                    /*number*/
                    contentSize,
                    /*string*/
                    orientation
                ) /*object*/ {

                    if (size < 1 || contentSize <= size) {
                        return UNSCROLLABLE_STATE;
                    }

                    position = position || 0;

                    var isHorizontal = orientation === 'horizontal';
                    var scale = size / contentSize;
                    var faceSize = Math.round(size * scale);

                    if (faceSize < FACE_SIZE_MIN) {
                        scale = (size - FACE_SIZE_MIN) / (contentSize - FACE_SIZE_MIN);
                        faceSize = FACE_SIZE_MIN;
                    }

                    var scrollable = true;
                    var maxPosition = contentSize - size;

                    if (position < 0) {
                        position = 0;
                    } else if (position > maxPosition) {
                        position = maxPosition;
                    }

                    var isDragging = this._mouseMoveTracker ?
                        this._mouseMoveTracker.isDragging() :
                        false;

                    position = Math.round(position);
                    faceSize = Math.round(faceSize);

                    return {
                        faceSize: faceSize,
                        isDragging: isDragging,
                        isHorizontal: isHorizontal,
                        position: position,
                        scale: scale,
                        scrollable: scrollable,
                    };
                },

                _onWheelY: function( /*number*/ deltaX, /*number*/ deltaY) {
                    this._onWheel(deltaY);
                },

                _onWheelX: function( /*number*/ deltaX, /*number*/ deltaY) {
                    this._onWheel(deltaX);
                },

                _onWheel: function( /*number*/ delta) {
                    var props = this.props;

                    this._setNextState(
                        this._calculateState(
                            this.state.position + delta,
                            props.size,
                            props.contentSize,
                            props.orientation
                        )
                    );
                },

                _onMouseDown: function( /*object*/ event) {
                    var nextState;

                    if (event.target !== this.refs.face.getDOMNode()) {
                        var nativeEvent = event.nativeEvent;
                        var position = this.state.isHorizontal ?
                            nativeEvent.offsetX || nativeEvent.layerX :
                            nativeEvent.offsetY || nativeEvent.layerY;

                        var props = this.props;
                        position = position / this.state.scale;
                        nextState = this._calculateState(
                            position - (this.state.faceSize * 0.5 / this.state.scale),
                            props.size,
                            props.contentSize,
                            props.orientation
                        );
                    } else {
                        nextState = {};
                    }

                    nextState.focused = true;
                    this._setNextState(nextState);

                    this._mouseMoveTracker.captureMouseMoves(event);
                    this.getDOMNode().focus();
                },

                _onMouseMove: function( /*number*/ deltaX, /*number*/ deltaY) {
                    var props = this.props;
                    var delta = this.state.isHorizontal ? deltaX : deltaY;
                    delta = delta / this.state.scale;

                    this._setNextState(
                        this._calculateState(
                            this.state.position + delta,
                            props.size,
                            props.contentSize,
                            props.orientation
                        )
                    );
                },

                _onMouseMoveEnd: function() {
                    this._nextState = null;
                    this._mouseMoveTracker.releaseMouseMoves();
                    this.setState({
                        isDragging: false
                    });
                },

                _onKeyDown: function( /*object*/ event) {
                    var keyCode = event.keyCode;

                    if (keyCode === Keys.TAB) {
                        return;
                    }

                    var distance = KEYBOARD_SCROLL_AMOUNT;
                    var direction = 0;

                    if (this.state.isHorizontal) {
                        switch (keyCode) {
                            case Keys.HOME:
                                direction = -1;
                                distance = this.props.contentSize;
                                break;

                            case Keys.LEFT:
                                direction = -1;
                                break;

                            case Keys.RIGHT:
                                direction = 1;
                                break;

                            default:
                                return;
                        }
                    }

                    if (!this.state.isHorizontal) {
                        switch (keyCode) {
                            case Keys.SPACE:
                            	direction = (event.shiftKey) ? -1 : 1;
                                break;

                            case Keys.HOME:
                                direction = -1;
                                distance = this.props.contentSize;
                                break;

                            case Keys.UP:
                                direction = -1;
                                break;

                            case Keys.DOWN:
                                direction = 1;
                                break;

                            case Keys.PAGE_UP:
                                direction = -1;
                                distance = this.props.size;
                                break;

                            case Keys.PAGE_DOWN:
                                direction = 1;
                                distance = this.props.size;
                                break;

                            default:
                                return;
                        }
                    }

                    event.preventDefault();

                    var props = this.props;
                    this._setNextState(
                        this._calculateState(
                            this.state.position + (distance * direction),
                            props.size,
                            props.contentSize,
                            props.orientation
                        )
                    );
                },

                _onFocus: function() {
                    this.setState({
                        focused: true,
                    });
                },

                _onBlur: function() {
                    this.setState({
                        focused: false,
                    });
                },

                _blur: function() {
                    if (this.isMounted()) {
                        try {
                            this._onBlur();
                            this.getDOMNode().blur();
                        } catch (oops) {
                            // pass
                        }
                    }
                },

                _setNextState: function( /*object*/ nextState, /*?object*/ props) {
                    props = props || this.props;
                    var controlledPosition = props.position;
                    var willScroll = this.state.position !== nextState.position;
                    if (controlledPosition === undefined) {
                        var callback = willScroll ? this._didScroll : undefined;
                        this.setState(nextState, callback);
                    } else if (controlledPosition === nextState.position) {
                        this.setState(nextState);
                    } else {
                        if (nextState.position !== undefined &&
                            nextState.position !== this.state.position) {
                            this.props.onScroll(nextState.position);
                        }
                        return;
                    }

                    if (willScroll && _lastScrolledScrollbar !== this) {
                        _lastScrolledScrollbar && _lastScrolledScrollbar._blur();
                        _lastScrolledScrollbar = this;
                    }
                },

                _didScroll: function() {
                    this.props.onScroll(this.state.position);
                },
            });

            Scrollbar.KEYBOARD_SCROLL_AMOUNT = KEYBOARD_SCROLL_AMOUNT;
            Scrollbar.SIZE = parseInt(cssVar('scrollbar-size'), 10);

            module.exports = Scrollbar;
        },
        /* 25 */
        /***/
        function(module, exports, __webpack_require__) {

            var React = __webpack_require__(19);
            var FlexiTableRowBuffer = __webpack_require__(41);
            var FlexiTableRow = __webpack_require__(27);

            var cx = __webpack_require__(31);
            var emptyFunction = __webpack_require__(33);
            var joinClasses = __webpack_require__(42);

            var PropTypes = React.PropTypes;

            var FlexiTableBufferedRows = React.createClass({
                displayName: "FlexiTableBufferedRows",

                propTypes: {
                    defaultRowHeight: PropTypes.number.isRequired,
                    firstRowIndex: PropTypes.number.isRequired,
                    firstRowOffset: PropTypes.number.isRequired,
                    fixedColumns: PropTypes.array.isRequired,
                    height: PropTypes.number.isRequired,
                    offsetTop: PropTypes.number.isRequired,
                    onRowClick: PropTypes.func,
                    onRowMouseDown: PropTypes.func,
                    onRowMouseEnter: PropTypes.func,
                    rowClassNameGetter: PropTypes.func,
                    rowsCount: PropTypes.number.isRequired,
                    rowGetter: PropTypes.func.isRequired,
                    rowHeightGetter: PropTypes.func,
                    scrollLeft: PropTypes.number.isRequired,
                    scrollableColumns: PropTypes.array.isRequired,
                    showLastRowBorder: PropTypes.bool,
                    width: PropTypes.number.isRequired,
                },

                getInitialState: function() /*object*/ {
                    this._rowBuffer =
                        new FlexiTableRowBuffer(
                            this.props.rowsCount,
                            this.props.defaultRowHeight,
                            this.props.height,
                            this._getRowHeight
                        );
                    return ({
                        rowsToRender: this._rowBuffer.getRows(
                            this.props.firstRowIndex,
                            this.props.firstRowOffset
                        ),
                    });
                },

                componentWillMount: function() {
                    this._staticRowArray = [];
                },

                componentDidMount: function() {
                    this._bufferUpdateTimer = setTimeout(this._updateBuffer, 500);
                },

                componentWillReceiveProps: function( /*object*/ nextProps) {
                    if (nextProps.rowsCount !== this.props.rowsCount ||
                        nextProps.defaultRowHeight !== this.props.defaultRowHeight ||
                        nextProps.height !== this.props.height) {
                        this._rowBuffer =
                            new FlexiTableRowBuffer(
                                nextProps.rowsCount,
                                nextProps.defaultRowHeight,
                                nextProps.height,
                                this._getRowHeight
                            );
                    }
                    this.setState({
                        rowsToRender: this._rowBuffer.getRows(
                            nextProps.firstRowIndex,
                            nextProps.firstRowOffset
                        ),
                    });
                    if (this._bufferUpdateTimer) {
                        clearTimeout(this._bufferUpdateTimer);
                    }
                    this._bufferUpdateTimer = setTimeout(this._updateBuffer, 400);
                },

                _updateBuffer: function() {
                    this._bufferUpdateTimer = null;
                    if (this.isMounted()) {
                        this.setState({
                            rowsToRender: this._rowBuffer.getRowsWithUpdatedBuffer(),
                        });
                    }
                },

                shouldComponentUpdate: function() /*boolean*/ {
                    return true;
                },

                componentWillUnmount: function() {
                    this._staticRowArray.length = 0;
                },

                render: function() /*object*/ {
                    var props = this.props;
                    var offsetTop = props.offsetTop;
                    var rowClassNameGetter = props.rowClassNameGetter || emptyFunction;
                    var rowGetter = props.rowGetter;

                    var rowsToRender = this.state.rowsToRender;
                    this._staticRowArray.length = rowsToRender.length;

                    for (var i = 0; i < rowsToRender.length; ++i) {
                        var rowInfo = rowsToRender[i];
                        var rowIndex = rowInfo.rowIndex;
                        var rowOffsetTop = rowInfo.offsetTop;
                        var currentRowHeight = this._getRowHeight(rowIndex);

                        var hasBottomBorder =
                            rowIndex === props.rowsCount - 1 && props.showLastRowBorder;

                        this._staticRowArray[i] =
                            React.createElement(FlexiTableRow, {
                                key: i,
                                index: rowIndex,
                                data: rowGetter(rowIndex),
                                width: props.width,
                                height: currentRowHeight,
                                scrollLeft: Math.round(props.scrollLeft),
                                offsetTop: Math.round(offsetTop + rowOffsetTop),
                                fixedColumns: props.fixedColumns,
                                scrollableColumns: props.scrollableColumns,
                                onClick: props.onRowClick,
                                onMouseDown: props.onRowMouseDown,
                                onMouseEnter: props.onRowMouseEnter,
                                className: joinClasses(
                                    rowClassNameGetter(rowIndex),
                                    cx('public/flexiTable/bodyRow'),
                                    hasBottomBorder ? cx('flexiTable/hasBottomBorder') : null
                                )
                            });
                    }

                    return React.createElement("div", null, this._staticRowArray);
                },

                _getRowHeight: function( /*number*/ index) /*number*/ {
                    return this.props.rowHeightGetter ?
                        this.props.rowHeightGetter(index) :
                        this.props.defaultRowHeight;
                },
            });

            module.exports = FlexiTableBufferedRows;
        },
        /* 26 */
        /***/
        function(module, exports, __webpack_require__) {

            var DOMMouseMoveTracker = __webpack_require__(38);
            var Locale = __webpack_require__(21);
            var React = __webpack_require__(19);
            var ReactComponentWithPureRenderMixin = __webpack_require__(22);

            var clamp = __webpack_require__(43);
            var cx = __webpack_require__(31);

            var PropTypes = React.PropTypes;

            var FlexiTableColumnResizeHandle = React.createClass({
                displayName: "FlexiTableColumnResizeHandle",
                mixins: [ReactComponentWithPureRenderMixin],

                propTypes: {
                    visible: PropTypes.bool.isRequired,
                    height: PropTypes.number.isRequired,
                    leftOffset: PropTypes.number.isRequired,
                    knobHeight: PropTypes.number.isRequired,
                    initialWidth: PropTypes.number,
                    minWidth: PropTypes.number,
                    maxWidth: PropTypes.number,
                    initialEvent: PropTypes.object,
                    onColumnResizeEnd: PropTypes.func,
                    columnKey: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.number
                    ]),
                },

                getInitialState: function() /*object*/ {
                    return {
                        width: 0,
                        cursorDelta: 0
                    };
                },

                componentWillReceiveProps: function( /*object*/ newProps) {
                    if (newProps.initialEvent && !this._mouseMoveTracker.isDragging()) {
                        this._mouseMoveTracker.captureMouseMoves(newProps.initialEvent);
                        this.setState({
                            width: newProps.initialWidth,
                            cursorDelta: newProps.initialWidth
                        });
                    }
                },

                componentDidMount: function() {
                    this._mouseMoveTracker = new DOMMouseMoveTracker(
                        this._onMove,
                        this._onColumnResizeEnd,
                        document.body
                    );
                },

                componentWillUnmount: function() {
                    this._mouseMoveTracker.releaseMouseMoves();
                    this._mouseMoveTracker = null;
                },

                render: function() /*object*/ {
                    var style = {
                        width: this.state.width,
                        height: this.props.height,
                    };
                    if (Locale.isRTL()) {
                        style.right = this.props.leftOffset;
                    } else {
                        style.left = this.props.leftOffset;
                    }
                    return (
                        React.createElement("div", {
                                className: cx({
                                    'flexiTableColumnResizerLine/main': true,
                                    'flexiTableColumnResizerLine/hiddenElem': !this.props.visible
                                }),
                                style: style
                            },
                            React.createElement("div", {
                                className: cx('flexiTableColumnResizerLine/mouseArea'),
                                style: {
                                    height: this.props.height
                                }
                            })
                        )
                    );
                },

                _onMove: function( /*number*/ deltaX) {
                    if (Locale.isRTL()) {
                        deltaX = -deltaX;
                    }
                    var newWidth = this.state.cursorDelta + deltaX;
                    var newColumnWidth =
                        clamp(this.props.minWidth, newWidth, this.props.maxWidth);

                    this.setState({
                        width: newColumnWidth,
                        cursorDelta: newWidth
                    });
                },

                _onColumnResizeEnd: function() {
                    this._mouseMoveTracker.releaseMouseMoves();
                    this.props.onColumnResizeEnd(
                        this.state.width,
                        this.props.columnKey
                    );
                },
            });

            module.exports = FlexiTableColumnResizeHandle;
        },
        /* 27 */
        /***/
        function(module, exports, __webpack_require__) {

            "use strict";

            var FlexiTableHelper = __webpack_require__(20);
            var React = __webpack_require__(19);
            var ReactComponentWithPureRenderMixin = __webpack_require__(22);
            var FlexiTableCellGroup = __webpack_require__(44);

            var cx = __webpack_require__(31);
            var joinClasses = __webpack_require__(42);
            var translateDOMPositionXY = __webpack_require__(36);

            var DIR_SIGN = FlexiTableHelper.DIR_SIGN;
            var PropTypes = React.PropTypes;

            var FlexiTableRowImpl = React.createClass({
                displayName: "FlexiTableRowImpl",
                mixins: [ReactComponentWithPureRenderMixin],

                propTypes: {
                    data: PropTypes.oneOfType([
                        PropTypes.object,
                        PropTypes.array
                    ]),
                    fixedColumns: PropTypes.array.isRequired,
                    height: PropTypes.number.isRequired,
                    index: PropTypes.number.isRequired,
                    scrollableColumns: PropTypes.array.isRequired,
                    scrollLeft: PropTypes.number.isRequired,
                    width: PropTypes.number.isRequired,
                    onClick: PropTypes.func,
                    onColumnResize: PropTypes.func,
                },

                render: function() /*object*/ {
                    var style = {
                        width: this.props.width,
                        height: this.props.height,
                    };

                    var className = cx({
                        'public/flexiTableRow/main': true,
                        'public/flexiTableRow/highlighted': (this.props.index % 2 === 1)
                    });

                    if (!this.props.data) {
                        return (
                            React.createElement("div", {
                                className: joinClasses(className, this.props.className),
                                style: style
                            })
                        );
                    }

                    var fixedColumns =
                        React.createElement(FlexiTableCellGroup, {
                            key: "fixed_cells",
                            height: this.props.height,
                            left: 0,
                            zIndex: 2,
                            columns: this.props.fixedColumns,
                            data: this.props.data,
                            onColumnResize: this.props.onColumnResize,
                            rowHeight: this.props.height,
                            rowIndex: this.props.index,
                            isColumnResizing: 1,
                            onColumnResizeEnd: this._onColumnResizeEndCallback
                        });
                    var fixedColumnsWidth = this._getColumnsWidth(this.props.fixedColumns);
                    var columnsShadow = this._renderColumnsShadow(fixedColumnsWidth);
                    var scrollableColumns =
                        React.createElement(FlexiTableCellGroup, {
                            key: "scrollable_cells",
                            height: this.props.height,
                            left: (fixedColumnsWidth - this.props.scrollLeft) * DIR_SIGN,
                            zIndex: 0,
                            columns: this.props.scrollableColumns,
                            data: this.props.data,
                            onColumnResize: this.props.onColumnResize,
                            rowHeight: this.props.height,
                            rowIndex: this.props.index
                        });

                    return (
                        React.createElement("div", {
                                className: joinClasses(className, this.props.className),
                                onClick: this.props.onClick ? this._onClick : null,
                                onMouseDown: this.props.onMouseDown ? this._onMouseDown : null,
                                onMouseEnter: this.props.onMouseEnter ? this._onMouseEnter : null,
                                style: style
                            },
                            React.createElement("div", {
                                    className: cx('flexiTableRow/body')
                                },
                                fixedColumns,
                                scrollableColumns,
                                columnsShadow
                            )
                        )
                    );
                },

                _getColumnsWidth: function( /*array*/ columns) /*number*/ {
                    var width = 0;
                    for (var i = 0; i < columns.length; ++i) {
                        width += columns[i].props.width;
                    }
                    return width;
                },

                _renderColumnsShadow: function( /*number*/ left) /*?object*/ {
                    if (left > 0) {
                        var className = cx({
                            'flexiTableRow/fixedColumnsDivider': true,
                            'flexiTableRow/columnsShadow': this.props.scrollLeft > 0,
                        });
                        var style = {
                            left: left,
                            height: this.props.height
                        };
                        return React.createElement("div", {
                            className: className,
                            style: style
                        });
                    }
                },

                _onClick: function( /*object*/ event) {
                    this.props.onClick(event, this.props.index, this.props.data);
                },

                _onMouseDown: function( /*object*/ event) {
                    this.props.onMouseDown(event, this.props.index, this.props.data);
                },

                _onMouseEnter: function( /*object*/ event) {
                    this.props.onMouseEnter(event, this.props.index, this.props.data);
                },
            });

            var FlexiTableRow = React.createClass({
                displayName: "FlexiTableRow",
                mixins: [ReactComponentWithPureRenderMixin],

                propTypes: {
                    /**
                     * Height of the row.
                     */
                    height: PropTypes.number.isRequired,

                    /**
                     * Z-index on which the row will be displayed. Used e.g. for keeping
                     * header and footer in front of other rows.
                     */
                    zIndex: PropTypes.number,

                    /**
                     * The vertical position where the row should render itself
                     */
                    offsetTop: PropTypes.number.isRequired,

                    /**
                     * Width of the row.
                     */
                    width: PropTypes.number.isRequired,
                },

                render: function() /*object*/ {
                    var style = {
                        width: this.props.width,
                        height: this.props.height,
                        zIndex: (this.props.zIndex ? this.props.zIndex : 0),
                    };
                    translateDOMPositionXY(style, 0, this.props.offsetTop);

                    return (
                        React.createElement("div", {
                                style: style,
                                className: cx('flexiTableRow/rowWrapper')
                            },
                            React.createElement(FlexiTableRowImpl, React.__spread({},
                                this.props, {
                                    offsetTop: undefined,
                                    zIndex: undefined
                                }))
                        )
                    );
                },
            });

            module.exports = FlexiTableRow;
        },
        /* 28 */
        /***/
        function(module, exports, __webpack_require__) {

            'use strict';

            var PrefixIntervalTree = __webpack_require__(45);
            var clamp = __webpack_require__(43);

            var BUFFER_ROWS = 5;


            function FlexiTableScrollHelper(
                rowCount,
                /*number*/
                defaultRowHeight,
                /*number*/
                viewportHeight,
                /*?function*/
                rowHeightGetter) {
                this.$FlexiTableScrollHelper_rowOffsets = new PrefixIntervalTree(rowCount, defaultRowHeight);
                this.$FlexiTableScrollHelper_storedHeights = new Array(rowCount);
                for (var i = 0; i < rowCount; ++i) {
                    this.$FlexiTableScrollHelper_storedHeights[i] = defaultRowHeight;
                }
                this.$FlexiTableScrollHelper_rowCount = rowCount;
                this.$FlexiTableScrollHelper_position = 0;
                this.$FlexiTableScrollHelper_contentHeight = rowCount * defaultRowHeight;
                this.$FlexiTableScrollHelper_defaultRowHeight = defaultRowHeight;
                this.$FlexiTableScrollHelper_rowHeightGetter = rowHeightGetter ?
                    rowHeightGetter :
                    function() {
                        return defaultRowHeight;
                    };
                this.$FlexiTableScrollHelper_viewportHeight = viewportHeight;
                this.scrollRowIntoView = this.scrollRowIntoView.bind(this);
                this.setViewportHeight = this.setViewportHeight.bind(this);
                this.scrollBy = this.scrollBy.bind(this);
                this.scrollTo = this.scrollTo.bind(this);
                this.scrollToRow = this.scrollToRow.bind(this);
                this.setRowHeightGetter = this.setRowHeightGetter.bind(this);
                this.getContentHeight = this.getContentHeight.bind(this);

                this.$FlexiTableScrollHelper_updateHeightsInViewport(0, 0);
            }

            FlexiTableScrollHelper.prototype.setRowHeightGetter = function(rowHeightGetter) {
                this.$FlexiTableScrollHelper_rowHeightGetter = rowHeightGetter;
            };

            FlexiTableScrollHelper.prototype.setViewportHeight = function(viewportHeight) {
                this.$FlexiTableScrollHelper_viewportHeight = viewportHeight;
            };

            FlexiTableScrollHelper.prototype.getContentHeight = function() {
                return this.$FlexiTableScrollHelper_contentHeight;
            };

            FlexiTableScrollHelper.prototype.$FlexiTableScrollHelper_updateHeightsInViewport = function(
                firstRowIndex,
                /*number*/
                firstRowOffset) {
                var top = firstRowOffset;
                var index = firstRowIndex;
                while (top <= this.$FlexiTableScrollHelper_viewportHeight && index < this.$FlexiTableScrollHelper_rowCount) {
                    this.$FlexiTableScrollHelper_updateRowHeight(index);
                    top += this.$FlexiTableScrollHelper_storedHeights[index];
                    index++;
                }
            };

            FlexiTableScrollHelper.prototype.$FlexiTableScrollHelper_updateHeightsAboveViewport = function(firstRowIndex) {
                var index = firstRowIndex - 1;
                while (index >= 0 && index >= firstRowIndex - BUFFER_ROWS) {
                    var delta = this.$FlexiTableScrollHelper_updateRowHeight(index);
                    this.$FlexiTableScrollHelper_position += delta;
                    index--;
                }
            };

            FlexiTableScrollHelper.prototype.$FlexiTableScrollHelper_updateRowHeight = function(rowIndex) {
                if (rowIndex < 0 || rowIndex >= this.$FlexiTableScrollHelper_rowCount) {
                    return 0;
                }
                var newHeight = this.$FlexiTableScrollHelper_rowHeightGetter(rowIndex);
                if (newHeight !== this.$FlexiTableScrollHelper_storedHeights[rowIndex]) {
                    var change = newHeight - this.$FlexiTableScrollHelper_storedHeights[rowIndex];
                    this.$FlexiTableScrollHelper_rowOffsets.set(rowIndex, newHeight);
                    this.$FlexiTableScrollHelper_storedHeights[rowIndex] = newHeight;
                    this.$FlexiTableScrollHelper_contentHeight += change;
                    return change;
                }
                return 0;
            };

            FlexiTableScrollHelper.prototype.scrollBy = function(delta) {
                var firstRow = this.$FlexiTableScrollHelper_rowOffsets.upperBound(this.$FlexiTableScrollHelper_position);
                var firstRowPosition =
                    firstRow.value - this.$FlexiTableScrollHelper_storedHeights[firstRow.index];
                var rowIndex = firstRow.index;
                var position = this.$FlexiTableScrollHelper_position;

                var rowHeightChange = this.$FlexiTableScrollHelper_updateRowHeight(rowIndex);
                if (firstRowPosition !== 0) {
                    position += rowHeightChange;
                }
                var visibleRowHeight = this.$FlexiTableScrollHelper_storedHeights[rowIndex] -
                    (position - firstRowPosition);

                if (delta >= 0) {

                    while (delta > 0 && rowIndex < this.$FlexiTableScrollHelper_rowCount) {
                        if (delta < visibleRowHeight) {
                            position += delta;
                            delta = 0;
                        } else {
                            delta -= visibleRowHeight;
                            position += visibleRowHeight;
                            rowIndex++;
                        }
                        if (rowIndex < this.$FlexiTableScrollHelper_rowCount) {
                            this.$FlexiTableScrollHelper_updateRowHeight(rowIndex);
                            visibleRowHeight = this.$FlexiTableScrollHelper_storedHeights[rowIndex];
                        }
                    }
                } else if (delta < 0) {
                    delta = -delta;
                    var invisibleRowHeight = this.$FlexiTableScrollHelper_storedHeights[rowIndex] - visibleRowHeight;

                    while (delta > 0 && rowIndex >= 0) {
                        if (delta < invisibleRowHeight) {
                            position -= delta;
                            delta = 0;
                        } else {
                            position -= invisibleRowHeight;
                            delta -= invisibleRowHeight;
                            rowIndex--;
                        }
                        if (rowIndex >= 0) {
                            var change = this.$FlexiTableScrollHelper_updateRowHeight(rowIndex);
                            invisibleRowHeight = this.$FlexiTableScrollHelper_storedHeights[rowIndex];
                            position += change;
                        }
                    }
                }

                var maxPosition = this.$FlexiTableScrollHelper_contentHeight - this.$FlexiTableScrollHelper_viewportHeight;
                position = clamp(0, position, maxPosition);
                this.$FlexiTableScrollHelper_position = position;
                var firstVisibleRow = this.$FlexiTableScrollHelper_rowOffsets.upperBound(position);
                var firstRowIndex = firstVisibleRow.index;
                firstRowPosition =
                    firstVisibleRow.value - this.$FlexiTableScrollHelper_rowHeightGetter(firstRowIndex);
                var firstRowOffset = firstRowPosition - position;

                this.$FlexiTableScrollHelper_updateHeightsInViewport(firstRowIndex, firstRowOffset);
                this.$FlexiTableScrollHelper_updateHeightsAboveViewport(firstRowIndex);

                return {
                    index: firstRowIndex,
                    offset: firstRowOffset,
                    position: this.$FlexiTableScrollHelper_position,
                    contentHeight: this.$FlexiTableScrollHelper_contentHeight,
                };
            };

            FlexiTableScrollHelper.prototype.$FlexiTableScrollHelper_getRowAtEndPosition = function(rowIndex) {
                // We need to update enough rows above the selected one to be sure that when
                // we scroll to selected position all rows between first shown and selected
                // one have most recent heights computed and will not resize
                this.$FlexiTableScrollHelper_updateRowHeight(rowIndex);
                var currentRowIndex = rowIndex;
                var top = this.$FlexiTableScrollHelper_storedHeights[currentRowIndex];
                while (top < this.$FlexiTableScrollHelper_viewportHeight && currentRowIndex >= 0) {
                    currentRowIndex--;
                    if (currentRowIndex >= 0) {
                        this.$FlexiTableScrollHelper_updateRowHeight(currentRowIndex);
                        top += this.$FlexiTableScrollHelper_storedHeights[currentRowIndex];
                    }
                }
                var position = this.$FlexiTableScrollHelper_rowOffsets.get(rowIndex).value - this.$FlexiTableScrollHelper_viewportHeight;
                if (position < 0) {
                    position = 0;
                }
                return position;
            };

            FlexiTableScrollHelper.prototype.scrollTo = function(position) {
                if (position <= 0) {
                    // If position less than or equal to 0 first row should be fully visible
                    // on top
                    this.$FlexiTableScrollHelper_position = 0;
                    this.$FlexiTableScrollHelper_updateHeightsInViewport(0, 0);

                    return {
                        index: 0,
                        offset: 0,
                        position: this.$FlexiTableScrollHelper_position,
                        contentHeight: this.$FlexiTableScrollHelper_contentHeight,
                    };
                } else if (position >= this.$FlexiTableScrollHelper_contentHeight - this.$FlexiTableScrollHelper_viewportHeight) {
                    // If position is equal to or greater than max scroll value, we need
                    // to make sure to have bottom border of last row visible.
                    var rowIndex = this.$FlexiTableScrollHelper_rowCount - 1;
                    position = this.$FlexiTableScrollHelper_getRowAtEndPosition(rowIndex);
                }
                this.$FlexiTableScrollHelper_position = position;

                var firstVisibleRow = this.$FlexiTableScrollHelper_rowOffsets.upperBound(position);
                var firstRowIndex = Math.max(firstVisibleRow.index, 0);
                var firstRowPosition =
                    firstVisibleRow.value - this.$FlexiTableScrollHelper_rowHeightGetter(firstRowIndex);
                var firstRowOffset = firstRowPosition - position;

                this.$FlexiTableScrollHelper_updateHeightsInViewport(firstRowIndex, firstRowOffset);
                this.$FlexiTableScrollHelper_updateHeightsAboveViewport(firstRowIndex);

                return {
                    index: firstRowIndex,
                    offset: firstRowOffset,
                    position: this.$FlexiTableScrollHelper_position,
                    contentHeight: this.$FlexiTableScrollHelper_contentHeight,
                };
            };

            FlexiTableScrollHelper.prototype.scrollToRow = function(rowIndex, /*number*/ offset) {
                rowIndex = clamp(0, rowIndex, this.$FlexiTableScrollHelper_rowCount - 1);
                offset = clamp(-this.$FlexiTableScrollHelper_storedHeights[rowIndex], offset, 0);
                var firstRow = this.$FlexiTableScrollHelper_rowOffsets.get(rowIndex);
                return this.scrollTo(
                    firstRow.value - this.$FlexiTableScrollHelper_storedHeights[rowIndex] - offset
                );
            };

            FlexiTableScrollHelper.prototype.scrollRowIntoView = function(rowIndex) {
                rowIndex = clamp(0, rowIndex, this.$FlexiTableScrollHelper_rowCount - 1);
                var rowEnd = this.$FlexiTableScrollHelper_rowOffsets.get(rowIndex).value;
                var rowBegin = rowEnd - this.$FlexiTableScrollHelper_storedHeights[rowIndex];
                if (rowBegin < this.$FlexiTableScrollHelper_position) {
                    return this.scrollTo(rowBegin);
                } else if (rowEnd > this.$FlexiTableScrollHelper_position + this.$FlexiTableScrollHelper_viewportHeight) {
                    var position = this.$FlexiTableScrollHelper_getRowAtEndPosition(rowIndex);
                    return this.scrollTo(position);
                }
                return this.scrollTo(this.$FlexiTableScrollHelper_position);
            };

            module.exports = FlexiTableScrollHelper;
        },
        /* 29 */
        /***/
        function(module, exports, __webpack_require__) {

            'use strict';

            var React = __webpack_require__(19);

            var cloneWithProps = __webpack_require__(30);

            function getTotalWidth( /*array*/ columns) /*number*/ {
                var totalWidth = 0;
                for (var i = 0; i < columns.length; ++i) {
                    totalWidth += columns[i].props.width;
                }
                return totalWidth;
            }

            function getTotalFlexGrow( /*array*/ columns) /*number*/ {
                var totalFlexGrow = 0;
                for (var i = 0; i < columns.length; ++i) {
                    totalFlexGrow += columns[i].props.flexGrow || 0;
                }
                return totalFlexGrow;
            }

            function distributeFlexWidth(
                /*array*/
                columns,
                /*number*/
                flexWidth
            ) /*object*/ {
                if (flexWidth <= 0) {
                    return {
                        columns: columns,
                        width: getTotalWidth(columns),
                    };
                }
                var remainingFlexGrow = getTotalFlexGrow(columns);
                var remainingFlexWidth = flexWidth;
                var newColumns = [];
                var totalWidth = 0;
                for (var i = 0; i < columns.length; ++i) {
                    var column = columns[i];
                    if (!column.props.flexGrow) {
                        totalWidth += column.props.width;
                        newColumns.push(column);
                        continue;
                    }
                    var columnFlexWidth = Math.floor(
                        column.props.flexGrow / remainingFlexGrow * remainingFlexWidth
                    );
                    var newColumnWidth = Math.floor(column.props.width + columnFlexWidth);
                    totalWidth += newColumnWidth;

                    remainingFlexGrow -= column.props.flexGrow;
                    remainingFlexWidth -= columnFlexWidth;

                    newColumns.push(cloneWithProps(
                        column, {
                            width: newColumnWidth
                        }
                    ));
                }

                return {
                    columns: newColumns,
                    width: totalWidth,
                };
            }

            function adjustColumnGroupWidths(
                /*array*/
                columnGroups,
                /*number*/
                expectedWidth
            ) /*object*/ {
                var allColumns = [];
                var i;
                for (i = 0; i < columnGroups.length; ++i) {
                    React.Children.forEach(
                        columnGroups[i].props.children,
                        function(column) {
                            allColumns.push(column);
                        }
                    );
                }
                var columnsWidth = getTotalWidth(allColumns);
                var remainingFlexGrow = getTotalFlexGrow(allColumns);
                var remainingFlexWidth = Math.max(expectedWidth - columnsWidth, 0);

                var newAllColumns = [];
                var newColumnGroups = [];

                for (i = 0; i < columnGroups.length; ++i) {
                    var columnGroup = columnGroups[i];
                    var currentColumns = [];

                    React.Children.forEach(
                        columnGroup.props.children,
                        function(column) {
                            currentColumns.push(column);
                        }
                    );

                    var columnGroupFlexGrow = getTotalFlexGrow(currentColumns);
                    var columnGroupFlexWidth = Math.floor(
                        columnGroupFlexGrow / remainingFlexGrow * remainingFlexWidth
                    );

                    var newColumnSettings = distributeFlexWidth(
                        currentColumns,
                        columnGroupFlexWidth
                    );

                    remainingFlexGrow -= columnGroupFlexGrow;
                    remainingFlexWidth -= columnGroupFlexWidth;

                    for (var j = 0; j < newColumnSettings.columns.length; ++j) {
                        newAllColumns.push(newColumnSettings.columns[j]);
                    }

                    newColumnGroups.push(cloneWithProps(
                        columnGroup, {
                            width: newColumnSettings.width
                        }
                    ));
                }

                return {
                    columns: newAllColumns,
                    columnGroups: newColumnGroups,
                };
            }

            function adjustColumnWidths(
                /*array*/
                columns,
                /*number*/
                expectedWidth
            ) /*array*/ {
                var columnsWidth = getTotalWidth(columns);
                if (columnsWidth < expectedWidth) {
                    return distributeFlexWidth(columns, expectedWidth - columnsWidth).columns;
                }
                return columns;
            }

            var FlexiTableWidthHelper = {
                getTotalWidth: getTotalWidth,
                getTotalFlexGrow: getTotalFlexGrow,
                distributeFlexWidth: distributeFlexWidth,
                adjustColumnWidths: adjustColumnWidths,
                adjustColumnGroupWidths: adjustColumnGroupWidths,
            };

            module.exports = FlexiTableWidthHelper;
        },
        /* 30 */
        /***/
        function(module, exports, __webpack_require__) {
            module.exports = __webpack_require__(61);
        },
        /* 31 */
        /***/
        function(module, exports, __webpack_require__) {

            var slashReplaceRegex = /\//g;
            var cache = {};

            function getClassName(className) {
                if (cache[className]) {
                    return cache[className];
                }

                cache[className] = className.replace(slashReplaceRegex, '_');
                return cache[className];
            }

            function cx(classNames) {
                var classNamesArray;
                if (typeof classNames == 'object') {
                    classNamesArray = Object.keys(classNames).filter(function(className) {
                        return classNames[className];
                    });
                } else {
                    classNamesArray = Array.prototype.slice.call(arguments);
                }

                return classNamesArray.map(getClassName).join(' ');
            }

            module.exports = cx;
        },
        /* 32 */
        /***/
        function(module, exports, __webpack_require__) {

            function debounce(func, wait, context, setTimeoutFunc, clearTimeoutFunc) {
                setTimeoutFunc = setTimeoutFunc || setTimeout;
                clearTimeoutFunc = clearTimeoutFunc || clearTimeout;
                var timeout;

                function debouncer() {
                    for (var args = [], $__0 = 0, $__1 = arguments.length; $__0 < $__1; $__0++) args.push(arguments[$__0]);
                    debouncer.reset();

                    timeout = setTimeoutFunc(function() {
                        func.apply(context, args);
                    }, wait);
                }

                debouncer.reset = function() {
                    clearTimeoutFunc(timeout);
                };

                return debouncer;
            }

            module.exports = debounce;
        },
        /* 33 */
        /***/
        function(module, exports, __webpack_require__) {

            function makeEmptyFunction(arg) {
                return function() {
                    return arg;
                };
            }

            function emptyFunction() {}

            emptyFunction.thatReturns = makeEmptyFunction;
            emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
            emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
            emptyFunction.thatReturnsNull = makeEmptyFunction(null);
            emptyFunction.thatReturnsThis = function() {
                return this;
            };
            emptyFunction.thatReturnsArgument = function(arg) {
                return arg;
            };

            module.exports = emptyFunction;
        },
        /* 34 */
        /***/
        function(module, exports, __webpack_require__) {

            "use strict";

            var invariant = function(condition, format, a, b, c, d, e, f) {
                if (false) {
                    if (format === undefined) {
                        throw new Error('invariant requires an error message argument');
                    }
                }

                if (!condition) {
                    var error;
                    if (format === undefined) {
                        error = new Error(
                            'Minified exception occurred; use the non-minified dev environment ' +
                            'for the full error message and additional helpful warnings.'
                        );
                    } else {
                        var args = [a, b, c, d, e, f];
                        var argIndex = 0;
                        error = new Error(
                            'Invariant Violation: ' +
                            format.replace(/%s/g, function() {
                                return args[argIndex++];
                            })
                        );
                    }

                    error.framesToPop = 1; // we don't care about invariant's own frame
                    throw error;
                }
            };

            module.exports = invariant;
        },
        /* 35 */
        /***/
        function(module, exports, __webpack_require__) {

            'use strict';

            function shallowEqual(objA, objB) {
                if (objA === objB) {
                    return true;
                }
                var key;
                // Test for A's keys different from B.
                for (key in objA) {
                    if (objA.hasOwnProperty(key) &&
                        (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
                        return false;
                    }
                }
                // Test for B's keys missing from A.
                for (key in objB) {
                    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
                        return false;
                    }
                }
                return true;
            }

            module.exports = shallowEqual;
        },
        /* 36 */
        /***/
        function(module, exports, __webpack_require__) {

            /* WEBPACK VAR INJECTION */
            (function(global) {

                "use strict";

                var BrowserSupportCore = __webpack_require__(48);

                var getVendorPrefixedName = __webpack_require__(49);

                var TRANSFORM = getVendorPrefixedName('transform');
                var BACKFACE_VISIBILITY = getVendorPrefixedName('backfaceVisibility');

                var translateDOMPositionXY = (function() {
                    if (BrowserSupportCore.hasCSSTransforms()) {
                        var ua = global.window ? global.window.navigator.userAgent : 'UNKNOWN';
                        var isSafari = (/Safari\//).test(ua) && !(/Chrome\//).test(ua);

                        if (!isSafari && BrowserSupportCore.hasCSS3DTransforms()) {
                            return function( /*object*/ style, /*number*/ x, /*number*/ y) {
                                style[TRANSFORM] = 'translate3d(' + x + 'px,' + y + 'px,0)';
                                style[BACKFACE_VISIBILITY] = 'hidden';
                            };
                        } else {
                            return function( /*object*/ style, /*number*/ x, /*number*/ y) {
                                style[TRANSFORM] = 'translate(' + x + 'px,' + y + 'px)';
                            };
                        }
                    } else {
                        return function( /*object*/ style, /*number*/ x, /*number*/ y) {
                            style.left = x + 'px';
                            style.top = y + 'px';
                        };
                    }
                })();

                module.exports = translateDOMPositionXY;

                /* WEBPACK VAR INJECTION */
            }.call(exports, (function() {
                return this;
            }())))
        },
        /* 37 */
        /***/
        function(module, exports, __webpack_require__) {
            module.exports = React;
        },
        /* 38 */
        /***/
        function(module, exports, __webpack_require__) {

            "use strict";

            var EventListener = __webpack_require__(50);

            var cancelAnimationFramePolyfill = __webpack_require__(51);
            var requestAnimationFramePolyfill = __webpack_require__(47);

            function DOMMouseMoveTracker(
                onMove,
                /*function*/
                onMoveEnd,
                /*DOMElement*/
                domNode) {
                this.$DOMMouseMoveTracker_isDragging = false;
                this.$DOMMouseMoveTracker_animationFrameID = null;
                this.$DOMMouseMoveTracker_domNode = domNode;
                this.$DOMMouseMoveTracker_onMove = onMove;
                this.$DOMMouseMoveTracker_onMoveEnd = onMoveEnd;
                this.$DOMMouseMoveTracker_onMouseMove = this.$DOMMouseMoveTracker_onMouseMove.bind(this);
                this.$DOMMouseMoveTracker_onMouseUp = this.$DOMMouseMoveTracker_onMouseUp.bind(this);
                this.$DOMMouseMoveTracker_didMouseMove = this.$DOMMouseMoveTracker_didMouseMove.bind(this);
            }

            DOMMouseMoveTracker.prototype.captureMouseMoves = function(event) {
                if (!this.$DOMMouseMoveTracker_eventMoveToken && !this.$DOMMouseMoveTracker_eventUpToken) {
                    this.$DOMMouseMoveTracker_eventMoveToken = EventListener.listen(
                        this.$DOMMouseMoveTracker_domNode,
                        'mousemove',
                        this.$DOMMouseMoveTracker_onMouseMove
                    );
                    this.$DOMMouseMoveTracker_eventUpToken = EventListener.listen(
                        this.$DOMMouseMoveTracker_domNode,
                        'mouseup',
                        this.$DOMMouseMoveTracker_onMouseUp
                    );
                }

                if (!this.$DOMMouseMoveTracker_isDragging) {
                    this.$DOMMouseMoveTracker_deltaX = 0;
                    this.$DOMMouseMoveTracker_deltaY = 0;
                    this.$DOMMouseMoveTracker_isDragging = true;
                    this.$DOMMouseMoveTracker_x = event.clientX;
                    this.$DOMMouseMoveTracker_y = event.clientY;
                }
                event.preventDefault();
            };

            DOMMouseMoveTracker.prototype.releaseMouseMoves = function() {
                if (this.$DOMMouseMoveTracker_eventMoveToken && this.$DOMMouseMoveTracker_eventUpToken) {
                    this.$DOMMouseMoveTracker_eventMoveToken.remove();
                    this.$DOMMouseMoveTracker_eventMoveToken = null;
                    this.$DOMMouseMoveTracker_eventUpToken.remove();
                    this.$DOMMouseMoveTracker_eventUpToken = null;
                }

                if (this.$DOMMouseMoveTracker_animationFrameID !== null) {
                    cancelAnimationFramePolyfill(this.$DOMMouseMoveTracker_animationFrameID);
                    this.$DOMMouseMoveTracker_animationFrameID = null;
                }

                if (this.$DOMMouseMoveTracker_isDragging) {
                    this.$DOMMouseMoveTracker_isDragging = false;
                    this.$DOMMouseMoveTracker_x = null;
                    this.$DOMMouseMoveTracker_y = null;
                }
            };

            /**
             * Returns whether or not if the mouse movement is being tracked.
             */
            DOMMouseMoveTracker.prototype.isDragging = function() {
                return this.$DOMMouseMoveTracker_isDragging;
            };

            /**
             * Calls onMove passed into constructor and updates internal state.
             */
            DOMMouseMoveTracker.prototype.$DOMMouseMoveTracker_onMouseMove = function(event) {
                var x = event.clientX;
                var y = event.clientY;

                this.$DOMMouseMoveTracker_deltaX += (x - this.$DOMMouseMoveTracker_x);
                this.$DOMMouseMoveTracker_deltaY += (y - this.$DOMMouseMoveTracker_y);

                if (this.$DOMMouseMoveTracker_animationFrameID === null) {
                    // The mouse may move faster then the animation frame does.
                    // Use `requestAnimationFramePolyfill` to avoid over-updating.
                    this.$DOMMouseMoveTracker_animationFrameID =
                        requestAnimationFramePolyfill(this.$DOMMouseMoveTracker_didMouseMove);
                }

                this.$DOMMouseMoveTracker_x = x;
                this.$DOMMouseMoveTracker_y = y;
                event.preventDefault();
            };

            DOMMouseMoveTracker.prototype.$DOMMouseMoveTracker_didMouseMove = function() {
                this.$DOMMouseMoveTracker_animationFrameID = null;
                this.$DOMMouseMoveTracker_onMove(this.$DOMMouseMoveTracker_deltaX, this.$DOMMouseMoveTracker_deltaY);
                this.$DOMMouseMoveTracker_deltaX = 0;
                this.$DOMMouseMoveTracker_deltaY = 0;
            };

            /**
             * Calls onMoveEnd passed into constructor and updates internal state.
             */
            DOMMouseMoveTracker.prototype.$DOMMouseMoveTracker_onMouseUp = function() {
                if (this.$DOMMouseMoveTracker_animationFrameID) {
                    this.$DOMMouseMoveTracker_didMouseMove();
                }
                this.$DOMMouseMoveTracker_onMoveEnd();
            };

            module.exports = DOMMouseMoveTracker;
        },
        /* 39 */
        /***/
        function(module, exports, __webpack_require__) {

            module.exports = {
                BACKSPACE: 8,
                TAB: 9,
                RETURN: 13,
                ALT: 18,
                ESC: 27,
                SPACE: 32,
                PAGE_UP: 33,
                PAGE_DOWN: 34,
                END: 35,
                HOME: 36,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                DELETE: 46,
                COMMA: 188,
                PERIOD: 190,
                A: 65,
                Z: 90,
                ZERO: 48,
                NUMPAD_0: 96,
                NUMPAD_9: 105
            };

        },
        /* 40 */
        /***/
        function(module, exports, __webpack_require__) {

            "use strict";

            var CSS_VARS = {
                'scrollbar-face-active-color': '#7d7d7d',
                'scrollbar-face-color': '#c2c2c2',
                'scrollbar-face-margin': '4px',
                'scrollbar-face-radius': '6px',
                'scrollbar-size': '15px',
                'scrollbar-size-large': '17px',
                'scrollbar-track-color': 'rgba(255, 255, 255, 0.8)',
            };

            /**
             * @param {string} name
             */
            function cssVar(name) {
                if (CSS_VARS.hasOwnProperty(name)) {
                    return CSS_VARS[name];
                }

                throw new Error(
                    'cssVar' + '("' + name + '"): Unexpected class transformation.'
                );
            }

            cssVar.CSS_VARS = CSS_VARS;

            module.exports = cssVar;
        },
        /* 41 */
        /***/
        function(module, exports, __webpack_require__) {

            'use strict';

            var IntegerBufferSet = __webpack_require__(52);

            var clamp = __webpack_require__(43);
            var invariant = __webpack_require__(34);
            var MIN_BUFFER_ROWS = 5;
            var MAX_BUFFER_ROWS = 15;

            // FlexiTableRowBuffer is a helper class that executes row buffering
            // logic for FlexiTable. It figures out which rows should be rendered
            // and in which positions.

            function FlexiTableRowBuffer(
                rowsCount,
                /*number*/
                defaultRowHeight,
                /*number*/
                viewportHeight,
                /*?function*/
                rowHeightGetter) {
                invariant(
                    defaultRowHeight !== 0,
                    "defaultRowHeight musn't be equal 0 in FlexiTableRowBuffer"
                );

                this.$FlexiTableRowBuffer_bufferSet = new IntegerBufferSet();
                this.$FlexiTableRowBuffer_defaultRowHeight = defaultRowHeight;
                this.$FlexiTableRowBuffer_viewportRowsBegin = 0;
                this.$FlexiTableRowBuffer_viewportRowsEnd = 0;
                this.$FlexiTableRowBuffer_maxVisibleRowCount = Math.ceil(viewportHeight / defaultRowHeight) + 1;
                this.$FlexiTableRowBuffer_bufferRowsCount = clamp(
                    MIN_BUFFER_ROWS,
                    Math.floor(this.$FlexiTableRowBuffer_maxVisibleRowCount / 2),
                    MAX_BUFFER_ROWS
                );
                this.$FlexiTableRowBuffer_rowsCount = rowsCount;
                this.$FlexiTableRowBuffer_rowHeightGetter = rowHeightGetter;
                this.$FlexiTableRowBuffer_rows = [];
                this.$FlexiTableRowBuffer_viewportHeight = viewportHeight;

                this.getRows = this.getRows.bind(this);
                this.getRowsWithUpdatedBuffer = this.getRowsWithUpdatedBuffer.bind(this);
            }

            FlexiTableRowBuffer.prototype.getRowsWithUpdatedBuffer = function() {
                var remainingBufferRows = 2 * this.$FlexiTableRowBuffer_bufferRowsCount;
                var bufferRowIndex =
                    Math.max(this.$FlexiTableRowBuffer_viewportRowsBegin - this.$FlexiTableRowBuffer_bufferRowsCount, 0);
                while (bufferRowIndex < this.$FlexiTableRowBuffer_viewportRowsBegin) {
                    this.$FlexiTableRowBuffer_addRowToBuffer(
                        bufferRowIndex,
                        this.$FlexiTableRowBuffer_viewportHeight,
                        this.$FlexiTableRowBuffer_viewportRowsBegin,
                        this.$FlexiTableRowBuffer_viewportRowsEnd - 1
                    );
                    bufferRowIndex++;
                    remainingBufferRows--;
                }
                bufferRowIndex = this.$FlexiTableRowBuffer_viewportRowsEnd;
                while (bufferRowIndex < this.$FlexiTableRowBuffer_rowsCount && remainingBufferRows > 0) {
                    this.$FlexiTableRowBuffer_addRowToBuffer(
                        bufferRowIndex,
                        this.$FlexiTableRowBuffer_viewportHeight,
                        this.$FlexiTableRowBuffer_viewportRowsBegin,
                        this.$FlexiTableRowBuffer_viewportRowsEnd - 1
                    );
                    bufferRowIndex++;
                    remainingBufferRows--;
                }
                return this.$FlexiTableRowBuffer_rows;
            };

            FlexiTableRowBuffer.prototype.getRows = function(
                firstRowIndex,
                /*number*/
                firstRowOffset) {
                // Update offsets of all rows to move them outside of viewport. Later we
                // will bring rows that we should show to their right offsets.
                this.$FlexiTableRowBuffer_hideAllRows();

                var top = firstRowOffset;
                var totalHeight = top;
                var rowIndex = firstRowIndex;
                var endIndex =
                    Math.min(firstRowIndex + this.$FlexiTableRowBuffer_maxVisibleRowCount, this.$FlexiTableRowBuffer_rowsCount);

                this.$FlexiTableRowBuffer_viewportRowsBegin = firstRowIndex;
                while (rowIndex < endIndex ||
                    (totalHeight < this.$FlexiTableRowBuffer_viewportHeight && rowIndex < this.$FlexiTableRowBuffer_rowsCount)) {
                    this.$FlexiTableRowBuffer_addRowToBuffer(
                        rowIndex,
                        totalHeight,
                        firstRowIndex,
                        endIndex - 1
                    );
                    totalHeight += this.$FlexiTableRowBuffer_rowHeightGetter(rowIndex);
                    ++rowIndex;
                    // Store index after the last viewport row as end, to be able to
                    // distinguish when there are no rows rendered in viewport
                    this.$FlexiTableRowBuffer_viewportRowsEnd = rowIndex;
                }

                return this.$FlexiTableRowBuffer_rows;
            };

            FlexiTableRowBuffer.prototype.$FlexiTableRowBuffer_addRowToBuffer = function(
                rowIndex,
                /*number*/
                offsetTop,
                /*number*/
                firstViewportRowIndex,
                /*number*/
                lastViewportRowIndex) {
                var rowPosition = this.$FlexiTableRowBuffer_bufferSet.getValuePosition(rowIndex);
                var viewportRowsCount = lastViewportRowIndex - firstViewportRowIndex + 1;
                var allowedRowsCount = viewportRowsCount + this.$FlexiTableRowBuffer_bufferRowsCount * 2;
                if (rowPosition === null &&
                    this.$FlexiTableRowBuffer_bufferSet.getSize() >= allowedRowsCount) {
                    rowPosition =
                        this.$FlexiTableRowBuffer_bufferSet.replaceFurthestValuePosition(
                            firstViewportRowIndex,
                            lastViewportRowIndex,
                            rowIndex
                        );
                }
                if (rowPosition === null) {
                    // We can't reuse any of existing positions for this row. We have to
                    // create new position
                    rowPosition = this.$FlexiTableRowBuffer_bufferSet.getNewPositionForValue(rowIndex);
                    this.$FlexiTableRowBuffer_rows[rowPosition] = {
                        rowIndex: rowIndex,
                        offsetTop: offsetTop,
                    };
                } else {
                    // This row already is in the table with rowPosition position or it
                    // can replace row that is in that position
                    this.$FlexiTableRowBuffer_rows[rowPosition].rowIndex = rowIndex;
                    this.$FlexiTableRowBuffer_rows[rowPosition].offsetTop = offsetTop;
                }
            };

            FlexiTableRowBuffer.prototype.$FlexiTableRowBuffer_hideAllRows = function() {
                var i = this.$FlexiTableRowBuffer_rows.length - 1;
                while (i > -1) {
                    this.$FlexiTableRowBuffer_rows[i].offsetTop = this.$FlexiTableRowBuffer_viewportHeight;
                    i--;
                }
            };

            module.exports = FlexiTableRowBuffer;
        },
        /* 42 */
        /***/
        function(module, exports, __webpack_require__) {

            'use strict';

            function joinClasses(className /*, ... */ ) {
                if (!className) {
                    className = '';
                }
                var nextClass;
                var argLength = arguments.length;
                if (argLength > 1) {
                    for (var ii = 1; ii < argLength; ii++) {
                        nextClass = arguments[ii];
                        if (nextClass) {
                            className = (className ? className + ' ' : '') + nextClass;
                        }
                    }
                }
                return className;
            }

            module.exports = joinClasses;
        },
        /* 43 */
        /***/
        function(module, exports, __webpack_require__) {

            function clamp(min, value, max) {
                if (value < min) {
                    return min;
                }
                if (value > max) {
                    return max;
                }
                return value;
            }

            module.exports = clamp;
        },
        /* 44 */
        /***/
        function(module, exports, __webpack_require__) {

            "use strict";

            var FlexiTableHelper = __webpack_require__(20);
            var ImmutableObject = __webpack_require__(53);
            var React = __webpack_require__(19);
            var ReactComponentWithPureRenderMixin = __webpack_require__(22);
            var FlexiTableCell = __webpack_require__(54);

            var cx = __webpack_require__(31);
            var renderToString = FlexiTableHelper.renderToString;
            var translateDOMPositionXY = __webpack_require__(36);

            var PropTypes = React.PropTypes;

            var EMPTY_OBJECT = new ImmutableObject({});

            var FlexiTableCellGroupImpl = React.createClass({
                displayName: "FlexiTableCellGroupImpl",
                mixins: [ReactComponentWithPureRenderMixin],

                propTypes: {

                    /**
                     * Array of <FlexiTableColumn />.
                     */
                    columns: PropTypes.array.isRequired,

                    /**
                     * The row data to render. The data format can be a simple Map object
                     * or an Array of data.
                     */
                    data: PropTypes.oneOfType([
                        PropTypes.object,
                        PropTypes.array
                    ]),

                    onColumnResize: PropTypes.func,

                    rowHeight: PropTypes.number.isRequired,

                    rowIndex: PropTypes.number.isRequired,

                    zIndex: PropTypes.number.isRequired,
                },

                render: function() /*object*/ {
                    var props = this.props;
                    var columns = props.columns;
                    var cells = [];
                    var width = 0;

                    for (var i = 0, j = columns.length; i < j; i++) {
                        var columnProps = columns[i].props;
                        width += columnProps.width;
                        var key = 'cell_' + i;
                        cells.push(
                            this._renderCell(
                                props.data,
                                props.rowIndex,
                                props.rowHeight,
                                columnProps,
                                width,
                                key
                            )
                        );
                    }

                    var style = {
                        width: width,
                        height: props.height,
                        zIndex: props.zIndex
                    };

                    return (
                        React.createElement("div", {
                                className: cx('flexiTableCellGroup/cellGroup'),
                                style: style
                            },
                            cells
                        )
                    );
                },

                _renderCell: function(
                    /*object|array*/
                    rowData,
                    /*number*/
                    rowIndex,
                    /*number*/
                    height,
                    /*object*/
                    columnProps,
                    /*?number*/
                    widthOffset,
                    /*string*/
                    key
                ) /*object*/ {
                    var cellRenderer = columnProps.cellRenderer || renderToString;
                    var columnData = columnProps.columnData || EMPTY_OBJECT;
                    var cellDataKey = columnProps.dataKey;
                    var isFooterCell = columnProps.isFooterCell;
                    var isHeaderCell = columnProps.isHeaderCell;
                    var cellData;

                    if (isHeaderCell || isFooterCell) {
                        cellData = rowData[cellDataKey];
                    } else {
                        var cellDataGetter = columnProps.cellDataGetter;
                        cellData = cellDataGetter ?
                            cellDataGetter(cellDataKey, rowData) :
                            rowData[cellDataKey];
                    }

                    var cellIsResizable = columnProps.isResizable &&
                        this.props.onColumnResize;
                    var onColumnResize = cellIsResizable ? this.props.onColumnResize : null;

                    return (
                        React.createElement(FlexiTableCell, {
                            align: columnProps.align,
                            cellData: cellData,
                            cellDataKey: cellDataKey,
                            cellRenderer: cellRenderer,
                            className: columnProps.cellClassName,
                            columnData: columnData,
                            height: height,
                            isFooterCell: isFooterCell,
                            isHeaderCell: isHeaderCell,
                            key: key,
                            maxWidth: columnProps.maxWidth,
                            minWidth: columnProps.minWidth,
                            onColumnResize: onColumnResize,
                            rowData: rowData,
                            rowIndex: rowIndex,
                            width: columnProps.width,
                            widthOffset: widthOffset
                        })
                    );
                },
            });

            var FlexiTableCellGroup = React.createClass({
                displayName: "FlexiTableCellGroup",
                mixins: [ReactComponentWithPureRenderMixin],

                propTypes: {
                    /**
                     * Height of the row.
                     */
                    height: PropTypes.number.isRequired,

                    left: PropTypes.number,

                    /**
                     * Z-index on which the row will be displayed. Used e.g. for keeping
                     * header and footer in front of other rows.
                     */
                    zIndex: PropTypes.number.isRequired,
                },

                render: function() /*object*/ {
                    var $__0 = this.props,
                        left = $__0.left,
                        props = (function(source, exclusion) {
                            var rest = {};
                            var hasOwn = Object.prototype.hasOwnProperty;
                            if (source == null) {
                                throw new TypeError();
                            }
                            for (var key in source) {
                                if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {
                                    rest[key] = source[key];
                                }
                            }
                            return rest;
                        })($__0, {
                            left: 1
                        });

                    var style = {
                        height: props.height,
                    };

                    if (left) {
                        translateDOMPositionXY(style, left, 0);
                    }

                    var onColumnResize = props.onColumnResize ? this._onColumnResize : null;

                    return (
                        React.createElement("div", {
                                style: style,
                                className: cx('flexiTableCellGroup/cellGroupWrapper')
                            },
                            React.createElement(FlexiTableCellGroupImpl, React.__spread({},
                                props, {
                                    onColumnResize: onColumnResize
                                }))
                        )
                    );
                },

                _onColumnResize: function(
                    /*number*/
                    widthOffset,
                    /*number*/
                    width,
                    /*?number*/
                    minWidth,
                    /*?number*/
                    maxWidth,
                    /*string|number*/
                    cellDataKey,
                    /*object*/
                    event
                ) {
                    this.props.onColumnResize && this.props.onColumnResize(
                        widthOffset,
                        this.props.left,
                        width,
                        minWidth,
                        maxWidth,
                        cellDataKey,
                        event
                    );
                },
            });

            module.exports = FlexiTableCellGroup;
        },
        /* 45 */
        /***/
        function(module, exports, __webpack_require__) {

            /* WEBPACK VAR INJECTION */
            (function(global) {

                "use strict";

                function PrefixIntervalTree(leafCount, /*?number*/ initialLeafValue) {
                    var internalLeafCount = this.getInternalLeafCount(leafCount);
                    this.$PrefixIntervalTree_leafCount = leafCount;
                    this.$PrefixIntervalTree_internalLeafCount = internalLeafCount;
                    var nodeCount = 2 * internalLeafCount;
                    var Int32Array = global.Int32Array || Array;
                    this.$PrefixIntervalTree_value = new Int32Array(nodeCount);
                    this.$PrefixIntervalTree_initTables(initialLeafValue || 0);

                    this.get = this.get.bind(this);
                    this.set = this.set.bind(this);
                    this.lowerBound = this.lowerBound.bind(this);
                    this.upperBound = this.upperBound.bind(this);
                }

                PrefixIntervalTree.prototype.getInternalLeafCount = function(leafCount) {
                    var internalLeafCount = 1;
                    while (internalLeafCount < leafCount) {
                        internalLeafCount *= 2;
                    }
                    return internalLeafCount;
                };

                PrefixIntervalTree.prototype.$PrefixIntervalTree_initTables = function(initialLeafValue) {
                    var firstLeaf = this.$PrefixIntervalTree_internalLeafCount;
                    var lastLeaf = this.$PrefixIntervalTree_internalLeafCount + this.$PrefixIntervalTree_leafCount - 1;
                    var i;
                    for (i = firstLeaf; i <= lastLeaf; ++i) {
                        this.$PrefixIntervalTree_value[i] = initialLeafValue;
                    }
                    var lastInternalNode = this.$PrefixIntervalTree_internalLeafCount - 1;
                    for (i = lastInternalNode; i > 0; --i) {
                        this.$PrefixIntervalTree_value[i] = this.$PrefixIntervalTree_value[2 * i] + this.$PrefixIntervalTree_value[2 * i + 1];
                    }
                };

                PrefixIntervalTree.prototype.set = function(position, /*number*/ value) {
                    var nodeIndex = position + this.$PrefixIntervalTree_internalLeafCount;
                    this.$PrefixIntervalTree_value[nodeIndex] = value;
                    nodeIndex = Math.floor(nodeIndex / 2);
                    while (nodeIndex !== 0) {
                        this.$PrefixIntervalTree_value[nodeIndex] =
                            this.$PrefixIntervalTree_value[2 * nodeIndex] + this.$PrefixIntervalTree_value[2 * nodeIndex + 1];
                        nodeIndex = Math.floor(nodeIndex / 2);
                    }
                };

                /**
                 * Returns an object {index, value} for given position (including value at
                 * specified position), or the same for last position if provided position
                 * is out of range
                 */
                PrefixIntervalTree.prototype.get = function(position) {
                    position = Math.min(position, this.$PrefixIntervalTree_leafCount);
                    var nodeIndex = position + this.$PrefixIntervalTree_internalLeafCount;
                    var result = this.$PrefixIntervalTree_value[nodeIndex];
                    while (nodeIndex > 1) {
                        if (nodeIndex % 2 === 1) {
                            result = this.$PrefixIntervalTree_value[nodeIndex - 1] + result;
                        }
                        nodeIndex = Math.floor(nodeIndex / 2);
                    }
                    return {
                        index: position,
                        value: result
                    };
                };

                /**
                 * Returns an object {index, value} where index is index of leaf that was
                 * found by upper bound algorithm. Upper bound finds first element for which
                 * value is greater than argument
                 */
                PrefixIntervalTree.prototype.upperBound = function(value) {
                    var result = this.$PrefixIntervalTree_upperBoundImpl(1, 0, this.$PrefixIntervalTree_internalLeafCount - 1, value);
                    if (result.index > this.$PrefixIntervalTree_leafCount - 1) {
                        result.index = this.$PrefixIntervalTree_leafCount - 1;
                    }
                    return result;
                };

                /**
                 * Returns result in the same format as upperBound, but finds first element
                 * for which value is greater than or equal to argument
                 */
                PrefixIntervalTree.prototype.lowerBound = function(value) {
                    var result = this.upperBound(value);
                    if (result.value > value && result.index > 0) {
                        var previousValue =
                            result.value - this.$PrefixIntervalTree_value[this.$PrefixIntervalTree_internalLeafCount + result.index];
                        if (previousValue === value) {
                            result.value = previousValue;
                            result.index--;
                        }
                    }
                    return result;
                };

                PrefixIntervalTree.prototype.$PrefixIntervalTree_upperBoundImpl = function(
                    nodeIndex,
                    /*number*/
                    nodeIntervalBegin,
                    /*number*/
                    nodeIntervalEnd,
                    /*number*/
                    value) {
                    if (nodeIntervalBegin === nodeIntervalEnd) {
                        return {
                            index: nodeIndex - this.$PrefixIntervalTree_internalLeafCount,
                            value: this.$PrefixIntervalTree_value[nodeIndex],
                        };
                    }

                    var nodeIntervalMidpoint =
                        Math.floor((nodeIntervalBegin + nodeIntervalEnd + 1) / 2);
                    if (value < this.$PrefixIntervalTree_value[nodeIndex * 2]) {
                        return this.$PrefixIntervalTree_upperBoundImpl(
                            2 * nodeIndex,
                            nodeIntervalBegin,
                            nodeIntervalMidpoint - 1,
                            value
                        );
                    } else {
                        var result = this.$PrefixIntervalTree_upperBoundImpl(
                            2 * nodeIndex + 1,
                            nodeIntervalMidpoint,
                            nodeIntervalEnd,
                            value - this.$PrefixIntervalTree_value[2 * nodeIndex]
                        );
                        result.value += this.$PrefixIntervalTree_value[2 * nodeIndex];
                        return result;
                    }
                };

                module.exports = PrefixIntervalTree;

                /* WEBPACK VAR INJECTION */
            }.call(exports, (function() {
                return this;
            }())))
        },
        /* 46 */
        /***/
        function(module, exports, __webpack_require__) {

            "use strict";

            var UserAgent_DEPRECATED = __webpack_require__(55);

            var isEventSupported = __webpack_require__(56);

            // Reasonable defaults
            var PIXEL_STEP = 10;
            var LINE_HEIGHT = 40;
            var PAGE_HEIGHT = 800;

            function normalizeWheel( /*object*/ event) /*object*/ {
                var sX = 0,
                    sY = 0, // spinX, spinY
                    pX = 0,
                    pY = 0; // pixelX, pixelY

                // Legacy
                if ('detail' in event) {
                    sY = event.detail;
                }
                if ('wheelDelta' in event) {
                    sY = -event.wheelDelta / 120;
                }
                if ('wheelDeltaY' in event) {
                    sY = -event.wheelDeltaY / 120;
                }
                if ('wheelDeltaX' in event) {
                    sX = -event.wheelDeltaX / 120;
                }

                // side scrolling on FF with DOMMouseScroll
                if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
                    sX = sY;
                    sY = 0;
                }

                pX = sX * PIXEL_STEP;
                pY = sY * PIXEL_STEP;

                if ('deltaY' in event) {
                    pY = event.deltaY;
                }
                if ('deltaX' in event) {
                    pX = event.deltaX;
                }

                if ((pX || pY) && event.deltaMode) {
                    if (event.deltaMode == 1) { // delta in LINE units
                        pX *= LINE_HEIGHT;
                        pY *= LINE_HEIGHT;
                    } else { // delta in PAGE units
                        pX *= PAGE_HEIGHT;
                        pY *= PAGE_HEIGHT;
                    }
                }

                // Fall-back if spin cannot be determined
                if (pX && !sX) {
                    sX = (pX < 1) ? -1 : 1;
                }
                if (pY && !sY) {
                    sY = (pY < 1) ? -1 : 1;
                }

                return {
                    spinX: sX,
                    spinY: sY,
                    pixelX: pX,
                    pixelY: pY
                };
            }

            normalizeWheel.getEventType = function() /*string*/ {
                return (UserAgent_DEPRECATED.firefox()) ? 'DOMMouseScroll' : (isEventSupported('wheel')) ? 'wheel' : 'mousewheel';
            };

            module.exports = normalizeWheel;
        },
        /* 47 */
        /***/
        function(module, exports, __webpack_require__) {

            /* WEBPACK VAR INJECTION */
            (function(global) {

                var emptyFunction = __webpack_require__(33);
                var nativeRequestAnimationFrame = __webpack_require__(57);

                var lastTime = 0;

                /**
                 * Here is the native and polyfill version of requestAnimationFrame.
                 * Please don't use it directly and use requestAnimationFrame module instead.
                 */
                var requestAnimationFrame =
                    nativeRequestAnimationFrame ||
                    function(callback) {
                        var currTime = Date.now();
                        var timeDelay = Math.max(0, 16 - (currTime - lastTime));
                        lastTime = currTime + timeDelay;
                        return global.setTimeout(function() {
                            callback(Date.now());
                        }, timeDelay);
                    };

                // Works around a rare bug in Safari 6 where the first request is never invoked.
                requestAnimationFrame(emptyFunction);

                module.exports = requestAnimationFrame;

                /* WEBPACK VAR INJECTION */
            }.call(exports, (function() {
                return this;
            }())))
        },
        /* 48 */
        /***/
        function(module, exports, __webpack_require__) {

            var getVendorPrefixedName = __webpack_require__(49);

            var BrowserSupportCore = {
                /**
                 * @return {bool} True if browser supports css animations.
                 */
                hasCSSAnimations: function() {
                    return !!getVendorPrefixedName('animationName');
                },

                /**
                 * @return {bool} True if browser supports css transforms.
                 */
                hasCSSTransforms: function() {
                    return !!getVendorPrefixedName('transform');
                },

                /**
                 * @return {bool} True if browser supports css 3d transforms.
                 */
                hasCSS3DTransforms: function() {
                    return !!getVendorPrefixedName('perspective');
                },

                /**
                 * @return {bool} True if browser supports css transitions.
                 */
                hasCSSTransitions: function() {
                    return !!getVendorPrefixedName('transition');
                },
            };

            module.exports = BrowserSupportCore;
        },
        /* 49 */
        /***/
        function(module, exports, __webpack_require__) {

            var ExecutionEnvironment = __webpack_require__(58);

            var camelize = __webpack_require__(59);
            var invariant = __webpack_require__(34);

            var memoized = {};
            var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
            var prefixRegex = new RegExp('^(' + prefixes.join('|') + ')');
            var testStyle =
                ExecutionEnvironment.canUseDOM ? document.createElement('div').style : {};

            function getWithPrefix(name) {
                for (var i = 0; i < prefixes.length; i++) {
                    var prefixedName = prefixes[i] + name;
                    if (prefixedName in testStyle) {
                        return prefixedName;
                    }
                }
                return null;
            }

            function getVendorPrefixedName(property) {
                var name = camelize(property);
                if (memoized[name] === undefined) {
                    var capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
                    if (prefixRegex.test(capitalizedName)) {
                        invariant(
                            false,
                            'getVendorPrefixedName must only be called with unprefixed' +
                            'CSS property names. It was called with %s', property
                        );
                    }
                    memoized[name] =
                        (name in testStyle) ? name : getWithPrefix(capitalizedName);
                }
                return memoized[name];
            }

            module.exports = getVendorPrefixedName;
        },
        /* 50 */
        /***/
        function(module, exports, __webpack_require__) {

            var emptyFunction = __webpack_require__(33);

            /**
             * Upstream version of event listener. Does not take into account specific
             * nature of platform.
             */
            var EventListener = {

                listen: function(target, eventType, callback) {
                    if (target.addEventListener) {
                        target.addEventListener(eventType, callback, false);
                        return {
                            remove: function() {
                                target.removeEventListener(eventType, callback, false);
                            }
                        };
                    } else if (target.attachEvent) {
                        target.attachEvent('on' + eventType, callback);
                        return {
                            remove: function() {
                                target.detachEvent('on' + eventType, callback);
                            }
                        };
                    }
                },

                capture: function(target, eventType, callback) {
                    if (!target.addEventListener) {
                        if (false) {
                            console.error(
                                'Attempted to listen to events during the capture phase on a ' +
                                'browser that does not support the capture phase. Your application ' +
                                'will not receive some events.'
                            );
                        }
                        return {
                            remove: emptyFunction
                        };
                    } else {
                        target.addEventListener(eventType, callback, true);
                        return {
                            remove: function() {
                                target.removeEventListener(eventType, callback, true);
                            }
                        };
                    }
                },

                registerDefault: function() {}
            };

            module.exports = EventListener;
        },
        /* 51 */
        /***/
        function(module, exports, __webpack_require__) {

            /* WEBPACK VAR INJECTION */
            (function(global) {

                var cancelAnimationFrame =
                    global.cancelAnimationFrame ||
                    global.webkitCancelAnimationFrame ||
                    global.mozCancelAnimationFrame ||
                    global.oCancelAnimationFrame ||
                    global.msCancelAnimationFrame ||
                    global.clearTimeout;

                module.exports = cancelAnimationFrame;

                /* WEBPACK VAR INJECTION */
            }.call(exports, (function() {
                return this;
            }())))
        },
        /* 52 */
        /***/
        function(module, exports, __webpack_require__) {

            "use strict";

            var Heap = __webpack_require__(62);

            var invariant = __webpack_require__(34);

            function IntegerBufferSet() {
                this.$IntegerBufferSet_valueToPositionMap = {};
                this.$IntegerBufferSet_size = 0;
                this.$IntegerBufferSet_smallValues = new Heap(
                    [], // Initial data in the heap
                    this.$IntegerBufferSet_smallerComparator
                );
                this.$IntegerBufferSet_largeValues = new Heap(
                    [], // Initial data in the heap
                    this.$IntegerBufferSet_greaterComparator
                );

                this.getNewPositionForValue = this.getNewPositionForValue.bind(this);
                this.getValuePosition = this.getValuePosition.bind(this);
                this.getSize = this.getSize.bind(this);
                this.replaceFurthestValuePosition = this.replaceFurthestValuePosition.bind(this);
            }

            IntegerBufferSet.prototype.getSize = function() {
                return this.$IntegerBufferSet_size;
            };

            IntegerBufferSet.prototype.getValuePosition = function(value) {
                if (this.$IntegerBufferSet_valueToPositionMap[value] === undefined) {
                    return null;
                }
                return this.$IntegerBufferSet_valueToPositionMap[value];
            };

            IntegerBufferSet.prototype.getNewPositionForValue = function(value) {
                invariant(
                    this.$IntegerBufferSet_valueToPositionMap[value] === undefined,
                    "Shouldn't try to find new position for value already stored in BufferSet"
                );
                var newPosition = this.$IntegerBufferSet_size;
                this.$IntegerBufferSet_size++;
                this.$IntegerBufferSet_pushToHeaps(newPosition, value);
                this.$IntegerBufferSet_valueToPositionMap[value] = newPosition;
                return newPosition;
            };

            IntegerBufferSet.prototype.replaceFurthestValuePosition = function(
                lowValue,
                /*number*/
                highValue,
                /*number*/
                newValue) {
                invariant(
                    this.$IntegerBufferSet_valueToPositionMap[newValue] === undefined,
                    "Shouldn't try to replace values with value already stored value in " +
                    "BufferSet"
                );

                this.$IntegerBufferSet_cleanHeaps();
                if (this.$IntegerBufferSet_smallValues.empty() || this.$IntegerBufferSet_largeValues.empty()) {
                    // Threre are currently no values stored. We will have to create new
                    // position for this value.
                    return null;
                }

                var minValue = this.$IntegerBufferSet_smallValues.peek().value;
                var maxValue = this.$IntegerBufferSet_largeValues.peek().value;
                if (minValue >= lowValue && maxValue <= highValue) {
                    // All values currently stored are necessary, we can't reuse any of them.
                    return null;
                }

                var valueToReplace;
                if (lowValue - minValue > maxValue - highValue) {
                    // minValue is further from provided range. We will reuse it's position.
                    valueToReplace = minValue;
                    this.$IntegerBufferSet_smallValues.pop();
                } else {
                    valueToReplace = maxValue;
                    this.$IntegerBufferSet_largeValues.pop();
                }
                var position = this.$IntegerBufferSet_valueToPositionMap[valueToReplace];
                delete this.$IntegerBufferSet_valueToPositionMap[valueToReplace];
                this.$IntegerBufferSet_valueToPositionMap[newValue] = position;
                this.$IntegerBufferSet_pushToHeaps(position, newValue);

                return position;
            };

            IntegerBufferSet.prototype.$IntegerBufferSet_pushToHeaps = function(position, /*number*/ value) {
                var element = {
                    position: position,
                    value: value,
                };
                // We can reuse the same object in both heaps, because we don't mutate them
                this.$IntegerBufferSet_smallValues.push(element);
                this.$IntegerBufferSet_largeValues.push(element);
            };

            IntegerBufferSet.prototype.$IntegerBufferSet_cleanHeaps = function() {
                // We not usually only remove object from one heap while moving value.
                // Here we make sure that there is no stale data on top of heaps.
                this.$IntegerBufferSet_cleanHeap(this.$IntegerBufferSet_smallValues);
                this.$IntegerBufferSet_cleanHeap(this.$IntegerBufferSet_largeValues);
                var minHeapSize =
                    Math.min(this.$IntegerBufferSet_smallValues.size(), this.$IntegerBufferSet_largeValues.size());
                var maxHeapSize =
                    Math.max(this.$IntegerBufferSet_smallValues.size(), this.$IntegerBufferSet_largeValues.size());
                if (maxHeapSize > 10 * minHeapSize) {
                    // There are many old values in one of heaps. We nned to get rid of them
                    // to not use too avoid memory leaks
                    this.$IntegerBufferSet_recreateHeaps();
                }
            };

            IntegerBufferSet.prototype.$IntegerBufferSet_recreateHeaps = function() {
                var sourceHeap = this.$IntegerBufferSet_smallValues.size() < this.$IntegerBufferSet_largeValues.size() ?
                    this.$IntegerBufferSet_smallValues :
                    this.$IntegerBufferSet_largeValues;
                var newSmallValues = new Heap(
                    [], // Initial data in the heap
                    this.$IntegerBufferSet_smallerComparator
                );
                var newLargeValues = new Heap(
                    [], // Initial datat in the heap
                    this.$IntegerBufferSet_greaterComparator
                );
                while (!sourceHeap.empty()) {
                    var element = sourceHeap.pop();
                    // Push all stil valid elements to new heaps
                    if (this.$IntegerBufferSet_valueToPositionMap[element.value] !== undefined) {
                        newSmallValues.push(element);
                        newLargeValues.push(element);
                    }
                }
                this.$IntegerBufferSet_smallValues = newSmallValues;
                this.$IntegerBufferSet_largeValues = newLargeValues;
            };

            IntegerBufferSet.prototype.$IntegerBufferSet_cleanHeap = function(heap) {
                while (!heap.empty() &&
                    this.$IntegerBufferSet_valueToPositionMap[heap.peek().value] === undefined) {
                    heap.pop();
                }
            };

            IntegerBufferSet.prototype.$IntegerBufferSet_smallerComparator = function(lhs, /*object*/ rhs) {
                return lhs.value < rhs.value;
            };

            IntegerBufferSet.prototype.$IntegerBufferSet_greaterComparator = function(lhs, /*object*/ rhs) {
                return lhs.value > rhs.value;
            };

            module.exports = IntegerBufferSet;
        },
        /* 53 */
        /***/
        function(module, exports, __webpack_require__) {

            "use strict";

            var ImmutableValue = __webpack_require__(63);

            var invariant = __webpack_require__(34);
            var keyOf = __webpack_require__(64);
            var mergeHelpers = __webpack_require__(65);

            var checkMergeObjectArgs = mergeHelpers.checkMergeObjectArgs;
            var isTerminal = mergeHelpers.isTerminal;

            var SECRET_KEY = keyOf({
                _DONT_EVER_TYPE_THIS_SECRET_KEY: null
            });

            /**
             * Static methods creating and operating on instances of `ImmutableValue`.
             */
            function assertImmutable(immutable) {
                invariant(
                    immutable instanceof ImmutableValue,
                    'ImmutableObject: Attempted to set fields on an object that is not an ' +
                    'instance of ImmutableValue.'
                );
            }

            for (var ImmutableValue____Key in ImmutableValue) {
                if (ImmutableValue.hasOwnProperty(ImmutableValue____Key)) {
                    ImmutableObject[ImmutableValue____Key] = ImmutableValue[ImmutableValue____Key];
                }
            }
            var ____SuperProtoOfImmutableValue = ImmutableValue === null ? null : ImmutableValue.prototype;
            ImmutableObject.prototype = Object.create(____SuperProtoOfImmutableValue);
            ImmutableObject.prototype.constructor = ImmutableObject;
            ImmutableObject.__superConstructor__ = ImmutableValue;

            function ImmutableObject() {
                ImmutableValue.call(this, ImmutableValue[SECRET_KEY]);
                ImmutableValue.mergeAllPropertiesInto(this, arguments);
                if (false) {
                    ImmutableValue.deepFreezeRootNode(this);
                }
            }

            /**
             * DEPRECATED - prefer to instantiate with new ImmutableObject().
             *
             * @arguments {array<object>} The arguments is an array of objects that, when
             * merged together, will form the immutable objects.
             */
            ImmutableObject.create = function() {
                var obj = Object.create(ImmutableObject.prototype);
                ImmutableObject.apply(obj, arguments);
                return obj;
            };

            ImmutableObject.set = function(immutable, put) {
                assertImmutable(immutable);
                invariant(
                    typeof put === 'object' && put !== undefined && !Array.isArray(put),
                    'Invalid ImmutableMap.set argument `put`'
                );
                return new ImmutableObject(immutable, put);
            };

            ImmutableObject.setProperty = function(immutableObject, fieldName, putField) {
                var put = {};
                put[fieldName] = putField;
                return ImmutableObject.set(immutableObject, put);
            };

            ImmutableObject.deleteProperty = function(immutableObject, droppedField) {
                var copy = {};
                for (var key in immutableObject) {
                    if (key !== droppedField && immutableObject.hasOwnProperty(key)) {
                        copy[key] = immutableObject[key];
                    }
                }
                return new ImmutableObject(copy);
            };

            ImmutableObject.setDeep = function(immutable, put) {
                assertImmutable(immutable);
                return _setDeep(immutable, put);
            };

            ImmutableObject.values = function(immutable) {
                return Object.keys(immutable).map(function(key) {
                    return immutable[key];
                });
            };


            function _setDeep(obj, put) {
                checkMergeObjectArgs(obj, put);
                var totalNewFields = {};

                // To maintain the order of the keys, copy the base object's entries first.
                var keys = Object.keys(obj);
                for (var ii = 0; ii < keys.length; ii++) {
                    var key = keys[ii];
                    if (!put.hasOwnProperty(key)) {
                        totalNewFields[key] = obj[key];
                    } else if (isTerminal(obj[key]) || isTerminal(put[key])) {
                        totalNewFields[key] = put[key];
                    } else {
                        totalNewFields[key] = _setDeep(obj[key], put[key]);
                    }
                }

                // Apply any new keys that the base obj didn't have.
                var newKeys = Object.keys(put);
                for (ii = 0; ii < newKeys.length; ii++) {
                    var newKey = newKeys[ii];
                    if (obj.hasOwnProperty(newKey)) {
                        continue;
                    }
                    totalNewFields[newKey] = put[newKey];
                }

                return (
                    obj instanceof ImmutableValue ? new ImmutableObject(totalNewFields) :
                    put instanceof ImmutableValue ? new ImmutableObject(totalNewFields) :
                    totalNewFields
                );
            }

            module.exports = ImmutableObject;
        },
        /* 54 */
        /***/
        function(module, exports, __webpack_require__) {

            var ImmutableObject = __webpack_require__(53);
            var React = __webpack_require__(19);

            var cloneWithProps = __webpack_require__(30);
            var cx = __webpack_require__(31);
            var joinClasses = __webpack_require__(42);

            var PropTypes = React.PropTypes;

            var DEFAULT_PROPS = new ImmutableObject({
                align: 'left',
                highlighted: false,
                isFooterCell: false,
                isHeaderCell: false,
            });

            var FlexiTableCell = React.createClass({
                displayName: "FlexiTableCell",

                propTypes: {
                    align: PropTypes.oneOf(['left', 'center', 'right']),
                    className: PropTypes.string,
                    highlighted: PropTypes.bool,
                    isFooterCell: PropTypes.bool,
                    isHeaderCell: PropTypes.bool,
                    width: PropTypes.number.isRequired,
                    minWidth: PropTypes.number,
                    maxWidth: PropTypes.number,
                    height: PropTypes.number.isRequired,

                    /**
                     * The cell data that will be passed to `cellRenderer` to render.
                     */
                    cellData: PropTypes.any,

                    /**
                     * The key to retrieve the cell data from the `rowData`.
                     */
                    cellDataKey: PropTypes.oneOfType([
                        PropTypes.string.isRequired,
                        PropTypes.number.isRequired,
                    ]),

                    /**
                     * The function to render the `cellData`.
                     */
                    cellRenderer: PropTypes.func.isRequired,

                    /**
                     * The column data that will be passed to `cellRenderer` to render.
                     */
                    columnData: PropTypes.any,

                    /**
                     * The row data that will be passed to `cellRenderer` to render.
                     */
                    rowData: PropTypes.oneOfType([
                        PropTypes.object.isRequired,
                        PropTypes.array.isRequired,
                    ]),

                    /**
                     * The row index that will be passed to `cellRenderer` to render.
                     */
                    rowIndex: PropTypes.number.isRequired,

                    /**
                     * Callback for when resizer knob (in FlexiTableCell) is clicked
                     * to initialize resizing. Please note this is only on the cells
                     * in the header.
                     * @param number combinedWidth
                     * @param number leftOffset
                     * @param number width
                     * @param number minWidth
                     * @param number maxWidth
                     * @param number|string columnKey
                     * @param object event
                     */
                    onColumnResize: PropTypes.func,

                    /**
                     * Width of the all the cells preceding this cell that
                     * are in its column group.
                     */
                    widthOffset: PropTypes.number,

                    /**
                     * The left offset in pixels of the cell.
                     */
                    left: PropTypes.number,
                },

                shouldComponentUpdate: function( /*object*/ nextProps) /*boolean*/ {
                    var props = this.props;
                    var key;
                    for (key in props) {
                        if (props[key] !== nextProps[key] &&
                            key !== 'left') {
                            return true;
                        }
                    }
                    for (key in nextProps) {
                        if (props[key] !== nextProps[key] &&
                            key !== 'left') {
                            return true;
                        }
                    }

                    return false;
                },

                getDefaultProps: function() /*object*/ {
                    return DEFAULT_PROPS;
                },

                render: function() /*object*/ {
                    var props = this.props;

                    var style = {
                        width: props.width,
                        height: props.height
                    };

                    var className = joinClasses(
                        cx({
                            'public/flexiTableCell/main': true,
                            'public/flexiTableCell/highlighted': props.highlighted,
                            'public/flexiTableCell/lastChild': props.lastChild,
                            'public/flexiTableCell/alignRight': props.align === 'right',
                            'public/flexiTableCell/alignCenter': props.align === 'center'
                        }),
                        props.className
                    );

                    var content;
                    if (props.isHeaderCell || props.isFooterCell) {
                        content = props.cellRenderer(
                            props.cellData,
                            props.cellDataKey,
                            props.columnData,
                            props.rowData,
                            props.width
                        );
                    } else {
                        content = props.cellRenderer(
                            props.cellData,
                            props.cellDataKey,
                            props.rowData,
                            props.rowIndex,
                            props.columnData,
                            props.width
                        );
                    }

                    var contentClass = cx('public/flexiTableCell/cellContent');
                    if (React.isValidElement(content)) {
                        content = cloneWithProps(content, {
                            className: contentClass
                        });
                    } else {
                        content = React.createElement("div", {
                            className: contentClass
                        }, content);
                    }

                    var columnResizerComponent;
                    if (props.onColumnResize) {
                        var columnResizerStyle = {
                            height: props.height
                        };
                        columnResizerComponent = (
                            React.createElement("div", {
                                    className: cx('flexiTableCell/columnResizerContainer'),
                                    style: columnResizerStyle,
                                    onMouseDown: this._onColumnResizerMouseDown
                                },
                                React.createElement("div", {
                                    className: cx('flexiTableCell/columnResizerKnob'),
                                    style: columnResizerStyle
                                })
                            )
                        );
                    }
                    return (
                        React.createElement("div", {
                                className: className,
                                style: style
                            },
                            columnResizerComponent,
                            React.createElement("div", {
                                    className: cx('public/flexiTableCell/wrap1'),
                                    style: style
                                },
                                React.createElement("div", {
                                        className: cx('public/flexiTableCell/wrap2')
                                    },
                                    React.createElement("div", {
                                            className: cx('public/flexiTableCell/wrap3')
                                        },
                                        content
                                    )
                                )
                            )
                        )
                    );
                },

                _onColumnResizerMouseDown: function( /*object*/ event) {
                    this.props.onColumnResize(
                        this.props.widthOffset,
                        this.props.width,
                        this.props.minWidth,
                        this.props.maxWidth,
                        this.props.cellDataKey,
                        event
                    );
                },
            });

            module.exports = FlexiTableCell;
        },
        /* 55 */
        /***/
        function(module, exports, __webpack_require__) {

            var _populated = false;

            // Browsers
            var _ie, _firefox, _opera, _webkit, _chrome;

            // Actual IE browser for compatibility mode
            var _ie_real_version;

            // Platforms
            var _osx, _windows, _linux, _android;

            // Architectures
            var _win64;

            // Devices
            var _iphone, _ipad, _native;

            var _mobile;

            function _populate() {
                if (_populated) {
                    return;
                }

                _populated = true;

                var uas = navigator.userAgent;
                var agent = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(uas);
                var os = /(Mac OS X)|(Windows)|(Linux)/.exec(uas);

                _iphone = /\b(iPhone|iP[ao]d)/.exec(uas);
                _ipad = /\b(iP[ao]d)/.exec(uas);
                _android = /Android/i.exec(uas);
                _native = /FBAN\/\w+;/i.exec(uas);
                _mobile = /Mobile/i.exec(uas);

                _win64 = !!(/Win64/.exec(uas));

                if (agent) {
                    _ie = agent[1] ? parseFloat(agent[1]) : (
                        agent[5] ? parseFloat(agent[5]) : NaN);
                    // IE compatibility mode
                    if (_ie && document && document.documentMode) {
                        _ie = document.documentMode;
                    }
                    // grab the "true" ie version from the trident token if available
                    var trident = /(?:Trident\/(\d+.\d+))/.exec(uas);
                    _ie_real_version = trident ? parseFloat(trident[1]) + 4 : _ie;

                    _firefox = agent[2] ? parseFloat(agent[2]) : NaN;
                    _opera = agent[3] ? parseFloat(agent[3]) : NaN;
                    _webkit = agent[4] ? parseFloat(agent[4]) : NaN;
                    if (_webkit) {
                        // We do not add the regexp to the above test, because it will always
                        // match 'safari' only since 'AppleWebKit' appears before 'Chrome' in
                        // the userAgent string.
                        agent = /(?:Chrome\/(\d+\.\d+))/.exec(uas);
                        _chrome = agent && agent[1] ? parseFloat(agent[1]) : NaN;
                    } else {
                        _chrome = NaN;
                    }
                } else {
                    _ie = _firefox = _opera = _chrome = _webkit = NaN;
                }

                if (os) {
                    if (os[1]) {
                        // Detect OS X version.  If no version number matches, set _osx to true.
                        // Version examples:  10, 10_6_1, 10.7
                        // Parses version number as a float, taking only first two sets of
                        // digits.  If only one set of digits is found, returns just the major
                        // version number.
                        var ver = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);

                        _osx = ver ? parseFloat(ver[1].replace('_', '.')) : true;
                    } else {
                        _osx = false;
                    }
                    _windows = !!os[2];
                    _linux = !!os[3];
                } else {
                    _osx = _windows = _linux = false;
                }
            }

            var UserAgent_DEPRECATED = {

                /**
                 *  Check if the UA is Internet Explorer.
                 *
                 *
                 *  @return float|NaN Version number (if match) or NaN.
                 */
                ie: function() {
                    return _populate() || _ie;
                },

                /**
                 * Check if we're in Internet Explorer compatibility mode.
                 *
                 * @return bool true if in compatibility mode, false if
                 * not compatibility mode or not ie
                 */
                ieCompatibilityMode: function() {
                    return _populate() || (_ie_real_version > _ie);
                },

                /**
                 * Whether the browser is 64-bit IE.  Really, this is kind of weak sauce;  we
                 * only need this because Skype can't handle 64-bit IE yet.  We need to remove
                 * this when we don't need it -- tracked by #601957.
                 */
                ie64: function() {
                    return UserAgent_DEPRECATED.ie() && _win64;
                },

                /**
                 *  Check if the UA is Firefox.
                 *
                 *
                 *  @return float|NaN Version number (if match) or NaN.
                 */
                firefox: function() {
                    return _populate() || _firefox;
                },

                /**
                 *  Check if the UA is Opera.
                 *
                 *
                 *  @return float|NaN Version number (if match) or NaN.
                 */
                opera: function() {
                    return _populate() || _opera;
                },

                /**
                 *  Check if the UA is WebKit.
                 *
                 *
                 *  @return float|NaN Version number (if match) or NaN.
                 */
                webkit: function() {
                    return _populate() || _webkit;
                },

                /**
                 *  For Push
                 *  WILL BE REMOVED VERY SOON. Use UserAgent_DEPRECATED.webkit
                 */
                safari: function() {
                    return UserAgent_DEPRECATED.webkit();
                },

                /**
                 *  Check if the UA is a Chrome browser.
                 *
                 *
                 *  @return float|NaN Version number (if match) or NaN.
                 */
                chrome: function() {
                    return _populate() || _chrome;
                },

                /**
                 *  Check if the user is running Windows.
                 *
                 *  @return bool `true' if the user's OS is Windows.
                 */
                windows: function() {
                    return _populate() || _windows;
                },

                /**
                 *  Check if the user is running Mac OS X.
                 *
                 *  @return float|bool   Returns a float if a version number is detected,
                 *                       otherwise true/false.
                 */
                osx: function() {
                    return _populate() || _osx;
                },

                /**
                 * Check if the user is running Linux.
                 *
                 * @return bool `true' if the user's OS is some flavor of Linux.
                 */
                linux: function() {
                    return _populate() || _linux;
                },

                /**
                 * Check if the user is running on an iPhone or iPod platform.
                 *
                 * @return bool `true' if the user is running some flavor of the
                 *    iPhone OS.
                 */
                iphone: function() {
                    return _populate() || _iphone;
                },

                mobile: function() {
                    return _populate() || (_iphone || _ipad || _android || _mobile);
                },

                nativeApp: function() {
                    // webviews inside of the native apps
                    return _populate() || _native;
                },

                android: function() {
                    return _populate() || _android;
                },

                ipad: function() {
                    return _populate() || _ipad;
                }
            };

            module.exports = UserAgent_DEPRECATED;
        },
        /* 56 */
        /***/
        function(module, exports, __webpack_require__) {

            'use strict';

            var ExecutionEnvironment = __webpack_require__(58);

            var useHasFeature;
            if (ExecutionEnvironment.canUseDOM) {
                useHasFeature =
                    document.implementation &&
                    document.implementation.hasFeature &&
                    // always returns true in newer browsers as per the standard.
                    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
                    document.implementation.hasFeature('', '') !== true;
            }

            /**
             * Checks if an event is supported in the current execution environment.
             *
             * NOTE: This will not work correctly for non-generic events such as `change`,
             * `reset`, `load`, `error`, and `select`.
             *
             * Borrows from Modernizr.
             *
             * @param {string} eventNameSuffix Event name, e.g. "click".
             * @param {?boolean} capture Check if the capture phase is supported.
             * @return {boolean} True if the event is supported.
             * @internal
             * @license Modernizr 3.0.0pre (Custom Build) | MIT
             */
            function isEventSupported(eventNameSuffix, capture) {
                if (!ExecutionEnvironment.canUseDOM ||
                    capture && !('addEventListener' in document)) {
                    return false;
                }

                var eventName = 'on' + eventNameSuffix;
                var isSupported = eventName in document;

                if (!isSupported) {
                    var element = document.createElement('div');
                    element.setAttribute(eventName, 'return;');
                    isSupported = typeof element[eventName] === 'function';
                }

                if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
                    // This is the only way to test support for the `wheel` event in IE9+.
                    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
                }

                return isSupported;
            }

            module.exports = isEventSupported;
        },
        /* 57 */
        /***/
        function(module, exports, __webpack_require__) {

            /* WEBPACK VAR INJECTION */
            (function(global) {

                var nativeRequestAnimationFrame =
                    global.requestAnimationFrame ||
                    global.webkitRequestAnimationFrame ||
                    global.mozRequestAnimationFrame ||
                    global.oRequestAnimationFrame ||
                    global.msRequestAnimationFrame;

                module.exports = nativeRequestAnimationFrame;

                /* WEBPACK VAR INJECTION */
            }.call(exports, (function() {
                return this;
            }())))
        },
        /* 58 */
        /***/
        function(module, exports, __webpack_require__) {

            /*jslint evil: true */

            "use strict";

            var canUseDOM = !!(
                typeof window !== 'undefined' &&
                window.document &&
                window.document.createElement
            );

            /**
             * Simple, lightweight module assisting with the detection and context of
             * Worker. Helps avoid circular dependencies and allows code to reason about
             * whether or not they are in a Worker, even if they never include the main
             * `ReactWorker` dependency.
             */
            var ExecutionEnvironment = {

                canUseDOM: canUseDOM,

                canUseWorkers: typeof Worker !== 'undefined',

                canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

                canUseViewport: canUseDOM && !!window.screen,

                isInWorker: !canUseDOM // For now, this is true - might change in the future.

            };

            module.exports = ExecutionEnvironment;
        },
        /* 59 */
        /***/
        function(module, exports, __webpack_require__) {


            var _hyphenPattern = /-(.)/g;

            /**
             * Camelcases a hyphenated string, for example:
             *
             *   > camelize('background-color')
             *   < "backgroundColor"
             *
             * @param {string} string
             * @return {string}
             */
            function camelize(string) {
                return string.replace(_hyphenPattern, function(_, character) {
                    return character.toUpperCase();
                });
            }

            module.exports = camelize;
        },
        /* 60 */
        /***/
        function(module, exports, __webpack_require__) {

            "use strict";

            var shallowEqual = __webpack_require__(72);

            var ReactComponentWithPureRenderMixin = {
                shouldComponentUpdate: function(nextProps, nextState) {
                    return !shallowEqual(this.props, nextProps) ||
                        !shallowEqual(this.state, nextState);
                }
            };

            module.exports = ReactComponentWithPureRenderMixin;
        },
        /* 61 */
        /***/
        function(module, exports, __webpack_require__) {

            /* WEBPACK VAR INJECTION */
            (function(process) {

                "use strict";

                var ReactElement = __webpack_require__(68);
                var ReactPropTransferer = __webpack_require__(69);

                var keyOf = __webpack_require__(70);
                var warning = __webpack_require__(71);

                var CHILDREN_PROP = keyOf({
                    children: null
                });

                function cloneWithProps(child, props) {
                    if ("production" !== process.env.NODE_ENV) {
                        ("production" !== process.env.NODE_ENV ? warning(!child.ref,
                            'You are calling cloneWithProps() on a child with a ref. This is ' +
                            'dangerous because you\'re creating a new child which will not be ' +
                            'added as a ref to its parent.'
                        ) : null);
                    }

                    var newProps = ReactPropTransferer.mergeProps(props, child.props);

                    // Use `child.props.children` if it is provided.
                    if (!newProps.hasOwnProperty(CHILDREN_PROP) &&
                        child.props.hasOwnProperty(CHILDREN_PROP)) {
                        newProps.children = child.props.children;
                    }

                    // The current API doesn't retain _owner and _context, which is why this
                    // doesn't use ReactElement.cloneAndReplaceProps.
                    return ReactElement.createElement(child.type, newProps);
                }

                module.exports = cloneWithProps;

                /* WEBPACK VAR INJECTION */
            }.call(exports, __webpack_require__(73)))
        },
        /* 62 */
        /***/
        function(module, exports, __webpack_require__) {

            "use strict";

            /*
             * @param {*} a
             * @param {*} b
             * @return {boolean}
             */
            function defaultComparator(a, b) {
                return a < b;
            }


            function Heap(items, comparator) {
                this._items = items || [];
                this._size = this._items.length;
                this._comparator = comparator || defaultComparator;
                this._heapify();
            }

            /*
             * @return {boolean}
             */
            Heap.prototype.empty = function() {
                return this._size === 0;
            };

            /*
             * @return {*}
             */
            Heap.prototype.pop = function() {
                if (this._size === 0) {
                    return;
                }

                var elt = this._items[0];

                var lastElt = this._items.pop();
                this._size--;

                if (this._size > 0) {
                    this._items[0] = lastElt;
                    this._sinkDown(0);
                }

                return elt;
            };

            /*
             * @param {*} item
             */
            Heap.prototype.push = function(item) {
                this._items[this._size++] = item;
                this._bubbleUp(this._size - 1);
            };

            /*
             * @return {number}
             */
            Heap.prototype.size = function() {
                return this._size;
            };

            /*
             * @return {*}
             */
            Heap.prototype.peek = function() {
                if (this._size === 0) {
                    return;
                }

                return this._items[0];
            };

            Heap.prototype._heapify = function() {
                for (var index = Math.floor((this._size + 1) / 2); index >= 0; index--) {
                    this._sinkDown(index);
                }
            };

            /*
             * @parent {number} index
             */
            Heap.prototype._bubbleUp = function(index) {
                var elt = this._items[index];
                while (index > 0) {
                    var parentIndex = Math.floor((index + 1) / 2) - 1;
                    var parentElt = this._items[parentIndex];

                    // if parentElt < elt, stop
                    if (this._comparator(parentElt, elt)) {
                        return;
                    }

                    // swap
                    this._items[parentIndex] = elt;
                    this._items[index] = parentElt;
                    index = parentIndex;
                }
            };

            /*
             * @parent {number} index
             */
            Heap.prototype._sinkDown = function(index) {
                var elt = this._items[index];

                while (true) {
                    var leftChildIndex = 2 * (index + 1) - 1;
                    var rightChildIndex = 2 * (index + 1);
                    var swapIndex = -1;

                    if (leftChildIndex < this._size) {
                        var leftChild = this._items[leftChildIndex];
                        if (this._comparator(leftChild, elt)) {
                            swapIndex = leftChildIndex;
                        }
                    }

                    if (rightChildIndex < this._size) {
                        var rightChild = this._items[rightChildIndex];
                        if (this._comparator(rightChild, elt)) {
                            if (swapIndex === -1 ||
                                this._comparator(rightChild, this._items[swapIndex])) {
                                swapIndex = rightChildIndex;
                            }
                        }
                    }

                    // if we don't have a swap, stop
                    if (swapIndex === -1) {
                        return;
                    }

                    this._items[index] = this._items[swapIndex];
                    this._items[swapIndex] = elt;
                    index = swapIndex;
                }
            };

            module.exports = Heap;
        },
        /* 63 */
        /***/
        function(module, exports, __webpack_require__) {

            "use strict";

            var invariant = __webpack_require__(34);
            var isNode = __webpack_require__(66);
            var keyOf = __webpack_require__(64);

            var SECRET_KEY = keyOf({
                _DONT_EVER_TYPE_THIS_SECRET_KEY: null
            });

            function ImmutableValue(secret) {
                invariant(
                    secret === ImmutableValue[SECRET_KEY],
                    'Only certain classes should create instances of `ImmutableValue`.' +
                    'You probably want something like ImmutableValueObject.create.'
                );
            }

            ImmutableValue.mergeAllPropertiesInto = function(destination, propertyObjects) {
                var argLength = propertyObjects.length;
                for (var i = 0; i < argLength; i++) {
                    Object.assign(destination, propertyObjects[i]);
                }
            };

            ImmutableValue.deepFreezeRootNode = function(object) {
                if (isNode(object)) {
                    return; // Don't try to freeze DOM nodes.
                }
                Object.freeze(object); // First freeze the object.
                for (var prop in object) {
                    if (object.hasOwnProperty(prop)) {
                        ImmutableValue.recurseDeepFreeze(object[prop]);
                    }
                }
                Object.seal(object);
            };

            ImmutableValue.recurseDeepFreeze = function(object) {
                if (isNode(object) || !ImmutableValue.shouldRecurseFreeze(object)) {
                    return; // Don't try to freeze DOM nodes.
                }
                Object.freeze(object); // First freeze the object.
                for (var prop in object) {
                    if (object.hasOwnProperty(prop)) {
                        ImmutableValue.recurseDeepFreeze(object[prop]);
                    }
                }
                Object.seal(object);
            };

            ImmutableValue.shouldRecurseFreeze = function(object) {
                return (
                    typeof object === 'object' &&
                    !(object instanceof ImmutableValue) &&
                    object !== null
                );
            };


            ImmutableValue._DONT_EVER_TYPE_THIS_SECRET_KEY = Math.random();

            module.exports = ImmutableValue;
        },
        /* 64 */
        /***/
        function(module, exports, __webpack_require__) {

            var keyOf = function(oneKeyObj) {
                var key;
                for (key in oneKeyObj) {
                    if (!oneKeyObj.hasOwnProperty(key)) {
                        continue;
                    }
                    return key;
                }
                return null;
            };


            module.exports = keyOf;
        },
        /* 65 */
        /***/
        function(module, exports, __webpack_require__) {

            "use strict";

            var invariant = __webpack_require__(34);
            var keyMirror = __webpack_require__(67);

            var MAX_MERGE_DEPTH = 36;

            var isTerminal = function(o) {
                return typeof o !== 'object' || o instanceof Date || o === null;
            };

            var mergeHelpers = {

                MAX_MERGE_DEPTH: MAX_MERGE_DEPTH,

                isTerminal: isTerminal,

                normalizeMergeArg: function(arg) {
                    return arg === undefined || arg === null ? {} : arg;
                },

                checkMergeArrayArgs: function(one, two) {
                    invariant(
                        Array.isArray(one) && Array.isArray(two),
                        'Tried to merge arrays, instead got %s and %s.',
                        one,
                        two
                    );
                },

                checkMergeObjectArgs: function(one, two) {
                    mergeHelpers.checkMergeObjectArg(one);
                    mergeHelpers.checkMergeObjectArg(two);
                },

                checkMergeObjectArg: function(arg) {
                    invariant(!isTerminal(arg) && !Array.isArray(arg),
                        'Tried to merge an object, instead got %s.',
                        arg
                    );
                },

                checkMergeIntoObjectArg: function(arg) {
                    invariant(
                        (!isTerminal(arg) || typeof arg === 'function') && !Array.isArray(arg),
                        'Tried to merge into an object, instead got %s.',
                        arg
                    );
                },

                checkMergeLevel: function(level) {
                    invariant(
                        level < MAX_MERGE_DEPTH,
                        'Maximum deep merge depth exceeded. You may be attempting to merge ' +
                        'circular structures in an unsupported way.'
                    );
                },

                checkArrayStrategy: function(strategy) {
                    invariant(
                        strategy === undefined || strategy in mergeHelpers.ArrayStrategies,
                        'You must provide an array strategy to deep merge functions to ' +
                        'instruct the deep merge how to resolve merging two arrays.'
                    );
                },

                ArrayStrategies: keyMirror({
                    Clobber: true,
                    IndexByIndex: true
                })

            };

            module.exports = mergeHelpers;
        },
        /* 66 */
        /***/
        function(module, exports, __webpack_require__) {

            function isNode(object) {
                return !!(object && (
                    typeof Node === 'function' ? object instanceof Node :
                    typeof object === 'object' &&
                    typeof object.nodeType === 'number' &&
                    typeof object.nodeName === 'string'
                ));
            }

            module.exports = isNode;
        },
        /* 67 */
        /***/
        function(module, exports, __webpack_require__) {



            'use strict';

            var invariant = __webpack_require__(34);

            var keyMirror = function(obj) {
                var ret = {};
                var key;
                invariant(
                    obj instanceof Object && !Array.isArray(obj),
                    'keyMirror(...): Argument must be an object.'
                );
                for (key in obj) {
                    if (!obj.hasOwnProperty(key)) {
                        continue;
                    }
                    ret[key] = key;
                }
                return ret;
            };

            module.exports = keyMirror;
        },
        /* 68 */
        /***/
        function(module, exports, __webpack_require__) {

            /* WEBPACK VAR INJECTION */
            (function(process) {

                "use strict";

                var ReactContext = __webpack_require__(78);
                var ReactCurrentOwner = __webpack_require__(79);

                var warning = __webpack_require__(71);

                var RESERVED_PROPS = {
                    key: true,
                    ref: true
                };

                function defineWarningProperty(object, key) {
                    Object.defineProperty(object, key, {

                        configurable: false,
                        enumerable: true,

                        get: function() {
                            if (!this._store) {
                                return null;
                            }
                            return this._store[key];
                        },

                        set: function(value) {
                            ("production" !== process.env.NODE_ENV ? warning(
                                false,
                                'Don\'t set the ' + key + ' property of the component. ' +
                                'Mutate the existing props object instead.'
                            ) : null);
                            this._store[key] = value;
                        }

                    });
                }

                var useMutationMembrane = false;

                function defineMutationMembrane(prototype) {
                    try {
                        var pseudoFrozenProperties = {
                            props: true
                        };
                        for (var key in pseudoFrozenProperties) {
                            defineWarningProperty(prototype, key);
                        }
                        useMutationMembrane = true;
                    } catch (x) {
                        // IE will fail on defineProperty
                    }
                }

                var ReactElement = function(type, key, ref, owner, context, props) {
                    // Built-in properties that belong on the element
                    this.type = type;
                    this.key = key;
                    this.ref = ref;

                    // Record the component responsible for creating this element.
                    this._owner = owner;

                    // TODO: Deprecate withContext, and then the context becomes accessible
                    // through the owner.
                    this._context = context;

                    if ("production" !== process.env.NODE_ENV) {
                        this._store = {
                            validated: false,
                            props: props
                        };

                        if (useMutationMembrane) {
                            Object.freeze(this);
                            return;
                        }
                    }

                    this.props = props;
                };

                ReactElement.prototype = {
                    _isReactElement: true
                };

                if ("production" !== process.env.NODE_ENV) {
                    defineMutationMembrane(ReactElement.prototype);
                }

                ReactElement.createElement = function(type, config, children) {
                    var propName;

                    // Reserved names are extracted
                    var props = {};

                    var key = null;
                    var ref = null;

                    if (config != null) {
                        ref = config.ref === undefined ? null : config.ref;
                        if ("production" !== process.env.NODE_ENV) {
                            ("production" !== process.env.NODE_ENV ? warning(
                                config.key !== null,
                                'createElement(...): Encountered component with a `key` of null. In ' +
                                'a future version, this will be treated as equivalent to the string ' +
                                '\'null\'; instead, provide an explicit key or use undefined.'
                            ) : null);
                        }
                        // TODO: Change this back to `config.key === undefined`
                        key = config.key == null ? null : '' + config.key;
                        // Remaining properties are added to a new props object
                        for (propName in config) {
                            if (config.hasOwnProperty(propName) &&
                                !RESERVED_PROPS.hasOwnProperty(propName)) {
                                props[propName] = config[propName];
                            }
                        }
                    }

                    // Children can be more than one argument, and those are transferred onto
                    // the newly allocated props object.
                    var childrenLength = arguments.length - 2;
                    if (childrenLength === 1) {
                        props.children = children;
                    } else if (childrenLength > 1) {
                        var childArray = Array(childrenLength);
                        for (var i = 0; i < childrenLength; i++) {
                            childArray[i] = arguments[i + 2];
                        }
                        props.children = childArray;
                    }

                    // Resolve default props
                    if (type && type.defaultProps) {
                        var defaultProps = type.defaultProps;
                        for (propName in defaultProps) {
                            if (typeof props[propName] === 'undefined') {
                                props[propName] = defaultProps[propName];
                            }
                        }
                    }

                    return new ReactElement(
                        type,
                        key,
                        ref,
                        ReactCurrentOwner.current,
                        ReactContext.current,
                        props
                    );
                };

                ReactElement.createFactory = function(type) {
                    var factory = ReactElement.createElement.bind(null, type);
                    factory.type = type;
                    return factory;
                };

                ReactElement.cloneAndReplaceProps = function(oldElement, newProps) {
                    var newElement = new ReactElement(
                        oldElement.type,
                        oldElement.key,
                        oldElement.ref,
                        oldElement._owner,
                        oldElement._context,
                        newProps
                    );

                    if ("production" !== process.env.NODE_ENV) {
                        // If the key on the original is valid, then the clone is valid
                        newElement._store.validated = oldElement._store.validated;
                    }
                    return newElement;
                };

                ReactElement.isValidElement = function(object) {
                    var isElement = !!(object && object._isReactElement);
                    return isElement;
                };

                module.exports = ReactElement;

                /* WEBPACK VAR INJECTION */
            }.call(exports, __webpack_require__(73)))
        },
        /* 69 */
        /***/
        function(module, exports, __webpack_require__) {

            /* WEBPACK VAR INJECTION */
            (function(process) {

                "use strict";

                var assign = __webpack_require__(75);
                var emptyFunction = __webpack_require__(74);
                var invariant = __webpack_require__(76);
                var joinClasses = __webpack_require__(77);
                var warning = __webpack_require__(71);

                var didWarn = false;

                function createTransferStrategy(mergeStrategy) {
                    return function(props, key, value) {
                        if (!props.hasOwnProperty(key)) {
                            props[key] = value;
                        } else {
                            props[key] = mergeStrategy(props[key], value);
                        }
                    };
                }

                var transferStrategyMerge = createTransferStrategy(function(a, b) {
                    return assign({}, b, a);
                });

                var TransferStrategies = {
                    /**
                     * Never transfer `children`.
                     */
                    children: emptyFunction,
                    /**
                     * Transfer the `className` prop by merging them.
                     */
                    className: createTransferStrategy(joinClasses),
                    /**
                     * Transfer the `style` prop (which is an object) by merging them.
                     */
                    style: transferStrategyMerge
                };

                function transferInto(props, newProps) {
                    for (var thisKey in newProps) {
                        if (!newProps.hasOwnProperty(thisKey)) {
                            continue;
                        }

                        var transferStrategy = TransferStrategies[thisKey];

                        if (transferStrategy && TransferStrategies.hasOwnProperty(thisKey)) {
                            transferStrategy(props, thisKey, newProps[thisKey]);
                        } else if (!props.hasOwnProperty(thisKey)) {
                            props[thisKey] = newProps[thisKey];
                        }
                    }
                    return props;
                }

                var ReactPropTransferer = {

                    TransferStrategies: TransferStrategies,

                    mergeProps: function(oldProps, newProps) {
                        return transferInto(assign({}, oldProps), newProps);
                    },

                    Mixin: {

                        transferPropsTo: function(element) {
                            ("production" !== process.env.NODE_ENV ? invariant(
                                element._owner === this,
                                '%s: You can\'t call transferPropsTo() on a component that you ' +
                                'don\'t own, %s. This usually means you are calling ' +
                                'transferPropsTo() on a component passed in as props or children.',
                                this.constructor.displayName,
                                typeof element.type === 'string' ?
                                element.type :
                                element.type.displayName
                            ) : invariant(element._owner === this));

                            if ("production" !== process.env.NODE_ENV) {
                                if (!didWarn) {
                                    didWarn = true;
                                    ("production" !== process.env.NODE_ENV ? warning(
                                        false,
                                        'transferPropsTo is deprecated. ' +
                                        'See http://fb.me/react-transferpropsto for more information.'
                                    ) : null);
                                }
                            }

                            // Because elements are immutable we have to merge into the existing
                            // props object rather than clone it.
                            transferInto(element.props, this.props);

                            return element;
                        }

                    }
                };

                module.exports = ReactPropTransferer;

                /* WEBPACK VAR INJECTION */
            }.call(exports, __webpack_require__(73)))
        },
        /* 70 */
        /***/
        function(module, exports, __webpack_require__) {

            var keyOf = function(oneKeyObj) {
                var key;
                for (key in oneKeyObj) {
                    if (!oneKeyObj.hasOwnProperty(key)) {
                        continue;
                    }
                    return key;
                }
                return null;
            };

            module.exports = keyOf;
        },
        /* 71 */
        /***/
        function(module, exports, __webpack_require__) {

            /* WEBPACK VAR INJECTION */
            (function(process) {
                "use strict";

                var emptyFunction = __webpack_require__(74);

                var warning = emptyFunction;

                if ("production" !== process.env.NODE_ENV) {
                    warning = function(condition, format) {
                        for (var args = [], $__0 = 2, $__1 = arguments.length; $__0 < $__1; $__0++) args.push(arguments[$__0]);
                        if (format === undefined) {
                            throw new Error(
                                '`warning(condition, format, ...args)` requires a warning ' +
                                'message argument'
                            );
                        }

                        if (!condition) {
                            var argIndex = 0;
                            console.warn('Warning: ' + format.replace(/%s/g, function() {
                                return args[argIndex++];
                            }));
                        }
                    };
                }

                module.exports = warning;

                /* WEBPACK VAR INJECTION */
            }.call(exports, __webpack_require__(73)))
        },
        /* 72 */
        /***/
        function(module, exports, __webpack_require__) {

            "use strict";

            function shallowEqual(objA, objB) {
                if (objA === objB) {
                    return true;
                }
                var key;
                // Test for A's keys different from B.
                for (key in objA) {
                    if (objA.hasOwnProperty(key) &&
                        (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
                        return false;
                    }
                }
                // Test for B's keys missing from A.
                for (key in objB) {
                    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
                        return false;
                    }
                }
                return true;
            }

            module.exports = shallowEqual;
        },
        /* 73 */
        /***/
        function(module, exports, __webpack_require__) {

            // shim for using process in browser

            var process = module.exports = {};

            process.nextTick = (function() {
                var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
                var canMutationObserver = typeof window !== 'undefined' && window.MutationObserver;
                var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;

                if (canSetImmediate) {
                    return function(f) {
                        return window.setImmediate(f)
                    };
                }

                var queue = [];

                if (canMutationObserver) {
                    var hiddenDiv = document.createElement("div");
                    var observer = new MutationObserver(function() {
                        var queueList = queue.slice();
                        queue.length = 0;
                        queueList.forEach(function(fn) {
                            fn();
                        });
                    });

                    observer.observe(hiddenDiv, {
                        attributes: true
                    });

                    return function nextTick(fn) {
                        if (!queue.length) {
                            hiddenDiv.setAttribute('yes', 'no');
                        }
                        queue.push(fn);
                    };
                }

                if (canPost) {
                    window.addEventListener('message', function(ev) {
                        var source = ev.source;
                        if ((source === window || source === null) && ev.data === 'process-tick') {
                            ev.stopPropagation();
                            if (queue.length > 0) {
                                var fn = queue.shift();
                                fn();
                            }
                        }
                    }, true);

                    return function nextTick(fn) {
                        queue.push(fn);
                        window.postMessage('process-tick', '*');
                    };
                }

                return function nextTick(fn) {
                    setTimeout(fn, 0);
                };
            })();

            process.title = 'browser';
            process.browser = true;
            process.env = {};
            process.argv = [];

            function noop() {}

            process.on = noop;
            process.addListener = noop;
            process.once = noop;
            process.off = noop;
            process.removeListener = noop;
            process.removeAllListeners = noop;
            process.emit = noop;

            process.binding = function(name) {
                throw new Error('process.binding is not supported');
            };

            // TODO(shtylman)
            process.cwd = function() {
                return '/'
            };
            process.chdir = function(dir) {
                throw new Error('process.chdir is not supported');
            };
        },
        /* 74 */
        /***/
        function(module, exports, __webpack_require__) {

            function makeEmptyFunction(arg) {
                return function() {
                    return arg;
                };
            }

            function emptyFunction() {}

            emptyFunction.thatReturns = makeEmptyFunction;
            emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
            emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
            emptyFunction.thatReturnsNull = makeEmptyFunction(null);
            emptyFunction.thatReturnsThis = function() {
                return this;
            };
            emptyFunction.thatReturnsArgument = function(arg) {
                return arg;
            };

            module.exports = emptyFunction;
        },
        /* 75 */
        /***/
        function(module, exports, __webpack_require__) {

            function assign(target, sources) {
                if (target == null) {
                    throw new TypeError('Object.assign target cannot be null or undefined');
                }

                var to = Object(target);
                var hasOwnProperty = Object.prototype.hasOwnProperty;

                for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
                    var nextSource = arguments[nextIndex];
                    if (nextSource == null) {
                        continue;
                    }

                    var from = Object(nextSource);

                    // We don't currently support accessors nor proxies. Therefore this
                    // copy cannot throw. If we ever supported this then we must handle
                    // exceptions and side-effects. We don't support symbols so they won't
                    // be transferred.

                    for (var key in from) {
                        if (hasOwnProperty.call(from, key)) {
                            to[key] = from[key];
                        }
                    }
                }

                return to;
            };

            module.exports = assign;
        },
        /* 76 */
        /***/
        function(module, exports, __webpack_require__) {

            /* WEBPACK VAR INJECTION */
            (function(process) {

                "use strict";

                var invariant = function(condition, format, a, b, c, d, e, f) {
                    if ("production" !== process.env.NODE_ENV) {
                        if (format === undefined) {
                            throw new Error('invariant requires an error message argument');
                        }
                    }

                    if (!condition) {
                        var error;
                        if (format === undefined) {
                            error = new Error(
                                'Minified exception occurred; use the non-minified dev environment ' +
                                'for the full error message and additional helpful warnings.'
                            );
                        } else {
                            var args = [a, b, c, d, e, f];
                            var argIndex = 0;
                            error = new Error(
                                'Invariant Violation: ' +
                                format.replace(/%s/g, function() {
                                    return args[argIndex++];
                                })
                            );
                        }

                        error.framesToPop = 1; // we don't care about invariant's own frame
                        throw error;
                    }
                };

                module.exports = invariant;

                /* WEBPACK VAR INJECTION */
            }.call(exports, __webpack_require__(73)))
        },
        /* 77 */
        /***/
        function(module, exports, __webpack_require__) {

            "use strict";

            function joinClasses(className /*, ... */ ) {
                if (!className) {
                    className = '';
                }
                var nextClass;
                var argLength = arguments.length;
                if (argLength > 1) {
                    for (var ii = 1; ii < argLength; ii++) {
                        nextClass = arguments[ii];
                        if (nextClass) {
                            className = (className ? className + ' ' : '') + nextClass;
                        }
                    }
                }
                return className;
            }

            module.exports = joinClasses;
        },
        /* 78 */
        /***/
        function(module, exports, __webpack_require__) {

            "use strict";

            var assign = __webpack_require__(75);

            var ReactContext = {

                current: {},

                withContext: function(newContext, scopedCallback) {
                    var result;
                    var previousContext = ReactContext.current;
                    ReactContext.current = assign({}, previousContext, newContext);
                    try {
                        result = scopedCallback();
                    } finally {
                        ReactContext.current = previousContext;
                    }
                    return result;
                }

            };

            module.exports = ReactContext;
        },
        /* 79 */
        /***/
        function(module, exports, __webpack_require__) {

            "use strict";

            var ReactCurrentOwner = {
                current: null
            };

            module.exports = ReactCurrentOwner;
        }
    ]);
