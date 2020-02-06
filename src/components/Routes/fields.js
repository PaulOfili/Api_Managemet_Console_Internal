const methods = [
    {
        value: "GET"
    },
    {
        value: "POST"
    },
    {
        value: "PUT"
    },
    {
        value: "DELETE"
    }
]
export const predicateFields = {
    after: {
        name: "After",
        modal: "AFTER_MODAL",
        fields: ["After"],
        addRow: true,
        rows: [],
        fieldType: "date",
        description: "This predicate matches requests that happen after the current datetime."
    },
    before:{
        name: "Before",
        modal: "BEFORE_MODAL",
        fields: ["Before"],
        addRow: true,
        rows: [],
        fieldType: "date",
        description: "This predicate matches requests that happen before the current datetime."
    },
    between:{
            name: "Between",
            modal: "BETWEEN_MODAL",
            addRow: true,
            rows: [],
            fields: ["Before", "After"],
            fieldType: "date",
        },
    cookie:{
            name: "Cookie",
            modal: "COOKIE_MODAL",
            fields: ["Cookie", "Regex"],
            addRow: true,
            rows: [],
            fieldType: "text",
            // description: "This field contains the date the action was taken."
        },
    header:{
            name: "Header",
            modal: "HEADER_MODAL",
            fields: ["Header", "Regex"],
            addRow: true,
            rows: [],
            fieldType: "text",
            // description: "This field contains the date the action was taken."
        },
    host: {
        name: "Host",
        modal: "HOST_MODAL",
        fields: ["Host"],
        rows: [],
        fieldType: "text",
        // description: "This field contains the date the action was taken."
    },
    method: {
        name: "Method",
        modal: "METHOD_MODAL",
        fields: ["Method"],
        rows: [],
        fieldType: "select",
        fieldValues: methods,
        // description: "This field contains the date the action was taken."
    },
    path: {
        name: "Path",
        modal: "PATH_MODAL",
        fields: ["Path"],
        rows: [],
        fieldType: "text",
        // description: "This field contains the date the action was taken."
        },
    query:{
        name: "Query",
        modal: "QUERY_MODAL",
        fields: ["Param", "Regexp(Optional)"],
        rows: [],
        fieldType: "text",
        // description: "This field contains the date the action was taken."
        },
    remoteaddr: {
        name: "RemoteAddr",
        modal: "REMOTEADDR_MODAL",
        fields: ["RemoteAddr"],
        rows: [],
        fieldType: "text",
        // description: "This field contains the date the action was taken."
    },
}

export const filterFields = {
    addrequestheader: {
        name: "AddRequestHeader",
        modal: "ADDREQUESTHEADER_MODAL",
        fields: ["Name", "Value"],
        addRow: true,
        rows: [],
        fieldType: "text",
        description: ""
    },
    addrequestparameter:{
        name: "AddRequestParameter",
        modal: "ADDREQUESTPARAMETER_MODAL",
        fields: ["Name", "Value"],
        addRow: true,
        rows: [],
        fieldType: "text",
        description: ""
    },
    addresponseheader: {
        name: "AddResponseHeader",
        modal: "ADDRESPONSEHEADER_MODAL",
        fields: ["Name", "Value"],
        addRow: true,
        rows: [],
        fieldType: "text",
        description: ""
    },
    hystrix:{
            name: "Hystrix",
            modal: "HYSTRIX_MODAL",
            fields: ["Hystrix"],
            addRow: false,
            rows: [],
            fieldType: "text",
            // description: "This field contains the date the action was taken."
        },
    fallbackheaders:{
            name: "FallBackHeaders",
            modal: "FALLBACKHEADERS_MODAL",
            fields: ["Name",],
            addRow: true,
            rows: [],
            fieldType: "text",
            // description: "This field contains the date the action was taken."
        },
    prefixpath: {
        name: "PrefixPath",
        modal: "PREFIXPATH_MODAL",
        fields: ["Prefix"],
        addRow: true,
        rows: [],
        fieldType: "text",
        // description: "This field contains the date the action was taken."
    },
    preservehostheader: {
        name: "PreserveHostHeader",
        modal: "PRESERVEHOSTHEADER_MODAL",
        fields: [],
        addRow: false,
        rows: [],
        fieldType: "text",
        // description: "This field contains the date the action was taken."
    },
    requestratelimiter: {
        name: "RequestRateLimiter",
        modal: "REQUESTRATELIMITER_MODAL",
        fields: ["KeyResolver"],
        addRow: true,
        rows: [],
        fieldType: "text",
        // description: "This field contains the date the action was taken."
        },
    redirectto: {
        name: "RedirectTo",
        modal: "REDIRECTTO_MODAL",
        fields: ["Status", "URL"],
        addRow: true,
        rows: [],
        fieldType: "text",
        // description: "This field contains the date the action was taken."
        },
    removerequestheader:{
        name: "RemoveRequestHeader",
        modal: "REMOVEREQUESTHEADER_MODAL",
        fields: ["Name"],
        addRow: true,
        rows: [],
        fieldType: "text",
        // description: "This field contains the date the action was taken."
        },
    removeresponseheader: {
        name: "RemoveResponseHeader",
        modal: "REMOVERESPONSEHEADER_MODAL",
        fields: ["Name"],
        addRow: true,
        rows: [],
        fieldType: "text",
        // description: "This field contains the date the action was taken."
    },
    rewritepath: {
        name: "RewritePath",
        modal: "REWRITEPATH_MODAL",
        fields: ["Path", "Replacement"],
        addRow: true,
        rows: [],
        fieldType: "text",
        // description: "This field contains the date the action was taken."
    },
    rewriteresponseheader: {
        name: "RewriteResponseHeader",
        modal: "REWRITERESPONSEHEADER_MODAL",
        fields: ["Name", "Regex", "Replacement"],
        addRow: true,
        rows: [],
        fieldType: "text",
        // description: "This field contains the date the action was taken."
    },
    savesession: {
        name: "SaveSession",
        modal: "SAVESESSION_MODAL",
        fields: [],
        addRow: false,
        rows: [],
        fieldType: "text",
        // description: "This field contains the date the action was taken."
    },
    secureheaders: {
        name: "secureHeaders",
        modal: "SECUREHEADERS_MODAL",
        fields: [],
        addRow: false,
        rows: [],
        fieldType: "text",
        // description: "This field contains the date the action was taken."
    },
    setpath: {
        name: "SetPath",
        modal: "SETPATH_MODAL",
        fields: ["Path Template"],
        addRow: true,
        rows: [],
        fieldType: "text",
        // description: "This field contains the date the action was taken."
    },
    setresponseheader: {
        name: "SetResponseHeader",
        modal: "SETRESPONSEHEADER_MODAL",
        fields: ["Name", "Value"],
        addRow: true,
        rows: [],
        fieldType: "text",
        // description: "This field contains the date the action was taken."
    },
    setstatus: {
        name: "SetStatus",
        modal: "SETSTATUS_MODAL",
        fields: ["Status"],
        addRow: true,
        rows: [],
        fieldType: "text",
        // description: "This field contains the date the action was taken."
    },
    stripprefix: {
        name: "StripPrefix",
        modal: "STRIPPREFIX_MODAL",
        fields: ["Parts"],
        addRow: true,
        rows: [],
        fieldType: "text",
        // description: "This field contains the date the action was taken."
    },
    retry: {
        name: "Retry",
        modal: "RETRY_MODAL",
        fields: ["Retries", "Statuses", "Methods", "Series"],
        addRow: true,
        rows: [],
        fieldType: "text",
        // description: "This field contains the date the action was taken."
    },
    requestsize: {
        name: "RequestSize",
        modal: "REQUESTSIZE_MODAL",
        fields: ["RequestSize"],
        addRow: true,
        rows: [],
        fieldType: "text",
        // description: "This field contains the date the action was taken."
    },
}