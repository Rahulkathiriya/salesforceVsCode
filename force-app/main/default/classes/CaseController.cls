public with sharing class CaseController {
    @AuraEnabled(cacheable=true)
    public static List<Case> getCases(String accountId) {
        return [SELECT AccountId, Id, Subject, Status, Priority, CaseNumber
                FROM Case
                WHERE AccountId = :accountId LIMIT 10];
    }
}