const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const calendar = google.calendar('v3')

//credencias
const auth = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

auth.setCredentials({ resfresh_token: REFRESH_TOKEN });

async function listEvents() {
    const res = await calendar.events.list({
        calendarId: 'primary',
        auth,
        timeMin: (new Date()).toISOString(),
        maxResults: 5,
        singleEvents: true,
        orderBy: 'starTime',
    });

    const events = res.data.items;
    return events;
}

MediaSourceHandle.exports = {
    listEvents
};