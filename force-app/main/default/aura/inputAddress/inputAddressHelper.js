({
    countryProvinceMap: {
        US: [
            { 'label': 'California', 'value': 'CA' },
            { 'label': 'Texas', 'value': 'TX' },
            { 'label': 'Washington', 'value': 'WA' }
        ],
        CN: [
            { 'label': 'GuangDong', 'value': 'GD' },
            { 'label': 'GuangXi', 'value': 'GX' },
            { 'label': 'Sichuan', 'value': 'SC' }
        ],
        VA: []
    },
    countryOptions: [
        { 'label': 'United States', 'value': 'US' },
        { 'label': 'China', 'value': 'CN' },
        { 'label': 'India', 'value': 'IN' }
    ],
    getProvinceOptions: function (country) {
        return this.countryProvinceMap[country];
    },
    getCountryOptions: function () {
        return this.countryOptions;
    }
});