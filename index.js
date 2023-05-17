const { getReviews } = require('./YelpReviewPull');

async function main() {
  const businessId = 'Business_ID_Here';
  try {
    const reviews = await getReviews(businessId);
  } catch (error) {
    console.error('Error fetching Yelp reviews:', error.message);
  }
}

main().catch(console.error);
