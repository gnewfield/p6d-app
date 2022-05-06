class Params {
    t;  // Message template ID
    l;  // Password length

    constructor(templateId, passwordLength) {
        this.t = templateId;
        this.l = passwordLength;
    }

    get templateId() {
        return this.t;
    }

    get length() {
        return this.l;
    }
}

export default Params;