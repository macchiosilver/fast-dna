import {
    ContextMenu,
    contextMenuItemSchema,
    ContextMenuProps,
    contextMenuSchema,
} from "@microsoft/fast-components-react-msft";
import Guidance from "../../.tmp/context-menu/guidance";
import { ComponentViewConfig } from "./data.props";

const contextMenuConfig: ComponentViewConfig<ContextMenuProps> = {
    schema: contextMenuSchema,
    component: ContextMenu,
    guidance: Guidance,
    scenarios: [
        {
            displayName: "Basic",
            data: {
                children: [
                    {
                        id: contextMenuItemSchema.id,
                        props: {
                            children: "Context menu item 1",
                        },
                    },
                    {
                        id: contextMenuItemSchema.id,
                        props: {
                            children: "Context menu item 2",
                        },
                    },
                    {
                        id: contextMenuItemSchema.id,
                        props: {
                            children: "Context menu item 3",
                        },
                    },
                ],
            },
        },
    ],
};

export default contextMenuConfig;
