import React from "react";
import {
    DataGridClassNameContract,
    ManagedClasses,
} from "@microsoft/fast-components-class-name-contracts-base";

export type DataGridManagedClasses = ManagedClasses<DataGridClassNameContract>;
export type DataGridUnhandledProps = React.HTMLAttributes<HTMLDivElement>;

export interface DataGridCellRenderConfig {
    rowData: object;
    columnDataKey: React.ReactText;
    columnIndex: number;
    classNames: string;
    rootElement: React.RefObject<any>;
    focusTarget: React.RefObject<any>;
    unhandledProps: object;
}

export interface DataGridHeaderRenderConfig {
    title: React.ReactNode;
    key: React.ReactText;
    columnIndex: number;
    classNames: string;
}

export interface DataGridRowHeightCallbackParams {
    rowData: object;
    rowIndex: number;
    defaultRowHeight: number;
}

export interface DataGridColumnDefinition {
    /**
     * identifies the data item to be displayed in this column
     * (i.e. how the data item is labelled in each row)
     */
    columnDataKey: React.ReactText;

    /**
     *  Column title
     */
    title: React.ReactNode;

    /**
     * The width of the column in a form compatible with css grid column widths
     * (i.e. "50px", "1fr", "20%", etc...)
     */
    columnWidth: string;

    /**
     *  Custom render function for the header cell of the column
     */
    header?: (config: DataGridHeaderRenderConfig) => React.ReactNode;

    /**
     * Custom render function for a data cells in the column
     * rowdata: data object for the row the cell is in
     * columnDataKey DataGridColumnDefinition for the column the cell is in
     * columnIndex: index of the column in the grid
     * classNames: css classnames for the cell
     * rootElement: ref to the root element of the cell
     * focusTarget: authors of custom cell render functions who wish to focus on an internal element should
     * set the 'ref' attribute of the internal element that should get focus to this value.
     * unhandledProps: authors will generally want to write these to their custom implementations
     */
    cell?: (DataGridCellRenderConfig) => React.ReactNode;
}

export interface DataGridHandledProps extends DataGridManagedClasses {
    /**
     * Data to be displayed in the grid
     * An array of data items for each row is expected
     */
    gridData: object[];

    /**
     * Data page size in number of rows.  This is the maximum number of items that will be converted to data row items passed to the
     * underlying panel display at any one time.
     * default is 1000
     */
    pageSize?: number;

    /**
     * Whether the underlying display panel renders out of view items or not
     */
    virtualizeItems?: boolean;

    /**
     * the field which uniquely identifies each data row
     */
    dataRowKey: React.ReactText;

    /**
     * Array of column definitions specify how to display each column
     */
    columnDefinitions: DataGridColumnDefinition[];

    /**
     *  The default height in pixels of each row
     */
    rowHeight?: number;

    /**
     * This callback function overrides the rowHeight prop and will be called for each
     * row of data when the gridData is updated in props.  Allows for non-uniform row heights.
     */
    rowHeightCallback?: (
        row: DataGridRowHeightCallbackParams,
    ) => number;

    /**
     * Default focus row key
     */
    defaultFocusRowKey?: React.ReactText;

    /**
     * Default focus column key
     */
    defaultFocusColumnKey?: React.ReactText;

    /**
     * If props have been updated this is the end index of the range of data items, starting at index 0, that are guaranteed not to
     * require recalculating size since the last prop update.  This is an optimization for large data sets.
     * ie. if changes resize the item at index 10, the stable range end should be 9
     * default is 0
     */
    stableRangeEndIndex?: number;
}

export type DataGridProps = DataGridHandledProps & DataGridUnhandledProps;
