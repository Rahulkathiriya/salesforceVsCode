({
  doInit: function(component, event, helper) {
    /*    
      try {
     var path = $A.get("$Resource.grensi__state");
   
        var req = new XMLHttpRequest();
          req.open("GET",path);
          req.addEventListener("load",$A.getCallback(function(){
              var res = req.response;
              console.log(res );
          }))
          req.send(null)
    } catch (e) {
      console.log(e);
    }
      */
    var evidence = [
      {
        SI: "Si 1, Si 2",
        Evidence_Generation_Objective: "Test EGO 1",
        EvidenceGap: [
          {
            Name: "GEP 1",
            Priority: "High",
            Activities: [
              {
                Category: "",
                RecordType: "Approved"
              },
              {
                Category: "NIR",
                RecordType: "Approved"
              },
              {
                Category: "Collab Research",
                RecordType: "Approved"
              },
              {
                Category: "Other",
                RecordType: "Approved"
              },
              {
                Category: "BMS Sponsored",
                RecordType: "Approved"
              },
              {
                Category: "ISR",
                RecordType: "Approved"
              }
            ]
          },
          {
            Name: "GEP 2",
            Priority: "Low",
            Activities: [
              {
                Category: "NIR",
                RecordType: "Approved"
              }
            ]
          },
          {
            Name: "GEP 3",
            Priority: "Medium",
            Activities: [
              {
                Category: "Other",
                RecordType: "Approved"
              }
            ]
          }
        ]
      },
      {
        SI: "Si 3, Si 4",
        Evidence_Generation_Objective: "Test EGO 2",
        EvidenceGap: [
          {
            Name: "GEP 4",
            Priority: "Low",
            Activities: [
              {
                Category: "Collab Research",
                RecordType: "Approved"
              }
            ]
          },
          {
            Name: "GEP 5",
            // Priority: "High",
            Activities: [
              {
                RecordType: "Approved"
              }
            ]
          }
        ]
      },
      {
        SI: "Si 5, Si 6, Si 7",
        Evidence_Generation_Objective: "Test EGO 3",
        EvidenceGap: [
          {
            Name: "GEP 6",
            Priority: "Medium",
            Activities: [
              {
                Category: "Collab Research",
                RecordType: "Approved"
              },
              {
                Category: "",
                RecordType: "Approved"
              }
            ]
          },
          {
            Name: "GEP 7",
            Priority: "High",
            Activities: [
              {
                Category: "Other",
                RecordType: "Approved"
              },
              {
                Category: "ISR",
                RecordType: "Approved"
              }
            ]
          },
          {
            Name: "GEP 8",
            Priority: "High",
            Activities: [
              {
                Category: "",
                RecordType: "Approved"
              },
              {
                Category: "Collab Research",
                RecordType: "Approved"
              },
              {
                Category: "Collab Research",
                RecordType: "Approved"
              },
              {
                Category: "NIR",
                RecordType: "Approved"
              },
              {
                Category: "NIR",
                RecordType: "Approved"
              }
            ]
          },
          {
            Name: "GEP 9",
            Priority: "Low",
            Activities: [
              {
                Category: "BMS Sponsored",
                RecordType: "Approved"
              },
              {
                Category: "ISR",
                RecordType: "Approved"
              },
              {
                Category: "",
                RecordType: "Approved"
              },
              {
                Category: "",
                RecordType: "Approved"
              }
            ]
          }
        ]
      },
      {
        SI: "Si 8, Si 9, Si 10, Si 11, Si 12",
        Evidence_Generation_Objective: "Test EGO 4",
        EvidenceGap: [
          {
            Name: "GEP 10",
            Priority: "High",
            Activities: [
              {
                Category: "NIR",
                RecordType: "Approved"
              },
              {
                Category: "Collab Research",
                RecordType: "Approved"
              },
              {
                Category: "",
                RecordType: "Approved"
              }
            ]
          },
          {
            Name: "GEP 11",
            Priority: "High",
            Activities: [
              {
                Category: "NIR",
                RecordType: "Approved"
              },
              {
                Category: "Collab Research",
                RecordType: "Approved"
              },
              {
                Category: "BMS Sponsored",
                RecordType: "Approved"
              },
              {
                Category: "ISR",
                RecordType: "Approved"
              }
            ]
          },
          {
            Name: "GEP 12",
            Priority: "High",
            Activities: [
              {
                Category: "",
                RecordType: "Approved"
              },
              {
                Category: "ISR",
                RecordType: "Approved"
              },
              {
                Category: "NIR",
                RecordType: "Approved"
              },
              {
                Category: "NIR",
                RecordType: "Approved"
              },
              {
                Category: "ISR",
                RecordType: "Approved"
              }
            ]
          },
          {
            Name: "GEP 13",
            Priority: "High",
            Activities: [
              {
                Category: "BMS Sponsored",
                RecordType: "Approved"
              },
              {
                Category: "ISR",
                RecordType: "Approved"
              },
              {
                Category: "",
                RecordType: "Approved"
              },
              {
                Category: "",
                RecordType: "Approved"
              }
            ]
          },
          {
            Name: "GEP 14",
            Priority: "",
            Activities: [
              {
                Category: "BMS Sponsored",
                RecordType: "Approved"
              },
              {
                Category: "NIR",
                RecordType: "Approved"
              },
              {
                Category: "Collab Research",
                RecordType: "Approved"
              }
            ]
          }
        ]
      }
    ];

    evidence.forEach(evidenceItem => {
      var evidenceGapCounts = {};

      evidenceItem.EvidenceGap.forEach(gapItem => {
        var categoryType = {
          ISR: 0,
          "Collab Research": 0,
          NIR: 0,
          "BMS Sponsored": 0,
          Other: 0
        };
        var activities = gapItem.Activities;
        evidenceGapCounts[gapItem.Name] = {
          categories: categoryType
        };

        for (var category in categoryType) {
          var categoryCount = activities.reduce((count, activity) => {
            if (activity.Category === "") activity.Category = "Other";
            if (activity.Category === category) {
              return count + 1;
            }
            return count;
          }, 0);
          evidenceGapCounts[gapItem.Name].categories[category] = categoryCount;
        }
        var totalCounts = JSON.stringify(evidenceGapCounts[gapItem.Name].categories).replaceAll(" ", "");
        activities[0].CategoryCounts = JSON.parse(totalCounts);
      });
    }); 
    console.log("evidence --> ", evidence);
    component.set("v.evidenceList", JSON.parse(JSON.stringify(evidence)));
  },

  handleSelect: function(component, event, helper) {}
});