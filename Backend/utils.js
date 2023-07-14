function createResult(error, Data) {
    const result = {}
    if (error) {
        result["Status"] = "error"
        result["error"] = error
    }
    else {
        result["Status"] = "success"
        result["data"] = Data
    }
    return result
}

function createCustomResult(status, Data) {
    const result = {}
    if (status === "error") {
        result["Status"] = "error"
        result["Data"] = Data
    } else if (status === "success") {
        result["Status"] = "success"
        result["Data"] = Data
    }
    return result
}

module.exports = {
    createResult, createCustomResult
}