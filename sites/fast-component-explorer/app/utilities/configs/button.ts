import {
    Button,
    ButtonAppearance,
    ButtonProps,
    buttonSchema,
} from "@microsoft/fast-components-react-msft";
import Guidance from "../../.tmp/button/guidance";
import { ComponentViewConfig } from "./data.props";

const buttonConfig: ComponentViewConfig<ButtonProps> = {
    schema: buttonSchema,
    component: Button,
    guidance: Guidance,
    scenarios: [
        {
            displayName: "Neutral",
            data: {
                children: "Button",
            },
        },
        {
            displayName: "Anchor",
            data: {
                href: "#",
                children: "Button",
            },
        },
        {
            displayName: "Disabled",
            data: {
                appearance: ButtonAppearance.primary,
                disabled: true,
                children: "Button",
            },
        },
    ],
};

export default buttonConfig;
