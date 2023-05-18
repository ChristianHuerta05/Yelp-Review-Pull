const https = require('https');
/**
 * Retrieves reviews for a business from Yelp Fusion API.
 * @param {string} businessId - The ID of the business.
 * @returns {Promise<Array>} - A promise that resolves to an array of review objects, each review contains, name, rating, text, and time review was created.
 */
function getReviews(businessId) {
  return new Promise((resolve, reject) => {
    const url = `https://api.yelp.com/v3/businesses/${businessId}/reviews`;

    const options = {
      headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer API_KEY' // Replace 'API_KEY' with the actual API key
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
