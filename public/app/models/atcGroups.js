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
var Medicine = (function () {
    function Medicine(id, name, form, 
        //public package: string,
        comment, atc_sub_group_id) {
        this.id = id;
        this.name = name;
        this.form = form;
        this.comment = comment;
        this.atc_sub_group_id = atc_sub_group_id;
    }
    return Medicine;
}());
exports.Medicine = Medicine;
//# sourceMappingURL=atcGroups.js.map