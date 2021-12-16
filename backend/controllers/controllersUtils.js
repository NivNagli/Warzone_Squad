exports.errorDescriptionBuilder = (errorCode, description, possibleCause) => {
    const errorDescription = {};
    errorDescription["message"] = `Request failed with status code ${errorCode}`;
    errorDescription["name"] = "Error";
    errorDescription["description"] = description;
    errorDescription["possibleCause"] = possibleCause;
    return errorDescription;
};

exports.fixBattleName = (name) => {
    return name.split("%23")[0] + "%2523" + name.split("%23")[1];
}