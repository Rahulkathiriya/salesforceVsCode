({
    closeWork: function (cmp, evt, hlp) {
        var omniAPI = cmp.find("omniToolkit");
        omniAPI.getAgentWorks({
            callback: function (result) {
                var works = JSON.parse(result.works);
                var work = works[0];
                omniAPI.closeAgentWork({
                    workId: work.workId,
                    callback: function (result2) {
                        if (result2.success) {
                            console.log("Closed work successfully");
                        } else {
                            console.log("Close work failed");
                        }
                    }
                });
            }
        });
    }



})