export const mockMovies = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Epic Movie ${i + 1}: The Return`,
  year: 2010 + (i % 15),
  poster: `https://picsum.photos/seed/movie${i}/300/450`,
  rating: (Math.random() * 4 + 6).toFixed(1),
  overview: "An incredible journey through space and time where our heroes discover the true meaning of friendship and adventure in this action-packed thriller.",
  genre: ["Action", "Sci-Fi", "Drama", "Comedy", "Thriller"][i % 5]
}));

export const searchMovies = async (query, page = 1, limit = 10) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = mockMovies;
      if (query) {
        results = results.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
      }
      const start = (page - 1) * limit;
      const paginated = results.slice(start, start + limit);
      resolve({
        results: paginated,
        totalResults: results.length,
        totalPages: Math.ceil(results.length / limit),
        page
      });
    }, 600);
  });
};
