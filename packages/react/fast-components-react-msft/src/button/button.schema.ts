/**
 * Complies with FAST Tooling 1.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Button",
    description: "A button component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-msft/button",
    formPluginId: "@microsoft/fast-components-react-msft/button",
    properties: {
        disabled: {
            title: "Disabled",
            type: "boolean",
        },
        href: {
            title: "HTML href attribute",
            type: "string",
        },
        appearance: {
            title: "Appearance",
            type: "string",
            enum: ["justified", "lightweight", "outline", "primary", "stealth"],
        },
    },
    reactProperties: {
        children: {
            title: "Children",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-msft/button/children",
            defaults: ["text"],
            examples: ["Lorem"],
        },
        beforeContent: {
            title: "Before content",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-msft/button/beforeContent",
            pluginId: "@microsoft/fast-components-react-msft/button/beforeContent",
        },
        afterContent: {
            title: "After content",
            type: "children",
            formPluginId: "@microsoft/fast-components-react-msft/button/afterContent",
            pluginId: "@microsoft/fast-components-react-msft/button/afterContent",
        },
    },
    required: ["children"],
};
