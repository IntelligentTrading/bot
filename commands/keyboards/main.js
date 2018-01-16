var _ = require('lodash');
var Keyboard = require('./keyboard').Keyboard;

var buttons = [
    //[{ text: "Subscribe", callback_data: "settings.DB:ISSUB_" }],
    [{ text: "Turn alerts", callback_data: "settings.DB:ISMUTED_" }],
    [{ text: "Edit Signals", callback_data: "settings.NAV:SIG" }],
    [{ text: "Edit Trader Profile", callback_data: "settings.NAV:HRZ" }]
];

var extraButtons = [
    //[{ text: "Edit Risk Profile", callback_data: "settings.NAV:RSK" }],
];

var kb = new Keyboard('', buttons, extraButtons, false, true);
kb.showExtraButtons = function (show) {
    if (show) {
        this.buttons.length == 3 ? this.buttons = _.concat(this.buttons, this.extraButtons) : {};
    }
    else {
        this.buttons.splice(3);
    };
}

kb.updateButtons = (message, isSubscribed, isMuted) => {

    kb.message = message;

    /*buttons[0][0].text = isSubscribed ? 'Unsubscribe' : 'Subscribe';
    buttons[0][0].callback_data = isSubscribed
        ? buttons[0][0].callback_data.split('_')[0] + '_False'
        : buttons[0][0].callback_data.split('_')[0] + '_True';

    // Dynamic Alert button
    buttons[1][0].text = isMuted ? 'Turn alerts ON' : 'Turn alerts OFF';
    buttons[1][0].callback_data = isMuted
        ? buttons[1][0].callback_data.split('_')[0] + '_False'
        : buttons[1][0].callback_data.split('_')[0] + '_True';*/

    buttons[0][0].text = isMuted ? 'Turn alerts ON' : 'Turn alerts OFF';
    buttons[0][0].callback_data = isMuted
        ? buttons[0][0].callback_data.split('_')[0] + '_False'
        : buttons[0][0].callback_data.split('_')[0] + '_True';
}

kb.updateSettings = (userSettings) => {
    var subscription_plans = ['free', 'beta', 'paid'];
    var subscription_plan = userSettings.subscription_plan == 100 ? 'ITT' : subscription_plans[userSettings.subscription_plan];

    var isMuted = userSettings.is_muted;
    var msg = `Your profile is set on *${userSettings.horizon}* horizon.
You are subscribed to the *${subscription_plan}* plan and your notifications are ${isMuted ? '*muted*' : '*active*'}.
Tap below to edit your settings:`;

    kb.updateButtons(msg, undefined, isMuted);

    //! let's keep some features private

    kb.showExtraButtons(userSettings.is_ITT_team);
}


exports.kb = kb;