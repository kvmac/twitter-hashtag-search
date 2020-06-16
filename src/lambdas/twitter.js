const client = require('twitter-lite')({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

export async function handler(event, context, callback) {
  try {
    const hashtag = event.queryStringParameters['hashtag'];

    if (!hashtag) {
      callback(null, {
        statusCode: 400,
        body: {
          error: true,
          msg: 'Parameter value was null or undefined',
          count: 0,
        },
      });
    }


    const { statuses, count } = await client.get('search/tweets', { q: hashtag });

    if (!count) {
      callback(null, {
        statusCode: 200,
        body: {
          msg: `There are no tweets with the hashtag: ${hashtag}`,
          count
        }
      });
    }

    let tweets = await statuses.filter((status) => {
      return !status.in_reply_to_status_id ||
      !status.in_reply_to_status_id_str ||
      !status.in_reply_to_user_id ||
      !status.in_reply_to_user_id_str ||
      !status.in_reply_to_screen_name ||
      !status.is_quoted_status
    }).map((status) => {
      return {
        name: status.user.name,
        handle: status.user.screen_name,
        location: status.user.location,
        img_url: status.user.profile_image_url,
        img_url_https: status.user.profile_image_url_https,
        text: status.text,
        hashtags: status.entities.hashtags,
        retweet_count: status.retweet_count,
        favorite_count: status.favorite_count,
      }
    });

    callback(null, {
      statusCode: 200,
      body: {
        tweets,
        count
      }
    });

  } catch (err) {
    console.log(err) // output to netlify function log

    callback(null, {
      statusCode: 500,
      body: JSON.stringify(err)
    });
  }
}