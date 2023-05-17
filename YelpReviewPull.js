const https = require('https');

function getReviews(businessId) {
  return new Promise((resolve, reject) => {
    const url = `https://api.yelp.com/v3/businesses/${businessId}/reviews`;

    const options = {
      headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer API_KEY'
      }
    };

    https.get(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const response = JSON.parse(data);
        const reviews = response.reviews.map((review) => ({
          name: review.user.name,
          rating: review.rating,
          text: review.text,
          time_created: review.time_created
        }));
        resolve(reviews);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

module.exports = { getReviews };
