var tba = require('tba-api-v3client');

var defaultClient = tba.ApiClient.instance;
var apiKey = defaultClient.authentications['apiKey'];
apiKey.apiKey = process.env.NEXT_PUBLIC_TBA_API_KEY

var eventAPI = new tba.EventApi()

function getTeam(team_number) {
}