exports.enrich = async (event) => {
    return {
      ...event,
      genre: "sports",
      language: "hindi",
    };
  };