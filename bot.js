const { App } = require("@slack/bolt");
const Axios = require("axios");
const fs = require("fs");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.command(
  "/sales",
  async ({ command, ack, respond, context, message, say }) => {
    await ack();

    try {
      // await Axios.get(
      //   "https://backoffice.alamer-market.com/ABO/Download/Skeko%20Sales.csv"
      // ).then(function (response) {
      //   response.data.pipe(fs.createWriteStream("sales.csv"));
      // });

      // send sales.csv to slack
      const channelId = "C03K9S6N9GB";
      await app.client.chat.postMessage({
        channel: channelId,
        text: "Sales.csv",
        attachments: [
          {
            fallback: "Sales.csv",
            title: "Sales.csv",
            title_link:
              "https://backoffice.alamer-market.com/ABO/Download/Skeko%20Sales.csv",
            text: "Sales.csv",
            color: "#36a64f",
            fields: [
              {
                title: "Sales.csv",
                value: "Sales.csv",
                short: true,
              },
            ],
            actions: [
              {
                type: "button",
                text: "Download",
                url: "https://backoffice.alamer-market.com/ABO/Download/Skeko%20Sales.csv",
              },
            ],
          },
        ],
      });

      app.client.files.remote.add({
        external_id: "sales.csv",
        external_url:
          "https://backoffice.alamer-market.com/ABO/Download/Skeko%20Sales.csv",
        filetype: "csv",
        title: "Sales.csv",
        indexable_file_contents: "Sales.csv",
        channels: "C03K9S6N9GB",
      });

      // send sales.csv to slack
      app.client.files.remote.share({
        external_id: "sales.csv",
        channels: "C03K9S6N9GB",
      });
    } catch (error) {}
  }
);

app.start(4000);
