import Params from 'model/Params';

class Login {
    // Field names have been abbreviated to reduce storage consumption
    t;      // Tag
    v;      // Version of login
    c;      // Created epoch
    l;      // Last modified epoch
    p;      // Password
    g;      // Generation parameters
    constructor(tag, params) {
        this.t = tag;
        this.v = 1;
        const now = Date.now()
        this.c = now;
        this.l = now;
        this.p = null;
        this.g = params;
    }

    get id() {
        return this.t + this.c;
    }

    get tag() {
        return this.t;
    }

    get version() {
        return this.v;
    }

    get createdEpoch() {
        return this.c;
    }

    get lastModifiedEpoch() {
        return this.l;
    }
    
    get password() {
        return this.p;
    }

    get params() {
        return Object.assign(new Params, this.g); 
    }

    set password(password) {
        this.p = password;
    }

    bumpVersion() {
        this.v++;
        this.l = Date.now();
    }

    copy() {
        return Object.assign(new Login, this);
    }
}

export default Login;