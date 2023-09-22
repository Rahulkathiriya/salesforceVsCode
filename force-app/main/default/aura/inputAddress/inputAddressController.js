({
    init: function (cmp, event, helper) {
        cmp.set("v.countryOptions", helper.getCountryOptions());
        cmp.set("v.provinceOptions", helper.getProvinceOptions(cmp.get("v.country")));
    },
    updateProvinces: function (cmp, event, helper) {
        if (cmp.get("v.previousCountry") !== cmp.get("v.country")) {
            cmp.set("v.provinceOptions", helper.getProvinceOptions(cmp.get("v.country")));
        }
        cmp.set("v.previousCountry", cmp.get("v.country"));
    }
});