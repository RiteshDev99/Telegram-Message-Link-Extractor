const { TelegramClient, Api} = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");
const { NewMessage } = require("telegram/events");




const apiId = ('Enter your own apiId')
const apiHash = ('Enter your own apiHash')
const stringSession = new StringSession(""); // fill this later with the value from session.save()
    


(async () => {
    console.log("Loading interactive example...");
    const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
    });
    await client.start({
        phoneNumber: async () => await input.text("Please enter your number: "),
        password: async () => await input.text("Please enter your password: "),
        phoneCode: async () =>
            await input.text("Please enter the code you received: "),
        onError: (err) => console.log(err),
    });
    console.log("You should now be connected.");
    console.log(client.session.save()); // Save this string to avoid logging in again

    client.addEventHandler(async (event) => {
        const message = event.message;

        // console.log(message.getSender())
        // if (message.id === 193324) {
        //     console.log("this is ritesh")
        // }
        // Ensure the message is from the specified channel
        // if (message && message.peerId.channelId === myChannel) {
        //     console.log("New message received:", message.message);
        // }


        const sender = await message.getSender()

        if (sender.username === "this_82") {
            console.log("saving to db")
            const offerText = message.text
            const urlRegex = /(https?:\/\/[^\s]+)/g;

            const offerUrls = offerText.match(urlRegex);

            console.log(offerUrls);
        }

    }, new NewMessage({}));

})();



