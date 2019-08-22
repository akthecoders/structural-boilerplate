module.exports = {
  Query: {
    me: async (_, incomingData, { dataSources }) => {
      const userDetails = await dataSources.authApi.getLoggedInUserDetails();
      return userDetails;
    }
  },
  Mutation: {
    registerUser: async (_, incomingData, { dataSources }) => {
      const { name, email, password } = incomingData;
      const { token } = await dataSources.userApi.tryRegisteringUser({
        name,
        email,
        password
      });
      console.log(token);
      return { token };
    },
    login: async (_, incomingData, { dataSources }) => {
      const { email, password } = incomingData;
      const { token } = await dataSources.authApi.tryLogin({ email, password });
      return { token };
    }
  }
};
