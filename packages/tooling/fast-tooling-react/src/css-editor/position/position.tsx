import React from "react";
import { get, pick } from "lodash-es";
import Foundation, {
    FoundationProps,
    HandledProps,
} from "@microsoft/fast-components-foundation-react";
import {
    CSSPositionHandledProps,
    CSSPositionUnhandledProps,
    CSSPositionValues,
    Location,
    LocationsMappedToClassNames,
    PositionValue,
} from "./position.props";

export default class CSSPosition extends Foundation<
    CSSPositionHandledProps,
    CSSPositionUnhandledProps,
    {}
> {
    public static displayName: string = "CSSPosition";

    protected handledProps: HandledProps<CSSPositionHandledProps> = {
        data: void 0,
        onChange: void 0,
        managedClasses: void 0,
    };

    public render(): React.ReactNode {
        const position: PositionValue = get(
            this.props,
            `data.position`,
            PositionValue.static
        );

        return (
            <div className={this.props.managedClasses.cssPosition}>
                <span className={this.props.managedClasses.cssPosition_control}>
                    <select
                        className={this.props.managedClasses.cssPosition_select}
                        onChange={this.handlePositionOnChange}
                        value={position}
                    >
                        <option value={PositionValue.absolute}>Absolute</option>
                        <option value={PositionValue.fixed}>Fixed</option>
                        <option value={PositionValue.relative}>Relative</option>
                        <option value={PositionValue.static}>Static</option>
                    </select>
                </span>
                {this.renderControls(position)}
            </div>
        );
    }

    private renderControls(position?: PositionValue): JSX.Element {
        switch (position) {
            case PositionValue.absolute:
            case PositionValue.fixed:
            case PositionValue.relative:
                return (
                    <div className={this.props.managedClasses.absoluteInput}>
                        <div className={this.props.managedClasses.absoluteInput_row}>
                            {this.renderLocationInput(Location.top)}
                        </div>
                        <div className={this.props.managedClasses.absoluteInput_row}>
                            {this.renderLocationInput(Location.left)}
                            <div className={this.generateCenterRowClassNames()}>
                                <div
                                    className={
                                        this.props.managedClasses
                                            .absoluteInput_centerRowContent
                                    }
                                >
                                    {"offset".toUpperCase()}
                                </div>
                            </div>
                            {this.renderLocationInput(Location.right)}
                        </div>
                        <div className={this.props.managedClasses.absoluteInput_row}>
                            {this.renderLocationInput(Location.bottom)}
                        </div>
                    </div>
                );
            case PositionValue.static:
            default:
                return null;
        }
    }

    private renderLocationInput(location: Location): JSX.Element {
        return (
            <input
                type="text"
                className={this.props.managedClasses.cssPosition_input}
                onChange={this.handleLocationInputOnChange(location)}
                value={get(this.props, `data.${location}`, "")}
            />
        );
    }

    private generateCenterRowClassNames(): string {
        let classNames: string = this.props.managedClasses.absoluteInput_centerRow;

        [
            {
                location: Location.top,
                className: this.props.managedClasses.absoluteInput_centerRow__activeTop,
            },
            {
                location: Location.bottom,
                className: this.props.managedClasses
                    .absoluteInput_centerRow__activeBottom,
            },
            {
                location: Location.left,
                className: this.props.managedClasses.absoluteInput_centerRow__activeLeft,
            },
            {
                location: Location.right,
                className: this.props.managedClasses.absoluteInput_centerRow__activeRight,
            },
        ].forEach((locationsMappedToClassNames: LocationsMappedToClassNames): void => {
            classNames = this.props[locationsMappedToClassNames.location]
                ? `${classNames} ${locationsMappedToClassNames.className}`
                : classNames;
        });

        return classNames;
    }

    private handlePositionOnChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        this.handleOnChange(e.target.value, "position");
    };

    private handleLocationInputOnChange = (
        location: Location
    ): ((e: React.ChangeEvent<HTMLInputElement>) => void) => {
        return (e: React.ChangeEvent<HTMLInputElement>): void => {
            this.handleOnChange(e.target.value, location);
        };
    };

    private handleOnChange = (value: string, cssKey: Location | "position"): void => {
        const updatedProps: CSSPositionValues = this.assignUpdatedProps(
            ["position", Location.top, Location.left, Location.right, Location.bottom],
            cssKey,
            value
        );

        if (typeof this.props.onChange === "function") {
            this.props.onChange(updatedProps);
        }
    };

    private assignUpdatedProps(
        props: string[],
        updatedPropKey: string,
        updatedPropValue: string
    ): CSSPositionValues {
        let updatedProps: Partial<CSSPositionValues> = {};

        switch (updatedPropKey) {
            case "position":
                updatedProps[updatedPropKey] = updatedPropValue as PositionValue;
                break;
            case Location.left:
            case Location.right:
            case Location.top:
            case Location.bottom:
                updatedProps = this.getUpdatedPositions(
                    props,
                    updatedPropKey,
                    updatedPropValue
                );

                const position: PositionValue = get(this.props, "data.position");

                if (typeof position !== "undefined") {
                    updatedProps.position = position;
                }
                break;
        }

        return updatedProps;
    }

    private getUpdatedPositions(
        props: string[],
        updatedPropKey: Location,
        updatedPropValue: string
    ): Partial<CSSPositionValues> {
        const updatedProps: Partial<CSSPositionValues> = {};
        const excludedProp: Location = this.getExcludedLocation(updatedPropKey);

        props.forEach((prop: string): void => {
            if (get(this.props, `data.${prop}`) && prop !== excludedProp) {
                updatedProps[prop] = this.props.data[prop];
            }
        });

        updatedProps[updatedPropKey] = updatedPropValue;

        return updatedProps;
    }

    // Get the location that should be excluded from being added to the object,
    // this should be used for the opposing location, eg. if left is being set,
    // do not set right value.
    private getExcludedLocation(updatedPropKey: Location): Location {
        return updatedPropKey === Location.left
            ? Location.right
            : updatedPropKey === Location.right
            ? Location.left
            : updatedPropKey === Location.top
            ? Location.bottom
            : Location.top;
    }
}
