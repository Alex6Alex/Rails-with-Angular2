"use strict";
var Group = (function () {
    function Group(id, code, description) {
        this.id = id;
        this.code = code;
        this.description = description;
    }
    return Group;
}());
exports.Group = Group;
var SubGroup = (function () {
    function SubGroup(id, code, description) {
        this.id = id;
        this.code = code;
        this.description = description;
    }
    return SubGroup;
}());
exports.SubGroup = SubGroup;
//# sourceMappingURL=atcGroups.js.map